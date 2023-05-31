package de.svws_nrw.core.utils.stundenplan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import de.svws_nrw.core.adt.map.HashMap2D;
import de.svws_nrw.core.data.stundenplan.Stundenplan;
import de.svws_nrw.core.data.stundenplan.StundenplanAufsichtsbereich;
import de.svws_nrw.core.data.stundenplan.StundenplanFach;
import de.svws_nrw.core.data.stundenplan.StundenplanJahrgang;
import de.svws_nrw.core.data.stundenplan.StundenplanKalenderwochenzuordnung;
import de.svws_nrw.core.data.stundenplan.StundenplanKlasse;
import de.svws_nrw.core.data.stundenplan.StundenplanKurs;
import de.svws_nrw.core.data.stundenplan.StundenplanLehrer;
import de.svws_nrw.core.data.stundenplan.StundenplanPausenaufsicht;
import de.svws_nrw.core.data.stundenplan.StundenplanPausenzeit;
import de.svws_nrw.core.data.stundenplan.StundenplanRaum;
import de.svws_nrw.core.data.stundenplan.StundenplanSchiene;
import de.svws_nrw.core.data.stundenplan.StundenplanSchueler;
import de.svws_nrw.core.data.stundenplan.StundenplanUnterricht;
import de.svws_nrw.core.data.stundenplan.StundenplanUnterrichtsverteilung;
import de.svws_nrw.core.data.stundenplan.StundenplanZeitraster;
import de.svws_nrw.core.exceptions.DeveloperNotificationException;
import de.svws_nrw.core.types.Wochentag;
import jakarta.validation.constraints.NotNull;

/**
 * Ein Manager für die Daten eines Stundenplanes. Die Daten werden aus vier DTO-Objekten aggregiert.
 *
 * @author Benjamin A. Bartsch
 */
public class StundenplanManager {

	// Referenz zu den Original-Daten.
	private final @NotNull Stundenplan _daten;
	private final @NotNull List<@NotNull StundenplanUnterricht> _datenU;
	private final @NotNull StundenplanUnterrichtsverteilung _datenUV;
	private final @NotNull List<@NotNull StundenplanPausenaufsicht> _datenP;

	// Mappings von DTO-StundenplanUnterrichtsverteilung.
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanFach> _map_fachID_zu_fach = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanKlasse> _map_klasseID_zu_klasse = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanJahrgang> _map_jahrgangID_zu_jahrgang = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanLehrer> _map_lehrerID_zu_lehrer = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanSchueler> _map_schuelerID_zu_schueler = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanKurs> _map_kursID_zu_kurs = new HashMap<>();

	// Mappings von DTO-Stundenplan
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanZeitraster> _map_zeitrasterID_zu_zeitraster = new HashMap<>();
	private final @NotNull HashMap2D<@NotNull Integer, @NotNull Integer, @NotNull StundenplanZeitraster> _map_wochentag_stunde_zu_zeitraster = new HashMap2D<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanPausenzeit> _map_pausenzeitID_zu_pausenzeit = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanRaum> _map_raumID_zu_raum = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanSchiene> _map_schieneID_zu_schiene = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanAufsichtsbereich> _map_aufsichtsbereichID_zu_aufsichtsbereich = new HashMap<>();
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanKalenderwochenzuordnung> _map_kwzID_zu_kwz = new HashMap<>();
	private final @NotNull HashMap2D<@NotNull Integer, @NotNull Integer, @NotNull StundenplanKalenderwochenzuordnung> _map_jahr_kw_zu_kwz = new HashMap2D<>();

	// Mappings von DTO-StundenplanUnterricht
	private final @NotNull HashMap<@NotNull Long, @NotNull List<@NotNull StundenplanUnterricht>> _map_kursID_zu_unterrichte = new HashMap<>();

	// Mappings von DTO-StundenplanPausenaufsicht
	private final @NotNull HashMap<@NotNull Long, @NotNull StundenplanPausenaufsicht> _map_pausenaufsichtID_zu_pausenaufsicht = new HashMap<>();

	/**
	 * Der {@link StundenplanManager} benötigt vier data-Objekte und baut damit eine Datenstruktur für schnelle Zugriffe auf.
	 *
	 * @param daten                 liefert die Grunddaten des Stundenplanes.
	 * @param unterrichte           liefert die Informationen zu allen {@link StundenplanUnterricht} im Stundenplan. Die Liste darf leer sein.
	 * @param pausenaufsichten      liefert die Informationen zu allen {@link StundenplanPausenaufsicht} im Stundenplan. Die Liste darf leer sein.
	 * @param unterrichtsverteilung liefert die Informationen zu der Unterrichtsverteilung eines Stundenplans. Darf NULL sein.
	 */
	public StundenplanManager(final @NotNull Stundenplan daten, final @NotNull List<@NotNull StundenplanUnterricht> unterrichte, final @NotNull List<@NotNull StundenplanPausenaufsicht> pausenaufsichten, final StundenplanUnterrichtsverteilung unterrichtsverteilung) {
		_daten = daten;
		_datenU = unterrichte;
		_datenP = pausenaufsichten;
		if (unterrichtsverteilung == null) {
			_datenUV = new StundenplanUnterrichtsverteilung();
			_datenUV.id = daten.id;
		} else {
			_datenUV = unterrichtsverteilung;
		}

		// Spezielle Prüfungen.
		DeveloperNotificationException.ifTrue("Stundenplan.id != StundenplanUnterrichtsverteilung.id", _daten.id != _datenUV.id);
		checkWochentypenKonsistenz();

		// Maps: DTO-StundenplanUnterrichtsverteilung.
		initMapFach();              // ✔, referenziert ---
		initMapJahrgang();          // ✔, referenziert ---
		initMapLehrer();            // ✔, referenziert [Fach]
		initMapKlasse();            // ✔, referenziert [Jahrgang], es gibt auch jahrgangsübergreifende Klassen!
		initMapSchueler();          // ✔, referenziert Klasse
		initMapSchiene();           // hat Jahrgang
		initMapKurs();              // referenziert [Schienen], [Jahrgang], [Schüler]

		// Maps: DTO-Stundenplan.
		initMapZeitraster();        // hat ---
		initMapRaum();              // hat ---
		initMapPausenzeit();        // hat ---
		initMapAufsicht();          // hat ---
		initMapKWZuordnung();       // hat ---

		// Maps: DTO-StundenplanUnterricht
		initMapKursZuUnterrichte(); // hat Zeitraster, Kurs, Fach, [Lehrer], [Klasse], [Raum], [Schiene]

		// Maps: DTO-StundenplanPausenaufsicht.
		initMapPausenaufsichten();  // hat Lehrer, Pausenzeit
	}

	private void checkWochentypenKonsistenz() {
		// Der globale Wochentyp darf nur 0 oder >= 2 sein.
		final int wochentyp = _daten.wochenTypModell;
		DeveloperNotificationException.ifTrue("_daten.wochenTypModell < 0", wochentyp < 0);
		DeveloperNotificationException.ifTrue("_daten.wochenTypModell == 1", wochentyp == 1);

		for (final @NotNull StundenplanKalenderwochenzuordnung z : _daten.kalenderwochenZuordnung) {
			// Der Wochentyp einer KW-Zuordnung muss >= 1 sein.
			DeveloperNotificationException.ifTrue("z.wochentyp <= 0", z.wochentyp <= 0);
			// Liegt die Zuordnung in einer bestimmten Woche, muss es so viele Wochen auch global geben.
			DeveloperNotificationException.ifTrue("z.wochentyp > wochentyp", z.wochentyp > wochentyp);
		}

		for (final @NotNull StundenplanUnterricht u : _datenU) {
			// Der Wochentyp eines Unterrichts muss >= 0 sein.
			DeveloperNotificationException.ifTrue("u.wochentyp < 0", u.wochentyp < 0);
			// Liegt der Unterricht in einer bestimmten Woche, muss es so viele Wochen auch global geben.
			DeveloperNotificationException.ifTrue("u.wochentyp > wochentyp", u.wochentyp > wochentyp);
		}
	}

	private void initMapFach() {
		_map_fachID_zu_fach.clear();
		for (final @NotNull StundenplanFach fach: _datenUV.faecher) {
			DeveloperNotificationException.ifInvalidID("fach.id", fach.id);
			DeveloperNotificationException.ifStringIsBlank("fach.bezeichnung", fach.bezeichnung);
			DeveloperNotificationException.ifStringIsBlank("fach.kuerzel", fach.kuerzel);
			DeveloperNotificationException.ifMapPutOverwrites(_map_fachID_zu_fach, fach.id, fach);
		}
	}

	private void initMapJahrgang() {
		_map_jahrgangID_zu_jahrgang.clear();
		for (final @NotNull StundenplanJahrgang jahrgang : _datenUV.jahrgaenge) {
			DeveloperNotificationException.ifInvalidID("jahrgang.id", jahrgang.id);
			DeveloperNotificationException.ifStringIsBlank("jahrgang.bezeichnung", jahrgang.bezeichnung);
			DeveloperNotificationException.ifStringIsBlank("jahrgang.kuerzel", jahrgang.kuerzel);
			DeveloperNotificationException.ifMapPutOverwrites(_map_jahrgangID_zu_jahrgang, jahrgang.id, jahrgang);
		}
	}

	private void initMapLehrer() {
		_map_lehrerID_zu_lehrer.clear();
		for (final @NotNull StundenplanLehrer lehrer : _datenUV.lehrer) {
			DeveloperNotificationException.ifInvalidID("lehrer.id", lehrer.id);
			DeveloperNotificationException.ifStringIsBlank("lehrer.kuerzel", lehrer.kuerzel);
			DeveloperNotificationException.ifStringIsBlank("lehrer.nachname", lehrer.nachname);
			DeveloperNotificationException.ifStringIsBlank("lehrer.vorname", lehrer.vorname);
			DeveloperNotificationException.ifMapPutOverwrites(_map_lehrerID_zu_lehrer, lehrer.id, lehrer);

			// Konsistenz der Fächer der Lehrkraft überprüfen.
			final @NotNull ArrayList<@NotNull Long> listFaecherDerLehrkraft = new ArrayList<>();
			for (final @NotNull Long idFachDerLehrkraft : lehrer.faecher) {
				DeveloperNotificationException.ifMapNotContains("_map_fachID_zu_fach", _map_fachID_zu_fach, idFachDerLehrkraft);
				DeveloperNotificationException.ifListAddsDuplicate("listFaecherDerLehrkraft", listFaecherDerLehrkraft, idFachDerLehrkraft);
			}
		}
	}

	private void initMapKlasse() {
		_map_klasseID_zu_klasse.clear();
		for (final @NotNull StundenplanKlasse klasse: _datenUV.klassen) {
			DeveloperNotificationException.ifInvalidID("klasse.id", klasse.id);
			DeveloperNotificationException.ifStringIsBlank("klasse.kuerzel", klasse.kuerzel);
			DeveloperNotificationException.ifMapPutOverwrites(_map_klasseID_zu_klasse, klasse.id, klasse);
			// klasse.bezeichnung darf "blank" sein

			// Konsistenz der Jahrgänge der Klasse überprüfen.
			final @NotNull ArrayList<@NotNull Long> listJahrgaengeDerKlasse = new ArrayList<>();
			for (final @NotNull Long idJahrgangDerKlasse : klasse.jahrgaenge) {
				DeveloperNotificationException.ifMapNotContains("_map_jahrgangID_zu_jahrgang", _map_jahrgangID_zu_jahrgang, idJahrgangDerKlasse);
				DeveloperNotificationException.ifListAddsDuplicate("listJahrgaengeDerKlasse", listJahrgaengeDerKlasse, idJahrgangDerKlasse);
			}
		}
	}

	private void initMapSchueler() {
		_map_schuelerID_zu_schueler.clear();
		for (final @NotNull StundenplanSchueler schueler : _datenUV.schueler) {
			DeveloperNotificationException.ifInvalidID("schueler.id", schueler.id);
			DeveloperNotificationException.ifStringIsBlank("schueler.nachname", schueler.nachname);
			DeveloperNotificationException.ifStringIsBlank("schueler.vorname", schueler.vorname);
			DeveloperNotificationException.ifMapNotContains("_map_klasseID_zu_klasse", _map_klasseID_zu_klasse, schueler.idKlasse);
			DeveloperNotificationException.ifMapPutOverwrites(_map_schuelerID_zu_schueler, schueler.id, schueler);
		}
	}

	private void initMapSchiene() {
		_map_schieneID_zu_schiene.clear();
		for (final @NotNull StundenplanSchiene schiene : _daten.schienen) {
			DeveloperNotificationException.ifInvalidID("schiene.id", schiene.id);
			DeveloperNotificationException.ifTrue("schiene.nummer <= 0", schiene.nummer <= 0);
			DeveloperNotificationException.ifStringIsBlank("schiene.bezeichnung", schiene.bezeichnung);
			DeveloperNotificationException.ifMapNotContains("_map_jahrgangID_zu_jahrgang", _map_jahrgangID_zu_jahrgang, schiene.idJahrgang);
			DeveloperNotificationException.ifMapPutOverwrites(_map_schieneID_zu_schiene, schiene.id, schiene);
		}
	}

	private void initMapKurs() {
		_map_kursID_zu_kurs.clear();
		for (final @NotNull StundenplanKurs kurs : _datenUV.kurse) {
			DeveloperNotificationException.ifInvalidID("kurs.id", kurs.id);
			DeveloperNotificationException.ifStringIsBlank("kurs.bezeichnung", kurs.bezeichnung);
			DeveloperNotificationException.ifMapPutOverwrites(_map_kursID_zu_kurs, kurs.id, kurs);

			// Konsistenz der Referenzen überprüfen.
			for (final @NotNull Long idSchuelerDesKurses : kurs.schueler)
				DeveloperNotificationException.ifMapNotContains("_map_schuelerID_zu_schueler", _map_schuelerID_zu_schueler, idSchuelerDesKurses);
			for (final @NotNull Long idJahrgangDesKurses : kurs.jahrgaenge)
				DeveloperNotificationException.ifMapNotContains("_map_jahrgangID_zu_jahrgang", _map_jahrgangID_zu_jahrgang, idJahrgangDesKurses);
			for (final @NotNull Long idSchieneDesKurses : kurs.schienen)
				DeveloperNotificationException.ifMapNotContains("_map_schieneID_zu_schiene", _map_schieneID_zu_schiene, idSchieneDesKurses);
		}
	}

	private void initMapZeitraster() {
		_map_zeitrasterID_zu_zeitraster.clear();
		_map_wochentag_stunde_zu_zeitraster.clear();
		for (final @NotNull StundenplanZeitraster zeit : _daten.zeitraster) {
			Wochentag.fromIDorException(zeit.wochentag);
			DeveloperNotificationException.ifInvalidID("zeit.id", zeit.id);
			DeveloperNotificationException.ifNull("zeit.stundenbeginn == null", zeit.stundenbeginn);
			DeveloperNotificationException.ifNull("zeit.stundenende == null", zeit.stundenende);
			DeveloperNotificationException.ifTrue("zeit.unterrichtstunde <= 0", zeit.unterrichtstunde <= 0);
			DeveloperNotificationException.ifMapContains("_map_zeitrasterID_zu_zeitraster", _map_zeitrasterID_zu_zeitraster, zeit.id);
			_map_zeitrasterID_zu_zeitraster.put(zeit.id, zeit);
			_map_wochentag_stunde_zu_zeitraster.put(zeit.wochentag, zeit.unterrichtstunde, zeit);
		}
	}

	private void initMapRaum() {
		_map_raumID_zu_raum.clear();
		for (final @NotNull StundenplanRaum raum : _daten.raeume) {
			DeveloperNotificationException.ifInvalidID("raum.id", raum.id);
			DeveloperNotificationException.ifTrue("raum.groesse < 0", raum.groesse < 0);
			DeveloperNotificationException.ifTrue("raum.kuerzel.isBlank()", raum.kuerzel.isBlank());
			DeveloperNotificationException.ifMapContains("_map_raumID_zu_raum", _map_raumID_zu_raum, raum.id);
			_map_raumID_zu_raum.put(raum.id, raum);
		}

	}

	private void initMapPausenzeit() {
		_map_pausenzeitID_zu_pausenzeit.clear();
		for (final @NotNull StundenplanPausenzeit pause : _daten.pausenzeiten) {
			Wochentag.fromIDorException(pause.wochentag);
			DeveloperNotificationException.ifInvalidID("pause.id", pause.id);
			DeveloperNotificationException.ifNull("pause.beginn == null", pause.beginn);
			DeveloperNotificationException.ifNull("pause.ende == null", pause.ende);
			DeveloperNotificationException.ifMapContains("_map_pausenzeitID_zu_pausenzeit", _map_pausenzeitID_zu_pausenzeit, pause.id);
			_map_pausenzeitID_zu_pausenzeit.put(pause.id, pause);
		}
	}

	private void initMapAufsicht() {
		_map_aufsichtsbereichID_zu_aufsichtsbereich.clear();
		for (final @NotNull StundenplanAufsichtsbereich aufsicht : _daten.aufsichtsbereiche) {
			DeveloperNotificationException.ifInvalidID("aufsicht.id", aufsicht.id);
			DeveloperNotificationException.ifTrue("aufsicht.kuerzel.isBlank()", aufsicht.kuerzel.isBlank());
			DeveloperNotificationException.ifMapContains("_map_aufsichtID_zu_aufsicht", _map_aufsichtsbereichID_zu_aufsichtsbereich, aufsicht.id);
			_map_aufsichtsbereichID_zu_aufsichtsbereich.put(aufsicht.id, aufsicht);
		}
	}

	private void initMapKWZuordnung() {
		_map_kwzID_zu_kwz.clear();
		_map_jahr_kw_zu_kwz.clear();
		for (final @NotNull StundenplanKalenderwochenzuordnung kwz : _daten.kalenderwochenZuordnung) {
			DeveloperNotificationException.ifInvalidID("kw.id", kwz.id);
			DeveloperNotificationException.ifTrue("(kwz.jahr < 2000) || (kwz.jahr > 3000)", (kwz.jahr < 2000) || (kwz.jahr > 3000));
			DeveloperNotificationException.ifTrue("(kwz.kw < 1) || (kwz.kw > 53)", (kwz.kw < 1) || (kwz.kw > 53));
			DeveloperNotificationException.ifTrue("kwz.wochentyp > _daten.wochenTypModell", kwz.wochentyp > _daten.wochenTypModell);
			DeveloperNotificationException.ifTrue("kwz.wochentyp == 0", kwz.wochentyp == 0);
			_map_jahr_kw_zu_kwz.put(kwz.jahr, kwz.kw, kwz);
			_map_kwzID_zu_kwz.put(kwz.id, kwz);
		}
	}

	private void initMapPausenaufsichten() {

		_map_pausenaufsichtID_zu_pausenaufsicht.clear();
		for (final @NotNull StundenplanPausenaufsicht pa : _datenP) {
			// Konsistenz der Attribute überprüfen.
			DeveloperNotificationException.ifTrue("(pa.wochentyp > 0) && (pa.wochentyp > _daten.wochenTypModell)", (pa.wochentyp > 0) && (pa.wochentyp > _daten.wochenTypModell));
			DeveloperNotificationException.ifInvalidID("aufsicht.id", pa.id);
			DeveloperNotificationException.ifInvalidID("aufsicht.id", pa.idLehrer);
			DeveloperNotificationException.ifInvalidID("aufsicht.id", pa.idPausenzeit);
			DeveloperNotificationException.ifMapNotContains("_map_lehrerID_zu_lehrer", _map_lehrerID_zu_lehrer, pa.idLehrer);
			DeveloperNotificationException.ifMapNotContains("_map_pausenzeitID_zu_pausenzeit", _map_pausenzeitID_zu_pausenzeit, pa.idPausenzeit);
			DeveloperNotificationException.ifMapContains("_map_pausenaufsichtID_zu_pausenaufsicht", _map_pausenaufsichtID_zu_pausenaufsicht, pa.id);

			// Konsistenz der Aufsichtsbereiche überprüfen.
			final @NotNull ArrayList<@NotNull Long> listAB = new ArrayList<>();
			for (final @NotNull Long aufsichtsbereichID : pa.bereiche) {
				DeveloperNotificationException.ifMapNotContains("_map_aufsichtsbereichID_zu_aufsichtsbereich", _map_aufsichtsbereichID_zu_aufsichtsbereich, aufsichtsbereichID);
				DeveloperNotificationException.ifTrue("listAB.contains(" + aufsichtsbereichID + ")", listAB.contains(aufsichtsbereichID));
				listAB.add(aufsichtsbereichID);
			}

			// Hinzufügen
			_map_pausenaufsichtID_zu_pausenaufsicht.put(pa.id, pa);
		}

	}

	private void initMapKursZuUnterrichte() {
		// TODO BAR Check alle Attribute von StundenplanUnterricht!

		_map_kursID_zu_unterrichte.clear();
		for (final @NotNull StundenplanUnterricht u : _datenU) {
			// Ignoriere, falls es kein Kurs-Unterricht ist.
			if (u.idKurs == null)
				continue;

			// Konsistenz überprüfen.
			DeveloperNotificationException.ifMapNotContains("_map_kursID_zu_kurs", _map_kursID_zu_kurs, u.idKurs);
			DeveloperNotificationException.ifMapNotContains("_map_fachID_zu_fach", _map_fachID_zu_fach, u.idFach);
			DeveloperNotificationException.ifMapNotContains("_map_zeitrasterID_zu_zeitraster", _map_zeitrasterID_zu_zeitraster, u.idZeitraster);

			// Liste des Kurses: get
			List<@NotNull StundenplanUnterricht> listU = _map_kursID_zu_unterrichte.get(u.idKurs); // Kann NULL sein!
			if (listU == null) {
				listU = new ArrayList<>();
				_map_kursID_zu_unterrichte.put(u.idKurs, listU);
			}
			DeveloperNotificationException.ifTrue("listU.contains(u)", listU.contains(u));

			// List des Kurses: add
			listU.add(u);
		}
	}

	/**
	 * Liefert die ID des Stundenplans.
	 *
	 * @return die ID des Stundenplans.
	 */
	public long getID() {
		return _daten.id;
	}

	/**
	 * Liefert die ID des Schuljahresabschnitts des Stundenplans.
	 *
	 * @return die ID des Schuljahresabschnitts des Stundenplans.
	 */
	public long getIDSchuljahresabschnitt() {
		return _daten.idSchuljahresabschnitt;
	}

	/**
	 * Liefert das Datum, ab dem der Stundenplan gültig ist.
	 *
	 * @return das Datum, ab dem der Stundenplan gültig ist.
	 */
	public @NotNull String getGueltigAb() {
		return _daten.gueltigAb;
	}

	/**
	 * Liefert das Datum, bis wann der Stundenplan gültig ist.
	 *
	 * @return das Datum, bis wann der Stundenplan gültig ist.
	 */
	public @NotNull String getGueltigBis() {
		return _daten.gueltigBis;
	}

	/**
	 * Liefert die textuelle Beschreibung des Stundenplans.
	 *
	 * @return die textuelle Beschreibung des Stundenplans.
	 */
	public @NotNull String getBezeichnungStundenplan() {
		return _daten.bezeichnungStundenplan;
	}

	/**
	 * Liefert das Modell für die Wochen des Stundenplans. <br>
	 * 0: Stundenplan gilt jede Woche. <br>
	 * 1: Kein gültiger Wert. <br>
	 * N: Stundenplan wiederholt sich alle N Wochen. <br>
	 *
	 * @return das Modell für die Wochen des Stundenplans.
	 */
	public int getWochenTypModell() {
		return _daten.wochenTypModell;
	}

	/**
	 * Liefert den zugeordneten Wochentyp, oder den Default-Wochentyp.
	 *
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return den zugeordneten Wochentyp, oder den Default-Wochentyp.
	 */
	public int getWochentypOrDefault(final int jahr, final int kalenderwoche) {
		DeveloperNotificationException.ifTrue("(jahr < 2000) || (jahr > 3000)", (jahr < 2000) || (jahr > 3000));
		DeveloperNotificationException.ifTrue("(kalenderwoche < 1) || (kalenderwoche > 53)", (kalenderwoche < 1) || (kalenderwoche > 53));
		if (_daten.wochenTypModell == 0)
			return 0;
		final StundenplanKalenderwochenzuordnung z = _map_jahr_kw_zu_kwz.getOrNull(jahr, kalenderwoche);
		if (z != null)
			return z.wochentyp;
		final int wochentyp = kalenderwoche % _daten.wochenTypModell;
		return wochentyp == 0 ? _daten.wochenTypModell : wochentyp;
	}

	/**
	 * Liefert TRUE, falls intern ein Mapping von "Jahr, Kalenderwoche" auf "Kalenderwoche" verwendet wird.
	 *
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return TRUE, falls intern ein Mapping von "Jahr, Kalenderwoche" auf "Kalenderwoche" verwendet wird.
	 */
	public boolean getWochentypUsesMapping(final int jahr, final int kalenderwoche) {
		DeveloperNotificationException.ifTrue("(jahr < 2000) || (jahr > 3000)", (jahr < 2000) || (jahr > 3000));
		DeveloperNotificationException.ifTrue("(kalenderwoche < 1) || (kalenderwoche > 53)", (kalenderwoche < 1) || (kalenderwoche > 53));
		final StundenplanKalenderwochenzuordnung z = _map_jahr_kw_zu_kwz.getOrNull(jahr, kalenderwoche);
		return (_daten.wochenTypModell >= 2) && (z != null);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} eines Kurses mit einem bestimmten Wochentyp.
	 *
	 * @param kursID    Die ID des Kurses.
	 * @param wochentyp Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 */
	public @NotNull List<@NotNull StundenplanUnterricht> getUnterrichtDesKursesByWochentyp(final long kursID, final int wochentyp) {
		// Datenkonsistenz überprüfen.
		DeveloperNotificationException.ifTrue("wochentyp > _daten.wochenTypModell", wochentyp > _daten.wochenTypModell);
		final @NotNull List<@NotNull StundenplanUnterricht> list = DeveloperNotificationException.ifNull("_map_kursID_zu_unterrichte.get(kursID)==NULL", _map_kursID_zu_unterrichte.get(kursID));

		// Daten filtern.
		final @NotNull ArrayList<@NotNull StundenplanUnterricht> result = new ArrayList<>();
		for (final StundenplanUnterricht u : list)
			if ((u.wochentyp == 0) || (u.wochentyp == wochentyp))
				result.add(u);

		return result;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 *
	 * @param kursID        Die ID des Kurses.
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 */
	public @NotNull List<@NotNull StundenplanUnterricht> getUnterrichtDesKursesByKW(final long kursID, final int jahr, final int kalenderwoche) {
		final int wochentyp = getWochentypOrDefault(jahr, kalenderwoche);
		return getUnterrichtDesKursesByWochentyp(kursID, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} einer Kursmenge mit einem bestimmten Wochentyp.
	 *
	 * @param kursIDs   Die IDs aller Kurse.
	 * @param wochentyp Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} einer Kursmenge mit einem bestimmten Wochentyp.
	 */
	public @NotNull List<@NotNull StundenplanUnterricht> getUnterrichtDerKurseByWochentyp(final @NotNull long[] kursIDs, final int wochentyp) {
		// Daten filtern.
		final @NotNull ArrayList<@NotNull StundenplanUnterricht> result = new ArrayList<>();
		for (final long kursID : kursIDs)
			result.addAll(getUnterrichtDesKursesByWochentyp(kursID, wochentyp));
		return result;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} einer Kursmenge in einer bestimmten Kalenderwoche.
	 *
	 * @param kursIDs       Die IDs aller Kurse.
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} einer Kursmenge in einer bestimmten Kalenderwoche.
	 */
	public @NotNull List<@NotNull StundenplanUnterricht> getUnterrichtDerKurseByKW(final @NotNull long[] kursIDs, final int jahr, final int kalenderwoche) {
		final int wochentyp = getWochentypOrDefault(jahr, kalenderwoche);
		return getUnterrichtDerKurseByWochentyp(kursIDs, wochentyp);
	}

	/**
	 * Liefert ein Map der Aufsichtsbereiche {@link StundenplanAufsichtsbereich} für den aktuell ausgewählten Stundenplan.
	 *
	 * @return ein Map der Aufsichtsbereiche {@link StundenplanAufsichtsbereich}
	 */
	public @NotNull Map<@NotNull Long, @NotNull StundenplanAufsichtsbereich> getMapAufsichtsbereich() {
		return _map_aufsichtsbereichID_zu_aufsichtsbereich;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanRaum}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanRaum}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanRaum> getListRaum() {
		return _daten.raeume;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenzeit}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanPausenzeit}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanPausenzeit> getListPausenzeit() {
		return _daten.pausenzeiten;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanAufsichtsbereich}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanAufsichtsbereich}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanAufsichtsbereich> getListAufsichtbereich() {
		return _daten.aufsichtsbereiche;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanKalenderwochenzuordnung> getListKalenderwochenzuordnung() {
		return _daten.kalenderwochenZuordnung;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenaufsicht}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanPausenaufsicht}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanPausenaufsicht> getListPausenaufsicht() {
		return _datenP;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanZeitraster}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanZeitraster}-Objekte.
	 */
	public @NotNull List<@NotNull StundenplanZeitraster> getListZeitraster() {
		return _daten.zeitraster;
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanRaum}-Objekt.
	 *
	 * @param raumID Die ID des angefragten-Objektes.
	 *
	 * @return das zur raumID zugehörige {@link StundenplanRaum}-Objekt.
	 */
	public @NotNull StundenplanRaum getRaum(final long raumID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_raumID_zu_raum, raumID);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanPausenzeit}-Objekt.
	 *
	 * @param pausenzeitID Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanPausenzeit}-Objekt.
	 */
	public @NotNull StundenplanPausenzeit getPausenzeit(final long pausenzeitID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_pausenzeitID_zu_pausenzeit, pausenzeitID);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanAufsichtsbereich}-Objekt.
	 *
	 * @param aufsichtsbereichID Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanAufsichtsbereich}-Objekt.
	 */
	public @NotNull StundenplanAufsichtsbereich getAufsichtsbereich(final long aufsichtsbereichID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_aufsichtsbereichID_zu_aufsichtsbereich, aufsichtsbereichID);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 *
	 * @param kwzID Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 */
	public @NotNull StundenplanKalenderwochenzuordnung getKalenderwochenzuordnung(final long kwzID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_kwzID_zu_kwz, kwzID);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanPausenaufsicht}-Objekt.
	 *
	 * @param pausenaufsichtID Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanPausenaufsicht}-Objekt.
	 */
	public @NotNull StundenplanPausenaufsicht getPausenaufsicht(final long pausenaufsichtID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_pausenaufsichtID_zu_pausenaufsicht, pausenaufsichtID);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanZeitraster}-Objekt.
	 *
	 * @param zeitrasterID Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanZeitraster}-Objekt.
	 */
	public @NotNull StundenplanZeitraster getZeitraster(final long zeitrasterID) {
		return DeveloperNotificationException.ifMapGetIsNull(_map_zeitrasterID_zu_zeitraster, zeitrasterID);
	}

	/**
	 * Liefert das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt.
	 *
	 * @param wochentag Der {@link Wochentag} des Zeitrasters.
	 * @param stunde    Die Unterrichtsstunde Zeitrasters.
	 *
	 * @return das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt.
	 */
	public @NotNull StundenplanZeitraster getZeitrasterByWochentagStunde(final @NotNull Wochentag wochentag, final int stunde) {
		return _map_wochentag_stunde_zu_zeitraster.getNonNullOrException(wochentag.id, stunde);
	}

	/**
	 * Liefert TRUE, falls zu (wochentag, stunde) ein zugehöriges {@link StundenplanZeitraster}-Objekt existiert.
	 *
	 * @param wochentag Der {@link Wochentag} des Zeitrasters.
	 * @param stunde    Die Unterrichtsstunde Zeitrasters.
	 *
	 * @return TRUE, falls zu (wochentag, stunde) ein zugehöriges {@link StundenplanZeitraster}-Objekt existiert.
	 */
	public boolean testZeitrasterByWochentagStunde(final @NotNull Wochentag wochentag, final int stunde) {
		return _map_wochentag_stunde_zu_zeitraster.contains(wochentag.id, stunde);
	}

	/**
	 * Liefert das {@link StundenplanZeitraster}-Objekt der nächsten Stunde am selben Wochentag.
	 *
	 * @param zeitraster Das aktuelle {@link StundenplanZeitraster}-Objekt.
	 *
	 * @return das {@link StundenplanZeitraster}-Objekt der nächsten Stunde am selben Wochentag.
	 */
	public @NotNull StundenplanZeitraster getZeitrasterNext(final @NotNull StundenplanZeitraster zeitraster) {
		return _map_wochentag_stunde_zu_zeitraster.getNonNullOrException(zeitraster.wochentag, zeitraster.unterrichtstunde + 1);
	}

	/**
	 * Liefert die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Intervall berührt.
	 *
	 * @param zeitrasterStart    Das {@link StundenplanZeitraster} zu dem es startet.
	 * @param minutenVerstrichen Die verstrichene Zeit seit dem Start des Zeitrasters.
	 *
	 * @return die passende Menge an {@link StundenplanZeitraster}-Objekten.
	 */
	public @NotNull List<@NotNull StundenplanZeitraster> getZeitrasterByStartVerstrichen(final @NotNull StundenplanZeitraster zeitrasterStart, final int minutenVerstrichen) {
		final @NotNull List<@NotNull StundenplanZeitraster> result = new ArrayList<>();
		// TODO BAR programmieren nachdem BACHRAN "Uhrzeit" definiert hat.
		return result;
	}

	/**
	 * Liefert die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Intervall berührt.
	 *
	 * @param wochentag DUMMY
	 * @param stundenbeginn DUMMY
	 * @param minutenVerstrichen DUMMY
	 *
	 * @return die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Intervall berührt.
	 */
	public @NotNull List<@NotNull StundenplanZeitraster> getZeitrasterByWochentagStartVerstrichen(final @NotNull Wochentag wochentag, final @NotNull String stundenbeginn, final int minutenVerstrichen) {
		final @NotNull List<@NotNull StundenplanZeitraster> result = new ArrayList<>();
		// TODO BAR programmieren nachdem BACHRAN "Uhrzeit" definiert hat.
		return result;
	}

	/**
	 * Fügt dem Stundenplan einen neuen {@link StundenplanRaum} hinzu.
	 *
	 * @param raum Der Raum, der hinzugefügt werden soll.
	 */
	public void addRaum(final @NotNull StundenplanRaum raum) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_raumID_zu_raum, raum.id, raum);
		_daten.raeume.add(raum); // TODO BAR Sortiere _daten.raeume
	}

	/**
	 * Fügt dem Stundenplan eine neue {@link StundenplanPausenzeit} hinzu.
	 *
	 * @param pausenzeit Die Pausenzeit, die hinzugefügt werden soll.
	 */
	public void addPausenzeit(final @NotNull StundenplanPausenzeit pausenzeit) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_pausenzeitID_zu_pausenzeit, pausenzeit.id, pausenzeit);
		_daten.pausenzeiten.add(pausenzeit); // TODO BAR Sortiere _daten.pausenzeiten
	}

	/**
	 * Fügt dem Stundenplan einen neuen {@link StundenplanAufsichtsbereich} hinzu.
	 *
	 * @param aufsichtsbereich Der Aufsichtsbereich, der hinzugefügt werden soll.
	 */
	public void addAufsichtsbereich(final @NotNull StundenplanAufsichtsbereich aufsichtsbereich) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_aufsichtsbereichID_zu_aufsichtsbereich, aufsichtsbereich.id, aufsichtsbereich);
		_daten.aufsichtsbereiche.add(aufsichtsbereich); // TODO BAR Sortiere _daten.aufsichtsbereiche
	}

	/**
	 * Fügt dem Stundenplan eine neue {@link StundenplanKalenderwochenzuordnung} hinzu.
	 *
	 * @param kwz Die Kalenderwochenzuordnung, die hinzugefügt werden soll.
	 */
	public void addKalenderwochenzuordnung(final @NotNull StundenplanKalenderwochenzuordnung kwz) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_kwzID_zu_kwz, kwz.id, kwz);
		_daten.kalenderwochenZuordnung.add(kwz); // TODO BAR Sortiere _daten.kalenderwochenZuordnung
	}

	/**
	 * Fügt dem Stundenplan eine neue {@link StundenplanPausenaufsicht} hinzu.
	 *
	 * @param pausenaufsicht Die StundenplanPausenaufsicht, die hinzugefügt werden soll.
	 */
	public void addPausenaufsicht(final @NotNull StundenplanPausenaufsicht pausenaufsicht) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_pausenaufsichtID_zu_pausenaufsicht, pausenaufsicht.id, pausenaufsicht);
		_datenP.add(pausenaufsicht); // TODO BAR Sortiere _daten.kalenderwochenZuordnung
	}

	/**
	 * Fügt dem Stundenplan eine neues {@link StundenplanZeitraster} hinzu.
	 *
	 * @param zeitraster Das StundenplanZeitraster, das hinzugefügt werden soll.
	 */
	public void addZeitraster(final @NotNull StundenplanZeitraster zeitraster) {
		DeveloperNotificationException.ifMapPutOverwrites(_map_zeitrasterID_zu_zeitraster, zeitraster.id, zeitraster);
		_daten.zeitraster.add(zeitraster); // TODO BAR Sortiere _daten.zeitraster
	}

	/**
	 * Entfernt aus dem Stundenplan einen existierenden {@link StundenplanRaum}-Objekt.
	 *
	 * @param raumID Die ID des {@link StundenplanRaum}-Objekts.
	 */
	public void removeRaum(final long raumID) {
		final @NotNull StundenplanRaum raum = DeveloperNotificationException.ifNull("_map_raumID_zu_raum.get(" + raumID + ")", _map_raumID_zu_raum.get(raumID));
		_map_raumID_zu_raum.remove(raumID);
		_daten.raeume.remove(raum);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanPausenzeit}-Objekt.
	 *
	 * @param pausenzeitID Die ID des {@link StundenplanPausenzeit}-Objekts.
	 */
	public void removePausenzeit(final long pausenzeitID) {
		final @NotNull StundenplanPausenzeit pausenzeit = DeveloperNotificationException.ifNull("_map_pausenzeitID_zu_pausenzeit.get(" + pausenzeitID + ")", _map_pausenzeitID_zu_pausenzeit.get(pausenzeitID));
		_map_pausenzeitID_zu_pausenzeit.remove(pausenzeitID);
		_daten.pausenzeiten.remove(pausenzeit);
	}

	/**
	 * Entfernt aus dem Stundenplan einen existierendes {@link StundenplanAufsichtsbereich}-Objekt.
	 *
	 * @param aufsichtsbereichID Die ID des {@link StundenplanAufsichtsbereich}-Objekts.
	 */
	public void removeAufsichtsbereich(final long aufsichtsbereichID) {
		final @NotNull StundenplanAufsichtsbereich aufsichtsbereich = DeveloperNotificationException.ifNull("_map_aufsichtID_zu_aufsicht.get(" + aufsichtsbereichID + ")", _map_aufsichtsbereichID_zu_aufsichtsbereich.get(aufsichtsbereichID));
		_map_aufsichtsbereichID_zu_aufsichtsbereich.remove(aufsichtsbereichID);
		_daten.aufsichtsbereiche.remove(aufsichtsbereich);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 *
	 * @param kwzID Die ID des {@link StundenplanKalenderwochenzuordnung}-Objekts.
	 */
	public void removeKalenderwochenzuordnung(final long kwzID) {
		final @NotNull StundenplanKalenderwochenzuordnung kwz = DeveloperNotificationException.ifNull("_map_kwzID_zu_kwz.get(" + kwzID + ")", _map_kwzID_zu_kwz.get(kwzID));
		_map_kwzID_zu_kwz.remove(kwzID);
		_daten.kalenderwochenZuordnung.remove(kwz);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanPausenaufsicht}-Objekt.
	 *
	 * @param pausenaufsichtID Die ID des {@link StundenplanPausenaufsicht}-Objekts.
	 */
	public void removePausenaufsicht(final long pausenaufsichtID) {
		final @NotNull StundenplanPausenaufsicht pa = DeveloperNotificationException.ifNull("_map_pausenaufsichtID_zu_pausenaufsicht.get(" + pausenaufsichtID + ")", _map_pausenaufsichtID_zu_pausenaufsicht.get(pausenaufsichtID));
		_map_pausenaufsichtID_zu_pausenaufsicht.remove(pausenaufsichtID);
		_datenP.remove(pa);
	}

	/**
	 * Entfernt aus dem Stundenplan ein existierendes {@link StundenplanZeitraster}-Objekt.
	 *
	 * @param zeitrasterID Die ID des {@link StundenplanZeitraster}-Objekts.
	 */
	public void removeZeitraster(final long zeitrasterID) {
		final @NotNull StundenplanZeitraster zr = DeveloperNotificationException.ifNull("_map_zeitrasterID_zu_zeitraster.get(" + zeitrasterID + ")", _map_zeitrasterID_zu_zeitraster.get(zeitrasterID));
		_map_zeitrasterID_zu_zeitraster.remove(zeitrasterID);
		_daten.zeitraster.remove(zr);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanRaum}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param raum Das neue {@link StundenplanRaum}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchRaum(final @NotNull StundenplanRaum raum) {
		removeRaum(raum.id);
		addRaum(raum);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanPausenzeit}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param pausenzeit Das neue {@link StundenplanPausenzeit}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchPausenzeit(final @NotNull StundenplanPausenzeit pausenzeit) {
		removePausenzeit(pausenzeit.id);
		addPausenzeit(pausenzeit);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanAufsichtsbereich}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param aufsichtsbereich Das neue {@link StundenplanAufsichtsbereich}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchAufsichtsbereich(final @NotNull StundenplanAufsichtsbereich aufsichtsbereich) {
		removeAufsichtsbereich(aufsichtsbereich.id);
		addAufsichtsbereich(aufsichtsbereich);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanKalenderwochenzuordnung}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param kwz Das neue {@link StundenplanKalenderwochenzuordnung}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchKalenderwochenzuordnung(final @NotNull StundenplanKalenderwochenzuordnung kwz) {
		removeKalenderwochenzuordnung(kwz.id);
		addKalenderwochenzuordnung(kwz);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanPausenaufsicht}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param pausenaufsicht Das neue {@link StundenplanPausenaufsicht}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchPausenaufsicht(final @NotNull StundenplanPausenaufsicht pausenaufsicht) {
		removePausenaufsicht(pausenaufsicht.id);
		addPausenaufsicht(pausenaufsicht);
	}

	/**
	 * Entfernt anhand der ID das alte {@link StundenplanZeitraster}-Objekt und fügt dann das neue Objekt hinzu.
	 *
	 * @param zeitraster Das neue {@link StundenplanZeitraster}-Objekt, welches das alte Objekt ersetzt.
	 */
	public void patchZeitraster(final @NotNull StundenplanZeitraster zeitraster) {
		removeZeitraster(zeitraster.id);
		addZeitraster(zeitraster);
	}

}
