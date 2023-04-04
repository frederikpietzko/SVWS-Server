package de.svws_nrw.data.faecher;

import java.io.InputStream;
import java.util.function.Function;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import de.svws_nrw.core.data.fach.FachDaten;
import de.svws_nrw.data.DataManager;
import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.dto.current.schild.faecher.DTOFach;
import de.svws_nrw.db.utils.OperationError;

/**
 * Diese Klasse erweitert den abstrakten {@link DataManager} für den
 * Core-DTO {@link FachDaten}.
 */
public final class DataFachdaten extends DataManager<Long> {

	/**
	 * Erstellt einen neuen {@link DataManager} für den Core-DTO {@link FachDaten}.
	 *
	 * @param conn   die Datenbank-Verbindung für den Datenbankzugriff
	 */
	public DataFachdaten(final DBEntityManager conn) {
		super(conn);
	}

	/**
	 * Lambda-Ausdruck zum Umwandeln eines Datenbank-DTOs {@link DTOFach} in einen Core-DTO {@link FachDaten}.
	 */
	private final Function<DTOFach, FachDaten> dtoMapperFach = (final DTOFach f) -> {
		final FachDaten daten = new FachDaten();
		daten.id = f.ID;
		daten.kuerzel = f.Kuerzel;
		daten.bezeichnung = f.Bezeichnung;
		daten.kuerzelStatistik = f.StatistikFach.daten.kuerzelASD;
		return daten;
	};

	@Override
	public Response getAll() {
		throw new UnsupportedOperationException();
	}

	@Override
	public Response getList() {
		throw new UnsupportedOperationException();
	}

	@Override
	public Response get(final Long id) {
		if (id == null)
			return OperationError.NOT_FOUND.getResponse();
    	final DTOFach fach = conn.queryByKey(DTOFach.class, id);
    	if (fach == null)
    		return OperationError.NOT_FOUND.getResponse();
		final FachDaten daten = dtoMapperFach.apply(fach);
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}

	@Override
	public Response patch(final Long id, final InputStream is) {
		throw new UnsupportedOperationException();
	}

}
