import type { SchuleStammdaten, SchuelerLernabschnittsdaten, SchuelerLernabschnittManager } from "@core";

export interface SchuelerLernabschnittNachpruefungProps {
	schule: SchuleStammdaten;
	manager: () => SchuelerLernabschnittManager;
	patch: (data : Partial<SchuelerLernabschnittsdaten>) => Promise<void>;
}