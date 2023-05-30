package de.svws_nrw.data.stundenplan;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import de.svws_nrw.core.data.stundenplan.StundenplanKlasse;
import de.svws_nrw.data.DataManager;
import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.dto.current.schild.klassen.DTOKlassen;
import de.svws_nrw.db.dto.current.schild.schule.DTOJahrgang;
import de.svws_nrw.db.dto.current.schild.stundenplan.DTOStundenplan;
import de.svws_nrw.db.utils.OperationError;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

/**
 * Diese Klasse erweitert den abstrakten {@link DataManager} für den
 * Core-DTO {@link StundenplanKlasse}.
 */
public final class DataStundenplanKlassen extends DataManager<Long> {

	private final Long stundenplanID;

	/**
	 * Erstellt einen neuen {@link DataManager} für den Core-DTO {@link StundenplanKlasse}.
	 *
	 * @param conn            die Datenbank-Verbindung für den Datenbankzugriff
	 * @param stundenplanID   die ID des Stundenplans, dessen Klassen abgefragt werden
	 */
	public DataStundenplanKlassen(final DBEntityManager conn, final Long stundenplanID) {
		super(conn);
		this.stundenplanID = stundenplanID;
	}


	/**
	 * Lambda-Ausdruck zum Umwandeln eines Datenbank-DTOs {@link DTOKlassen} in einen Core-DTO {@link StundenplanKlasse}.
	 */
	private static final Function<DTOKlassen, StundenplanKlasse> dtoMapper = (final DTOKlassen k) -> {
		final StundenplanKlasse daten = new StundenplanKlasse();
		daten.id = k.ID;
		daten.kuerzel = k.Klasse;
		daten.bezeichnung = k.Bezeichnung == null ? "" : k.Bezeichnung;
		return daten;
	};


	@Override
	public Response getAll() {
		return this.getList();
	}

	/**
	 * Gibt die Klassen des Stundenplans zurück.
	 *
	 * @param conn            die Datenbankverbindung
	 * @param idStundenplan   die ID des Stundenplans
	 *
	 * @return die Liste der Klassen
	 */
	public static List<StundenplanKlasse> getKlassen(final @NotNull DBEntityManager conn, final long idStundenplan) {
		final DTOStundenplan stundenplan = conn.queryByKey(DTOStundenplan.class, idStundenplan);
		if (stundenplan == null)
			throw OperationError.NOT_FOUND.exception("Es wurde kein Stundenplan mit der ID %d gefunden.".formatted(idStundenplan));
		final List<DTOKlassen> klassen = conn.queryNamed("DTOKlassen.schuljahresabschnitts_id", stundenplan.Schuljahresabschnitts_ID, DTOKlassen.class);
		final List<Long> jahrgaengsIDs = DataStundenplanJahrgaenge.getJahrgaenge(conn, idStundenplan).stream().map(j -> j.id).toList();
		// Erstelle die Core-DTOs
		final ArrayList<StundenplanKlasse> daten = new ArrayList<>();
		for (final DTOKlassen k : klassen) {
			final StundenplanKlasse klasse = dtoMapper.apply(k);
			if (k.Jahrgang_ID == null) {
				klasse.jahrgaenge.addAll(jahrgaengsIDs);
			} else {
				klasse.jahrgaenge.add(k.Jahrgang_ID);
			}
			daten.add(klasse);
		}
		return daten;
	}


	@Override
	public Response getList() {
		final List<StundenplanKlasse> daten = getKlassen(conn, this.stundenplanID);
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}


	@Override
	public Response get(final Long id) {
		final DTOStundenplan stundenplan = conn.queryByKey(DTOStundenplan.class, stundenplanID);
		if (stundenplan == null)
			throw OperationError.NOT_FOUND.exception("Es wurde kein Stundenplan mit der ID %d gefunden.".formatted(stundenplanID));
		if (id == null)
			return OperationError.BAD_REQUEST.getResponse("Eine Anfrage zu einer Klasse mit der ID null ist unzulässig.");
		final DTOKlassen klasse = conn.queryByKey(DTOKlassen.class, id);
		if (klasse == null)
			return OperationError.NOT_FOUND.getResponse("Es wurde keine Klasse mit der ID %d gefunden.".formatted(id));
		if (klasse.Schuljahresabschnitts_ID != stundenplan.Schuljahresabschnitts_ID)
			return OperationError.BAD_REQUEST.getResponse("Der Schuljahresabschnitt %d der Klasse mit der ID %d stimmt nicht mit dem Schuljahresabschitt %d bei dem Stundenplan mit der ID %d überein.".formatted(klasse.Schuljahresabschnitts_ID, klasse.ID, stundenplan.Schuljahresabschnitts_ID, stundenplan.ID));
		// Jahrgänge bestimmen
		final List<Long> jahrgangsIDs = new ArrayList<>();
		if (klasse.Jahrgang_ID == null) {
			jahrgangsIDs.addAll(conn.queryAll(DTOJahrgang.class).stream().map(j -> j.ID).toList());
		} else {
			jahrgangsIDs.add(klasse.Jahrgang_ID);
		}
		// DTO erstellen
		final StundenplanKlasse daten = dtoMapper.apply(klasse);
		daten.jahrgaenge.addAll(jahrgangsIDs);
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}


	@Override
	public Response patch(final Long id, final InputStream is) {
		throw new UnsupportedOperationException();
	}

}
