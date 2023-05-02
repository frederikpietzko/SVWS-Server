package de.svws_nrw.data.erzieher;

import java.io.InputStream;
import java.util.List;
import java.util.function.Function;

import de.svws_nrw.core.data.erzieher.Erzieherart;
import de.svws_nrw.data.DataManager;
import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.dto.current.schild.erzieher.DTOErzieherart;
import de.svws_nrw.db.utils.OperationError;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

/**
 * Diese Klasse erweitert den abstrakten {@link DataManager} für den
 * Core-DTO {@link Erzieherart}.
 */
public final class DataErzieherarten extends DataManager<Long> {

	/**
	 * Erstellt einen neuen {@link DataManager} für den Core-DTO {@link Erzieherart}.
	 *
	 * @param conn   die Datenbank-Verbindung für den Datenbankzugriff
	 */
	public DataErzieherarten(final DBEntityManager conn) {
		super(conn);
	}

	/**
	 * Lambda-Ausdruck zum Umwandeln eines Datenbank-DTOs {@link DTOErzieherart} in einen Core-DTO {@link Erzieherart}.
	 */
	private final Function<DTOErzieherart, Erzieherart> dtoMapper = (final DTOErzieherart e) -> {
		final Erzieherart eintrag = new Erzieherart();
		eintrag.id = e.ID;
        eintrag.bezeichnung = e.Bezeichnung;
    	return eintrag;
	};

	@Override
	public Response getAll() {
    	final List<DTOErzieherart> erzieherarten = conn.queryAll(DTOErzieherart.class);
    	if (erzieherarten == null)
    		return OperationError.NOT_FOUND.getResponse();
    	final List<Erzieherart> daten = erzieherarten.stream().map(dtoMapper).toList();
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}

	@Override
	public Response getList() {
    	final List<DTOErzieherart> erzieherarten = conn.queryAll(DTOErzieherart.class);
    	if (erzieherarten == null)
    		return OperationError.NOT_FOUND.getResponse();
    	final List<Erzieherart> daten = erzieherarten.stream().filter(e -> (e.Sichtbar != null) ? e.Sichtbar : true).map(dtoMapper).toList();
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}

	@Override
	public Response get(final Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Response patch(final Long id, final InputStream is) {
		throw new UnsupportedOperationException();
	}

}
