package de.svws_nrw.db.dto.migration.schild.personengruppen;

import de.svws_nrw.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Personengruppen_Personen.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Personengruppen_Personen")
@JsonPropertyOrder({"ID", "SchulnrEigner", "Gruppe_ID", "Person_ID", "PersonNr", "PersonArt", "PersonName", "PersonVorname", "PersonPLZ", "PersonOrt", "PersonStrasse", "PersonStrassenname", "PersonHausNr", "PersonHausNrZusatz", "PersonTelefon", "PersonMobil", "PersonEmail", "Bemerkung", "Zusatzinfo", "Sortierung", "PersonAnrede", "PersonAkadGrad"})
public final class MigrationDTOPersonengruppenPersonen {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.ID IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ID */
	public static final String QUERY_BY_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ID */
	public static final String QUERY_LIST_BY_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes SchulnrEigner */
	public static final String QUERY_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.SchulnrEigner = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes SchulnrEigner */
	public static final String QUERY_LIST_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.SchulnrEigner IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Gruppe_ID */
	public static final String QUERY_BY_GRUPPE_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Gruppe_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Gruppe_ID */
	public static final String QUERY_LIST_BY_GRUPPE_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Gruppe_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Person_ID */
	public static final String QUERY_BY_PERSON_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Person_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Person_ID */
	public static final String QUERY_LIST_BY_PERSON_ID = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Person_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonNr */
	public static final String QUERY_BY_PERSONNR = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonNr = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonNr */
	public static final String QUERY_LIST_BY_PERSONNR = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonNr IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonArt */
	public static final String QUERY_BY_PERSONART = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonArt = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonArt */
	public static final String QUERY_LIST_BY_PERSONART = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonArt IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonName */
	public static final String QUERY_BY_PERSONNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonName = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonName */
	public static final String QUERY_LIST_BY_PERSONNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonName IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonVorname */
	public static final String QUERY_BY_PERSONVORNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonVorname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonVorname */
	public static final String QUERY_LIST_BY_PERSONVORNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonVorname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonPLZ */
	public static final String QUERY_BY_PERSONPLZ = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonPLZ = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonPLZ */
	public static final String QUERY_LIST_BY_PERSONPLZ = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonPLZ IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonOrt */
	public static final String QUERY_BY_PERSONORT = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonOrt = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonOrt */
	public static final String QUERY_LIST_BY_PERSONORT = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonOrt IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonStrasse */
	public static final String QUERY_BY_PERSONSTRASSE = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonStrasse = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonStrasse */
	public static final String QUERY_LIST_BY_PERSONSTRASSE = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonStrasse IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonStrassenname */
	public static final String QUERY_BY_PERSONSTRASSENNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonStrassenname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonStrassenname */
	public static final String QUERY_LIST_BY_PERSONSTRASSENNAME = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonStrassenname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonHausNr */
	public static final String QUERY_BY_PERSONHAUSNR = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonHausNr = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonHausNr */
	public static final String QUERY_LIST_BY_PERSONHAUSNR = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonHausNr IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonHausNrZusatz */
	public static final String QUERY_BY_PERSONHAUSNRZUSATZ = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonHausNrZusatz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonHausNrZusatz */
	public static final String QUERY_LIST_BY_PERSONHAUSNRZUSATZ = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonHausNrZusatz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonTelefon */
	public static final String QUERY_BY_PERSONTELEFON = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonTelefon = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonTelefon */
	public static final String QUERY_LIST_BY_PERSONTELEFON = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonTelefon IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonMobil */
	public static final String QUERY_BY_PERSONMOBIL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonMobil = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonMobil */
	public static final String QUERY_LIST_BY_PERSONMOBIL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonMobil IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonEmail */
	public static final String QUERY_BY_PERSONEMAIL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonEmail = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonEmail */
	public static final String QUERY_LIST_BY_PERSONEMAIL = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonEmail IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Bemerkung */
	public static final String QUERY_BY_BEMERKUNG = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Bemerkung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Bemerkung */
	public static final String QUERY_LIST_BY_BEMERKUNG = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Bemerkung IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Zusatzinfo */
	public static final String QUERY_BY_ZUSATZINFO = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Zusatzinfo = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Zusatzinfo */
	public static final String QUERY_LIST_BY_ZUSATZINFO = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Zusatzinfo IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Sortierung */
	public static final String QUERY_BY_SORTIERUNG = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Sortierung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Sortierung */
	public static final String QUERY_LIST_BY_SORTIERUNG = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.Sortierung IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonAnrede */
	public static final String QUERY_BY_PERSONANREDE = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonAnrede = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonAnrede */
	public static final String QUERY_LIST_BY_PERSONANREDE = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonAnrede IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes PersonAkadGrad */
	public static final String QUERY_BY_PERSONAKADGRAD = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonAkadGrad = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes PersonAkadGrad */
	public static final String QUERY_LIST_BY_PERSONAKADGRAD = "SELECT e FROM MigrationDTOPersonengruppenPersonen e WHERE e.PersonAkadGrad IN ?1";

	/** ID des Personeneintrags zur Personengruppe */
	@Id
	@Column(name = "ID")
	@JsonProperty
	public Long ID;

	/** Die Schulnummer zu welcher der Datensatz gehört – wird benötigt, wenn mehrere Schulen in einem Schema der Datenbank gespeichert werden */
	@Column(name = "SchulnrEigner")
	@JsonProperty
	public Integer SchulnrEigner;

	/** GruppenID des Personeneintrags zur Personengruppe */
	@Column(name = "Gruppe_ID")
	@JsonProperty
	public Long Gruppe_ID;

	/** PersonenID des Personeneintrags zur Personengruppe wenn in DB vorhandne */
	@Column(name = "Person_ID")
	@JsonProperty
	public Long Person_ID;

	/** Personennummer des Personeneintrags zur Personengruppe */
	@Column(name = "PersonNr")
	@JsonProperty
	public Integer PersonNr;

	/** PersonenArt des Personeneintrags zur Personengruppe */
	@Column(name = "PersonArt")
	@JsonProperty
	public String PersonArt;

	/** Name des Personeneintrags zur Personengruppe */
	@Column(name = "PersonName")
	@JsonProperty
	public String PersonName;

	/** Vorname des Personeneintrags zur Personengruppe */
	@Column(name = "PersonVorname")
	@JsonProperty
	public String PersonVorname;

	/** PLZ des Personeneintrags zur Personengruppe */
	@Column(name = "PersonPLZ")
	@JsonProperty
	public String PersonPLZ;

	/** Ort des Personeneintrags zur Personengruppe */
	@Column(name = "PersonOrt")
	@JsonProperty
	public String PersonOrt;

	/** Straße des Personeneintrags zur Personengruppe */
	@Column(name = "PersonStrasse")
	@JsonProperty
	public String PersonStrasse;

	/** Straßenname zur Person der Personengruppe */
	@Column(name = "PersonStrassenname")
	@JsonProperty
	public String PersonStrassenname;

	/** Hausnummer wenn getrennt gespeichert */
	@Column(name = "PersonHausNr")
	@JsonProperty
	public String PersonHausNr;

	/** Zusatz zur Hausnummer wenn Hausnummern getrennt gespeichert werden */
	@Column(name = "PersonHausNrZusatz")
	@JsonProperty
	public String PersonHausNrZusatz;

	/** Telfonnummer des Personeneintrags zur Personengruppe */
	@Column(name = "PersonTelefon")
	@JsonProperty
	public String PersonTelefon;

	/** Mobilnummer des Personeneintrags zur Personengruppe */
	@Column(name = "PersonMobil")
	@JsonProperty
	public String PersonMobil;

	/** Email  des Personeneintrags zur Personengruppe */
	@Column(name = "PersonEmail")
	@JsonProperty
	public String PersonEmail;

	/** Bemerkung des Personeneintrags zur Personengruppe */
	@Column(name = "Bemerkung")
	@JsonProperty
	public String Bemerkung;

	/** Zusatzinfo des Personeneintrags zur Personengruppe */
	@Column(name = "Zusatzinfo")
	@JsonProperty
	public String Zusatzinfo;

	/** Sortierung des Personeneintrags zur Personengruppe */
	@Column(name = "Sortierung")
	@JsonProperty
	public Integer Sortierung;

	/** Anrede des Personeneintrags zur Personengruppe */
	@Column(name = "PersonAnrede")
	@JsonProperty
	public String PersonAnrede;

	/** DEPRECATED: Titel des Personeneintrags zur Personengruppe */
	@Column(name = "PersonAkadGrad")
	@JsonProperty
	public String PersonAkadGrad;

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOPersonengruppenPersonen ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private MigrationDTOPersonengruppenPersonen() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOPersonengruppenPersonen ohne eine Initialisierung der Attribute.
	 * @param ID   der Wert für das Attribut ID
	 * @param SchulnrEigner   der Wert für das Attribut SchulnrEigner
	 * @param Gruppe_ID   der Wert für das Attribut Gruppe_ID
	 * @param PersonName   der Wert für das Attribut PersonName
	 */
	public MigrationDTOPersonengruppenPersonen(final Long ID, final Integer SchulnrEigner, final Long Gruppe_ID, final String PersonName) {
		if (ID == null) {
			throw new NullPointerException("ID must not be null");
		}
		this.ID = ID;
		if (SchulnrEigner == null) {
			throw new NullPointerException("SchulnrEigner must not be null");
		}
		this.SchulnrEigner = SchulnrEigner;
		if (Gruppe_ID == null) {
			throw new NullPointerException("Gruppe_ID must not be null");
		}
		this.Gruppe_ID = Gruppe_ID;
		if (PersonName == null) {
			throw new NullPointerException("PersonName must not be null");
		}
		this.PersonName = PersonName;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MigrationDTOPersonengruppenPersonen other = (MigrationDTOPersonengruppenPersonen) obj;
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
		return "MigrationDTOPersonengruppenPersonen(ID=" + this.ID + ", SchulnrEigner=" + this.SchulnrEigner + ", Gruppe_ID=" + this.Gruppe_ID + ", Person_ID=" + this.Person_ID + ", PersonNr=" + this.PersonNr + ", PersonArt=" + this.PersonArt + ", PersonName=" + this.PersonName + ", PersonVorname=" + this.PersonVorname + ", PersonPLZ=" + this.PersonPLZ + ", PersonOrt=" + this.PersonOrt + ", PersonStrasse=" + this.PersonStrasse + ", PersonStrassenname=" + this.PersonStrassenname + ", PersonHausNr=" + this.PersonHausNr + ", PersonHausNrZusatz=" + this.PersonHausNrZusatz + ", PersonTelefon=" + this.PersonTelefon + ", PersonMobil=" + this.PersonMobil + ", PersonEmail=" + this.PersonEmail + ", Bemerkung=" + this.Bemerkung + ", Zusatzinfo=" + this.Zusatzinfo + ", Sortierung=" + this.Sortierung + ", PersonAnrede=" + this.PersonAnrede + ", PersonAkadGrad=" + this.PersonAkadGrad + ")";
	}

}
