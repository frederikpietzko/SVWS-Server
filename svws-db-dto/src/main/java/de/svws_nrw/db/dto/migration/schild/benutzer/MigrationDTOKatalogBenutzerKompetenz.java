package de.svws_nrw.db.dto.migration.schild.benutzer;

import de.svws_nrw.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Kompetenzen.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Kompetenzen")
@JsonPropertyOrder({"KO_ID", "KO_Gruppe", "KO_Bezeichnung"})
public final class MigrationDTOKatalogBenutzerKompetenz {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_ID IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_ID IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes KO_ID */
	public static final String QUERY_BY_KO_ID = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes KO_ID */
	public static final String QUERY_LIST_BY_KO_ID = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes KO_Gruppe */
	public static final String QUERY_BY_KO_GRUPPE = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_Gruppe = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes KO_Gruppe */
	public static final String QUERY_LIST_BY_KO_GRUPPE = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_Gruppe IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes KO_Bezeichnung */
	public static final String QUERY_BY_KO_BEZEICHNUNG = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_Bezeichnung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes KO_Bezeichnung */
	public static final String QUERY_LIST_BY_KO_BEZEICHNUNG = "SELECT e FROM MigrationDTOKatalogBenutzerKompetenz e WHERE e.KO_Bezeichnung IN ?1";

	/** ID für die Berechtigungskompetenz */
	@Id
	@Column(name = "KO_ID")
	@JsonProperty
	public Long KO_ID;

	/** Gruppe der Berechtigungskompetenz */
	@Column(name = "KO_Gruppe")
	@JsonProperty
	public Long KO_Gruppe;

	/** Bezeichnung der Berechtigungskompetenz */
	@Column(name = "KO_Bezeichnung")
	@JsonProperty
	public String KO_Bezeichnung;

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOKatalogBenutzerKompetenz ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private MigrationDTOKatalogBenutzerKompetenz() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOKatalogBenutzerKompetenz ohne eine Initialisierung der Attribute.
	 * @param KO_ID   der Wert für das Attribut KO_ID
	 * @param KO_Gruppe   der Wert für das Attribut KO_Gruppe
	 * @param KO_Bezeichnung   der Wert für das Attribut KO_Bezeichnung
	 */
	public MigrationDTOKatalogBenutzerKompetenz(final Long KO_ID, final Long KO_Gruppe, final String KO_Bezeichnung) {
		if (KO_ID == null) {
			throw new NullPointerException("KO_ID must not be null");
		}
		this.KO_ID = KO_ID;
		if (KO_Gruppe == null) {
			throw new NullPointerException("KO_Gruppe must not be null");
		}
		this.KO_Gruppe = KO_Gruppe;
		if (KO_Bezeichnung == null) {
			throw new NullPointerException("KO_Bezeichnung must not be null");
		}
		this.KO_Bezeichnung = KO_Bezeichnung;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MigrationDTOKatalogBenutzerKompetenz other = (MigrationDTOKatalogBenutzerKompetenz) obj;
		if (KO_ID == null) {
			if (other.KO_ID != null)
				return false;
		} else if (!KO_ID.equals(other.KO_ID))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((KO_ID == null) ? 0 : KO_ID.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "MigrationDTOKatalogBenutzerKompetenz(KO_ID=" + this.KO_ID + ", KO_Gruppe=" + this.KO_Gruppe + ", KO_Bezeichnung=" + this.KO_Bezeichnung + ")";
	}

}
