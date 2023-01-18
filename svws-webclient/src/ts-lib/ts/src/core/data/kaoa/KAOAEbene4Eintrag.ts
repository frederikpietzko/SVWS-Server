import { JavaObject, cast_java_lang_Object } from '../../../java/lang/JavaObject';
import { JavaInteger, cast_java_lang_Integer } from '../../../java/lang/JavaInteger';
import { JavaString, cast_java_lang_String } from '../../../java/lang/JavaString';
import { KAOAZusatzmerkmal, cast_de_nrw_schule_svws_core_types_kaoa_KAOAZusatzmerkmal } from '../../../core/types/kaoa/KAOAZusatzmerkmal';

export class KAOAEbene4Eintrag extends JavaObject {

	/**
	 * Die ID des Katalog-Eintrags. 
	 */
	public id : number = 0;

	/**
	 * Das Kürzel des Eintrags für die SBO Ebene 4. 
	 */
	public kuerzel : String = "";

	/**
	 * Die Beschreibung des Eintrags für die SBO Ebene 4. 
	 */
	public beschreibung : String = "";

	/**
	 * Das Zusatzmerkmal, welcher der Eintrag zugeordnet ist. 
	 */
	public zusatzmerkmal : String = "";

	/**
	 * Gibt an, in welchem Schuljahr der Eintrag einführt wurde. Ist kein Schuljahr bekannt, so ist null gesetzt. 
	 */
	public gueltigVon : Number | null = null;

	/**
	 * Gibt an, bis zu welchem Schuljahr der Eintrag gültig ist. Ist kein Schuljahr bekannt, so ist null gesetzt. 
	 */
	public gueltigBis : Number | null = null;


	/**
	 * Erstellt einen KAoA-Eintrag der SBO Ebene 4 mit Standardwerten
	 */
	public constructor();

	/**
	 * Erstellt einen KAoA-Eintrag der SBO Ebene 4 mit den angegebenen Werten
	 * 
	 * @param id             die ID
	 * @param kuerzel        das Kürzel 
	 * @param beschreibung   die Beschreibung
	 * @param zusatzmerkmal  das Zusatzmerkmal, dem der Eintrag der SBO Ebene 4 zugeordnet ist
	 * @param gueltigVon     das Schuljahr, wann der Eintrag eingeführt wurde oder null, falls es nicht bekannt ist und "schon immer gültig war"
	 * @param gueltigBis     das Schuljahr, bis zu welchem der Eintrag gültig ist
	 */
	public constructor(id : number, kuerzel : String, beschreibung : String, zusatzmerkmal : KAOAZusatzmerkmal, gueltigVon : Number | null, gueltigBis : Number | null);

	/**
	 * Implementation for method overloads of 'constructor'
	 */
	public constructor(__param0? : number, __param1? : String, __param2? : String, __param3? : KAOAZusatzmerkmal, __param4? : Number | null, __param5? : Number | null) {
		super();
		if ((typeof __param0 === "undefined") && (typeof __param1 === "undefined") && (typeof __param2 === "undefined") && (typeof __param3 === "undefined") && (typeof __param4 === "undefined") && (typeof __param5 === "undefined")) {
			} else if (((typeof __param0 !== "undefined") && typeof __param0 === "number") && ((typeof __param1 !== "undefined") && ((__param1 instanceof String) || (typeof __param1 === "string"))) && ((typeof __param2 !== "undefined") && ((__param2 instanceof String) || (typeof __param2 === "string"))) && ((typeof __param3 !== "undefined") && ((__param3 instanceof JavaObject) && (__param3.isTranspiledInstanceOf('de.nrw.schule.svws.core.types.kaoa.KAOAZusatzmerkmal')))) && ((typeof __param4 !== "undefined") && ((__param4 instanceof Number) || (typeof __param4 === "number")) || (__param4 === null)) && ((typeof __param5 !== "undefined") && ((__param5 instanceof Number) || (typeof __param5 === "number")) || (__param5 === null))) {
			let id : number = __param0 as number;
			let kuerzel : String = __param1;
			let beschreibung : String = __param2;
			let zusatzmerkmal : KAOAZusatzmerkmal = cast_de_nrw_schule_svws_core_types_kaoa_KAOAZusatzmerkmal(__param3);
			let gueltigVon : Number | null = cast_java_lang_Integer(__param4);
			let gueltigBis : Number | null = cast_java_lang_Integer(__param5);
			this.id = id;
			this.kuerzel = kuerzel;
			this.beschreibung = beschreibung;
			this.zusatzmerkmal = zusatzmerkmal.daten.kuerzel;
			this.gueltigVon = gueltigVon;
			this.gueltigBis = gueltigBis;
		} else throw new Error('invalid method overload');
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.data.kaoa.KAOAEbene4Eintrag'].includes(name);
	}

	public static transpilerFromJSON(json : string): KAOAEbene4Eintrag {
		const obj = JSON.parse(json);
		const result = new KAOAEbene4Eintrag();
		if (typeof obj.id === "undefined")
			 throw new Error('invalid json format, missing attribute id');
		result.id = obj.id;
		if (typeof obj.kuerzel === "undefined")
			 throw new Error('invalid json format, missing attribute kuerzel');
		result.kuerzel = String(obj.kuerzel);
		if (typeof obj.beschreibung === "undefined")
			 throw new Error('invalid json format, missing attribute beschreibung');
		result.beschreibung = String(obj.beschreibung);
		if (typeof obj.zusatzmerkmal === "undefined")
			 throw new Error('invalid json format, missing attribute zusatzmerkmal');
		result.zusatzmerkmal = String(obj.zusatzmerkmal);
		result.gueltigVon = typeof obj.gueltigVon === "undefined" ? null : obj.gueltigVon === null ? null : Number(obj.gueltigVon);
		result.gueltigBis = typeof obj.gueltigBis === "undefined" ? null : obj.gueltigBis === null ? null : Number(obj.gueltigBis);
		return result;
	}

	public static transpilerToJSON(obj : KAOAEbene4Eintrag) : string {
		let result = '{';
		result += '"id" : ' + obj.id + ',';
		result += '"kuerzel" : ' + '"' + obj.kuerzel.valueOf() + '"' + ',';
		result += '"beschreibung" : ' + '"' + obj.beschreibung.valueOf() + '"' + ',';
		result += '"zusatzmerkmal" : ' + '"' + obj.zusatzmerkmal.valueOf() + '"' + ',';
		result += '"gueltigVon" : ' + ((!obj.gueltigVon) ? 'null' : obj.gueltigVon.valueOf()) + ',';
		result += '"gueltigBis" : ' + ((!obj.gueltigBis) ? 'null' : obj.gueltigBis.valueOf()) + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<KAOAEbene4Eintrag>) : string {
		let result = '{';
		if (typeof obj.id !== "undefined") {
			result += '"id" : ' + obj.id + ',';
		}
		if (typeof obj.kuerzel !== "undefined") {
			result += '"kuerzel" : ' + '"' + obj.kuerzel.valueOf() + '"' + ',';
		}
		if (typeof obj.beschreibung !== "undefined") {
			result += '"beschreibung" : ' + '"' + obj.beschreibung.valueOf() + '"' + ',';
		}
		if (typeof obj.zusatzmerkmal !== "undefined") {
			result += '"zusatzmerkmal" : ' + '"' + obj.zusatzmerkmal.valueOf() + '"' + ',';
		}
		if (typeof obj.gueltigVon !== "undefined") {
			result += '"gueltigVon" : ' + ((!obj.gueltigVon) ? 'null' : obj.gueltigVon.valueOf()) + ',';
		}
		if (typeof obj.gueltigBis !== "undefined") {
			result += '"gueltigBis" : ' + ((!obj.gueltigBis) ? 'null' : obj.gueltigBis.valueOf()) + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_nrw_schule_svws_core_data_kaoa_KAOAEbene4Eintrag(obj : unknown) : KAOAEbene4Eintrag {
	return obj as KAOAEbene4Eintrag;
}
