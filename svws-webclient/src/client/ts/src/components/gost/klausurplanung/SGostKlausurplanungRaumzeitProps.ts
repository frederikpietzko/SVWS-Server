
import type {
	GostFaecherManager,
	GostJahrgangsdaten,
	GostKlausurenCollectionSkrsKrs,
	GostKlausurraum,
	GostKlausurraumManager,
	GostKlausurtermin,
	GostKursklausur,
	GostKursklausurManager,
	GostSchuelerklausur,
	KursManager,
	LehrerListeEintrag,
	List,
	StundenplanManager,
} from "@core";
import type { WritableComputedRef } from "vue";

export interface GostKlausurplanungRaumzeitProps {
	jahrgangsdaten: GostJahrgangsdaten;
	kursklausurmanager: () => GostKursklausurManager;
	faecherManager: GostFaecherManager;
	mapLehrer: Map<number, LehrerListeEintrag>;
	kursmanager: KursManager;
	stundenplanmanager: StundenplanManager;
	erzeugeKlausurraum: (raum: GostKlausurraum) => Promise<GostKlausurraum>;
	loescheKlausurraum: (id: number, manager: GostKlausurraumManager) => Promise<boolean>;
	patchKlausurraum: (id: number, raum: Partial<GostKlausurraum>, manager: GostKlausurraumManager) => Promise<boolean>;
	erzeugeKlausurraummanager: (termin: GostKlausurtermin) => Promise<GostKlausurraumManager>;
	setzeRaumZuSchuelerklausuren: (raum: GostKlausurraum, sks: List<GostSchuelerklausur>, manager: GostKlausurraumManager) => Promise<GostKlausurenCollectionSkrsKrs>;
	patchKursklausur: (id: number, klausur: Partial<GostKursklausur>) => Promise<boolean>;
	quartalsauswahl: WritableComputedRef<0 | 1 | 2>;
}