import type { ApiFile, BenutzerKompetenz, GostBelegpruefungsArt, GostBelegpruefungsErgebnisse, GostJahrgangsdaten, List, Schulform, ServerMode, SimpleOperationResponse } from "@core";
import type { ApiStatus } from "~/components/ApiStatus";

export interface GostLaufbahnfehlerProps {
	schulform: Schulform;
	serverMode: ServerMode;
	benutzerKompetenzen: Set<BenutzerKompetenz>,
	benutzerKompetenzenAbiturjahrgaenge: Set<number>;
	listBelegpruefungsErgebnisse: () => List<GostBelegpruefungsErgebnisse>;
	gostBelegpruefungsArt: () => GostBelegpruefungsArt;
	setGostBelegpruefungsArt: (value: GostBelegpruefungsArt) => Promise<void>;
	gotoLaufbahnplanung: (d: number) => Promise<void>;
	gotoSprachenfolge: (d: number) => Promise<void>;
	importLaufbahnplanung: (data: FormData) => Promise<SimpleOperationResponse>;
	exportLaufbahnplanung: (schueler: List<number>) => Promise<ApiFile>;
	getPdfLaufbahnplanung: (title: string, list: List<number>, detaillevel: number, einzelpdfs: boolean) => Promise<ApiFile>;
	resetFachwahlenAlle: () => Promise<void>;
	jahrgangsdaten: () => GostJahrgangsdaten;
	apiStatus: ApiStatus;
	filterFehler: () => boolean;
	setFilterFehler: (value: boolean) => Promise<void>;
	filterExterne: () => boolean;
	setFilterExterne: (value: boolean) => Promise<void>;
}
