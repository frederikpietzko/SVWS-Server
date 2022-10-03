package de.nrw.schule.svws.db.dto.current.schild.intern;

import de.nrw.schule.svws.db.DBEntityManager;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
/**
 * Diese Klasse dient als DTO für die Datenbanktabelle Schildintern_PruefungsOrdnung.
 * Sie wurde automatisch per Skript generiert und sollte nicht verändert werden, 
 * da sie aufgrund von Änderungen am DB-Schema ggf. neu generiert und überschrieben wird.
 */
@Entity
@IdClass(DTOInternPruefungsOrdnungPK.class)
@Cacheable(DBEntityManager.use_db_caching)
@Table(name = "Schildintern_PruefungsOrdnung")
@NamedQuery(name="DTOInternPruefungsOrdnung.all", query="SELECT e FROM DTOInternPruefungsOrdnung e")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_schulform", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Schulform = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_schulform.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Schulform IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_krz", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Krz = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_krz.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Krz IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_name", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Name = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_name.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Name IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_sgl", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_SGL = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_sgl.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_SGL IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_minjahrgang", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_MinJahrgang = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_minjahrgang.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_MinJahrgang IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_maxjahrgang", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_MaxJahrgang = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_maxjahrgang.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_MaxJahrgang IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_jahrgaenge", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Jahrgaenge = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.po_jahrgaenge.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Jahrgaenge IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.gueltigvon", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.gueltigVon = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.gueltigvon.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.gueltigVon IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.gueltigbis", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.gueltigBis = :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.gueltigbis.multiple", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.gueltigBis IN :value")
@NamedQuery(name="DTOInternPruefungsOrdnung.primaryKeyQuery", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Schulform = ?1 AND e.PO_Krz = ?2 AND e.PO_SGL = ?3")
@NamedQuery(name="DTOInternPruefungsOrdnung.all.migration", query="SELECT e FROM DTOInternPruefungsOrdnung e WHERE e.PO_Schulform IS NOT NULL AND e.PO_Krz IS NOT NULL AND e.PO_SGL IS NOT NULL")
@JsonPropertyOrder({"PO_Schulform","PO_Krz","PO_Name","PO_SGL","PO_MinJahrgang","PO_MaxJahrgang","PO_Jahrgaenge","gueltigVon","gueltigBis"})
public class DTOInternPruefungsOrdnung {

	/** Schildintern Tabelle: zulässige Schulformen der Prüfungsordnungen */
	@Id
	@Column(name = "PO_Schulform")
	@JsonProperty
	public String PO_Schulform;

	/** Schildintern Tabelle: erstes Kürzel */
	@Id
	@Column(name = "PO_Krz")
	@JsonProperty
	public String PO_Krz;

	/** Schildintern Tabelle: zweites Kürzel */
	@Column(name = "PO_Name")
	@JsonProperty
	public String PO_Name;

	/** Schildintern Tabelle: zulässige Gliederungen */
	@Id
	@Column(name = "PO_SGL")
	@JsonProperty
	public String PO_SGL;

	/** Schildintern Tabelle: DEPRECATED:  */
	@Column(name = "PO_MinJahrgang")
	@JsonProperty
	public Integer PO_MinJahrgang;

	/** Schildintern Tabelle: DEPRECATED:  */
	@Column(name = "PO_MaxJahrgang")
	@JsonProperty
	public Integer PO_MaxJahrgang;

	/** Schildintern Tabelle: zulässige Jahrgänge */
	@Column(name = "PO_Jahrgaenge")
	@JsonProperty
	public String PO_Jahrgaenge;

	/** Schildintern Tabelle: Gültig ab Schuljahr */
	@Column(name = "gueltigVon")
	@JsonProperty
	public Integer gueltigVon;

	/** Schildintern Tabelle: Gültig bis Schuljahr */
	@Column(name = "gueltigBis")
	@JsonProperty
	public Integer gueltigBis;

	/**
	 * Erstellt ein neues Objekt der Klasse DTOInternPruefungsOrdnung ohne eine Initialisierung der Attribute.
	 */
	@SuppressWarnings("unused")
	private DTOInternPruefungsOrdnung() {
	}

	/**
	 * Erstellt ein neues Objekt der Klasse DTOInternPruefungsOrdnung ohne eine Initialisierung der Attribute.
	 * @param PO_Schulform   der Wert für das Attribut PO_Schulform
	 * @param PO_Krz   der Wert für das Attribut PO_Krz
	 * @param PO_Name   der Wert für das Attribut PO_Name
	 * @param PO_SGL   der Wert für das Attribut PO_SGL
	 * @param PO_MinJahrgang   der Wert für das Attribut PO_MinJahrgang
	 * @param PO_MaxJahrgang   der Wert für das Attribut PO_MaxJahrgang
	 * @param PO_Jahrgaenge   der Wert für das Attribut PO_Jahrgaenge
	 */
	public DTOInternPruefungsOrdnung(final String PO_Schulform, final String PO_Krz, final String PO_Name, final String PO_SGL, final Integer PO_MinJahrgang, final Integer PO_MaxJahrgang, final String PO_Jahrgaenge) {
		if (PO_Schulform == null) { 
			throw new NullPointerException("PO_Schulform must not be null");
		}
		this.PO_Schulform = PO_Schulform;
		if (PO_Krz == null) { 
			throw new NullPointerException("PO_Krz must not be null");
		}
		this.PO_Krz = PO_Krz;
		if (PO_Name == null) { 
			throw new NullPointerException("PO_Name must not be null");
		}
		this.PO_Name = PO_Name;
		if (PO_SGL == null) { 
			throw new NullPointerException("PO_SGL must not be null");
		}
		this.PO_SGL = PO_SGL;
		if (PO_MinJahrgang == null) { 
			throw new NullPointerException("PO_MinJahrgang must not be null");
		}
		this.PO_MinJahrgang = PO_MinJahrgang;
		if (PO_MaxJahrgang == null) { 
			throw new NullPointerException("PO_MaxJahrgang must not be null");
		}
		this.PO_MaxJahrgang = PO_MaxJahrgang;
		if (PO_Jahrgaenge == null) { 
			throw new NullPointerException("PO_Jahrgaenge must not be null");
		}
		this.PO_Jahrgaenge = PO_Jahrgaenge;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DTOInternPruefungsOrdnung other = (DTOInternPruefungsOrdnung) obj;
		if (PO_Schulform == null) {
			if (other.PO_Schulform != null)
				return false;
		} else if (!PO_Schulform.equals(other.PO_Schulform))
			return false;

		if (PO_Krz == null) {
			if (other.PO_Krz != null)
				return false;
		} else if (!PO_Krz.equals(other.PO_Krz))
			return false;

		if (PO_SGL == null) {
			if (other.PO_SGL != null)
				return false;
		} else if (!PO_SGL.equals(other.PO_SGL))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((PO_Schulform == null) ? 0 : PO_Schulform.hashCode());

		result = prime * result + ((PO_Krz == null) ? 0 : PO_Krz.hashCode());

		result = prime * result + ((PO_SGL == null) ? 0 : PO_SGL.hashCode());
		return result;
	}


	/**
	 * Konvertiert das Objekt in einen String. Dieser kann z.B. für Debug-Ausgaben genutzt werden.
	 *
	 * @return die String-Repräsentation des Objektes
	 */
	@Override
	public String toString() {
		return "DTOInternPruefungsOrdnung(PO_Schulform=" + this.PO_Schulform + ", PO_Krz=" + this.PO_Krz + ", PO_Name=" + this.PO_Name + ", PO_SGL=" + this.PO_SGL + ", PO_MinJahrgang=" + this.PO_MinJahrgang + ", PO_MaxJahrgang=" + this.PO_MaxJahrgang + ", PO_Jahrgaenge=" + this.PO_Jahrgaenge + ", gueltigVon=" + this.gueltigVon + ", gueltigBis=" + this.gueltigBis + ")";
	}

}