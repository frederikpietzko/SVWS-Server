package de.svws_nrw.data.gost;

import java.io.InputStream;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import de.svws_nrw.core.data.gost.GostBlockungListeneintrag;
import de.svws_nrw.core.types.gost.GostHalbjahr;
import de.svws_nrw.data.DataManager;
import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.dto.current.gost.kursblockung.DTOGostBlockung;
import de.svws_nrw.db.utils.OperationError;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

/**
 * Diese Klasse erweitert den abstrakten {@link DataManager} für den
 * Core-DTO {@link GostBlockungListeneintrag}.
 */
public final class DataGostBlockungsliste extends DataManager<Integer> {

  private final int abijahrgang;

	/**
	 * Erstellt einen neuen {@link DataManager} für den Core-DTO {@link GostBlockungListeneintrag}.
	 *
	 * @param conn          die Datenbank-Verbindung für den Datenbankzugriff
	 * @param abijahrgang   der Abiturjahrgang
	 */
	public DataGostBlockungsliste(final DBEntityManager conn, final Integer abijahrgang) {
		super(conn);
		if (abijahrgang == null)
			throw new NullPointerException();
		this.abijahrgang = abijahrgang;
	}


	/**
	 * Lambda-Ausdruck zum Umwandeln eines Datenbank-DTOs {@link DTOGostBlockung} in einen Core-DTO {@link GostBlockungListeneintrag}.
	 */
	private final Function<DTOGostBlockung, GostBlockungListeneintrag> dtoMapper = (final DTOGostBlockung blockung) -> {
		final GostBlockungListeneintrag daten = new GostBlockungListeneintrag();
		daten.id = blockung.ID;
		daten.name = blockung.Name;
		daten.gostHalbjahr = blockung.Halbjahr.id;
		daten.istAktiv = blockung.IstAktiv;
		return daten;
	};


	@Override
	public Response getAll() {
		GostUtils.pruefeSchuleMitGOSt(conn);
		final List<DTOGostBlockung> blockungen = conn.queryList("SELECT e FROM DTOGostBlockung e WHERE e.Abi_Jahrgang = ?1", DTOGostBlockung.class, abijahrgang);
		if (blockungen == null)
			return OperationError.NOT_FOUND.getResponse();
    	final var daten = blockungen.stream().map(dtoMapper).collect(Collectors.toList());
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}

	@Override
	public Response getList() {
		return this.getAll();
	}

	@Override
	public Response get(final Integer id) {
		if (id == null)
			return OperationError.NOT_FOUND.getResponse();
		final GostHalbjahr halbjahr = GostHalbjahr.fromID(id);
		if (halbjahr == null)
			return OperationError.NOT_FOUND.getResponse();
		GostUtils.pruefeSchuleMitGOSt(conn);
		final List<DTOGostBlockung> blockungen = conn.queryList("SELECT e FROM DTOGostBlockung e WHERE e.Abi_Jahrgang = ?1 and e.Halbjahr = ?2", DTOGostBlockung.class, abijahrgang, halbjahr);
		if (blockungen == null)
			return OperationError.NOT_FOUND.getResponse();
    	final var daten = blockungen.stream().map(dtoMapper).collect(Collectors.toList());
        return Response.status(Status.OK).type(MediaType.APPLICATION_JSON).entity(daten).build();
	}

	@Override
	public Response patch(final Integer id, final InputStream is) {
		throw new UnsupportedOperationException();
	}

}
