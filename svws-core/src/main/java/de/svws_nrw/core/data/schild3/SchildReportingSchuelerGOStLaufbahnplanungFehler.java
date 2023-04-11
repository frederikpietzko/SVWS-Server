package de.svws_nrw.core.data.schild3;

import de.svws_nrw.base.annotations.SchildReportingMemo;
import de.svws_nrw.core.transpiler.TranspilerDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.xml.bind.annotation.XmlRootElement;

/**
 * Die Klasse enthält den Core-DTO für die Schild-Reporting-Datenquelle SchuelerGOStLaufbahnplanungFehler.
 */
@XmlRootElement
@Schema(description = "Datenquelle SchuelerGOStLaufbahnplanungFehler")
@TranspilerDTO
public class SchildReportingSchuelerGOStLaufbahnplanungFehler {

    /** Die ID des Schülers, zu dem die Laufbahnplanungsdaten gehören. */
    @Schema(description = "die ID des Schülers, zu dem die Laufbahnplanungsdaten gehören", example = "4711")
    public long schuelerID;

	/** Fehler aus der Belegprüfung */
	@SchildReportingMemo
	@Schema(description = "Fehler aus der Belegprüfung", example = "Eine Naturwissenschaft muss durchgängig belegt werden.")
	public @NotNull String belegungsfehler = "";
}
