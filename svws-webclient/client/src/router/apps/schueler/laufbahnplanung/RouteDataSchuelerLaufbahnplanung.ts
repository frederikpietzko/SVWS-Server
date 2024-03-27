import type { Abiturdaten, ApiFile, GostBlockungListeneintrag, GostBlockungsergebnis, GostLaufbahnplanungDaten, GostSchuelerFachwahl, LehrerListeEintrag, SchuelerListeEintrag } from "@core";
import {
	AbiturdatenManager,
	BenutzerTyp,
	GostBelegpruefungErgebnis,
	GostBelegpruefungsArt,
	GostFaecherManager,
	GostJahrgang,
	GostJahrgangsdaten,
	GostLaufbahnplanungBeratungsdaten,
	GostHalbjahr,
	DeveloperNotificationException,
	ArrayList,
	ReportingAusgabedaten, ReportingAusgabeformat, ReportingReportvorlage
} from "@core";

import { api } from "~/router/Api";
import { RouteData, type RouteStateInterface } from "~/router/RouteData";
import { RouteManager } from "~/router/RouteManager";


interface RouteStateSchuelerLaufbahnplanung extends RouteStateInterface {
	auswahl: SchuelerListeEintrag | undefined;
	abiturdaten: Abiturdaten | undefined;
	abiturdatenManager: AbiturdatenManager | undefined;
	faecherManager: GostFaecherManager;
	gostBelegpruefungErgebnis: GostBelegpruefungErgebnis;
	gostJahrgang: GostJahrgang;
	gostJahrgangsdaten: GostJahrgangsdaten;
	gostLaufbahnBeratungsdaten: GostLaufbahnplanungBeratungsdaten;
	mapLehrer: Map<number, LehrerListeEintrag>;
	zwischenspeicher: GostLaufbahnplanungDaten | undefined;
}

const defaultState = <RouteStateSchuelerLaufbahnplanung> {
	auswahl: undefined,
	abiturdaten: undefined,
	abiturdatenManager: undefined,
	faecherManager: new GostFaecherManager(),
	gostBelegpruefungErgebnis: new GostBelegpruefungErgebnis(),
	gostJahrgang: new GostJahrgang(),
	gostJahrgangsdaten: new GostJahrgangsdaten(),
	gostLaufbahnBeratungsdaten: new GostLaufbahnplanungBeratungsdaten(),
	mapLehrer: new Map(),
	zwischenspeicher: undefined,
};

export class RouteDataSchuelerLaufbahnplanung extends RouteData<RouteStateSchuelerLaufbahnplanung> {

	public constructor() {
		super(defaultState);
	}

	public async clear() {
		this.setPatchedDefaultState({});
	}

	public async ladeFachkombinationen() {
		if (this._state.value.gostJahrgang === undefined)
			return;
	}

	get auswahl(): SchuelerListeEintrag {
		if (this._state.value.auswahl === undefined)
			throw new DeveloperNotificationException("Unerwarteter Fehler: Schülerauswahl nicht festgelegt, es können keine Informationen zur Laufbahnplanung abgerufen oder eingegeben werden.");
		return this._state.value.auswahl;
	}

	get gostJahrgangsdaten(): GostJahrgangsdaten {
		return this._state.value.gostJahrgangsdaten;
	}

	get gostBelegpruefungErgebnis(): GostBelegpruefungErgebnis {
		return this._state.value.gostBelegpruefungErgebnis;
	}

	get gostLaufbahnBeratungsdaten(): GostLaufbahnplanungBeratungsdaten {
		return this._state.value.gostLaufbahnBeratungsdaten;
	}

	get mapLehrer(): Map<number, LehrerListeEintrag> {
		return this._state.value.mapLehrer;
	}

	get faechermanager(): GostFaecherManager {
		if (this._state.value.faecherManager === undefined)
			throw new DeveloperNotificationException("Unerwarteter Fehler: Fächer-Manager nicht initialisiert");
		return this._state.value.faecherManager;
	}
	set faecherManager(faecherManager: GostFaecherManager | undefined) {
		this.setPatchedState({ faecherManager })
	}

	get abiturdatenManager(): AbiturdatenManager {
		if (this._state.value.abiturdatenManager === undefined)
			throw new DeveloperNotificationException("Unerwarteter Fehler: Abiturdaten-Manager nicht initialisiert");
		return this._state.value.abiturdatenManager;
	}
	set abiturdatenManager(abiturdatenManager: AbiturdatenManager | undefined) {
		this.setPatchedState({ abiturdatenManager });
	}

	get id(): number | undefined {
		const { typ, typID } = api.benutzerdaten;
		return BenutzerTyp.getByID(typ) === BenutzerTyp.LEHRER ? typID : undefined;
	}

	get zwischenspeicher(): GostLaufbahnplanungDaten | undefined {
		return this._state.value.zwischenspeicher;
	}

	get modus(): 'manuell'|'normal'|'hochschreiben' {
		const s = api.config.getValue("app.schueler.laufbahnplanung.modus");
		if (s === 'manuell' || s === 'normal' || s === 'hochschreiben')
			return s;
		void api.config.setValue("app.schueler.laufbahnplanung.modus", 'normal');
		throw new DeveloperNotificationException("Es wurde eine fehlerhafte Modusart als Standardauswahl hinterlegt");
	}

	setModus = async (modus: 'manuell' | 'normal' | 'hochschreiben') => {
		await api.config.setValue("app.schueler.laufbahnplanung.modus", modus);
	}

	get faecherAnzeigen(): 'alle' | 'nur_waehlbare' | 'nur_gewaehlt' {
		const s = api.config.getValue("app.schueler.laufbahnplanung.faecher.anzeigen");
		if (s === 'alle' || s === 'nur_waehlbare' || s === 'nur_gewaehlt')
			return s;
		void api.config.setValue("app.schueler.laufbahnplanung.faecher.anzeigen", 'alle');
		throw new DeveloperNotificationException("Es wurde eine fehlerhafter Wert als Standardauswahl hinterlegt");
	}

	setFaecherAnzeigen = async (value: 'alle' | 'nur_waehlbare' | 'nur_gewaehlt') => {
		await api.config.setValue("app.schueler.laufbahnplanung.faecher.anzeigen", value);
		this.commit();
	}

	createAbiturdatenmanager = (daten?: Abiturdaten): AbiturdatenManager | undefined => {
		const abiturdaten = daten || this._state.value.abiturdaten;
		if (abiturdaten === undefined)
			return;
		const art = this.gostBelegpruefungsArt;
		if (art === 'ef1')
			return new AbiturdatenManager(abiturdaten, this._state.value.gostJahrgangsdaten, this._state.value.faecherManager, GostBelegpruefungsArt.EF1);
		if (art === 'gesamt')
			return new AbiturdatenManager(abiturdaten, this._state.value.gostJahrgangsdaten, this._state.value.faecherManager, GostBelegpruefungsArt.GESAMT);
		const abiturdatenManager = new AbiturdatenManager(abiturdaten, this._state.value.gostJahrgangsdaten, this._state.value.faecherManager, GostBelegpruefungsArt.GESAMT);
		if (abiturdatenManager.pruefeBelegungExistiert(abiturdatenManager.getFachbelegungen()), GostHalbjahr.EF2, GostHalbjahr.Q11, GostHalbjahr.Q12, GostHalbjahr.Q21, GostHalbjahr.Q22)
			return abiturdatenManager;
		return new AbiturdatenManager(abiturdaten, this._state.value.gostJahrgangsdaten, this._state.value.faecherManager, GostBelegpruefungsArt.EF1);
	}

	setGostBelegpruefungErgebnis = async () => {
		const abiturdatenManager = this.createAbiturdatenmanager();
		if (abiturdatenManager === undefined)
			return;
		const gostBelegpruefungErgebnis = abiturdatenManager.getBelegpruefungErgebnis();
		this.setPatchedState({ abiturdatenManager, gostBelegpruefungErgebnis });
	}

	setWahl = api.call(async (fachID: number, wahl: GostSchuelerFachwahl) => {
		await api.server.patchGostSchuelerFachwahl(wahl, api.schema, this.auswahl.id, fachID);
		const abiturdaten = await api.server.getGostSchuelerLaufbahnplanung(api.schema, this.auswahl.id);
		this._state.value.abiturdaten = abiturdaten;
		await this.setGostBelegpruefungErgebnis();
	});

	getPdfWahlbogen = async(title: string) => {
		const list = new ArrayList<number>();
		list.add(this.auswahl.id);
		const reportingAusgabedaten = new ReportingAusgabedaten();
		reportingAusgabedaten.idSchuljahresabschnitt = api.abschnitt.id;
		reportingAusgabedaten.reportvorlage = ReportingReportvorlage.SCHUELER_v_GOST_LAUFBAHNPLANUNG_WAHLBOGEN.getBezeichnung();
		reportingAusgabedaten.idsHauptdaten = list;
		reportingAusgabedaten.einzelausgabeHauptdaten = false;
		switch (title) {
			case 'Laufbahnwahlbogen':
				reportingAusgabedaten.detailLevel = 1;
				return await api.server.pdfReport(reportingAusgabedaten, api.schema);
			case 'Laufbahnwahlbogen (nur Belegung)':
				reportingAusgabedaten.detailLevel = 0;
				return await api.server.pdfReport(reportingAusgabedaten, api.schema);
			default:
				throw new DeveloperNotificationException('Es wurde kein passender Parameter zur Erzeugung des PDF übergeben.')
		}
	}

	exportLaufbahnplanung = api.call(async (): Promise<ApiFile> => {
		return await api.server.exportGostSchuelerLaufbahnplanung(api.schema, this.auswahl.id);
	});

	importLaufbahnplanung = api.call(async (data: FormData): Promise<boolean> => {
		const res = await api.runSimpleOperation(async () => {
			return await api.server.importGostSchuelerLaufbahnplanung(data, api.schema, this.auswahl.id);
		}, [ 409 ]);
		const abiturdaten = await api.server.getGostSchuelerLaufbahnplanung(api.schema, this.auswahl.id);
		const abiturdatenManager = this.createAbiturdatenmanager(abiturdaten);
		if (abiturdatenManager === undefined)
			return false;
		const gostBelegpruefungErgebnis = abiturdatenManager.getBelegpruefungErgebnis();
		this.setPatchedState({abiturdaten, abiturdatenManager, gostBelegpruefungErgebnis});
		return res.success;
	});

	patchBeratungsdaten = api.call(async (data : Partial<GostLaufbahnplanungBeratungsdaten>) => {
		await api.server.patchGostSchuelerLaufbahnplanungBeratungsdaten(data, api.schema, this.auswahl.id);
		const gostLaufbahnBeratungsdaten = this.gostLaufbahnBeratungsdaten;
		this.setPatchedState({gostLaufbahnBeratungsdaten: Object.assign(gostLaufbahnBeratungsdaten, data)});
	});

	saveLaufbahnplanung = api.call(async (): Promise<void> => {
		const zwischenspeicher = await api.server.exportGostSchuelerLaufbahnplanungsdaten(api.schema, this.auswahl.id);
		this.setPatchedState({zwischenspeicher});
	});

	restoreLaufbahnplanung = api.call(async (): Promise<void> => {
		if (this._state.value.zwischenspeicher === undefined)
			return;
		await api.server.importGostSchuelerLaufbahnplanungsdaten(this._state.value.zwischenspeicher, api.schema, this.auswahl.id);
		const abiturdaten = await api.server.getGostSchuelerLaufbahnplanung(api.schema, this.auswahl.id);
		const abiturdatenManager = this.createAbiturdatenmanager(abiturdaten);
		if (abiturdatenManager === undefined)
			return;
		const gostBelegpruefungErgebnis = abiturdatenManager.getBelegpruefungErgebnis();
		this.setPatchedState({zwischenspeicher: undefined, abiturdaten, abiturdatenManager, gostBelegpruefungErgebnis});
	});

	get gostBelegpruefungsArt(): 'ef1'|'gesamt'|'auto' {
		const s = api.config.getValue("app.gost.belegpruefungsart");
		if (s === 'ef1' || s === 'gesamt' || s === 'auto')
			return s;
		void api.config.setValue("app.gost.belegpruefungsart", 'auto');
		throw new DeveloperNotificationException("Es wurde eine fehlerhafte Belegpruefungsart als Standardauswahl hinterlegt");
	}

	setGostBelegpruefungsArt = async (gostBelegpruefungsArt: 'ef1'|'gesamt'|'auto') => {
		await api.config.setValue("app.gost.belegpruefungsart", gostBelegpruefungsArt);
		await this.setGostBelegpruefungErgebnis();
	}

	public async ladeDaten(auswahl: SchuelerListeEintrag | null) {
		if (auswahl === this._state.value.auswahl)
			return;
		if (auswahl === null)
			this.setPatchedDefaultState({});
		else {
			const gostJahrgang = new GostJahrgang();
			if (auswahl.abiturjahrgang !== null)
				gostJahrgang.abiturjahr = auswahl.abiturjahrgang;
			gostJahrgang.jahrgang = auswahl.jahrgang;
			try {
				const abiturdaten = await api.server.getGostSchuelerLaufbahnplanung(api.schema, auswahl.id);
				const gostJahrgangsdaten = await api.server.getGostAbiturjahrgang(api.schema, gostJahrgang.abiturjahr);
				const gostLaufbahnBeratungsdaten = await api.server.getGostSchuelerLaufbahnplanungBeratungsdaten(api.schema, auswahl.id);
				const listGostFaecher = await api.server.getGostAbiturjahrgangFaecher(api.schema, gostJahrgang.abiturjahr);
				const faecherManager = new GostFaecherManager(listGostFaecher);
				const listFachkombinationen	= await api.server.getGostAbiturjahrgangFachkombinationen(api.schema, gostJahrgang.abiturjahr);
				faecherManager.addFachkombinationenAll(listFachkombinationen);
				const listLehrer = await api.server.getLehrer(api.schema);
				const mapLehrer = new Map<number, LehrerListeEintrag>();
				for (const l of listLehrer)
					mapLehrer.set(l.id, l);
				this.setPatchedState({ auswahl, abiturdaten, gostJahrgang, gostJahrgangsdaten, gostLaufbahnBeratungsdaten, faecherManager, mapLehrer, zwischenspeicher: undefined })
				await this.setGostBelegpruefungErgebnis();
			} catch(error) {
				throw new DeveloperNotificationException("Die Laufbahndaten konnten nicht eingeholt werden, sind für diesen Schüler Laufbahndaten möglich?")
			}
		}
	}

	resetFachwahlen = api.call(async () => {
		await api.server.resetGostSchuelerFachwahlen(api.schema, this.auswahl.id);
		const abiturdaten = await api.server.getGostSchuelerLaufbahnplanung(api.schema, this.auswahl.id);
		this._state.value.abiturdaten = abiturdaten;
		await this.setGostBelegpruefungErgebnis();
	});


	gotoKursblockung = api.call(async (halbjahr: GostHalbjahr): Promise<void> => {
		// Bestimme die Liste der Blockungen
		const blockungsliste = await api.server.getGostAbiturjahrgangBlockungsliste(api.schema, this.gostJahrgangsdaten.abiturjahr, halbjahr.id);
		if (blockungsliste.isEmpty())
			return;
		// Bestimme die aktive Blockung, falls gesetzt, sonst nehme das erste in der Liste
		let blockungseintrag: GostBlockungListeneintrag | undefined = undefined;
		for (const e of blockungsliste) {
			if (e.istAktiv) {
				blockungseintrag = e;
				break;
			}
		}
		if (blockungseintrag === undefined)
			blockungseintrag = blockungsliste.get(0);
		// Bestimme die Daten der Blockung mit der Ergebnisliste
		const blockungsdaten = await api.server.getGostBlockung(api.schema, blockungseintrag.id);
		if (blockungsdaten.ergebnisse.isEmpty())
			return;
		// Bestimme das aktive Ergebnis, falls gesetzt, sonst nehme das erste in der Liste
		let ergebnis: GostBlockungsergebnis | undefined = undefined;
		for (const e of blockungsdaten.ergebnisse) {
			if (e.istAktiv) {
				ergebnis = e;
				break;
			}
		}
		if (ergebnis === undefined)
			ergebnis = blockungsdaten.ergebnisse.get(0);
		await RouteManager.doRoute({ name: "gost.kursplanung.schueler", params: { abiturjahr: this.gostJahrgangsdaten.abiturjahr, halbjahr: halbjahr.id, idblockung: blockungsdaten.id, idergebnis: ergebnis.id, idschueler : this.auswahl.id }});
	});

}
