package de.svws_nrw.db.dto.migration.schild;

import de.svws_nrw.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle ZuordnungReportvorlagen.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "ZuordnungReportvorlagen")
@JsonPropertyOrder({"ID", "SchulnrEigner", "Jahrgang_ID", "Abschluss", "AbschlussBB", "AbschlussArt", "VersetzungKrz", "Fachklasse_ID", "Reportvorlage", "Beschreibung", "Gruppe", "Zeugnisart"})
public final class MigrationDTOZuordnungReportvorlagen {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.ID IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ID */
	public static final String QUERY_BY_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ID */
	public static final String QUERY_LIST_BY_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes SchulnrEigner */
	public static final String QUERY_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.SchulnrEigner = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes SchulnrEigner */
	public static final String QUERY_LIST_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.SchulnrEigner IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Jahrgang_ID */
	public static final String QUERY_BY_JAHRGANG_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Jahrgang_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Jahrgang_ID */
	public static final String QUERY_LIST_BY_JAHRGANG_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Jahrgang_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Abschluss */
	public static final String QUERY_BY_ABSCHLUSS = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Abschluss = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Abschluss */
	public static final String QUERY_LIST_BY_ABSCHLUSS = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Abschluss IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes AbschlussBB */
	public static final String QUERY_BY_ABSCHLUSSBB = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.AbschlussBB = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes AbschlussBB */
	public static final String QUERY_LIST_BY_ABSCHLUSSBB = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.AbschlussBB IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes AbschlussArt */
	public static final String QUERY_BY_ABSCHLUSSART = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.AbschlussArt = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes AbschlussArt */
	public static final String QUERY_LIST_BY_ABSCHLUSSART = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.AbschlussArt IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes VersetzungKrz */
	public static final String QUERY_BY_VERSETZUNGKRZ = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.VersetzungKrz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes VersetzungKrz */
	public static final String QUERY_LIST_BY_VERSETZUNGKRZ = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.VersetzungKrz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Fachklasse_ID */
	public static final String QUERY_BY_FACHKLASSE_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Fachklasse_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Fachklasse_ID */
	public static final String QUERY_LIST_BY_FACHKLASSE_ID = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Fachklasse_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Reportvorlage */
	public static final String QUERY_BY_REPORTVORLAGE = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Reportvorlage = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Reportvorlage */
	public static final String QUERY_LIST_BY_REPORTVORLAGE = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Reportvorlage IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Beschreibung */
	public static final String QUERY_BY_BESCHREIBUNG = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Beschreibung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Beschreibung */
	public static final String QUERY_LIST_BY_BESCHREIBUNG = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Beschreibung IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Gruppe */
	public static final String QUERY_BY_GRUPPE = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Gruppe = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Gruppe */
	public static final String QUERY_LIST_BY_GRUPPE = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Gruppe IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Zeugnisart */
	public static final String QUERY_BY_ZEUGNISART = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Zeugnisart = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Zeugnisart */
	public static final String QUERY_LIST_BY_ZEUGNISART = "SELECT e FROM MigrationDTOZuordnungReportvorlagen e WHERE e.Zeugnisart IN ?1";

	/** ID des Datensatzes der einen Zeugnisreport einer Gruppe oder Klasse zuordnet */
	@Id
	@Column(name = "ID")
	@JsonProperty
	public Long ID;

	/** Die Schulnummer zu welcher der Datensatz gehört – wird benötigt, wenn mehrere Schulen in einem Schema der Datenbank gespeichert werden */
	@Column(name = "SchulnrEigner")
	@JsonProperty
	public Integer SchulnrEigner;

	/** ID des Jahrgangs der zum Report zugeordnet wird */
	@Column(name = "Jahrgang_ID")
	@JsonProperty
	public Long Jahrgang_ID;

	/** Bezeichnung des Abschluss der für den Report zugeordnet wird */
	@Column(name = "Abschluss")
	@JsonProperty
	public String Abschluss;

	/** Bezeichnung des berufsbezogenen Abschluss der für den Report zugeordnet wird */
	@Column(name = "AbschlussBB")
	@JsonProperty
	public String AbschlussBB;

	/** Art des Abschluss der für den Report zugeordnet wird */
	@Column(name = "AbschlussArt")
	@JsonProperty
	public Integer AbschlussArt;

	/** Kürzel des Versetzungsvermerk das für den Report zugeordnet wird */
	@Column(name = "VersetzungKrz")
	@JsonProperty
	public String VersetzungKrz;

	/** ID der Fachklasse die für den Report zugeordnet wird */
	@Column(name = "Fachklasse_ID")
	@JsonProperty
	public Long Fachklasse_ID;

	/** Pfad zur Reportvorlage die für das Zeugnis zugeordnet wird */
	@Column(name = "Reportvorlage")
	@JsonProperty
	public String Reportvorlage;

	/** Beschreibung für die Reportzuordnung zum Zeugnisdruck */
	@Column(name = "Beschreibung")
	@JsonProperty
	public String Beschreibung;

	/** Name der Gruppe die für den Report zugeordnet wird */
	@Column(name = "Gruppe")
	@JsonProperty
	public String Gruppe;

	/** Zeugnisart (Laufbahndaten) die für den Report zugeordnet wird */
	@Column(name = "Zeugnisart")
	@JsonProperty
	public String Zeugnisart;

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOZuordnungReportvorlagen ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private MigrationDTOZuordnungReportvorlagen() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOZuordnungReportvorlagen ohne eine Initialisierung der Attribute.
	 * @param ID   der Wert für das Attribut ID
	 * @param SchulnrEigner   der Wert für das Attribut SchulnrEigner
	 */
	public MigrationDTOZuordnungReportvorlagen(final Long ID, final Integer SchulnrEigner) {
		if (ID == null) {
			throw new NullPointerException("ID must not be null");
		}
		this.ID = ID;
		if (SchulnrEigner == null) {
			throw new NullPointerException("SchulnrEigner must not be null");
		}
		this.SchulnrEigner = SchulnrEigner;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MigrationDTOZuordnungReportvorlagen other = (MigrationDTOZuordnungReportvorlagen) obj;
		if (ID == null) {
			if (other.ID != null)
				return false;
		} else if (!ID.equals(other.ID))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ID == null) ? 0 : ID.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "MigrationDTOZuordnungReportvorlagen(ID=" + this.ID + ", SchulnrEigner=" + this.SchulnrEigner + ", Jahrgang_ID=" + this.Jahrgang_ID + ", Abschluss=" + this.Abschluss + ", AbschlussBB=" + this.AbschlussBB + ", AbschlussArt=" + this.AbschlussArt + ", VersetzungKrz=" + this.VersetzungKrz + ", Fachklasse_ID=" + this.Fachklasse_ID + ", Reportvorlage=" + this.Reportvorlage + ", Beschreibung=" + this.Beschreibung + ", Gruppe=" + this.Gruppe + ", Zeugnisart=" + this.Zeugnisart + ")";
	}

}
