package de.svws_nrw.db.dto.current.schule;

import de.svws_nrw.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Nationalitaeten_Keys.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Nationalitaeten_Keys")
@JsonPropertyOrder({"DEStatisCode"})
public final class DTONationalitaetenKeys {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM DTONationalitaetenKeys e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM DTONationalitaetenKeys e WHERE e.DEStatisCode = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM DTONationalitaetenKeys e WHERE e.DEStatisCode IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM DTONationalitaetenKeys e WHERE e.DEStatisCode IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes DEStatisCode */
	public static final String QUERY_BY_DESTATISCODE = "SELECT e FROM DTONationalitaetenKeys e WHERE e.DEStatisCode = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes DEStatisCode */
	public static final String QUERY_LIST_BY_DESTATISCODE = "SELECT e FROM DTONationalitaetenKeys e WHERE e.DEStatisCode IN ?1";

	/** Der dreistellige Länder-Code des statistischen Bundesamtes (DESTATIS) */
	@Id
	@Column(name = "DEStatisCode")
	@JsonProperty
	public String DEStatisCode;

	/**
	 * Erstellt ein neues Objekt der Klasse DTONationalitaetenKeys ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private DTONationalitaetenKeys() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse DTONationalitaetenKeys ohne eine Initialisierung der Attribute.
	 * @param DEStatisCode   der Wert für das Attribut DEStatisCode
	 */
	public DTONationalitaetenKeys(final String DEStatisCode) {
		if (DEStatisCode == null) {
			throw new NullPointerException("DEStatisCode must not be null");
		}
		this.DEStatisCode = DEStatisCode;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DTONationalitaetenKeys other = (DTONationalitaetenKeys) obj;
		if (DEStatisCode == null) {
			if (other.DEStatisCode != null)
				return false;
		} else if (!DEStatisCode.equals(other.DEStatisCode))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((DEStatisCode == null) ? 0 : DEStatisCode.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "DTONationalitaetenKeys(DEStatisCode=" + this.DEStatisCode + ")";
	}

}
