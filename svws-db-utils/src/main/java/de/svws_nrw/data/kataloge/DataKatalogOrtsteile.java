package de.svws_nrw.data.kataloge;

import java.io.InputStream;
import java.util.List;

import de.svws_nrw.base.CsvReader;
import de.svws_nrw.core.data.kataloge.KatalogEintragOrtsteile;
import de.svws_nrw.data.DataManager;
import de.svws_nrw.db.utils.OperationError;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

/**
 * Diese Klasse erweitert den abstrakten {@link DataManager} für den
 * Core-DTO {@link KatalogEintragOrtsteile}.
 */
public final class DataKatalogOrtsteile extends DataManager<Long> {

	/**
	 * Erstellt einen neuen {@link DataManager} für den Core-DTO {@link KatalogEintragOrtsteile}.
	 */
	public DataKatalogOrtsteile() {
		super(null);
	}

	@Override
	public Response getAll() {
		final List<KatalogEintragOrtsteile> katalog = CsvReader.fromResource("daten/csv/Ortsteile.csv", KatalogEintragOrtsteile.class);
    	if (katalog == null)
    		return OperationError.NOT_FOUND.getResponse();
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(katalog).build();
	}

	@Override
	public Response getList() {
		return this.getAll();
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
