package de.svws_nrw.db.dto.migration.schild.erzieher;

import de.svws_nrw.db.DBEntityManager;
import de.svws_nrw.db.converter.migration.MigrationBooleanPlusMinusDefaultPlusConverter;


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
import de.svws_nrw.csv.converter.migration.MigrationBooleanPlusMinusDefaultPlusConverterSerializer;
import de.svws_nrw.csv.converter.migration.MigrationBooleanPlusMinusDefaultPlusConverterDeserializer;

/**
 * Diese Klasse dient als DTO für die Datenbanktabelle SchuelerErzAdr.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "SchuelerErzAdr")
@JsonPropertyOrder({"ID", "Schueler_ID", "ErzieherArt_ID", "Anrede1", "Titel1", "Name1", "Vorname1", "Anrede2", "Titel2", "Name2", "Vorname2", "ErzStrasse", "ErzOrt_ID", "ErzStrassenname", "ErzPLZ", "ErzHausNr", "ErzOrtsteil_ID", "ErzHausNrZusatz", "ErzAnschreiben", "Sortierung", "ErzEmail", "ErzAdrZusatz", "SchulnrEigner", "Erz1StaatKrz", "Erz2StaatKrz", "ErzEmail2", "Erz1ZusatzNachname", "Erz2ZusatzNachname", "Bemerkungen", "CredentialID"})
public final class MigrationDTOSchuelerErzieherAdresse {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ID IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ID */
	public static final String QUERY_BY_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ID */
	public static final String QUERY_LIST_BY_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Schueler_ID */
	public static final String QUERY_BY_SCHUELER_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Schueler_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Schueler_ID */
	public static final String QUERY_LIST_BY_SCHUELER_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Schueler_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzieherArt_ID */
	public static final String QUERY_BY_ERZIEHERART_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzieherArt_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzieherArt_ID */
	public static final String QUERY_LIST_BY_ERZIEHERART_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzieherArt_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Anrede1 */
	public static final String QUERY_BY_ANREDE1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Anrede1 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Anrede1 */
	public static final String QUERY_LIST_BY_ANREDE1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Anrede1 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Titel1 */
	public static final String QUERY_BY_TITEL1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Titel1 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Titel1 */
	public static final String QUERY_LIST_BY_TITEL1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Titel1 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Name1 */
	public static final String QUERY_BY_NAME1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Name1 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Name1 */
	public static final String QUERY_LIST_BY_NAME1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Name1 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Vorname1 */
	public static final String QUERY_BY_VORNAME1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Vorname1 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Vorname1 */
	public static final String QUERY_LIST_BY_VORNAME1 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Vorname1 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Anrede2 */
	public static final String QUERY_BY_ANREDE2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Anrede2 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Anrede2 */
	public static final String QUERY_LIST_BY_ANREDE2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Anrede2 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Titel2 */
	public static final String QUERY_BY_TITEL2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Titel2 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Titel2 */
	public static final String QUERY_LIST_BY_TITEL2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Titel2 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Name2 */
	public static final String QUERY_BY_NAME2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Name2 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Name2 */
	public static final String QUERY_LIST_BY_NAME2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Name2 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Vorname2 */
	public static final String QUERY_BY_VORNAME2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Vorname2 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Vorname2 */
	public static final String QUERY_LIST_BY_VORNAME2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Vorname2 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzStrasse */
	public static final String QUERY_BY_ERZSTRASSE = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzStrasse = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzStrasse */
	public static final String QUERY_LIST_BY_ERZSTRASSE = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzStrasse IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzOrt_ID */
	public static final String QUERY_BY_ERZORT_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzOrt_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzOrt_ID */
	public static final String QUERY_LIST_BY_ERZORT_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzOrt_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzStrassenname */
	public static final String QUERY_BY_ERZSTRASSENNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzStrassenname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzStrassenname */
	public static final String QUERY_LIST_BY_ERZSTRASSENNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzStrassenname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzPLZ */
	public static final String QUERY_BY_ERZPLZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzPLZ = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzPLZ */
	public static final String QUERY_LIST_BY_ERZPLZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzPLZ IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzHausNr */
	public static final String QUERY_BY_ERZHAUSNR = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzHausNr = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzHausNr */
	public static final String QUERY_LIST_BY_ERZHAUSNR = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzHausNr IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzOrtsteil_ID */
	public static final String QUERY_BY_ERZORTSTEIL_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzOrtsteil_ID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzOrtsteil_ID */
	public static final String QUERY_LIST_BY_ERZORTSTEIL_ID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzOrtsteil_ID IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzHausNrZusatz */
	public static final String QUERY_BY_ERZHAUSNRZUSATZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzHausNrZusatz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzHausNrZusatz */
	public static final String QUERY_LIST_BY_ERZHAUSNRZUSATZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzHausNrZusatz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzAnschreiben */
	public static final String QUERY_BY_ERZANSCHREIBEN = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzAnschreiben = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzAnschreiben */
	public static final String QUERY_LIST_BY_ERZANSCHREIBEN = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzAnschreiben IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Sortierung */
	public static final String QUERY_BY_SORTIERUNG = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Sortierung = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Sortierung */
	public static final String QUERY_LIST_BY_SORTIERUNG = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Sortierung IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzEmail */
	public static final String QUERY_BY_ERZEMAIL = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzEmail = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzEmail */
	public static final String QUERY_LIST_BY_ERZEMAIL = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzEmail IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzAdrZusatz */
	public static final String QUERY_BY_ERZADRZUSATZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzAdrZusatz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzAdrZusatz */
	public static final String QUERY_LIST_BY_ERZADRZUSATZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzAdrZusatz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes SchulnrEigner */
	public static final String QUERY_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.SchulnrEigner = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes SchulnrEigner */
	public static final String QUERY_LIST_BY_SCHULNREIGNER = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.SchulnrEigner IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Erz1StaatKrz */
	public static final String QUERY_BY_ERZ1STAATKRZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz1StaatKrz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Erz1StaatKrz */
	public static final String QUERY_LIST_BY_ERZ1STAATKRZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz1StaatKrz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Erz2StaatKrz */
	public static final String QUERY_BY_ERZ2STAATKRZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz2StaatKrz = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Erz2StaatKrz */
	public static final String QUERY_LIST_BY_ERZ2STAATKRZ = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz2StaatKrz IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes ErzEmail2 */
	public static final String QUERY_BY_ERZEMAIL2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzEmail2 = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes ErzEmail2 */
	public static final String QUERY_LIST_BY_ERZEMAIL2 = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.ErzEmail2 IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Erz1ZusatzNachname */
	public static final String QUERY_BY_ERZ1ZUSATZNACHNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz1ZusatzNachname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Erz1ZusatzNachname */
	public static final String QUERY_LIST_BY_ERZ1ZUSATZNACHNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz1ZusatzNachname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Erz2ZusatzNachname */
	public static final String QUERY_BY_ERZ2ZUSATZNACHNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz2ZusatzNachname = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Erz2ZusatzNachname */
	public static final String QUERY_LIST_BY_ERZ2ZUSATZNACHNAME = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Erz2ZusatzNachname IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Bemerkungen */
	public static final String QUERY_BY_BEMERKUNGEN = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Bemerkungen = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Bemerkungen */
	public static final String QUERY_LIST_BY_BEMERKUNGEN = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.Bemerkungen IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes CredentialID */
	public static final String QUERY_BY_CREDENTIALID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.CredentialID = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes CredentialID */
	public static final String QUERY_LIST_BY_CREDENTIALID = "SELECT e FROM MigrationDTOSchuelerErzieherAdresse e WHERE e.CredentialID IN ?1";

	/** ID des Erzieherdatensatzes */
	@Id
	@Column(name = "ID")
	@JsonProperty
	public Long ID;

	/** SchülerID zum Erzieherdatensatz */
	@Column(name = "Schueler_ID")
	@JsonProperty
	public Long Schueler_ID;

	/** ErziherARTID zum Erzieherdatensatz */
	@Column(name = "ErzieherArt_ID")
	@JsonProperty
	public Long ErzieherArt_ID;

	/** Anrede1 zum Erzieherdatensatz */
	@Column(name = "Anrede1")
	@JsonProperty
	public String Anrede1;

	/** Titel1 zum Erzieherdatensatz */
	@Column(name = "Titel1")
	@JsonProperty
	public String Titel1;

	/** Nachname1 zum Erzieherdatensatz PAuswG vom 21.6.2019 §5 Abs. 2 */
	@Column(name = "Name1")
	@JsonProperty
	public String Name1;

	/** Vorname1 zum Erzieherdatensatz PAuswG vom 21.6.2019 §5 Abs. 2. Wird im Client mit Rufname angezeigt. */
	@Column(name = "Vorname1")
	@JsonProperty
	public String Vorname1;

	/** Anrede2 zum Erzieherdatensatz */
	@Column(name = "Anrede2")
	@JsonProperty
	public String Anrede2;

	/** Titel2 zum Erzieherdatensatz */
	@Column(name = "Titel2")
	@JsonProperty
	public String Titel2;

	/** Nachname2 zum Erzieherdatensatz PAuswG vom 21.6.2019 §5 Abs. 2 */
	@Column(name = "Name2")
	@JsonProperty
	public String Name2;

	/** Vorname2 zum Erzieherdatensatz PAuswG vom 21.6.2019 §5 Abs. 2. Wird im Client mit Rufname angezeigt. */
	@Column(name = "Vorname2")
	@JsonProperty
	public String Vorname2;

	/** Straße zum Erzieherdatensatz */
	@Column(name = "ErzStrasse")
	@JsonProperty
	public String ErzStrasse;

	/** OrtID zum Erzieherdatensatz */
	@Column(name = "ErzOrt_ID")
	@JsonProperty
	public Long ErzOrt_ID;

	/** Straßenname des Erzieherdatensatzes */
	@Column(name = "ErzStrassenname")
	@JsonProperty
	public String ErzStrassenname;

	/** DEPRECATED: PLZ zum Erzieherdatensatz */
	@Column(name = "ErzPLZ")
	@JsonProperty
	public String ErzPLZ;

	/** Hausnummer wenn getrennt gespeichert */
	@Column(name = "ErzHausNr")
	@JsonProperty
	public String ErzHausNr;

	/** OrtsteilID zum Erzieherdatensatz */
	@Column(name = "ErzOrtsteil_ID")
	@JsonProperty
	public Long ErzOrtsteil_ID;

	/** Zusatz zur Hausnummer wenn Hausnummern getrennt gespeichert werden */
	@Column(name = "ErzHausNrZusatz")
	@JsonProperty
	public String ErzHausNrZusatz;

	/** Erhältanschreiben Ja Nein zum Erzieherdatensatz */
	@Column(name = "ErzAnschreiben")
	@JsonProperty
	@Convert(converter = MigrationBooleanPlusMinusDefaultPlusConverter.class)
	@JsonSerialize(using = MigrationBooleanPlusMinusDefaultPlusConverterSerializer.class)
	@JsonDeserialize(using = MigrationBooleanPlusMinusDefaultPlusConverterDeserializer.class)
	public Boolean ErzAnschreiben;

	/** Sortierung zum Erzieherdatensatz */
	@Column(name = "Sortierung")
	@JsonProperty
	public Integer Sortierung;

	/** Email1 zum Erzieherdatensatz */
	@Column(name = "ErzEmail")
	@JsonProperty
	public String ErzEmail;

	/** Aresszusatz zum Erzieherdatensatz */
	@Column(name = "ErzAdrZusatz")
	@JsonProperty
	public String ErzAdrZusatz;

	/** Die Schulnummer zu welcher der Datensatz gehört – wird benötigt, wenn mehrere Schulen in einem Schema der Datenbank gespeichert werden */
	@Column(name = "SchulnrEigner")
	@JsonProperty
	public Integer SchulnrEigner;

	/** Staatangehörigkeit1 zum Erzieherdatensatz */
	@Column(name = "Erz1StaatKrz")
	@JsonProperty
	public String Erz1StaatKrz;

	/** Staatangehörigkeit2 zum Erzieherdatensatz */
	@Column(name = "Erz2StaatKrz")
	@JsonProperty
	public String Erz2StaatKrz;

	/** Email2 zum Erzieherdatensatz */
	@Column(name = "ErzEmail2")
	@JsonProperty
	public String ErzEmail2;

	/** Zusatznachname1 zum Erzieherdatensatz */
	@Column(name = "Erz1ZusatzNachname")
	@JsonProperty
	public String Erz1ZusatzNachname;

	/** Zusatznachname2 zum Erzieherdatensatz */
	@Column(name = "Erz2ZusatzNachname")
	@JsonProperty
	public String Erz2ZusatzNachname;

	/** Memofeld Bemerkungen zum Erzieherdatensatz */
	@Column(name = "Bemerkungen")
	@JsonProperty
	public String Bemerkungen;

	/** Die ID des Credential-Eintrags */
	@Column(name = "CredentialID")
	@JsonProperty
	public Long CredentialID;

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOSchuelerErzieherAdresse ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private MigrationDTOSchuelerErzieherAdresse() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse MigrationDTOSchuelerErzieherAdresse ohne eine Initialisierung der Attribute.
	 * @param ID   der Wert für das Attribut ID
	 * @param Schueler_ID   der Wert für das Attribut Schueler_ID
	 */
	public MigrationDTOSchuelerErzieherAdresse(final Long ID, final Long Schueler_ID) {
		if (ID == null) {
			throw new NullPointerException("ID must not be null");
		}
		this.ID = ID;
		if (Schueler_ID == null) {
			throw new NullPointerException("Schueler_ID must not be null");
		}
		this.Schueler_ID = Schueler_ID;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MigrationDTOSchuelerErzieherAdresse other = (MigrationDTOSchuelerErzieherAdresse) obj;
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
		return "MigrationDTOSchuelerErzieherAdresse(ID=" + this.ID + ", Schueler_ID=" + this.Schueler_ID + ", ErzieherArt_ID=" + this.ErzieherArt_ID + ", Anrede1=" + this.Anrede1 + ", Titel1=" + this.Titel1 + ", Name1=" + this.Name1 + ", Vorname1=" + this.Vorname1 + ", Anrede2=" + this.Anrede2 + ", Titel2=" + this.Titel2 + ", Name2=" + this.Name2 + ", Vorname2=" + this.Vorname2 + ", ErzStrasse=" + this.ErzStrasse + ", ErzOrt_ID=" + this.ErzOrt_ID + ", ErzStrassenname=" + this.ErzStrassenname + ", ErzPLZ=" + this.ErzPLZ + ", ErzHausNr=" + this.ErzHausNr + ", ErzOrtsteil_ID=" + this.ErzOrtsteil_ID + ", ErzHausNrZusatz=" + this.ErzHausNrZusatz + ", ErzAnschreiben=" + this.ErzAnschreiben + ", Sortierung=" + this.Sortierung + ", ErzEmail=" + this.ErzEmail + ", ErzAdrZusatz=" + this.ErzAdrZusatz + ", SchulnrEigner=" + this.SchulnrEigner + ", Erz1StaatKrz=" + this.Erz1StaatKrz + ", Erz2StaatKrz=" + this.Erz2StaatKrz + ", ErzEmail2=" + this.ErzEmail2 + ", Erz1ZusatzNachname=" + this.Erz1ZusatzNachname + ", Erz2ZusatzNachname=" + this.Erz2ZusatzNachname + ", Bemerkungen=" + this.Bemerkungen + ", CredentialID=" + this.CredentialID + ")";
	}

}
