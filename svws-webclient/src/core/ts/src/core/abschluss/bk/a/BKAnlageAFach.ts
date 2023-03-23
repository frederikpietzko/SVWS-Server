import { JavaObject } from '../../../../java/lang/JavaObject';

export class BKAnlageAFach extends JavaObject {

	/**
	 * Das Kürzel des Faches.
	 */
	public kuerzel : string | null = null;

	/**
	 * Die Note in dem Fach.
	 */
	public note : number = -1;


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.abschluss.bk.a.BKAnlageAFach'].includes(name);
	}

}

export function cast_de_nrw_schule_svws_core_abschluss_bk_a_BKAnlageAFach(obj : unknown) : BKAnlageAFach {
	return obj as BKAnlageAFach;
}
