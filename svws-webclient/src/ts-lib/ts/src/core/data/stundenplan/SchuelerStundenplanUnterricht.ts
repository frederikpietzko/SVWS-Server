import { JavaObject, cast_java_lang_Object } from '../../../java/lang/JavaObject';
import { JavaString, cast_java_lang_String } from '../../../java/lang/JavaString';

export class SchuelerStundenplanUnterricht extends JavaObject {

	/**
	 * Die ID der Leistungsdaten, um zusammen gehörige Unterrichtseinheiten zu erkennen. 
	 */
	public idLeistungen : number = -1;

	/**
	 * Die ID der Unterrichtseinheit 
	 */
	public idUnterricht : number = -1;

	/**
	 * Die ID im Zeitraster des Stundenplans 
	 */
	public idZeitraster : number = -1;

	/**
	 * Die Kursart der Unterrichtseinheit. 
	 */
	public kursart : String = "";

	/**
	 * Der Wochen-Typ bei der Unterscheidung von (A,B,... -Wochen -> 1, 2, ...) oder 0 
	 */
	public wochentyp : number = -1;

	/**
	 * Die ID des Faches 
	 */
	public idFach : number = -1;

	/**
	 * Das Kürzel des Unterrichtsfaches. 
	 */
	public fachKuerzel : String = "";

	/**
	 * Die Bezeichnung des Unterrichtsfaches. 
	 */
	public fachBezeichnung : String = "";

	/**
	 * Das Kürzel des Unterrichtsfaches in Bezug auf die amtliche Schulstatistik. 
	 */
	public fachKuerzelStatistik : String = "";

	/**
	 * Die ID des Lehrers. 
	 */
	public idLehrer : number = -1;

	/**
	 * Der Nachname des Schülers. 
	 */
	public lehrerKuerzel : String = "";

	/**
	 * Der Nachname des Schülers. 
	 */
	public lehrerNachname : String = "";

	/**
	 * Der Vorname des Schülers. 
	 */
	public lehrerVorname : String = "";


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.data.stundenplan.SchuelerStundenplanUnterricht'].includes(name);
	}

	public static transpilerFromJSON(json : string): SchuelerStundenplanUnterricht {
		const obj = JSON.parse(json);
		const result = new SchuelerStundenplanUnterricht();
		if (typeof obj.idLeistungen === "undefined")
			 throw new Error('invalid json format, missing attribute idLeistungen');
		result.idLeistungen = obj.idLeistungen;
		if (typeof obj.idUnterricht === "undefined")
			 throw new Error('invalid json format, missing attribute idUnterricht');
		result.idUnterricht = obj.idUnterricht;
		if (typeof obj.idZeitraster === "undefined")
			 throw new Error('invalid json format, missing attribute idZeitraster');
		result.idZeitraster = obj.idZeitraster;
		if (typeof obj.kursart === "undefined")
			 throw new Error('invalid json format, missing attribute kursart');
		result.kursart = String(obj.kursart);
		if (typeof obj.wochentyp === "undefined")
			 throw new Error('invalid json format, missing attribute wochentyp');
		result.wochentyp = obj.wochentyp;
		if (typeof obj.idFach === "undefined")
			 throw new Error('invalid json format, missing attribute idFach');
		result.idFach = obj.idFach;
		if (typeof obj.fachKuerzel === "undefined")
			 throw new Error('invalid json format, missing attribute fachKuerzel');
		result.fachKuerzel = String(obj.fachKuerzel);
		if (typeof obj.fachBezeichnung === "undefined")
			 throw new Error('invalid json format, missing attribute fachBezeichnung');
		result.fachBezeichnung = String(obj.fachBezeichnung);
		if (typeof obj.fachKuerzelStatistik === "undefined")
			 throw new Error('invalid json format, missing attribute fachKuerzelStatistik');
		result.fachKuerzelStatistik = String(obj.fachKuerzelStatistik);
		if (typeof obj.idLehrer === "undefined")
			 throw new Error('invalid json format, missing attribute idLehrer');
		result.idLehrer = obj.idLehrer;
		if (typeof obj.lehrerKuerzel === "undefined")
			 throw new Error('invalid json format, missing attribute lehrerKuerzel');
		result.lehrerKuerzel = String(obj.lehrerKuerzel);
		if (typeof obj.lehrerNachname === "undefined")
			 throw new Error('invalid json format, missing attribute lehrerNachname');
		result.lehrerNachname = String(obj.lehrerNachname);
		if (typeof obj.lehrerVorname === "undefined")
			 throw new Error('invalid json format, missing attribute lehrerVorname');
		result.lehrerVorname = String(obj.lehrerVorname);
		return result;
	}

	public static transpilerToJSON(obj : SchuelerStundenplanUnterricht) : string {
		let result = '{';
		result += '"idLeistungen" : ' + obj.idLeistungen + ',';
		result += '"idUnterricht" : ' + obj.idUnterricht + ',';
		result += '"idZeitraster" : ' + obj.idZeitraster + ',';
		result += '"kursart" : ' + '"' + obj.kursart.valueOf() + '"' + ',';
		result += '"wochentyp" : ' + obj.wochentyp + ',';
		result += '"idFach" : ' + obj.idFach + ',';
		result += '"fachKuerzel" : ' + '"' + obj.fachKuerzel.valueOf() + '"' + ',';
		result += '"fachBezeichnung" : ' + '"' + obj.fachBezeichnung.valueOf() + '"' + ',';
		result += '"fachKuerzelStatistik" : ' + '"' + obj.fachKuerzelStatistik.valueOf() + '"' + ',';
		result += '"idLehrer" : ' + obj.idLehrer + ',';
		result += '"lehrerKuerzel" : ' + '"' + obj.lehrerKuerzel.valueOf() + '"' + ',';
		result += '"lehrerNachname" : ' + '"' + obj.lehrerNachname.valueOf() + '"' + ',';
		result += '"lehrerVorname" : ' + '"' + obj.lehrerVorname.valueOf() + '"' + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<SchuelerStundenplanUnterricht>) : string {
		let result = '{';
		if (typeof obj.idLeistungen !== "undefined") {
			result += '"idLeistungen" : ' + obj.idLeistungen + ',';
		}
		if (typeof obj.idUnterricht !== "undefined") {
			result += '"idUnterricht" : ' + obj.idUnterricht + ',';
		}
		if (typeof obj.idZeitraster !== "undefined") {
			result += '"idZeitraster" : ' + obj.idZeitraster + ',';
		}
		if (typeof obj.kursart !== "undefined") {
			result += '"kursart" : ' + '"' + obj.kursart.valueOf() + '"' + ',';
		}
		if (typeof obj.wochentyp !== "undefined") {
			result += '"wochentyp" : ' + obj.wochentyp + ',';
		}
		if (typeof obj.idFach !== "undefined") {
			result += '"idFach" : ' + obj.idFach + ',';
		}
		if (typeof obj.fachKuerzel !== "undefined") {
			result += '"fachKuerzel" : ' + '"' + obj.fachKuerzel.valueOf() + '"' + ',';
		}
		if (typeof obj.fachBezeichnung !== "undefined") {
			result += '"fachBezeichnung" : ' + '"' + obj.fachBezeichnung.valueOf() + '"' + ',';
		}
		if (typeof obj.fachKuerzelStatistik !== "undefined") {
			result += '"fachKuerzelStatistik" : ' + '"' + obj.fachKuerzelStatistik.valueOf() + '"' + ',';
		}
		if (typeof obj.idLehrer !== "undefined") {
			result += '"idLehrer" : ' + obj.idLehrer + ',';
		}
		if (typeof obj.lehrerKuerzel !== "undefined") {
			result += '"lehrerKuerzel" : ' + '"' + obj.lehrerKuerzel.valueOf() + '"' + ',';
		}
		if (typeof obj.lehrerNachname !== "undefined") {
			result += '"lehrerNachname" : ' + '"' + obj.lehrerNachname.valueOf() + '"' + ',';
		}
		if (typeof obj.lehrerVorname !== "undefined") {
			result += '"lehrerVorname" : ' + '"' + obj.lehrerVorname.valueOf() + '"' + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_nrw_schule_svws_core_data_stundenplan_SchuelerStundenplanUnterricht(obj : unknown) : SchuelerStundenplanUnterricht {
	return obj as SchuelerStundenplanUnterricht;
}
