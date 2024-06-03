package de.svws_nrw.db.dto.current.schild.katalog;

import de.svws_nrw.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Floskeln.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden,
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Floskeln")
@JsonPropertyOrder({"Kuerzel", "FloskelText", "FloskelGruppe", "FloskelFach", "FloskelNiveau", "FloskelJahrgang"})
public final class DTOFloskeln {

	/** Die Datenbankabfrage für alle DTOs */
	public static final String QUERY_ALL = "SELECT e FROM DTOFloskeln e";

	/** Die Datenbankabfrage für DTOs anhand der Primärschlüsselattribute */
	public static final String QUERY_PK = "SELECT e FROM DTOFloskeln e WHERE e.Kuerzel = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Primärschlüsselattributwerten */
	public static final String QUERY_LIST_PK = "SELECT e FROM DTOFloskeln e WHERE e.Kuerzel IN ?1";

	/** Die Datenbankabfrage für alle DTOs im Rahmen der Migration, wobei die Einträge entfernt werden, die nicht der Primärschlüssel-Constraint entsprechen */
	public static final String QUERY_MIGRATION_ALL = "SELECT e FROM DTOFloskeln e WHERE e.Kuerzel IS NOT NULL";

	/** Die Datenbankabfrage für DTOs anhand des Attributes Kuerzel */
	public static final String QUERY_BY_KUERZEL = "SELECT e FROM DTOFloskeln e WHERE e.Kuerzel = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes Kuerzel */
	public static final String QUERY_LIST_BY_KUERZEL = "SELECT e FROM DTOFloskeln e WHERE e.Kuerzel IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes FloskelText */
	public static final String QUERY_BY_FLOSKELTEXT = "SELECT e FROM DTOFloskeln e WHERE e.FloskelText = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes FloskelText */
	public static final String QUERY_LIST_BY_FLOSKELTEXT = "SELECT e FROM DTOFloskeln e WHERE e.FloskelText IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes FloskelGruppe */
	public static final String QUERY_BY_FLOSKELGRUPPE = "SELECT e FROM DTOFloskeln e WHERE e.FloskelGruppe = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes FloskelGruppe */
	public static final String QUERY_LIST_BY_FLOSKELGRUPPE = "SELECT e FROM DTOFloskeln e WHERE e.FloskelGruppe IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes FloskelFach */
	public static final String QUERY_BY_FLOSKELFACH = "SELECT e FROM DTOFloskeln e WHERE e.FloskelFach = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes FloskelFach */
	public static final String QUERY_LIST_BY_FLOSKELFACH = "SELECT e FROM DTOFloskeln e WHERE e.FloskelFach IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes FloskelNiveau */
	public static final String QUERY_BY_FLOSKELNIVEAU = "SELECT e FROM DTOFloskeln e WHERE e.FloskelNiveau = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes FloskelNiveau */
	public static final String QUERY_LIST_BY_FLOSKELNIVEAU = "SELECT e FROM DTOFloskeln e WHERE e.FloskelNiveau IN ?1";

	/** Die Datenbankabfrage für DTOs anhand des Attributes FloskelJahrgang */
	public static final String QUERY_BY_FLOSKELJAHRGANG = "SELECT e FROM DTOFloskeln e WHERE e.FloskelJahrgang = ?1";

	/** Die Datenbankabfrage für DTOs anhand einer Liste von Werten des Attributes FloskelJahrgang */
	public static final String QUERY_LIST_BY_FLOSKELJAHRGANG = "SELECT e FROM DTOFloskeln e WHERE e.FloskelJahrgang IN ?1";

	/** Kürzel für die Floskel wird beim Import automatisch vergeben */
	@Id
	@Column(name = "Kuerzel")
	@JsonProperty
	public String Kuerzel;

	/** Text der Floskel */
	@Column(name = "FloskelText")
	@JsonProperty
	public String FloskelText;

	/** Gruppe der Floskel */
	@Column(name = "FloskelGruppe")
	@JsonProperty
	public String FloskelGruppe;

	/** Fach bei Fachfloskeln */
	@Column(name = "FloskelFach")
	@JsonProperty
	public String FloskelFach;

	/** Niveau bei Fachfloskeln */
	@Column(name = "FloskelNiveau")
	@JsonProperty
	public String FloskelNiveau;

	/** Jahrgang bei Fachfloskeln */
	@Column(name = "FloskelJahrgang")
	@JsonProperty
	public String FloskelJahrgang;

	/**
	 * Erstellt ein neues Objekt der Klasse DTOFloskeln ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private DTOFloskeln() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse DTOFloskeln ohne eine Initialisierung der Attribute.
	 * @param Kuerzel   der Wert für das Attribut Kuerzel
	 * @param FloskelText   der Wert für das Attribut FloskelText
	 */
	public DTOFloskeln(final String Kuerzel, final String FloskelText) {
		if (Kuerzel == null) {
			throw new NullPointerException("Kuerzel must not be null");
		}
		this.Kuerzel = Kuerzel;
		if (FloskelText == null) {
			throw new NullPointerException("FloskelText must not be null");
		}
		this.FloskelText = FloskelText;
	}


	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DTOFloskeln other = (DTOFloskeln) obj;
		if (Kuerzel == null) {
			if (other.Kuerzel != null)
				return false;
		} else if (!Kuerzel.equals(other.Kuerzel))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Kuerzel == null) ? 0 : Kuerzel.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "DTOFloskeln(Kuerzel=" + this.Kuerzel + ", FloskelText=" + this.FloskelText + ", FloskelGruppe=" + this.FloskelGruppe + ", FloskelFach=" + this.FloskelFach + ", FloskelNiveau=" + this.FloskelNiveau + ", FloskelJahrgang=" + this.FloskelJahrgang + ")";
	}

}
