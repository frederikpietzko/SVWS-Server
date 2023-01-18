import { JavaObject, cast_java_lang_Object } from '../../../java/lang/JavaObject';
import { JavaInteger, cast_java_lang_Integer } from '../../../java/lang/JavaInteger';
import { JavaString, cast_java_lang_String } from '../../../java/lang/JavaString';

export class SchildReportingSchuelerlernabschnitt extends JavaObject {

	/**
	 * Die ID des Lernabschnitts 
	 */
	public id : number = 0;

	/**
	 * Die ID des Schülers, zu dem die Lernabschnittdaten gehören. 
	 */
	public schuelerID : number = 0;

	/**
	 * Das Schuljahr, in welchem der Schuljahresabschnitt liegt 
	 */
	public schuljahr : number = 0;

	/**
	 * Die Nummer des Abschnitts im Schuljahr 
	 */
	public abschnitt : number = 0;

	/**
	 * Eine Nr, zur Unterscheidung von Lernabschnittsdaten, wenn beim Schüler mehrere Lernabschnitt in einem Schuljahresabschnitt vorliegen (z.B. Wechsel einer Klasse, NULL=aktueller Abschnitt, 1=vor dem ersten Wechsel, 2=vor dem zweiten Wechsel, usw.). 
	 */
	public wechselNr : Number | null = null;

	/**
	 * Gibt an, ob es sich um einen gewerteten Abschnitt handelt oder nicht 
	 */
	public istGewertet : boolean = true;

	/**
	 * Gibt an, ob es sich bei dem Abschnitt um einen wiederholten Abschnitt handelt oder nicht 
	 */
	public istWiederholung : boolean = false;

	/**
	 * Die Prüfungsordnung, die in dem Lernabschnitt bei dem Schüler anzuwenden ist. 
	 */
	public pruefungsOrdnung : String = "";

	/**
	 * Die Bezeichnung der Klasse des Schülers 
	 */
	public klasse : String = "";

	/**
	 * Die Statistik-Bezeichnung der Klasse des Schülers 
	 */
	public klasseStatistik : String = "";

	/**
	 * Die Bezeichnung des Jahrgangs 
	 */
	public jahrgang : String = "";

	/**
	 * Die Statistik-Bezeichnung des Jahrgangs 
	 */
	public jahrgangStatistik : String = "";

	/**
	 * Das Datum der Zeugniskonferenz 
	 */
	public datumZeugniskonferenz : String = "";

	/**
	 * Das Datum des Zeugnisses 
	 */
	public datumZeugnis : String = "";

	/**
	 * Das Ergebnis des Prüfungs-Algorithmus 
	 */
	public logPruefungsalgorithmus : String = "";


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.data.schild3.SchildReportingSchuelerlernabschnitt'].includes(name);
	}

	public static transpilerFromJSON(json : string): SchildReportingSchuelerlernabschnitt {
		const obj = JSON.parse(json);
		const result = new SchildReportingSchuelerlernabschnitt();
		if (typeof obj.id === "undefined")
			 throw new Error('invalid json format, missing attribute id');
		result.id = obj.id;
		if (typeof obj.schuelerID === "undefined")
			 throw new Error('invalid json format, missing attribute schuelerID');
		result.schuelerID = obj.schuelerID;
		if (typeof obj.schuljahr === "undefined")
			 throw new Error('invalid json format, missing attribute schuljahr');
		result.schuljahr = obj.schuljahr;
		if (typeof obj.abschnitt === "undefined")
			 throw new Error('invalid json format, missing attribute abschnitt');
		result.abschnitt = obj.abschnitt;
		result.wechselNr = typeof obj.wechselNr === "undefined" ? null : obj.wechselNr === null ? null : Number(obj.wechselNr);
		if (typeof obj.istGewertet === "undefined")
			 throw new Error('invalid json format, missing attribute istGewertet');
		result.istGewertet = obj.istGewertet;
		if (typeof obj.istWiederholung === "undefined")
			 throw new Error('invalid json format, missing attribute istWiederholung');
		result.istWiederholung = obj.istWiederholung;
		if (typeof obj.pruefungsOrdnung === "undefined")
			 throw new Error('invalid json format, missing attribute pruefungsOrdnung');
		result.pruefungsOrdnung = String(obj.pruefungsOrdnung);
		if (typeof obj.klasse === "undefined")
			 throw new Error('invalid json format, missing attribute klasse');
		result.klasse = String(obj.klasse);
		if (typeof obj.klasseStatistik === "undefined")
			 throw new Error('invalid json format, missing attribute klasseStatistik');
		result.klasseStatistik = String(obj.klasseStatistik);
		if (typeof obj.jahrgang === "undefined")
			 throw new Error('invalid json format, missing attribute jahrgang');
		result.jahrgang = String(obj.jahrgang);
		if (typeof obj.jahrgangStatistik === "undefined")
			 throw new Error('invalid json format, missing attribute jahrgangStatistik');
		result.jahrgangStatistik = String(obj.jahrgangStatistik);
		if (typeof obj.datumZeugniskonferenz === "undefined")
			 throw new Error('invalid json format, missing attribute datumZeugniskonferenz');
		result.datumZeugniskonferenz = String(obj.datumZeugniskonferenz);
		if (typeof obj.datumZeugnis === "undefined")
			 throw new Error('invalid json format, missing attribute datumZeugnis');
		result.datumZeugnis = String(obj.datumZeugnis);
		if (typeof obj.logPruefungsalgorithmus === "undefined")
			 throw new Error('invalid json format, missing attribute logPruefungsalgorithmus');
		result.logPruefungsalgorithmus = String(obj.logPruefungsalgorithmus);
		return result;
	}

	public static transpilerToJSON(obj : SchildReportingSchuelerlernabschnitt) : string {
		let result = '{';
		result += '"id" : ' + obj.id + ',';
		result += '"schuelerID" : ' + obj.schuelerID + ',';
		result += '"schuljahr" : ' + obj.schuljahr + ',';
		result += '"abschnitt" : ' + obj.abschnitt + ',';
		result += '"wechselNr" : ' + ((!obj.wechselNr) ? 'null' : obj.wechselNr.valueOf()) + ',';
		result += '"istGewertet" : ' + obj.istGewertet + ',';
		result += '"istWiederholung" : ' + obj.istWiederholung + ',';
		result += '"pruefungsOrdnung" : ' + '"' + obj.pruefungsOrdnung.valueOf() + '"' + ',';
		result += '"klasse" : ' + '"' + obj.klasse.valueOf() + '"' + ',';
		result += '"klasseStatistik" : ' + '"' + obj.klasseStatistik.valueOf() + '"' + ',';
		result += '"jahrgang" : ' + '"' + obj.jahrgang.valueOf() + '"' + ',';
		result += '"jahrgangStatistik" : ' + '"' + obj.jahrgangStatistik.valueOf() + '"' + ',';
		result += '"datumZeugniskonferenz" : ' + '"' + obj.datumZeugniskonferenz.valueOf() + '"' + ',';
		result += '"datumZeugnis" : ' + '"' + obj.datumZeugnis.valueOf() + '"' + ',';
		result += '"logPruefungsalgorithmus" : ' + '"' + obj.logPruefungsalgorithmus.valueOf() + '"' + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<SchildReportingSchuelerlernabschnitt>) : string {
		let result = '{';
		if (typeof obj.id !== "undefined") {
			result += '"id" : ' + obj.id + ',';
		}
		if (typeof obj.schuelerID !== "undefined") {
			result += '"schuelerID" : ' + obj.schuelerID + ',';
		}
		if (typeof obj.schuljahr !== "undefined") {
			result += '"schuljahr" : ' + obj.schuljahr + ',';
		}
		if (typeof obj.abschnitt !== "undefined") {
			result += '"abschnitt" : ' + obj.abschnitt + ',';
		}
		if (typeof obj.wechselNr !== "undefined") {
			result += '"wechselNr" : ' + ((!obj.wechselNr) ? 'null' : obj.wechselNr.valueOf()) + ',';
		}
		if (typeof obj.istGewertet !== "undefined") {
			result += '"istGewertet" : ' + obj.istGewertet + ',';
		}
		if (typeof obj.istWiederholung !== "undefined") {
			result += '"istWiederholung" : ' + obj.istWiederholung + ',';
		}
		if (typeof obj.pruefungsOrdnung !== "undefined") {
			result += '"pruefungsOrdnung" : ' + '"' + obj.pruefungsOrdnung.valueOf() + '"' + ',';
		}
		if (typeof obj.klasse !== "undefined") {
			result += '"klasse" : ' + '"' + obj.klasse.valueOf() + '"' + ',';
		}
		if (typeof obj.klasseStatistik !== "undefined") {
			result += '"klasseStatistik" : ' + '"' + obj.klasseStatistik.valueOf() + '"' + ',';
		}
		if (typeof obj.jahrgang !== "undefined") {
			result += '"jahrgang" : ' + '"' + obj.jahrgang.valueOf() + '"' + ',';
		}
		if (typeof obj.jahrgangStatistik !== "undefined") {
			result += '"jahrgangStatistik" : ' + '"' + obj.jahrgangStatistik.valueOf() + '"' + ',';
		}
		if (typeof obj.datumZeugniskonferenz !== "undefined") {
			result += '"datumZeugniskonferenz" : ' + '"' + obj.datumZeugniskonferenz.valueOf() + '"' + ',';
		}
		if (typeof obj.datumZeugnis !== "undefined") {
			result += '"datumZeugnis" : ' + '"' + obj.datumZeugnis.valueOf() + '"' + ',';
		}
		if (typeof obj.logPruefungsalgorithmus !== "undefined") {
			result += '"logPruefungsalgorithmus" : ' + '"' + obj.logPruefungsalgorithmus.valueOf() + '"' + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_nrw_schule_svws_core_data_schild3_SchildReportingSchuelerlernabschnitt(obj : unknown) : SchildReportingSchuelerlernabschnitt {
	return obj as SchildReportingSchuelerlernabschnitt;
}
