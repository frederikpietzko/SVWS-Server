import type { List, SchuelerKAoADaten, SchuelerKAoAManager } from "@core";

export interface SchuelerKAoAProps {
	data: () => List<SchuelerKAoADaten>;
	patch: (data : Partial<SchuelerKAoADaten>) => Promise<void>;
	schuelerKaoaManager: () => SchuelerKAoAManager;
}
