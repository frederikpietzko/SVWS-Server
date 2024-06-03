package de.svws_nrw.db.dto.current.schild.personengruppen;

import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.converter.current.BooleanPlusMinusDefaultPlusConverter;


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
import de.svws_nrw.csv.converter.current.BooleanPlusMinusDefaultPlusConverterSerializer;
import de.svws_nrw.csv.converter.current.BooleanPlusMinusDefaultPlusConverterDeserializer;

/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Personengruppen.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Personengruppen")
@JsonPropertyOrder({"ID", "Gruppenname", "Zusatzinfo", "SammelEmail", "GruppenArt", "XMLExport", "Sortierung", "Sichtbar"})
public final class DTOPersonengruppen {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM DTOPersonengruppen e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM DTOPersonengruppen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM DTOPersonengruppen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM DTOPersonengruppen e WHERE e.ID IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ID */
	public static final String QUERY_BY_ID = "SELECT e FROM DTOPersonengruppen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ID */
	public static final String QUERY_LIST_BY_ID = "SELECT e FROM DTOPersonengruppen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Gruppenname */
	public static final String QUERY_BY_GRUPPENNAME = "SELECT e FROM DTOPersonengruppen e WHERE e.Gruppenname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Gruppenname */
	public static final String QUERY_LIST_BY_GRUPPENNAME = "SELECT e FROM DTOPersonengruppen e WHERE e.Gruppenname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Zusatzinfo */
	public static final String QUERY_BY_ZUSATZINFO = "SELECT e FROM DTOPersonengruppen e WHERE e.Zusatzinfo = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Zusatzinfo */
	public static final String QUERY_LIST_BY_ZUSATZINFO = "SELECT e FROM DTOPersonengruppen e WHERE e.Zusatzinfo IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes SammelEmail */
	public static final String QUERY_BY_SAMMELEMAIL = "SELECT e FROM DTOPersonengruppen e WHERE e.SammelEmail = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes SammelEmail */
	public static final String QUERY_LIST_BY_SAMMELEMAIL = "SELECT e FROM DTOPersonengruppen e WHERE e.SammelEmail IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes GruppenArt */
	public static final String QUERY_BY_GRUPPENART = "SELECT e FROM DTOPersonengruppen e WHERE e.GruppenArt = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes GruppenArt */
	public static final String QUERY_LIST_BY_GRUPPENART = "SELECT e FROM DTOPersonengruppen e WHERE e.GruppenArt IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes XMLExport */
	public static final String QUERY_BY_XMLEXPORT = "SELECT e FROM DTOPersonengruppen e WHERE e.XMLExport = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes XMLExport */
	public static final String QUERY_LIST_BY_XMLEXPORT = "SELECT e FROM DTOPersonengruppen e WHERE e.XMLExport IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Sortierung */
	public static final String QUERY_BY_SORTIERUNG = "SELECT e FROM DTOPersonengruppen e WHERE e.Sortierung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Sortierung */
	public static final String QUERY_LIST_BY_SORTIERUNG = "SELECT e FROM DTOPersonengruppen e WHERE e.Sortierung IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Sichtbar */
	public static final String QUERY_BY_SICHTBAR = "SELECT e FROM DTOPersonengruppen e WHERE e.Sichtbar = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Sichtbar */
	public static final String QUERY_LIST_BY_SICHTBAR = "SELECT e FROM DTOPersonengruppen e WHERE e.Sichtbar IN ?1";

	/** ID der Personengruppe */
	@Id
	@Column(name = "ID")
	@JsonProperty
	public long ID;

	/** Gruppenname der Personengruppe */
	@Column(name = "Gruppenname")
	@JsonProperty
	public String Gruppenname;

	/** Zusatzinfo der Personengruppe */
	@Column(name = "Zusatzinfo")
	@JsonProperty
	public String Zusatzinfo;

	/** Sammel-E-Mail-Adresse der Personengruppe */
	@Column(name = "SammelEmail")
	@JsonProperty
	public String SammelEmail;

	/** Gruppenart  der Personengruppe */
	@Column(name = "GruppenArt")
	@JsonProperty
	public String GruppenArt;

	/** Steuert den LogineoXML-Export */
	@Column(name = "XMLExport")
	@JsonProperty
	@Convert(converter = BooleanPlusMinusDefaultPlusConverter.class)
	@JsonSerialize(using = BooleanPlusMinusDefaultPlusConverterSerializer.class)
	@JsonDeserialize(using = BooleanPlusMinusDefaultPlusConverterDeserializer.class)
	public Boolean XMLExport;

	/** Sortierung der Personengruppe */
	@Column(name = "Sortierung")
	@JsonProperty
	public Integer Sortierung;

	/** Sichtbarkeit der Personengruppe */
	@Column(name = "Sichtbar")
	@JsonProperty
	@Convert(converter = BooleanPlusMinusDefaultPlusConverter.class)
	@JsonSerialize(using = BooleanPlusMinusDefaultPlusConverterSerializer.class)
	@JsonDeserialize(using = BooleanPlusMinusDefaultPlusConverterDeserializer.class)
	public Boolean Sichtbar;

	/**
	 * Erstellt ein neues Objekt der Klasse DTOPersonengruppen ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private DTOPersonengruppen() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse DTOPersonengruppen ohne eine Initialisierung der Attribute.
	 * @param ID   der Wert für das Attribut ID
	 * @param Gruppenname   der Wert für das Attribut Gruppenname
	 */
	public DTOPersonengruppen(final long ID, final String Gruppenname) {
		this.ID = ID;
		if (Gruppenname == null) {
			throw new NullPointerException("Gruppenname must not be null");
		}
		this.Gruppenname = Gruppenname;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DTOPersonengruppen other = (DTOPersonengruppen) obj;
		return ID == other.ID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Long.hashCode(ID);
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "DTOPersonengruppen(ID=" + this.ID + ", Gruppenname=" + this.Gruppenname + ", Zusatzinfo=" + this.Zusatzinfo + ", SammelEmail=" + this.SammelEmail + ", GruppenArt=" + this.GruppenArt + ", XMLExport=" + this.XMLExport + ", Sortierung=" + this.Sortierung + ", Sichtbar=" + this.Sichtbar + ")";
	}

}
