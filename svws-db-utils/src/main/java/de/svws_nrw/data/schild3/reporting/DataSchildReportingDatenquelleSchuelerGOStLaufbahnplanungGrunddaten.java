package de.svws_nrw.data.schild3.reporting;

import de.svws_nrw.core.data.gost.Abiturdaten;
import de.svws_nrw.core.data.schild3.SchildReportingSchuelerGOStLaufbahnplanungGrunddaten;
import de.svws_nrw.core.types.schild3.SchildReportingAttributTyp;
import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.dto.current.gost.DTOGostJahrgangBeratungslehrer;
import de.svws_nrw.db.dto.current.gost.DTOGostJahrgangsdaten;
import de.svws_nrw.db.dto.current.gost.DTOGostSchueler;
import de.svws_nrw.db.dto.current.schild.lehrer.DTOLehrer;
import de.svws_nrw.db.dto.current.schild.schueler.DTOSchueler;
import de.svws_nrw.db.dto.current.schild.schueler.DTOSchuelerLernabschnittsdaten;
import de.svws_nrw.db.dto.current.schild.schule.DTOEigeneSchule;
import de.svws_nrw.db.dto.current.schild.schule.DTOJahrgang;
import de.svws_nrw.db.dto.current.schild.schule.DTOSchuljahresabschnitte;
import de.svws_nrw.db.utils.OperationError;
import de.svws_nrw.db.utils.gost.GostSchuelerLaufbahn;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Die Definition einer Schild-Reporting-Datenquelle für die Grunddaten der Laufbahnplanung in der gymnasialen Oberstufe
 */
public class DataSchildReportingDatenquelleSchuelerGOStLaufbahnplanungGrunddaten extends DataSchildReportingDatenquelle {

    /**
     * Erstelle die Datenquelle SchuelerGOStLaufbahnplanungGrunddaten
     */
    DataSchildReportingDatenquelleSchuelerGOStLaufbahnplanungGrunddaten() {
        super(SchildReportingSchuelerGOStLaufbahnplanungGrunddaten.class);
        this.setMaster("schuelerID", "Schueler", "id", SchildReportingAttributTyp.INT);
        // Beispiel für die Einschränkung auf Schulformen: this.restrictTo(Schulform.GY, Schulform.GE);
    }

	@Override
    List<? extends Object> getDatenInteger(DBEntityManager conn, List<Long> params) {

		// Prüfe, ob die Schüler in der DB vorhanden sind
        Map<Long, DTOSchueler> schueler = conn
                .queryNamed("DTOSchueler.id.multiple", params, DTOSchueler.class)
                .stream().collect(Collectors.toMap(s -> s.ID, s -> s));
		for (Long schuelerID : params) {
			if (schueler.get(schuelerID) == null)
				throw OperationError.NOT_FOUND.exception("Parameter der Abfrage ungültig: Ein Schüler mit der ID " + schuelerID.toString() + " existiert nicht.");
		}

		// Bestimme für die verifizierten Schüler deren aktuellen Lernabschnitt gemäß des Schuljahresabschnitt unter EigeneSchule.
		// Erstelle damit eine Map mit der JahrgangsID zur Schueler_ID
		// Damit kann später die aktuelle Jahrgangsstufe des Schülers und das Beratungshalbjahr bestimmt werden.

		// 1. Infos der eigenen Schule bestimmen
		DTOEigeneSchule eigeneschule = conn.queryNamed("DTOEigeneSchule.all", DTOEigeneSchule.class).getResultList().get(0);

		// 2. Schuljahresabschnitt der eigenen Schule bestimmen
		DTOSchuljahresabschnitte aktuellerSchulabschnitt = conn.queryByKey(DTOSchuljahresabschnitte.class, eigeneschule.Schuljahresabschnitts_ID);
		if (aktuellerSchulabschnitt == null)
			throw OperationError.NOT_FOUND.exception("Parameter der Abfrage ungültig: Ein Schuljahresabschnitt mit der ID " + eigeneschule.Schuljahresabschnitts_ID.toString() + " existiert nicht.");

		// 3. Aktuelles und folgendes Halbjahr ermitteln
		int aktuellesHalbjahr = aktuellerSchulabschnitt.Abschnitt;
		int folgeHalbjahr = (aktuellesHalbjahr % 2) + 1;

		// 4. Jahrgänge der eigenen Schule bestimmen
		Map<Long, DTOJahrgang> jahrgaenge = conn
			.queryNamed("DTOJahrgang.all", DTOJahrgang.class).getResultList()
			.stream().collect(Collectors.toMap(j -> j.ID, j -> j));

		// 5. JahrgangsID zur SchuelerID ablegen
		Map<Long, Long> schuelerJahrgangID =	conn
			.queryList("SELECT e FROM DTOSchuelerLernabschnittsdaten e WHERE e.Schueler_ID IN ?1 AND e.Schuljahresabschnitts_ID = ?2 AND e.WechselNr IS NULL", DTOSchuelerLernabschnittsdaten.class, params, eigeneschule.Schuljahresabschnitts_ID)
			.stream().collect(Collectors.toMap(sla -> sla.Schueler_ID, sla -> sla.Jahrgang_ID));


		// Aggregiere die benötigten Daten aus der Datenbank, wenn alle Schüler-IDs existieren und die Maps mit den Grunddaten angelegt wurden
		ArrayList<SchildReportingSchuelerGOStLaufbahnplanungGrunddaten> result = new ArrayList<>();
		for(Long schuelerID : params) {
			SchildReportingSchuelerGOStLaufbahnplanungGrunddaten laufbahnplanungGrunddaten = new SchildReportingSchuelerGOStLaufbahnplanungGrunddaten();
			laufbahnplanungGrunddaten.schuelerID = schuelerID;

			// GOSt-Daten des Schülers und dessen Abiturdaten und Jahrgangsdaten ermitteln
			DTOGostSchueler gostSchueler = conn.queryByKey(DTOGostSchueler.class, schuelerID);
			Abiturdaten abidaten = GostSchuelerLaufbahn.get(conn, schuelerID);
			DTOGostJahrgangsdaten jahrgangsdaten = null;
			if (abidaten.abiturjahr > 0) {
				jahrgangsdaten = conn.queryByKey(DTOGostJahrgangsdaten.class, abidaten.abiturjahr);
			}

			if ( (gostSchueler == null) || (abidaten.abiturjahr <= 0) || (jahrgangsdaten == null)) {
				// Zum Schüler wurden keine GOST-Daten oder Abiturdaten gefunden.
				// Gebe daher leere Daten zurück. So wird die Datenquelle auch gefüllt, wenn bei Anfragen zu mehreren Schülern die Daten von nur einem Schüler nicht existiert.
				// Alternativ wäre der vollständige Abbruch: throw OperationError.INTERNAL_SERVER_ERROR.exception("Parameter der Abfrage ungültig: Die GOSt-Daten oder Abiturdaten des Schülers mit der ID " + schuelerID.toString() + " konnten nicht ermittelt werden.");
				laufbahnplanungGrunddaten.abiturjahr = 0;
				laufbahnplanungGrunddaten.beratungsbogentext = "";
				laufbahnplanungGrunddaten.beratungshalbjahr = "";
				laufbahnplanungGrunddaten.beratungslehrkraft = "";
				laufbahnplanungGrunddaten.beratungslehrkraefte = "";
				laufbahnplanungGrunddaten.ruecklaufdatum = "";
				laufbahnplanungGrunddaten.beratungsdatum = "";
				laufbahnplanungGrunddaten.kommentar = "";
			}
			else {
				laufbahnplanungGrunddaten.abiturjahr = abidaten.abiturjahr;
				laufbahnplanungGrunddaten.beratungsbogentext = jahrgangsdaten.TextBeratungsbogen;

				if (folgeHalbjahr == 2) {
					laufbahnplanungGrunddaten.beratungshalbjahr = jahrgaenge.get(schuelerJahrgangID.get(schuelerID)).ASDJahrgang + ".2";
				}
				else if (folgeHalbjahr == 1) {
					DTOJahrgang aktuellerJahrgang = jahrgaenge.get(schuelerJahrgangID.get(schuelerID));
					if (aktuellerJahrgang.Folgejahrgang_ID != null)
						laufbahnplanungGrunddaten.beratungshalbjahr = jahrgaenge.get(aktuellerJahrgang.Folgejahrgang_ID).ASDJahrgang + ".1";
					else
						laufbahnplanungGrunddaten.beratungshalbjahr = jahrgaenge.get(schuelerJahrgangID.get(schuelerID)).ASDJahrgang + ".2";
				}
				else
					laufbahnplanungGrunddaten.beratungshalbjahr = "";

				List<DTOLehrer> beratungslehrerdaten = null;
				// Letzte Beratungslehrkraft bestimmen aus den GOSt-Daten des Schülers
				if (gostSchueler.Beratungslehrer_ID != null) {
					beratungslehrerdaten = conn.queryNamed("DTOLehrer.id", gostSchueler.Beratungslehrer_ID, DTOLehrer.class);
				}
				if (beratungslehrerdaten != null) {
					DTOLehrer lehrer = beratungslehrerdaten.get(0);
					laufbahnplanungGrunddaten.beratungslehrkraft = lehrer.Vorname + " " + lehrer.Nachname;
				}
				// Beratungslehrkräfte der Stufe bestimmen aus den Daten der Jahrgangsstufe
				List<DTOGostJahrgangBeratungslehrer> beratungslehrer = conn.queryNamed("DTOGostJahrgangBeratungslehrer.abi_jahrgang", abidaten.abiturjahr, DTOGostJahrgangBeratungslehrer.class);
				if (beratungslehrer != null) {
					beratungslehrerdaten = conn.queryNamed("DTOLehrer.id.multiple", beratungslehrer.stream().map(l -> l.Lehrer_ID).toList(), DTOLehrer.class);
				}
				if (beratungslehrerdaten != null) {
					for (DTOLehrer lehrer : beratungslehrerdaten) {
						laufbahnplanungGrunddaten.beratungslehrkraefte = laufbahnplanungGrunddaten.beratungslehrkraefte + lehrer.Vorname + " " + lehrer.Nachname + "; ";
					}
					if (laufbahnplanungGrunddaten.beratungslehrkraefte.length() >= 2)
						laufbahnplanungGrunddaten.beratungslehrkraefte = laufbahnplanungGrunddaten.beratungslehrkraefte.substring(0, laufbahnplanungGrunddaten.beratungslehrkraefte.length() - 2);
				}

				laufbahnplanungGrunddaten.ruecklaufdatum = gostSchueler.DatumRuecklauf;
				laufbahnplanungGrunddaten.beratungsdatum = gostSchueler.DatumBeratung;
				laufbahnplanungGrunddaten.kommentar = gostSchueler.Kommentar;
			}

			result.add(laufbahnplanungGrunddaten);
		}

		// Geben die Ergebnis-Liste mit den Core-DTOs zurück
        return result;
    }
}
