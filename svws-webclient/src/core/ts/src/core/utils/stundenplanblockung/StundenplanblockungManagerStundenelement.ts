import { JavaObject } from '../../../java/lang/JavaObject';
import { StundenplanblockungManagerLerngruppe } from '../../../core/utils/stundenplanblockung/StundenplanblockungManagerLerngruppe';
import { Vector } from '../../../java/util/Vector';

export class StundenplanblockungManagerStundenelement extends JavaObject {

	/**
	 * Die Datenbank-ID des Stundenelementes.
	 */
	private readonly _id : number;

	/**
	 * Das Kürzel der Kopplung. Beispielsweise '7RE'.
	 */
	private _kuerzel : string = "";

	/**
	 * Alle Lerngruppen der Kopplungen.
	 */
	private readonly _lerngruppen : Vector<StundenplanblockungManagerLerngruppe | null> = new Vector();


	/**
	 * Erzeugt eine neue Kopplung.
	 *
	 * @param pKopplungID  Die Datenbank-ID der Kopplung.
	 * @param pKuerzel     Das Kürzel der Kopplung.
	 */
	public constructor(pKopplungID : number, pKuerzel : string) {
		super();
		this._id = pKopplungID;
		this._kuerzel = pKuerzel;
	}

	/**
	 * Liefert die Datenbank-ID der Kopplung.
	 *
	 * @return Die Datenbank-ID der Kopplung.
	 */
	public getID() : number {
		return this._id;
	}

	/**
	 * Setzt das Kürzel der Kopplung.
	 *
	 * @param pKuerzel  Das neue Kürzel der Kopplung.
	 */
	public setKuerzel(pKuerzel : string) : void {
		this._kuerzel = pKuerzel;
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.utils.stundenplanblockung.StundenplanblockungManagerStundenelement'].includes(name);
	}

}

export function cast_de_svws_nrw_core_utils_stundenplanblockung_StundenplanblockungManagerStundenelement(obj : unknown) : StundenplanblockungManagerStundenelement {
	return obj as StundenplanblockungManagerStundenelement;
}
