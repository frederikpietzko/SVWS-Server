import { JavaObject } from '../../../java/lang/JavaObject';

export class JahrgangsListeEintrag extends JavaObject {

	/**
	 * Die ID des Jahrgangs.
	 */
	public id : number = 0;

	/**
	 * Das Kürzel des Jahrgangs.
	 */
	public kuerzel : string | null = null;

	/**
	 * Das dem Jahrgang zugeordnete Statistik-Kürzel.
	 */
	public kuerzelStatistik : string = "";

	/**
	 * Der Name / die Bezeichnung des Jahrgangs.
	 */
	public bezeichnung : string | null = null;

	/**
	 * Die Sortierreihenfolge des Jahrgangslisten-Eintrags.
	 */
	public sortierung : number = 0;

	/**
	 * Die ID der Schulgliederung, der der Eintrag zugeordnet ist.
	 */
	public kuerzelSchulgliederung : string | null = null;

	/**
	 * Die ID des Folgejahrgangs, sofern einer definiert ist, ansonsten null
	 */
	public idFolgejahrgang : number | null = null;

	/**
	 * Gibt an, ob der Eintrag in der Anwendung sichtbar sein soll oder nicht.
	 */
	public istSichtbar : boolean = false;


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.data.jahrgang.JahrgangsListeEintrag'].includes(name);
	}

	public static transpilerFromJSON(json : string): JahrgangsListeEintrag {
		const obj = JSON.parse(json);
		const result = new JahrgangsListeEintrag();
		if (typeof obj.id === "undefined")
			 throw new Error('invalid json format, missing attribute id');
		result.id = obj.id;
		result.kuerzel = typeof obj.kuerzel === "undefined" ? null : obj.kuerzel === null ? null : obj.kuerzel;
		if (typeof obj.kuerzelStatistik === "undefined")
			 throw new Error('invalid json format, missing attribute kuerzelStatistik');
		result.kuerzelStatistik = obj.kuerzelStatistik;
		result.bezeichnung = typeof obj.bezeichnung === "undefined" ? null : obj.bezeichnung === null ? null : obj.bezeichnung;
		if (typeof obj.sortierung === "undefined")
			 throw new Error('invalid json format, missing attribute sortierung');
		result.sortierung = obj.sortierung;
		result.kuerzelSchulgliederung = typeof obj.kuerzelSchulgliederung === "undefined" ? null : obj.kuerzelSchulgliederung === null ? null : obj.kuerzelSchulgliederung;
		result.idFolgejahrgang = typeof obj.idFolgejahrgang === "undefined" ? null : obj.idFolgejahrgang === null ? null : obj.idFolgejahrgang;
		if (typeof obj.istSichtbar === "undefined")
			 throw new Error('invalid json format, missing attribute istSichtbar');
		result.istSichtbar = obj.istSichtbar;
		return result;
	}

	public static transpilerToJSON(obj : JahrgangsListeEintrag) : string {
		let result = '{';
		result += '"id" : ' + obj.id + ',';
		result += '"kuerzel" : ' + ((!obj.kuerzel) ? 'null' : '"' + obj.kuerzel + '"') + ',';
		result += '"kuerzelStatistik" : ' + '"' + obj.kuerzelStatistik! + '"' + ',';
		result += '"bezeichnung" : ' + ((!obj.bezeichnung) ? 'null' : '"' + obj.bezeichnung + '"') + ',';
		result += '"sortierung" : ' + obj.sortierung + ',';
		result += '"kuerzelSchulgliederung" : ' + ((!obj.kuerzelSchulgliederung) ? 'null' : '"' + obj.kuerzelSchulgliederung + '"') + ',';
		result += '"idFolgejahrgang" : ' + ((!obj.idFolgejahrgang) ? 'null' : obj.idFolgejahrgang) + ',';
		result += '"istSichtbar" : ' + obj.istSichtbar + ',';
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<JahrgangsListeEintrag>) : string {
		let result = '{';
		if (typeof obj.id !== "undefined") {
			result += '"id" : ' + obj.id + ',';
		}
		if (typeof obj.kuerzel !== "undefined") {
			result += '"kuerzel" : ' + ((!obj.kuerzel) ? 'null' : '"' + obj.kuerzel + '"') + ',';
		}
		if (typeof obj.kuerzelStatistik !== "undefined") {
			result += '"kuerzelStatistik" : ' + '"' + obj.kuerzelStatistik + '"' + ',';
		}
		if (typeof obj.bezeichnung !== "undefined") {
			result += '"bezeichnung" : ' + ((!obj.bezeichnung) ? 'null' : '"' + obj.bezeichnung + '"') + ',';
		}
		if (typeof obj.sortierung !== "undefined") {
			result += '"sortierung" : ' + obj.sortierung + ',';
		}
		if (typeof obj.kuerzelSchulgliederung !== "undefined") {
			result += '"kuerzelSchulgliederung" : ' + ((!obj.kuerzelSchulgliederung) ? 'null' : '"' + obj.kuerzelSchulgliederung + '"') + ',';
		}
		if (typeof obj.idFolgejahrgang !== "undefined") {
			result += '"idFolgejahrgang" : ' + ((!obj.idFolgejahrgang) ? 'null' : obj.idFolgejahrgang) + ',';
		}
		if (typeof obj.istSichtbar !== "undefined") {
			result += '"istSichtbar" : ' + obj.istSichtbar + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_svws_nrw_core_data_jahrgang_JahrgangsListeEintrag(obj : unknown) : JahrgangsListeEintrag {
	return obj as JahrgangsListeEintrag;
}
