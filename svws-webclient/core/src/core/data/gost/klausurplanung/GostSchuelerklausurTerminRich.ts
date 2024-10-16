import { GostKursklausur } from '../../../../core/data/gost/klausurplanung/GostKursklausur';
import { GostKlausurvorgabe } from '../../../../core/data/gost/klausurplanung/GostKlausurvorgabe';
import { JavaLong } from '../../../../java/lang/JavaLong';
import { JavaObject } from '../../../../java/lang/JavaObject';
import { Class } from '../../../../java/lang/Class';
import { GostSchuelerklausurTermin, cast_de_svws_nrw_core_data_gost_klausurplanung_GostSchuelerklausurTermin } from '../../../../core/data/gost/klausurplanung/GostSchuelerklausurTermin';
import { GostKlausurplanManager, cast_de_svws_nrw_core_utils_gost_klausurplanung_GostKlausurplanManager } from '../../../../core/utils/gost/klausurplanung/GostKlausurplanManager';

export class GostSchuelerklausurTerminRich extends JavaObject {

	/**
	 * Die ID des Schülerklausurtermins.
	 */
	public id : number = -1;

	/**
	 * Die Startzeit der Klausur in Minuten seit 0 Uhr, sofern abweichend von Startzeit des gesamten Termins.
	 */
	public startzeit : number = -1;

	/**
	 * Die ID der zugehörigen Kursklausur.
	 */
	public idKursklausur : number = -1;

	/**
	 * Die ID des Faches.
	 */
	public idFach : number = -1;

	/**
	 * Das Kürzel einer verallgemeinerten Kursart.
	 */
	public kursart : string = "";

	/**
	 * Die Dauer der Klausur in Minuten.
	 */
	public dauer : number = 0;

	/**
	 * Die Auswahlzeit in Minuten, sofern vorhanden.
	 */
	public auswahlzeit : number = 0;

	/**
	 * Die Information, ob es sich um eine mündliche Prüfung handelt.
	 */
	public istMdlPruefung : boolean = false;

	/**
	 * Die Information, ob Audioequipment nötig ist, z.B. für Klausuren mit Hörverstehensanteilen.
	 */
	public istAudioNotwendig : boolean = false;

	/**
	 * Die Information, ob Videoequipment nötig ist, z.B. für Klausuren mit Videoanalyse.
	 */
	public istVideoNotwendig : boolean = false;


	/**
	 * Konstruktor zur Erstellung des Rich-Objekts.
	 *
	 * @param termin     das {@link GostSchuelerklausurTermin}-Objekt
	 * @param manager    der {@link GostKlausurplanManager} für die Klausurplanung
	 */
	public constructor(termin : GostSchuelerklausurTermin | null, manager : GostKlausurplanManager | null);

	/**
	 * Default-Konstruktor
	 */
	public constructor();

	/**
	 * Implementation for method overloads of 'constructor'
	 */
	public constructor(__param0? : GostSchuelerklausurTermin | null, __param1? : GostKlausurplanManager | null) {
		super();
		if (((__param0 !== undefined) && ((__param0 instanceof JavaObject) && (__param0.isTranspiledInstanceOf('de.svws_nrw.core.data.gost.klausurplanung.GostSchuelerklausurTermin'))) || (__param0 === null)) && ((__param1 !== undefined) && ((__param1 instanceof JavaObject) && (__param1.isTranspiledInstanceOf('de.svws_nrw.core.utils.gost.klausurplanung.GostKlausurplanManager'))) || (__param1 === null))) {
			const termin : GostSchuelerklausurTermin | null = cast_de_svws_nrw_core_data_gost_klausurplanung_GostSchuelerklausurTermin(__param0);
			const manager : GostKlausurplanManager | null = cast_de_svws_nrw_core_utils_gost_klausurplanung_GostKlausurplanManager(__param1);
			this.id = termin.id;
			const kursklausur : GostKursklausur | null = manager.kursklausurBySchuelerklausurTermin(termin);
			this.startzeit = manager.startzeitByKursklausurOrException(kursklausur);
			this.idKursklausur = kursklausur.id;
			const vorgabe : GostKlausurvorgabe | null = manager.vorgabeBySchuelerklausurTermin(termin);
			this.idFach = vorgabe.idFach;
			this.kursart = vorgabe.kursart;
			this.dauer = vorgabe.dauer;
			this.auswahlzeit = vorgabe.auswahlzeit;
			this.istMdlPruefung = vorgabe.istMdlPruefung;
			this.istAudioNotwendig = vorgabe.istAudioNotwendig;
			this.istVideoNotwendig = vorgabe.istVideoNotwendig;
		} else if ((__param0 === undefined) && (__param1 === undefined)) {
			// empty method body
		} else throw new Error('invalid method overload');
	}

	/**
	 * Vergleicht, ob das aktuelle dasselbe Objekt, wie ein anderes übergebenes Objekt ist.
	 *
	 * @param another     das zu vergleichende Objekt
	 * @return true, falls die Objekte identisch sind, sonst false
	 */
	public equals(another : unknown | null) : boolean {
		return (another !== null) && (((another instanceof JavaObject) && (another.isTranspiledInstanceOf('de.svws_nrw.core.data.gost.klausurplanung.GostSchuelerklausurTerminRich')))) && (this.id === (cast_de_svws_nrw_core_data_gost_klausurplanung_GostSchuelerklausurTerminRich(another)).id);
	}

	/**
	 * Erzeugt den Hashcode zu Objekt auf Basis der id.
	 *
	 * @return den HashCode
	 */
	public hashCode() : number {
		return JavaLong.hashCode((this.id));
	}

	transpilerCanonicalName(): string {
		return 'de.svws_nrw.core.data.gost.klausurplanung.GostSchuelerklausurTerminRich';
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.data.gost.klausurplanung.GostSchuelerklausurTerminRich'].includes(name);
	}

	public static class = new Class<GostSchuelerklausurTerminRich>('de.svws_nrw.core.data.gost.klausurplanung.GostSchuelerklausurTerminRich');

	public static transpilerFromJSON(json : string): GostSchuelerklausurTerminRich {
		const obj = JSON.parse(json) as Partial<GostSchuelerklausurTerminRich>;
		const result = new GostSchuelerklausurTerminRich();
		if (obj.id === undefined)
			throw new Error('invalid json format, missing attribute id');
		result.id = obj.id;
		if (obj.startzeit === undefined)
			throw new Error('invalid json format, missing attribute startzeit');
		result.startzeit = obj.startzeit;
		if (obj.idKursklausur === undefined)
			throw new Error('invalid json format, missing attribute idKursklausur');
		result.idKursklausur = obj.idKursklausur;
		if (obj.idFach === undefined)
			throw new Error('invalid json format, missing attribute idFach');
		result.idFach = obj.idFach;
		if (obj.kursart === undefined)
			throw new Error('invalid json format, missing attribute kursart');
		result.kursart = obj.kursart;
		if (obj.dauer === undefined)
			throw new Error('invalid json format, missing attribute dauer');
		result.dauer = obj.dauer;
		if (obj.auswahlzeit === undefined)
			throw new Error('invalid json format, missing attribute auswahlzeit');
		result.auswahlzeit = obj.auswahlzeit;
		if (obj.istMdlPruefung === undefined)
			throw new Error('invalid json format, missing attribute istMdlPruefung');
		result.istMdlPruefung = obj.istMdlPruefung;
		if (obj.istAudioNotwendig === undefined)
			throw new Error('invalid json format, missing attribute istAudioNotwendig');
		result.istAudioNotwendig = obj.istAudioNotwendig;
		if (obj.istVideoNotwendig === undefined)
			throw new Error('invalid json format, missing attribute istVideoNotwendig');
		result.istVideoNotwendig = obj.istVideoNotwendig;
		return result;
	}

	public static transpilerToJSON(obj : GostSchuelerklausurTerminRich) : string {
		let result = '{';
		result += '"id" : ' + obj.id.toString() + ',';
		result += '"startzeit" : ' + obj.startzeit.toString() + ',';
		result += '"idKursklausur" : ' + obj.idKursklausur.toString() + ',';
		result += '"idFach" : ' + obj.idFach.toString() + ',';
		result += '"kursart" : ' + JSON.stringify(obj.kursart) + ',';
		result += '"dauer" : ' + obj.dauer.toString() + ',';
		result += '"auswahlzeit" : ' + obj.auswahlzeit.toString() + ',';
		result += '"istMdlPruefung" : ' + obj.istMdlPruefung.toString() + ',';
		result += '"istAudioNotwendig" : ' + obj.istAudioNotwendig.toString() + ',';
		result += '"istVideoNotwendig" : ' + obj.istVideoNotwendig.toString() + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<GostSchuelerklausurTerminRich>) : string {
		let result = '{';
		if (obj.id !== undefined) {
			result += '"id" : ' + obj.id.toString() + ',';
		}
		if (obj.startzeit !== undefined) {
			result += '"startzeit" : ' + obj.startzeit.toString() + ',';
		}
		if (obj.idKursklausur !== undefined) {
			result += '"idKursklausur" : ' + obj.idKursklausur.toString() + ',';
		}
		if (obj.idFach !== undefined) {
			result += '"idFach" : ' + obj.idFach.toString() + ',';
		}
		if (obj.kursart !== undefined) {
			result += '"kursart" : ' + JSON.stringify(obj.kursart) + ',';
		}
		if (obj.dauer !== undefined) {
			result += '"dauer" : ' + obj.dauer.toString() + ',';
		}
		if (obj.auswahlzeit !== undefined) {
			result += '"auswahlzeit" : ' + obj.auswahlzeit.toString() + ',';
		}
		if (obj.istMdlPruefung !== undefined) {
			result += '"istMdlPruefung" : ' + obj.istMdlPruefung.toString() + ',';
		}
		if (obj.istAudioNotwendig !== undefined) {
			result += '"istAudioNotwendig" : ' + obj.istAudioNotwendig.toString() + ',';
		}
		if (obj.istVideoNotwendig !== undefined) {
			result += '"istVideoNotwendig" : ' + obj.istVideoNotwendig.toString() + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_svws_nrw_core_data_gost_klausurplanung_GostSchuelerklausurTerminRich(obj : unknown) : GostSchuelerklausurTerminRich {
	return obj as GostSchuelerklausurTerminRich;
}
