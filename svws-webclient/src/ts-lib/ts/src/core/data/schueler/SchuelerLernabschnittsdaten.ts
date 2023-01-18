import { JavaObject, cast_java_lang_Object } from '../../../java/lang/JavaObject';
import { JavaInteger, cast_java_lang_Integer } from '../../../java/lang/JavaInteger';
import { SchuelerLeistungsdaten, cast_de_nrw_schule_svws_core_data_schueler_SchuelerLeistungsdaten } from '../../../core/data/schueler/SchuelerLeistungsdaten';
import { JavaLong, cast_java_lang_Long } from '../../../java/lang/JavaLong';
import { SchuelerLernabschnittNachpruefungsdaten, cast_de_nrw_schule_svws_core_data_schueler_SchuelerLernabschnittNachpruefungsdaten } from '../../../core/data/schueler/SchuelerLernabschnittNachpruefungsdaten';
import { JavaString, cast_java_lang_String } from '../../../java/lang/JavaString';
import { SchuelerLernabschnittBemerkungen, cast_de_nrw_schule_svws_core_data_schueler_SchuelerLernabschnittBemerkungen } from '../../../core/data/schueler/SchuelerLernabschnittBemerkungen';
import { Vector, cast_java_util_Vector } from '../../../java/util/Vector';

export class SchuelerLernabschnittsdaten extends JavaObject {

	/**
	 * Die ID des Lernabschnitts in der Datenbank. 
	 */
	public id : number = 0;

	/**
	 * Die ID des Schülers, zu dem diese Lernabschnittdaten gehören. 
	 */
	public schuelerID : number = 0;

	/**
	 * Die ID des Schuljahresabschnitts, zu welchem diese Lernabschnittdaten gehören. 
	 */
	public schuljahresabschnitt : number = 0;

	/**
	 * Eine Nr, zur Unterscheidung von Lernabschnittsdaten, wenn beim Schüler mehrere Lernabschnitt in einem Schuljahresabschnitt vorliegen (z.B. Wechsel einer Klasse, NULL=aktueller Abschnitt, 1=vor dem ersten Wechsel, 2=vor dem zweiten Wechsel, usw.). 
	 */
	public wechselNr : Number | null = null;

	/**
	 * Das Datum, wann der Lernabschnitt beginnt 
	 */
	public datumAnfang : String | null = null;

	/**
	 * Das Datum, wann der Lernabschnitt endet 
	 */
	public datumEnde : String | null = null;

	/**
	 * Das Datum der Konferenz 
	 */
	public datumKonferenz : String | null = null;

	/**
	 * Das Datum des Zeugnisses bzw. der Laufbahnbescheinigung 
	 */
	public datumZeugnis : String | null = null;

	/**
	 * Die Anzahl der Schulbesuchsjahre 
	 */
	public anzahlSchulbesuchsjahre : Number | null = null;

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
	 * Die ID der Klasse des Schülers. 
	 */
	public klassenID : number = -1;

	/**
	 * Die ID der Folge-Klasse des Schülers, sofern dieser vom Standard der Klassentabelle abweicht. 
	 */
	public folgeklassenID : Number | null = null;

	/**
	 * Das Kürzel der Schulgliederung bzw. des Bildungsgangs des Schülers. 
	 */
	public schulgliederung : String | null = null;

	/**
	 * Die ID des Jahrgangs des Schülers 
	 */
	public jahrgangID : number = -1;

	/**
	 * Die ID der Fachklasse des Schülers an einem Berufskolleg 
	 */
	public fachklasseID : Number | null = null;

	/**
	 * Der Schwerpunkt eines Schülers laut dem Schwerpunkt-Katalog 
	 */
	public schwerpunktID : Number | null = null;

	/**
	 * Das Kürzel der Organisationsform der Schule in Bezug auf den Schüler (z.B. Ganztag - siehe Core-Type) 
	 */
	public organisationsform : String | null = null;

	/**
	 * Das Kürzel der Klassenart in Bezug auf den Schüler (z.B. Regelklasse - siehe Core-Type) 
	 */
	public Klassenart : String | null = "RK";

	/**
	 * Die Summe der Gesamtfehlstunden für den gesamten Lernabschnitt 
	 */
	public fehlstundenGesamt : number = 0;

	/**
	 * Die Summe der unentschuldigten Fehlstunden für den gesamten Lernabschnitt 
	 */
	public fehlstundenUnentschuldigt : number = 0;

	/**
	 * Der Grenzwert für die Fehlstunden, ab dem am Berufskolleg Warnbriefe zur Entlassung verschickt werden 
	 */
	public fehlstundenGrenzwert : Number | null = null;

	/**
	 * Gibt an, ob eine Schwerbehinderung nachgewiesen ist oder nicht 
	 */
	public hatSchwerbehinderungsNachweis : boolean = false;

	/**
	 * Gibt an, ob eine Förderung nach der Ausbildungsordnung Sonderpädagogischer Förderung (AOSF) vorliegt 
	 */
	public hatAOSF : boolean = false;

	/**
	 * Gibt an, ob eine Diagnose zu Autismus vorliegt oder nicht 
	 */
	public hatAutismus : boolean = false;

	/**
	 * Gibt an, ob zieldifferent unterrichet wird oder nicht 
	 */
	public hatZieldifferentenUnterricht : boolean = false;

	/**
	 * Die ID des Haupförderschwerpunktes des Schülers 
	 */
	public foerderschwerpunkt1ID : Number | null = null;

	/**
	 * Die ID des weiteren Förderschwerpunktes des Schülers 
	 */
	public foerderschwerpunkt2ID : Number | null = null;

	/**
	 * Die ID eines Sonderpädagogen, der den Schüler betreut und auch im Notenmodul hat 
	 */
	public sonderpaedagogeID : Number | null = null;

	/**
	 * Die Sprache des bilngualen Zweigs, falls der Schüler im bilingualen Zweig unterrichtet wird 
	 */
	public bilingualerZweig : String | null = null;

	/**
	 * Gibt für das Berufskolleg an, ob der fachpraktische Anteil in den Anlagen B08, B09 und B10 ausreichend sind für Versetzung 
	 */
	public istFachpraktischerAnteilAusreichend : boolean = true;

	/**
	 * Das Kürzel des Versetzungsvermerks 
	 */
	public versetzungsvermerk : String | null = null;

	/**
	 * Die Durchschnittsnote in diesem Lernabschnitt - wird ggf. von einem Prüfungsalgorithmus gesetzt und kann dann ausgelesen werden 
	 */
	public noteDurchschnitt : String | null = null;

	/**
	 * Die Lernbereichnote Gesellschaftswissenschaft oder Arbeitlehre für den Hauptschulabschluss nach Klassen 10 
	 */
	public noteLernbereichGSbzwAL : Number | null = null;

	/**
	 * Die Lernbereichnote Naturwissenschaft für den Hauptschulabschluss nach Klassen 10 
	 */
	public noteLernbereichNW : Number | null = null;

	/**
	 * Die Art des Abschlusses (siehe Katalog) 
	 */
	public abschlussart : Number | null = null;

	/**
	 * Gibt an, ob der berechnete Abschluss eine Prognose ist oder nicht (siehe Katalog) 
	 */
	public istAbschlussPrognose : boolean = false;

	/**
	 * Der erreichte allgemeinbildende Abschluss 
	 */
	public abschluss : String | null = null;

	/**
	 * Der erreichte berufsbezogene Abschluss am Berufskolleg 
	 */
	public abschlussBerufsbildend : String | null = null;

	/**
	 * Die textuelle Ausgabe des Prüfungsalgorithmus für die Versetzungs-/Abschlussberechnung 
	 */
	public textErgebnisPruefungsalgorithmus : String | null = null;

	/**
	 * Die Art des Zeugnisses 
	 */
	public zeugnisart : String | null = null;

	/**
	 * Die Informationen den Nachprüfungen in diesem Lernabschnitt oder null, falls keine vorhanden sind. 
	 */
	public nachpruefungen : SchuelerLernabschnittNachpruefungsdaten | null = null;

	/**
	 * Die Bemerkungen in diesem Lernabschnitt. 
	 */
	public bemerkungen : SchuelerLernabschnittBemerkungen = new SchuelerLernabschnittBemerkungen();

	/**
	 * Die Leistungsdaten des Schülers in diesem Lernabschnitt. 
	 */
	public leistungsdaten : Vector<SchuelerLeistungsdaten> = new Vector();


	public constructor() {
		super();
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.nrw.schule.svws.core.data.schueler.SchuelerLernabschnittsdaten'].includes(name);
	}

	public static transpilerFromJSON(json : string): SchuelerLernabschnittsdaten {
		const obj = JSON.parse(json);
		const result = new SchuelerLernabschnittsdaten();
		if (typeof obj.id === "undefined")
			 throw new Error('invalid json format, missing attribute id');
		result.id = obj.id;
		if (typeof obj.schuelerID === "undefined")
			 throw new Error('invalid json format, missing attribute schuelerID');
		result.schuelerID = obj.schuelerID;
		if (typeof obj.schuljahresabschnitt === "undefined")
			 throw new Error('invalid json format, missing attribute schuljahresabschnitt');
		result.schuljahresabschnitt = obj.schuljahresabschnitt;
		result.wechselNr = typeof obj.wechselNr === "undefined" ? null : obj.wechselNr === null ? null : Number(obj.wechselNr);
		result.datumAnfang = typeof obj.datumAnfang === "undefined" ? null : obj.datumAnfang === null ? null : String(obj.datumAnfang);
		result.datumEnde = typeof obj.datumEnde === "undefined" ? null : obj.datumEnde === null ? null : String(obj.datumEnde);
		result.datumKonferenz = typeof obj.datumKonferenz === "undefined" ? null : obj.datumKonferenz === null ? null : String(obj.datumKonferenz);
		result.datumZeugnis = typeof obj.datumZeugnis === "undefined" ? null : obj.datumZeugnis === null ? null : String(obj.datumZeugnis);
		result.anzahlSchulbesuchsjahre = typeof obj.anzahlSchulbesuchsjahre === "undefined" ? null : obj.anzahlSchulbesuchsjahre === null ? null : Number(obj.anzahlSchulbesuchsjahre);
		if (typeof obj.istGewertet === "undefined")
			 throw new Error('invalid json format, missing attribute istGewertet');
		result.istGewertet = obj.istGewertet;
		if (typeof obj.istWiederholung === "undefined")
			 throw new Error('invalid json format, missing attribute istWiederholung');
		result.istWiederholung = obj.istWiederholung;
		if (typeof obj.pruefungsOrdnung === "undefined")
			 throw new Error('invalid json format, missing attribute pruefungsOrdnung');
		result.pruefungsOrdnung = String(obj.pruefungsOrdnung);
		if (typeof obj.klassenID === "undefined")
			 throw new Error('invalid json format, missing attribute klassenID');
		result.klassenID = obj.klassenID;
		result.folgeklassenID = typeof obj.folgeklassenID === "undefined" ? null : obj.folgeklassenID === null ? null : Number(obj.folgeklassenID);
		result.schulgliederung = typeof obj.schulgliederung === "undefined" ? null : obj.schulgliederung === null ? null : String(obj.schulgliederung);
		if (typeof obj.jahrgangID === "undefined")
			 throw new Error('invalid json format, missing attribute jahrgangID');
		result.jahrgangID = obj.jahrgangID;
		result.fachklasseID = typeof obj.fachklasseID === "undefined" ? null : obj.fachklasseID === null ? null : Number(obj.fachklasseID);
		result.schwerpunktID = typeof obj.schwerpunktID === "undefined" ? null : obj.schwerpunktID === null ? null : Number(obj.schwerpunktID);
		result.organisationsform = typeof obj.organisationsform === "undefined" ? null : obj.organisationsform === null ? null : String(obj.organisationsform);
		result.Klassenart = typeof obj.Klassenart === "undefined" ? null : obj.Klassenart === null ? null : String(obj.Klassenart);
		if (typeof obj.fehlstundenGesamt === "undefined")
			 throw new Error('invalid json format, missing attribute fehlstundenGesamt');
		result.fehlstundenGesamt = obj.fehlstundenGesamt;
		if (typeof obj.fehlstundenUnentschuldigt === "undefined")
			 throw new Error('invalid json format, missing attribute fehlstundenUnentschuldigt');
		result.fehlstundenUnentschuldigt = obj.fehlstundenUnentschuldigt;
		result.fehlstundenGrenzwert = typeof obj.fehlstundenGrenzwert === "undefined" ? null : obj.fehlstundenGrenzwert === null ? null : Number(obj.fehlstundenGrenzwert);
		if (typeof obj.hatSchwerbehinderungsNachweis === "undefined")
			 throw new Error('invalid json format, missing attribute hatSchwerbehinderungsNachweis');
		result.hatSchwerbehinderungsNachweis = obj.hatSchwerbehinderungsNachweis;
		if (typeof obj.hatAOSF === "undefined")
			 throw new Error('invalid json format, missing attribute hatAOSF');
		result.hatAOSF = obj.hatAOSF;
		if (typeof obj.hatAutismus === "undefined")
			 throw new Error('invalid json format, missing attribute hatAutismus');
		result.hatAutismus = obj.hatAutismus;
		if (typeof obj.hatZieldifferentenUnterricht === "undefined")
			 throw new Error('invalid json format, missing attribute hatZieldifferentenUnterricht');
		result.hatZieldifferentenUnterricht = obj.hatZieldifferentenUnterricht;
		result.foerderschwerpunkt1ID = typeof obj.foerderschwerpunkt1ID === "undefined" ? null : obj.foerderschwerpunkt1ID === null ? null : Number(obj.foerderschwerpunkt1ID);
		result.foerderschwerpunkt2ID = typeof obj.foerderschwerpunkt2ID === "undefined" ? null : obj.foerderschwerpunkt2ID === null ? null : Number(obj.foerderschwerpunkt2ID);
		result.sonderpaedagogeID = typeof obj.sonderpaedagogeID === "undefined" ? null : obj.sonderpaedagogeID === null ? null : Number(obj.sonderpaedagogeID);
		result.bilingualerZweig = typeof obj.bilingualerZweig === "undefined" ? null : obj.bilingualerZweig === null ? null : String(obj.bilingualerZweig);
		if (typeof obj.istFachpraktischerAnteilAusreichend === "undefined")
			 throw new Error('invalid json format, missing attribute istFachpraktischerAnteilAusreichend');
		result.istFachpraktischerAnteilAusreichend = obj.istFachpraktischerAnteilAusreichend;
		result.versetzungsvermerk = typeof obj.versetzungsvermerk === "undefined" ? null : obj.versetzungsvermerk === null ? null : String(obj.versetzungsvermerk);
		result.noteDurchschnitt = typeof obj.noteDurchschnitt === "undefined" ? null : obj.noteDurchschnitt === null ? null : String(obj.noteDurchschnitt);
		result.noteLernbereichGSbzwAL = typeof obj.noteLernbereichGSbzwAL === "undefined" ? null : obj.noteLernbereichGSbzwAL === null ? null : Number(obj.noteLernbereichGSbzwAL);
		result.noteLernbereichNW = typeof obj.noteLernbereichNW === "undefined" ? null : obj.noteLernbereichNW === null ? null : Number(obj.noteLernbereichNW);
		result.abschlussart = typeof obj.abschlussart === "undefined" ? null : obj.abschlussart === null ? null : Number(obj.abschlussart);
		if (typeof obj.istAbschlussPrognose === "undefined")
			 throw new Error('invalid json format, missing attribute istAbschlussPrognose');
		result.istAbschlussPrognose = obj.istAbschlussPrognose;
		result.abschluss = typeof obj.abschluss === "undefined" ? null : obj.abschluss === null ? null : String(obj.abschluss);
		result.abschlussBerufsbildend = typeof obj.abschlussBerufsbildend === "undefined" ? null : obj.abschlussBerufsbildend === null ? null : String(obj.abschlussBerufsbildend);
		result.textErgebnisPruefungsalgorithmus = typeof obj.textErgebnisPruefungsalgorithmus === "undefined" ? null : obj.textErgebnisPruefungsalgorithmus === null ? null : String(obj.textErgebnisPruefungsalgorithmus);
		result.zeugnisart = typeof obj.zeugnisart === "undefined" ? null : obj.zeugnisart === null ? null : String(obj.zeugnisart);
		result.nachpruefungen = ((typeof obj.nachpruefungen === "undefined") || (obj.nachpruefungen === null)) ? null : SchuelerLernabschnittNachpruefungsdaten.transpilerFromJSON(JSON.stringify(obj.nachpruefungen));
		if (typeof obj.bemerkungen === "undefined")
			 throw new Error('invalid json format, missing attribute bemerkungen');
		result.bemerkungen = SchuelerLernabschnittBemerkungen.transpilerFromJSON(JSON.stringify(obj.bemerkungen));
		if (!!obj.leistungsdaten) {
			for (let elem of obj.leistungsdaten) {
				result.leistungsdaten?.add(SchuelerLeistungsdaten.transpilerFromJSON(JSON.stringify(elem)));
			}
		}
		return result;
	}

	public static transpilerToJSON(obj : SchuelerLernabschnittsdaten) : string {
		let result = '{';
		result += '"id" : ' + obj.id + ',';
		result += '"schuelerID" : ' + obj.schuelerID + ',';
		result += '"schuljahresabschnitt" : ' + obj.schuljahresabschnitt + ',';
		result += '"wechselNr" : ' + ((!obj.wechselNr) ? 'null' : obj.wechselNr.valueOf()) + ',';
		result += '"datumAnfang" : ' + ((!obj.datumAnfang) ? 'null' : '"' + obj.datumAnfang.valueOf() + '"') + ',';
		result += '"datumEnde" : ' + ((!obj.datumEnde) ? 'null' : '"' + obj.datumEnde.valueOf() + '"') + ',';
		result += '"datumKonferenz" : ' + ((!obj.datumKonferenz) ? 'null' : '"' + obj.datumKonferenz.valueOf() + '"') + ',';
		result += '"datumZeugnis" : ' + ((!obj.datumZeugnis) ? 'null' : '"' + obj.datumZeugnis.valueOf() + '"') + ',';
		result += '"anzahlSchulbesuchsjahre" : ' + ((!obj.anzahlSchulbesuchsjahre) ? 'null' : obj.anzahlSchulbesuchsjahre.valueOf()) + ',';
		result += '"istGewertet" : ' + obj.istGewertet + ',';
		result += '"istWiederholung" : ' + obj.istWiederholung + ',';
		result += '"pruefungsOrdnung" : ' + '"' + obj.pruefungsOrdnung.valueOf() + '"' + ',';
		result += '"klassenID" : ' + obj.klassenID + ',';
		result += '"folgeklassenID" : ' + ((!obj.folgeklassenID) ? 'null' : obj.folgeklassenID.valueOf()) + ',';
		result += '"schulgliederung" : ' + ((!obj.schulgliederung) ? 'null' : '"' + obj.schulgliederung.valueOf() + '"') + ',';
		result += '"jahrgangID" : ' + obj.jahrgangID + ',';
		result += '"fachklasseID" : ' + ((!obj.fachklasseID) ? 'null' : obj.fachklasseID.valueOf()) + ',';
		result += '"schwerpunktID" : ' + ((!obj.schwerpunktID) ? 'null' : obj.schwerpunktID.valueOf()) + ',';
		result += '"organisationsform" : ' + ((!obj.organisationsform) ? 'null' : '"' + obj.organisationsform.valueOf() + '"') + ',';
		result += '"Klassenart" : ' + ((!obj.Klassenart) ? 'null' : '"' + obj.Klassenart.valueOf() + '"') + ',';
		result += '"fehlstundenGesamt" : ' + obj.fehlstundenGesamt + ',';
		result += '"fehlstundenUnentschuldigt" : ' + obj.fehlstundenUnentschuldigt + ',';
		result += '"fehlstundenGrenzwert" : ' + ((!obj.fehlstundenGrenzwert) ? 'null' : obj.fehlstundenGrenzwert.valueOf()) + ',';
		result += '"hatSchwerbehinderungsNachweis" : ' + obj.hatSchwerbehinderungsNachweis + ',';
		result += '"hatAOSF" : ' + obj.hatAOSF + ',';
		result += '"hatAutismus" : ' + obj.hatAutismus + ',';
		result += '"hatZieldifferentenUnterricht" : ' + obj.hatZieldifferentenUnterricht + ',';
		result += '"foerderschwerpunkt1ID" : ' + ((!obj.foerderschwerpunkt1ID) ? 'null' : obj.foerderschwerpunkt1ID.valueOf()) + ',';
		result += '"foerderschwerpunkt2ID" : ' + ((!obj.foerderschwerpunkt2ID) ? 'null' : obj.foerderschwerpunkt2ID.valueOf()) + ',';
		result += '"sonderpaedagogeID" : ' + ((!obj.sonderpaedagogeID) ? 'null' : obj.sonderpaedagogeID.valueOf()) + ',';
		result += '"bilingualerZweig" : ' + ((!obj.bilingualerZweig) ? 'null' : '"' + obj.bilingualerZweig.valueOf() + '"') + ',';
		result += '"istFachpraktischerAnteilAusreichend" : ' + obj.istFachpraktischerAnteilAusreichend + ',';
		result += '"versetzungsvermerk" : ' + ((!obj.versetzungsvermerk) ? 'null' : '"' + obj.versetzungsvermerk.valueOf() + '"') + ',';
		result += '"noteDurchschnitt" : ' + ((!obj.noteDurchschnitt) ? 'null' : '"' + obj.noteDurchschnitt.valueOf() + '"') + ',';
		result += '"noteLernbereichGSbzwAL" : ' + ((!obj.noteLernbereichGSbzwAL) ? 'null' : obj.noteLernbereichGSbzwAL.valueOf()) + ',';
		result += '"noteLernbereichNW" : ' + ((!obj.noteLernbereichNW) ? 'null' : obj.noteLernbereichNW.valueOf()) + ',';
		result += '"abschlussart" : ' + ((!obj.abschlussart) ? 'null' : obj.abschlussart.valueOf()) + ',';
		result += '"istAbschlussPrognose" : ' + obj.istAbschlussPrognose + ',';
		result += '"abschluss" : ' + ((!obj.abschluss) ? 'null' : '"' + obj.abschluss.valueOf() + '"') + ',';
		result += '"abschlussBerufsbildend" : ' + ((!obj.abschlussBerufsbildend) ? 'null' : '"' + obj.abschlussBerufsbildend.valueOf() + '"') + ',';
		result += '"textErgebnisPruefungsalgorithmus" : ' + ((!obj.textErgebnisPruefungsalgorithmus) ? 'null' : '"' + obj.textErgebnisPruefungsalgorithmus.valueOf() + '"') + ',';
		result += '"zeugnisart" : ' + ((!obj.zeugnisart) ? 'null' : '"' + obj.zeugnisart.valueOf() + '"') + ',';
		result += '"nachpruefungen" : ' + ((!obj.nachpruefungen) ? 'null' : SchuelerLernabschnittNachpruefungsdaten.transpilerToJSON(obj.nachpruefungen)) + ',';
		result += '"bemerkungen" : ' + SchuelerLernabschnittBemerkungen.transpilerToJSON(obj.bemerkungen) + ',';
		if (!obj.leistungsdaten) {
			result += '"leistungsdaten" : []';
		} else {
			result += '"leistungsdaten" : [ ';
			for (let i : number = 0; i < obj.leistungsdaten.size(); i++) {
				let elem = obj.leistungsdaten.get(i);
				result += SchuelerLeistungsdaten.transpilerToJSON(elem);
				if (i < obj.leistungsdaten.size() - 1)
					result += ',';
			}
			result += ' ]' + ',';
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

	public static transpilerToJSONPatch(obj : Partial<SchuelerLernabschnittsdaten>) : string {
		let result = '{';
		if (typeof obj.id !== "undefined") {
			result += '"id" : ' + obj.id + ',';
		}
		if (typeof obj.schuelerID !== "undefined") {
			result += '"schuelerID" : ' + obj.schuelerID + ',';
		}
		if (typeof obj.schuljahresabschnitt !== "undefined") {
			result += '"schuljahresabschnitt" : ' + obj.schuljahresabschnitt + ',';
		}
		if (typeof obj.wechselNr !== "undefined") {
			result += '"wechselNr" : ' + ((!obj.wechselNr) ? 'null' : obj.wechselNr.valueOf()) + ',';
		}
		if (typeof obj.datumAnfang !== "undefined") {
			result += '"datumAnfang" : ' + ((!obj.datumAnfang) ? 'null' : '"' + obj.datumAnfang.valueOf() + '"') + ',';
		}
		if (typeof obj.datumEnde !== "undefined") {
			result += '"datumEnde" : ' + ((!obj.datumEnde) ? 'null' : '"' + obj.datumEnde.valueOf() + '"') + ',';
		}
		if (typeof obj.datumKonferenz !== "undefined") {
			result += '"datumKonferenz" : ' + ((!obj.datumKonferenz) ? 'null' : '"' + obj.datumKonferenz.valueOf() + '"') + ',';
		}
		if (typeof obj.datumZeugnis !== "undefined") {
			result += '"datumZeugnis" : ' + ((!obj.datumZeugnis) ? 'null' : '"' + obj.datumZeugnis.valueOf() + '"') + ',';
		}
		if (typeof obj.anzahlSchulbesuchsjahre !== "undefined") {
			result += '"anzahlSchulbesuchsjahre" : ' + ((!obj.anzahlSchulbesuchsjahre) ? 'null' : obj.anzahlSchulbesuchsjahre.valueOf()) + ',';
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
		if (typeof obj.klassenID !== "undefined") {
			result += '"klassenID" : ' + obj.klassenID + ',';
		}
		if (typeof obj.folgeklassenID !== "undefined") {
			result += '"folgeklassenID" : ' + ((!obj.folgeklassenID) ? 'null' : obj.folgeklassenID.valueOf()) + ',';
		}
		if (typeof obj.schulgliederung !== "undefined") {
			result += '"schulgliederung" : ' + ((!obj.schulgliederung) ? 'null' : '"' + obj.schulgliederung.valueOf() + '"') + ',';
		}
		if (typeof obj.jahrgangID !== "undefined") {
			result += '"jahrgangID" : ' + obj.jahrgangID + ',';
		}
		if (typeof obj.fachklasseID !== "undefined") {
			result += '"fachklasseID" : ' + ((!obj.fachklasseID) ? 'null' : obj.fachklasseID.valueOf()) + ',';
		}
		if (typeof obj.schwerpunktID !== "undefined") {
			result += '"schwerpunktID" : ' + ((!obj.schwerpunktID) ? 'null' : obj.schwerpunktID.valueOf()) + ',';
		}
		if (typeof obj.organisationsform !== "undefined") {
			result += '"organisationsform" : ' + ((!obj.organisationsform) ? 'null' : '"' + obj.organisationsform.valueOf() + '"') + ',';
		}
		if (typeof obj.Klassenart !== "undefined") {
			result += '"Klassenart" : ' + ((!obj.Klassenart) ? 'null' : '"' + obj.Klassenart.valueOf() + '"') + ',';
		}
		if (typeof obj.fehlstundenGesamt !== "undefined") {
			result += '"fehlstundenGesamt" : ' + obj.fehlstundenGesamt + ',';
		}
		if (typeof obj.fehlstundenUnentschuldigt !== "undefined") {
			result += '"fehlstundenUnentschuldigt" : ' + obj.fehlstundenUnentschuldigt + ',';
		}
		if (typeof obj.fehlstundenGrenzwert !== "undefined") {
			result += '"fehlstundenGrenzwert" : ' + ((!obj.fehlstundenGrenzwert) ? 'null' : obj.fehlstundenGrenzwert.valueOf()) + ',';
		}
		if (typeof obj.hatSchwerbehinderungsNachweis !== "undefined") {
			result += '"hatSchwerbehinderungsNachweis" : ' + obj.hatSchwerbehinderungsNachweis + ',';
		}
		if (typeof obj.hatAOSF !== "undefined") {
			result += '"hatAOSF" : ' + obj.hatAOSF + ',';
		}
		if (typeof obj.hatAutismus !== "undefined") {
			result += '"hatAutismus" : ' + obj.hatAutismus + ',';
		}
		if (typeof obj.hatZieldifferentenUnterricht !== "undefined") {
			result += '"hatZieldifferentenUnterricht" : ' + obj.hatZieldifferentenUnterricht + ',';
		}
		if (typeof obj.foerderschwerpunkt1ID !== "undefined") {
			result += '"foerderschwerpunkt1ID" : ' + ((!obj.foerderschwerpunkt1ID) ? 'null' : obj.foerderschwerpunkt1ID.valueOf()) + ',';
		}
		if (typeof obj.foerderschwerpunkt2ID !== "undefined") {
			result += '"foerderschwerpunkt2ID" : ' + ((!obj.foerderschwerpunkt2ID) ? 'null' : obj.foerderschwerpunkt2ID.valueOf()) + ',';
		}
		if (typeof obj.sonderpaedagogeID !== "undefined") {
			result += '"sonderpaedagogeID" : ' + ((!obj.sonderpaedagogeID) ? 'null' : obj.sonderpaedagogeID.valueOf()) + ',';
		}
		if (typeof obj.bilingualerZweig !== "undefined") {
			result += '"bilingualerZweig" : ' + ((!obj.bilingualerZweig) ? 'null' : '"' + obj.bilingualerZweig.valueOf() + '"') + ',';
		}
		if (typeof obj.istFachpraktischerAnteilAusreichend !== "undefined") {
			result += '"istFachpraktischerAnteilAusreichend" : ' + obj.istFachpraktischerAnteilAusreichend + ',';
		}
		if (typeof obj.versetzungsvermerk !== "undefined") {
			result += '"versetzungsvermerk" : ' + ((!obj.versetzungsvermerk) ? 'null' : '"' + obj.versetzungsvermerk.valueOf() + '"') + ',';
		}
		if (typeof obj.noteDurchschnitt !== "undefined") {
			result += '"noteDurchschnitt" : ' + ((!obj.noteDurchschnitt) ? 'null' : '"' + obj.noteDurchschnitt.valueOf() + '"') + ',';
		}
		if (typeof obj.noteLernbereichGSbzwAL !== "undefined") {
			result += '"noteLernbereichGSbzwAL" : ' + ((!obj.noteLernbereichGSbzwAL) ? 'null' : obj.noteLernbereichGSbzwAL.valueOf()) + ',';
		}
		if (typeof obj.noteLernbereichNW !== "undefined") {
			result += '"noteLernbereichNW" : ' + ((!obj.noteLernbereichNW) ? 'null' : obj.noteLernbereichNW.valueOf()) + ',';
		}
		if (typeof obj.abschlussart !== "undefined") {
			result += '"abschlussart" : ' + ((!obj.abschlussart) ? 'null' : obj.abschlussart.valueOf()) + ',';
		}
		if (typeof obj.istAbschlussPrognose !== "undefined") {
			result += '"istAbschlussPrognose" : ' + obj.istAbschlussPrognose + ',';
		}
		if (typeof obj.abschluss !== "undefined") {
			result += '"abschluss" : ' + ((!obj.abschluss) ? 'null' : '"' + obj.abschluss.valueOf() + '"') + ',';
		}
		if (typeof obj.abschlussBerufsbildend !== "undefined") {
			result += '"abschlussBerufsbildend" : ' + ((!obj.abschlussBerufsbildend) ? 'null' : '"' + obj.abschlussBerufsbildend.valueOf() + '"') + ',';
		}
		if (typeof obj.textErgebnisPruefungsalgorithmus !== "undefined") {
			result += '"textErgebnisPruefungsalgorithmus" : ' + ((!obj.textErgebnisPruefungsalgorithmus) ? 'null' : '"' + obj.textErgebnisPruefungsalgorithmus.valueOf() + '"') + ',';
		}
		if (typeof obj.zeugnisart !== "undefined") {
			result += '"zeugnisart" : ' + ((!obj.zeugnisart) ? 'null' : '"' + obj.zeugnisart.valueOf() + '"') + ',';
		}
		if (typeof obj.nachpruefungen !== "undefined") {
			result += '"nachpruefungen" : ' + ((!obj.nachpruefungen) ? 'null' : SchuelerLernabschnittNachpruefungsdaten.transpilerToJSON(obj.nachpruefungen)) + ',';
		}
		if (typeof obj.bemerkungen !== "undefined") {
			result += '"bemerkungen" : ' + SchuelerLernabschnittBemerkungen.transpilerToJSON(obj.bemerkungen) + ',';
		}
		if (typeof obj.leistungsdaten !== "undefined") {
			if (!obj.leistungsdaten) {
				result += '"leistungsdaten" : []';
			} else {
				result += '"leistungsdaten" : [ ';
				for (let i : number = 0; i < obj.leistungsdaten.size(); i++) {
					let elem = obj.leistungsdaten.get(i);
					result += SchuelerLeistungsdaten.transpilerToJSON(elem);
					if (i < obj.leistungsdaten.size() - 1)
						result += ',';
				}
				result += ' ]' + ',';
			}
		}
		result = result.slice(0, -1);
		result += '}';
		return result;
	}

}

export function cast_de_nrw_schule_svws_core_data_schueler_SchuelerLernabschnittsdaten(obj : unknown) : SchuelerLernabschnittsdaten {
	return obj as SchuelerLernabschnittsdaten;
}
