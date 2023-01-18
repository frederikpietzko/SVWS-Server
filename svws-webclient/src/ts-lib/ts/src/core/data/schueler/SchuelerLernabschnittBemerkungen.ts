import { JavaObject, cast_java_lang_Object } from '../../../java/lang/JavaObject';
import { JavaString, cast_java_lang_String } from '../../../java/lang/JavaString';

export class SchuelerLernabschnittBemerkungen extends JavaObject {

	/**
	 * Der Text für allgemeine Zeugnisbemerkungen. 
	 */
	public zeugnisAllgemein : String = "";

	/**
	 * Der Text für Zeugnisbemerkungen zum Arbeits- und Sozialverhalten. 
	 */
	public zeugnisASV : String = "";

	/**
	 * Der Text für Zeugnisbemerkungen zur Lernentwicklung in Grundschulen. 
	 */
	public zeugnisLELS : String = "";

	/**
	 * Der Text für Zeugnisbemerkungen zum Außerunterrichtlichen Engagement. 
	 */
	public zeugnisAUE : String = "";

	/**
	 * Der Text für Empfehlung der Schulform beim Übergang von der Primarstufe in die Sekundarstufe I. 
	 */
	public uebergangESF : String = "";

	/**
	 * Eine Bemerkung zum Förderschwerpunkt. 
	 */
	public foerderschwerpunkt : String = "";

	/**
	 * Eine Bemerkung zur Versetzungsentscheidung. 
	 */
	public versetzungsentscheidung : String = "";


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.data.schueler.SchuelerLernabschnittBemerkungen'].includes(name);
	}

	public static transpilerFromJSON(json : string): SchuelerLernabschnittBemerkungen {
		const obj = JSON.parse(json);
		const result = new SchuelerLernabschnittBemerkungen();
		if (typeof obj.zeugnisAllgemein === "undefined")
			 throw new Error('invalid json format, missing attribute zeugnisAllgemein');
		result.zeugnisAllgemein = String(obj.zeugnisAllgemein);
		if (typeof obj.zeugnisASV === "undefined")
			 throw new Error('invalid json format, missing attribute zeugnisASV');
		result.zeugnisASV = String(obj.zeugnisASV);
		if (typeof obj.zeugnisLELS === "undefined")
			 throw new Error('invalid json format, missing attribute zeugnisLELS');
		result.zeugnisLELS = String(obj.zeugnisLELS);
		if (typeof obj.zeugnisAUE === "undefined")
			 throw new Error('invalid json format, missing attribute zeugnisAUE');
		result.zeugnisAUE = String(obj.zeugnisAUE);
		if (typeof obj.uebergangESF === "undefined")
			 throw new Error('invalid json format, missing attribute uebergangESF');
		result.uebergangESF = String(obj.uebergangESF);
		if (typeof obj.foerderschwerpunkt === "undefined")
			 throw new Error('invalid json format, missing attribute foerderschwerpunkt');
		result.foerderschwerpunkt = String(obj.foerderschwerpunkt);
		if (typeof obj.versetzungsentscheidung === "undefined")
			 throw new Error('invalid json format, missing attribute versetzungsentscheidung');
		result.versetzungsentscheidung = String(obj.versetzungsentscheidung);
		return result;
	}

	public static transpilerToJSON(obj : SchuelerLernabschnittBemerkungen) : string {
		let result = '{';
		result += '"zeugnisAllgemein" : ' + '"' + obj.zeugnisAllgemein.valueOf() + '"' + ',';
		result += '"zeugnisASV" : ' + '"' + obj.zeugnisASV.valueOf() + '"' + ',';
		result += '"zeugnisLELS" : ' + '"' + obj.zeugnisLELS.valueOf() + '"' + ',';
		result += '"zeugnisAUE" : ' + '"' + obj.zeugnisAUE.valueOf() + '"' + ',';
		result += '"uebergangESF" : ' + '"' + obj.uebergangESF.valueOf() + '"' + ',';
		result += '"foerderschwerpunkt" : ' + '"' + obj.foerderschwerpunkt.valueOf() + '"' + ',';
		result += '"versetzungsentscheidung" : ' + '"' + obj.versetzungsentscheidung.valueOf() + '"' + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<SchuelerLernabschnittBemerkungen>) : string {
		let result = '{';
		if (typeof obj.zeugnisAllgemein !== "undefined") {
			result += '"zeugnisAllgemein" : ' + '"' + obj.zeugnisAllgemein.valueOf() + '"' + ',';
		}
		if (typeof obj.zeugnisASV !== "undefined") {
			result += '"zeugnisASV" : ' + '"' + obj.zeugnisASV.valueOf() + '"' + ',';
		}
		if (typeof obj.zeugnisLELS !== "undefined") {
			result += '"zeugnisLELS" : ' + '"' + obj.zeugnisLELS.valueOf() + '"' + ',';
		}
		if (typeof obj.zeugnisAUE !== "undefined") {
			result += '"zeugnisAUE" : ' + '"' + obj.zeugnisAUE.valueOf() + '"' + ',';
		}
		if (typeof obj.uebergangESF !== "undefined") {
			result += '"uebergangESF" : ' + '"' + obj.uebergangESF.valueOf() + '"' + ',';
		}
		if (typeof obj.foerderschwerpunkt !== "undefined") {
			result += '"foerderschwerpunkt" : ' + '"' + obj.foerderschwerpunkt.valueOf() + '"' + ',';
		}
		if (typeof obj.versetzungsentscheidung !== "undefined") {
			result += '"versetzungsentscheidung" : ' + '"' + obj.versetzungsentscheidung.valueOf() + '"' + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_nrw_schule_svws_core_data_schueler_SchuelerLernabschnittBemerkungen(obj : unknown) : SchuelerLernabschnittBemerkungen {
	return obj as SchuelerLernabschnittBemerkungen;
}
