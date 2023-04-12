package de.svws_nrw.core.data.klassen;

import java.util.List;
import java.util.ArrayList;

import de.svws_nrw.core.data.schueler.Schueler;
import de.svws_nrw.core.transpiler.TranspilerDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.xml.bind.annotation.XmlRootElement;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Diese Klasse wird bei der Kommunikation über die Open-API-Schnittstelle verwendet.
 * Sie beschreibt die grundlegenden Daten einer Klasse.
 */
@XmlRootElement
@Schema(description = "Die Daten einer Klasse.")
@TranspilerDTO
public class KlassenDaten {

	/** Die ID der Klasse. */
	@Schema(description = "die ID der Klasse", example = "4711")
	public long id;

	/** Das Kürzel der Klasse. */
	@Schema(description = "das Kürzel der Klasse", example = "06b")
	public String kuerzel;

	/** Die ID des zugeordneten Jahrgangs, dem die Klasse zugeordnet ist */
	@Schema(description = "die ID des zugeordneten Jahrgangs", example = "815")
	public Long idJahrgang;

	/** Das Kürzel für die Parallelität der Klasse innerhalb des Jahrgangs (A-Z). */
	@Schema(description = "das Kürzel für die Parallelität der Klasse innerhalb des Jahrgangs (A-Z)", example = "B")
	public String parallelitaet;

	/** Die Sortierreihenfolge des Jahrgangslisten-Eintrags. */
	@Schema(description = "die Sortierreihenfolge des Jahrgangslisten-Eintrags", example = "1")
	public int sortierung;

	/** Gibt an, ob der Eintrag in der Anwendung sichtbar sein soll oder nicht. */
	@Schema(description = "gibt an, ob der Eintrag in der Anwendung sichtbar sein soll oder nicht", example = "true")
	public boolean istSichtbar;

	/** Die Liste der IDs der Klassenleitungen der Klasse. */
	@ArraySchema(schema = @Schema(implementation = Long.class))
	public @NotNull List<@NotNull Long> klassenLeitungen = new ArrayList<>();

	/** Die Schüler der Klasse. */
	public @NotNull List<@NotNull Schueler> schueler = new ArrayList<>();


	// TODO Weitere Daten
}
