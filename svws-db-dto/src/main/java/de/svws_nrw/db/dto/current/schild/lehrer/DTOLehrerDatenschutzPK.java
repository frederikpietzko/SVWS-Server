package de.svws_nrw.db.dto.current.schild.lehrer;

import java.io.Serializable;

/**
 * Diese Klasse dient als DTO für den Primärschlüssel der Datenbanktabelle LehrerDatenschutz.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
public final class DTOLehrerDatenschutzPK implements Serializable {

	/** Die UID für diese Klasse */
	private static final long serialVersionUID = 1L;

	/** LehrerID des Datenschutzeintrags */
	public long LehrerID;

	/** DatenschutzID des Eintrags */
	public long DatenschutzID;

	/**
	 * Erstellt ein neues Objekt der Klasse DTOLehrerDatenschutzPK ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private DTOLehrerDatenschutzPK() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse DTOLehrerDatenschutzPK.
	 * @param LehrerID   der Wert für das Attribut LehrerID
	 * @param DatenschutzID   der Wert für das Attribut DatenschutzID
	 */
	public DTOLehrerDatenschutzPK(final long LehrerID, final long DatenschutzID) {
		this.LehrerID = LehrerID;
		this.DatenschutzID = DatenschutzID;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DTOLehrerDatenschutzPK other = (DTOLehrerDatenschutzPK) obj;
		if (LehrerID != other.LehrerID)
			return false;
		return DatenschutzID == other.DatenschutzID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Long.hashCode(LehrerID);

		result = prime * result + Long.hashCode(DatenschutzID);
		return result;
	}
}
