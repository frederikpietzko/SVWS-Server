package de.svws_nrw.db.dto.migration.schema;

import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.converter.migration.MigrationBoolean01Converter;


import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import de.svws_nrw.csv.converter.migration.MigrationBoolean01ConverterSerializer;
import de.svws_nrw.csv.converter.migration.MigrationBoolean01ConverterDeserializer;

/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Schema_Status.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Schema_Status")
@JsonPropertyOrder({"Revision", "IsTainted"})
public final class MigrationDTOSchemaStatus {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM MigrationDTOSchemaStatus e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.Revision = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.Revision IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.Revision IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Revision */
	public static final String QUERY_BY_REVISION = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.Revision = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Revision */
	public static final String QUERY_LIST_BY_REVISION = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.Revision IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes IsTainted */
	public static final String QUERY_BY_ISTAINTED = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.IsTainted = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes IsTainted */
	public static final String QUERY_LIST_BY_ISTAINTED = "SELECT e FROM MigrationDTOSchemaStatus e WHERE e.IsTainted IN ?1";

	/** Die Revision des Datenbankschemas der SVWS-DB */
	@Id
	@Column(name = "Revision")
	@JsonProperty
	public Long Revision;

	/** Gibt an, ob die Datenbank noch für einen Produktivbetrieb zugelassen ist oder durch ein Update auf eine Entwicklerversion eventuell in einem ungültigen Zustand ist */
	@Column(name = "IsTainted")
	@JsonProperty
	@Convert(converter = MigrationBoolean01Converter.class)
	@JsonSerialize(using = MigrationBoolean01ConverterSerializer.class)
	@JsonDeserialize(using = MigrationBoolean01ConverterDeserializer.class)
	public Boolean IsTainted;

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOSchemaStatus ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private MigrationDTOSchemaStatus() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOSchemaStatus ohne eine Initialisierung der Attribute.
	 * @param Revision   der Wert für das Attribut Revision
	 * @param IsTainted   der Wert für das Attribut IsTainted
	 */
	public MigrationDTOSchemaStatus(final Long Revision, final Boolean IsTainted) {
		if (Revision == null) {
			throw new NullPointerException("Revision must not be null");
		}
		this.Revision = Revision;
		if (IsTainted == null) {
			throw new NullPointerException("IsTainted must not be null");
		}
		this.IsTainted = IsTainted;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MigrationDTOSchemaStatus other = (MigrationDTOSchemaStatus) obj;
		if (Revision == null) {
			if (other.Revision != null)
				return false;
		} else if (!Revision.equals(other.Revision))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Revision == null) ? 0 : Revision.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "MigrationDTOSchemaStatus(Revision=" + this.Revision + ", IsTainted=" + this.IsTainted + ")";
	}

}
