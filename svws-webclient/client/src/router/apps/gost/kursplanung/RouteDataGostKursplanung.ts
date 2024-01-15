
import { type Ref, ref, shallowRef, computed } from "vue";
import type { ApiPendingData } from "~/components/ApiStatus";
import type { ApiFile, GostBlockungKurs, GostBlockungKursLehrer, GostBlockungListeneintrag, GostBlockungRegel, GostBlockungSchiene, GostBlockungsdaten, GostBlockungsergebnisKurs, GostJahrgangsdaten, GostStatistikFachwahl, JavaSet, LehrerListeEintrag, List, SchuelerListeEintrag, Schuljahresabschnitt } from "@core";
import { ArrayList, DeveloperNotificationException, GostBlockungsdatenManager, GostBlockungsergebnisListeneintrag, GostBlockungsergebnisManager, GostFaecherManager, GostHalbjahr, HashSet, SchuelerStatus } from "@core";

import { api } from "~/router/Api";
import { RouteManager } from "~/router/RouteManager";
import { RouteData, type RouteStateInterface } from "~/router/RouteData";
import { routeGostKursplanung } from "~/router/apps/gost/kursplanung/RouteGostKursplanung";
import { routeGostKursplanungSchueler } from "~/router/apps/gost/kursplanung/RouteGostKursplanungSchueler";

import { GostKursplanungSchuelerFilter } from "~/components/gost/kursplanung/GostKursplanungSchuelerFilter";

interface RouteStateGostKursplanung extends RouteStateInterface {
	// Daten nur abhängig von dem Abiturjahrgang
	abiturjahr: number | undefined;
	jahrgangsdaten: GostJahrgangsdaten | undefined;
	mapSchueler: Map<number, SchuelerListeEintrag>;
	faecherManager: GostFaecherManager;
	mapFachwahlStatistik: Map<number, GostStatistikFachwahl>;
	// ... die mit dem Abiturjahrgang aktualisiert/mitgeladen werden
	mapLehrer: Map<number, LehrerListeEintrag>;
	// ... auch abhängig vom ausgewählten Halbjahr der gymnasialen Oberstufe
	halbjahr: GostHalbjahr;
	mapBlockungen: Map<number, GostBlockungListeneintrag>;
	existiertSchuljahresabschnitt: boolean;
	// ...auch abhängig von der ausgewählten Blockung
	auswahlBlockung: GostBlockungListeneintrag | undefined;
	datenmanager: GostBlockungsdatenManager | undefined;
	// ...auch abhängig von dem ausgewählten Blockungsergebnis
	auswahlErgebnis: GostBlockungsergebnisListeneintrag | undefined;
	ergebnismanager: GostBlockungsergebnisManager | undefined;
	schuelerFilter: GostKursplanungSchuelerFilter | undefined;
	// ... auch abhängig von dem ausgewählten Schüler
	auswahlSchueler: SchuelerListeEintrag | undefined;
}

const defaultState = <RouteStateGostKursplanung> {
	abiturjahr: undefined,
	jahrgangsdaten: undefined,
	mapSchueler: new Map(),
	faecherManager: new GostFaecherManager(),
	mapFachwahlStatistik: new Map(),
	mapLehrer: new Map(),
	halbjahr: GostHalbjahr.EF1,
	mapBlockungen: new Map(),
	existiertSchuljahresabschnitt: false,
	auswahlBlockung: undefined,
	datenmanager: undefined,
	auswahlErgebnis: undefined,
	ergebnismanager: undefined,
	schuelerFilter: undefined,
	auswahlSchueler: undefined,
};


export class RouteDataGostKursplanung extends RouteData<RouteStateGostKursplanung> {

	public constructor() {
		super(defaultState);
	}

	private _kursauswahl = ref<Set<number>>(new Set<number>());


	public get hatAbiturjahr(): boolean {
		return this._state.value.abiturjahr !== undefined;
	}

	public get abiturjahrIstVorlage() : boolean {
		return (this._state.value.abiturjahr !== undefined) && (this._state.value.abiturjahr === -1);
	}

	public get abiturjahr() : number {
		if (this._state.value.abiturjahr === undefined)
			throw new Error("Es wurde noch kein Abiturjahrgang geladen.");
		return this._state.value.abiturjahr;
	}

	public setAbiturjahr = async (abiturjahr: number | undefined) => {
		if (abiturjahr === this._state.value.abiturjahr)
			return;
		if (abiturjahr === undefined) {
			this.setDefaultState();
			return;
		}
		api.status.start();
		// Lade die Daten für die Kursplanung, die nur vom Abiturjahrgang abhängen
		const jahrgangsdaten = await api.server.getGostAbiturjahrgang(api.schema, abiturjahr)
		const listSchueler = await api.server.getGostAbiturjahrgangSchueler(api.schema, abiturjahr);
		const listFaecher = await api.server.getGostAbiturjahrgangFaecher(api.schema, abiturjahr);
		const faecherManager = new GostFaecherManager(listFaecher);
		// Lade die Schülerliste des Abiturjahrgangs
		const mapSchueler = new Map<number, SchuelerListeEintrag>();
		for (const s of listSchueler) {
			const status = SchuelerStatus.fromID(s.status);
			if ((status !== null) && ([SchuelerStatus.AKTIV, SchuelerStatus.EXTERN, SchuelerStatus.ABSCHLUSS, SchuelerStatus.BEURLAUBT, SchuelerStatus.NEUAUFNAHME].includes(status)))
				mapSchueler.set(s.id, s);
		}
		// Lade die Lehrerliste
		const listLehrer = await api.server.getLehrer(api.schema);
		const mapLehrer: Map<number, LehrerListeEintrag> = new Map();
		for (const l of listLehrer)
			mapLehrer.set(l.id, l);
		// Bestimme die Kurssortierung
		api.status.stop();
		// Setze den State neu
		this.setPatchedDefaultState({
			abiturjahr,
			jahrgangsdaten,
			mapSchueler,
			faecherManager,
			mapLehrer,
			halbjahr: this._state.value.halbjahr,
		});
	}

	public get jahrgangsdaten(): GostJahrgangsdaten {
		if (this._state.value.jahrgangsdaten === undefined)
			throw new Error("Es wurde noch kein Abiturjahrgang geladen, so dass keine Jahrgangsdaten zur Verfügung stehen.");
		return this._state.value.jahrgangsdaten;
	}

	public get mapSchueler(): Map<number, SchuelerListeEintrag> {
		return this._state.value.mapSchueler;
	}

	public get faecherManager() : GostFaecherManager {
		return this._state.value.faecherManager;
	}

	public get mapFachwahlStatistik() : Map<number, GostStatistikFachwahl> {
		return this._state.value.mapFachwahlStatistik;
	}

	public get mapLehrer(): Map<number, LehrerListeEintrag> {
		return this._state.value.mapLehrer;
	}

	public get halbjahr() : GostHalbjahr {
		return this._state.value.halbjahr;
	}

	public setHalbjahr = async (halbjahr: GostHalbjahr): Promise<boolean> => {
		if (this._state.value.abiturjahr === undefined)
			throw new Error("Es kann kein Halbjahr ausgewählt werden, wenn zuvor kein Abiturjahrgang ausgewählt wurde.");
		if (halbjahr === this._state.value.halbjahr)
			return false;
		// Lade die Liste der Blockungen
		api.status.start();
		const listBlockungen = await api.server.getGostAbiturjahrgangBlockungsliste(api.schema, this.abiturjahr, halbjahr.id);
		const mapBlockungen: Map<number, GostBlockungListeneintrag> = new Map();
		for (const bl of listBlockungen)
			mapBlockungen.set(bl.id, bl);
		let auswahlBlockung: GostBlockungListeneintrag | undefined = undefined;
		if (listBlockungen.size() > 0) {
			for (const bl of listBlockungen) {
				if (bl.istAktiv === true) {
					auswahlBlockung = bl;
					break;
				}
			}
			if (auswahlBlockung === undefined)
				auswahlBlockung = listBlockungen.get(0);
		}
		const schuljahr = halbjahr.getSchuljahrFromAbiturjahr(this._state.value.abiturjahr);
		const abschnitt : Schuljahresabschnitt | undefined = api.getAbschnittBySchuljahrUndHalbjahr(schuljahr, halbjahr.halbjahr);
		const existiertSchuljahresabschnitt = (abschnitt !== undefined);
		api.status.stop();
		this._kursauswahl.value.clear();
		this.setPatchedState({
			halbjahr,
			mapBlockungen,
			existiertSchuljahresabschnitt,
			auswahlBlockung,
			datenmanager: undefined,
			auswahlErgebnis: undefined,
			ergebnismanager: undefined,
			schuelerFilter: undefined,
		});
		return true;
	}

	public get existiertSchuljahresabschnitt() : boolean {
		return this._state.value.existiertSchuljahresabschnitt;
	}

	public get hatBlockung(): boolean {
		return this._state.value.datenmanager !== undefined;
	}

	public get mapBlockungen(): Map<number, GostBlockungListeneintrag> {
		return this._state.value.mapBlockungen;
	}

	public get auswahlBlockung() : GostBlockungListeneintrag {
		if (this._state.value.auswahlBlockung === undefined)
			throw new Error("Es wurde noch keine gültige Blockung ausgewählt.");
		return this._state.value.auswahlBlockung;
	}

	public setAuswahlBlockung = async (value: GostBlockungListeneintrag | undefined, force?: boolean) => {
		if (this._state.value.abiturjahr === undefined)
			throw new Error("Es kann keine Blockung ausgewählt werden, wenn zuvor kein Abiturjahrgang ausgewählt wurde.");
		if (!force && (this._state.value.auswahlBlockung?.id === value?.id) && (this._state.value.datenmanager !== undefined))
			return;
		if (value === undefined) {
			this._kursauswahl.value.clear();
			this.setPatchedState({
				auswahlBlockung: undefined,
				datenmanager: undefined,
				auswahlErgebnis: undefined,
				ergebnismanager: undefined,
				schuelerFilter: undefined,
			});
			return;
		}
		api.status.start();
		const blockungsdaten = await api.server.getGostBlockung(api.schema, value.id);
		const datenmanager = new GostBlockungsdatenManager(blockungsdaten, this.faecherManager);
		const ergebnisse = datenmanager.ergebnisGetListeSortiertNachBewertung();
		const listFachwahlStatistik = await api.server.getGostAbiturjahrgangFachwahlstatistik(api.schema, this.abiturjahr);
		const mapFachwahlStatistik: Map<number, GostStatistikFachwahl> = new Map();
		for (const fw of listFachwahlStatistik)
			mapFachwahlStatistik.set(fw.id, fw);
		api.status.stop();
		this._kursauswahl.value.clear();
		this.setPatchedState({
			auswahlBlockung: value,
			datenmanager,
			mapFachwahlStatistik,
			auswahlErgebnis: undefined,
			ergebnismanager: undefined,
			schuelerFilter: undefined,
		});
		let ergebnis : GostBlockungsergebnisListeneintrag | undefined = undefined;
		if (ergebnisse.size() > 0) {
			for (const e of ergebnisse) {
				if (e.istAktiv) {
					ergebnis = e;
					break;
				}
			}
			if (ergebnis === undefined)
				ergebnis = ergebnisse.get(0);
		}
		await this.setAuswahlErgebnis(ergebnis);
	}

	public get datenmanager(): GostBlockungsdatenManager {
		if (this._state.value.datenmanager === undefined)
			throw new Error("Es wurde noch keine Blockung geladen, so dass kein Daten-Manager zur Verfügung steht.");
		return this._state.value.datenmanager;
	}

	public get kursAuswahl(): Ref<Set<number>> {
		return this._kursauswahl;
	}

	public get ergebnismanager(): GostBlockungsergebnisManager {
		if (this._state.value.ergebnismanager === undefined)
			throw new Error("Es wurde noch keine Blockung geladen, so dass kein Ergebnismanager zur Verfügung steht.");
		return this._state.value.ergebnismanager;
	}

	public get hatErgebnis(): boolean {
		return this._state.value.ergebnismanager !== undefined;
	}

	public get ergebnisse(): List<GostBlockungsergebnisListeneintrag> {
		return this.datenmanager.ergebnisGetListeSortiertNachBewertung();
	}

	public get auswahlErgebnis() : GostBlockungsergebnisListeneintrag {
		if (this._state.value.auswahlErgebnis === undefined)
			throw new Error("Es wurde noch kein gültiges Ergebnis ausgewählt.");
		return this._state.value.auswahlErgebnis;
	}

	public setAuswahlErgebnis = async (value: GostBlockungsergebnisListeneintrag | undefined) => {
		if (this._state.value.abiturjahr === undefined)
			throw new Error("Es kann kein Ergebnis ausgewählt werden, wenn zuvor kein Abiturjahrgang ausgewählt wurde.");
		if ((this._state.value.auswahlErgebnis?.id === value?.id) && (this._state.value.ergebnismanager !== undefined))
			return;
		if (value === undefined) {
			this.setPatchedState({
				auswahlErgebnis: undefined,
				ergebnismanager: undefined,
				schuelerFilter: undefined,
			});
			return;
		}
		if (this._state.value.datenmanager === undefined)
			throw new Error("Es kann keine Ergebnis ausgewählt werden, wenn zuvor keine Blockung ausgewählt wurde.");
		api.status.start();
		const ergebnis = await api.server.getGostBlockungsergebnis(api.schema, value.id);
		const ergebnismanager = new GostBlockungsergebnisManager(this.datenmanager, ergebnis);
		const schuelerFilter = new GostKursplanungSchuelerFilter(this.datenmanager, () => this.ergebnismanager, this.faecherManager.faecher(), this.mapSchueler)
		api.status.stop();
		this.setPatchedState({
			auswahlErgebnis: value,
			ergebnismanager: ergebnismanager,
			schuelerFilter: schuelerFilter,
		});
	}

	public get schuelerFilter(): GostKursplanungSchuelerFilter {
		if (this._state.value.schuelerFilter === undefined)
			throw new Error("Es wurde noch keine Ergebnis geladen, so dass kein Schüler-Filter zur Verfügung steht.");
		return this._state.value.schuelerFilter;
	}

	public get hatSchueler(): boolean {
		return this._state.value.auswahlSchueler !== undefined;
	}

	public get auswahlSchueler() : SchuelerListeEintrag {
		if (this._state.value.auswahlSchueler === undefined)
			throw new Error("Es wurde noch kein Schüler ausgewählt.");
		return this._state.value.auswahlSchueler;
	}

	public async setAuswahlSchueler(value: SchuelerListeEintrag | undefined) {
		if (this._state.value.abiturjahr === undefined)
			throw new Error("Es kann keine Ergebnis ausgewählt werden, wenn zuvor kein Abiturjahrgang ausgewählt wurde.");
		if (value?.id === this._state.value.auswahlSchueler?.id)
			return;
		// Setze die neue Schülerauswahl im geklonten State
		this.setPatchedState({ auswahlSchueler: value });
	}

	addBlockung = api.call(async () => {
		if ((this._state.value.abiturjahr === undefined) || (this._state.value.abiturjahr === -1))
			return;
		const result = await api.server.createGostAbiturjahrgangBlockung(api.schema, this.jahrgangsdaten.abiturjahr, this.halbjahr.id);
		this.mapBlockungen.set(result.id, result);
		this.setPatchedState({mapBlockungen: this.mapBlockungen})
		await this.gotoBlockung(result);
	});

	restoreBlockung = api.call(async () => {
		const result = await api.server.restauriereGostBlockung(api.schema, this.jahrgangsdaten.abiturjahr, this.halbjahr.id)
		this.mapBlockungen.set(result.id, result);
		// Lade die Fächer des Abiturjahrgangs auch neu, da diese eventuell beim Wiederherstellen der Blockung angepasst wurden.
		const listFaecher = await api.server.getGostAbiturjahrgangFaecher(api.schema, this.jahrgangsdaten.abiturjahr);
		const faecherManager = new GostFaecherManager(listFaecher);
		// Aktualisiere den State
		this.setPatchedState({
			faecherManager,
			mapBlockungen: this.mapBlockungen
		})
		await this.gotoBlockung(result);
	});

	removeBlockung = api.call(async () => {
		if (!this.hatBlockung)
			return;
		await api.server.deleteGostBlockung(api.schema, this.auswahlBlockung.id);
		this._state.value.mapBlockungen.delete(this.auswahlBlockung.id);
		await this.setAuswahlBlockung(undefined);
		await this.gotoHalbjahr(this.halbjahr);
	});

	patchBlockung = async (data: Partial<GostBlockungsdaten>, idBlockung: number): Promise<boolean> => {
		if (this._state.value.datenmanager === undefined)
			throw new Error("Es wurde noch keine Blockung geladen, so dass die Blockung nicht angepasst werden kann.");
		api.status.start();
		await api.server.patchGostBlockung(data, api.schema, idBlockung);
		if (data.name)
			this.datenmanager.setName(data.name)
		if (data.istAktiv !== undefined) {
			if (data.istAktiv === true) {
				for (const blockung of this.mapBlockungen.values())
					blockung.istAktiv = (blockung.id === idBlockung);
			} else if (data.istAktiv === false) {
				const blockung = this.mapBlockungen.get(idBlockung);
				if (blockung !== undefined)
					blockung.istAktiv = false;
			}
			this.datenmanager.daten().istAktiv = (this.datenmanager.daten().id === idBlockung);
		}
		api.status.stop();
		this.commit();
		return true;
	}


	patchErgebnis = async (data: Partial<GostBlockungsergebnisListeneintrag>, idErgebnis: number): Promise<boolean> => {
		if (this._state.value.datenmanager === undefined)
			throw new Error("Es wurde noch keine Blockung geladen, so dass die Ergebnisliste nicht angepasst werden kann.");
		api.status.start();
		await api.server.patchGostBlockungsergebnis(data, api.schema, idErgebnis);
		if (data.istAktiv === true) {
			for (const ergebnis of this.datenmanager.ergebnisGetListeSortiertNachBewertung())
				ergebnis.istAktiv = (ergebnis.id === idErgebnis);
		} else if (data.istAktiv === false) {
			this.datenmanager.ergebnisGet(idErgebnis).istAktiv = false;
		}
		api.status.stop();
		this.commit();
		return true;
	}


	addRegel = api.call(async (regel: GostBlockungRegel) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const result = await api.server.addGostBlockungRegel(regel.parameter, api.schema, this.auswahlBlockung.id, regel.typ);
		if (!result)
			return;
		this.datenmanager.regelAdd(result);
		this.ergebnismanager.setAddRegelByID(result.id);
		this.commit();
		return result;
	});

	removeRegel = api.call(async (id: number) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const result = await api.server.deleteGostBlockungRegelByID(api.schema, id);
		if (!result)
			return
		this.datenmanager.regelRemoveByID(result.id);
		this.ergebnismanager.setRemoveRegelByID(result.id);
		this.commit();
		return result;
	});

	patchRegel = api.call(async (data: GostBlockungRegel, idRegel: number) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		await api.server.patchGostBlockungRegel(data, api.schema, idRegel);
		this.datenmanager.regelRemoveByID(idRegel);
		this.ergebnismanager.setRemoveRegelByID(idRegel);
		this.datenmanager.regelAdd(data);
		this.ergebnismanager.setAddRegelByID(data.id);
		this.commit();
	});

	patchKurs = api.call(async (data: Partial<GostBlockungKurs>, kurs_id: number) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		await api.server.patchGostBlockungKurs(data, api.schema, kurs_id);
		if (data.suffix !== undefined)
			this.datenmanager.kursSetSuffix(kurs_id, data.suffix);
		if (data.istKoopKurs !== undefined)
			this.datenmanager.kursGet(kurs_id).istKoopKurs = data.istKoopKurs;
		this.commit();
	});

	addKurs = api.call(async (fach_id : number, kursart_id : number): Promise<GostBlockungKurs | undefined> => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const kurs = await api.server.addGostBlockungKurs(api.schema, this.auswahlBlockung.id, fach_id, kursart_id);
		if (kurs === undefined)
			return;
		this.datenmanager.kursAdd(kurs);
		this.ergebnismanager.setAddKursByID(kurs.id);
		this.commit();
		return kurs;
	});

	removeKurs = api.call(async (fach_id : number, kursart_id : number): Promise<GostBlockungKurs | undefined> => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const kurs = await api.server.deleteGostBlockungKurs(api.schema, this.auswahlBlockung.id, fach_id, kursart_id);
		if (kurs === undefined)
			return;
		this.datenmanager.kursRemove(kurs);
		this.ergebnismanager.setRemoveKursByID(kurs.id);
		this.commit();
		return kurs;
	});

	combineKurs = api.call(async (kurs1: GostBlockungKurs, kurs2: GostBlockungKurs | GostBlockungsergebnisKurs | undefined | null) => {
		if (kurs2 === undefined || kurs2 === null)
			return;
		await api.server.combineGostBlockungKurs(api.schema, kurs1.id, kurs2.id);
		this.ergebnismanager.setMergeKurseByID(kurs1.id, kurs2.id);
		this.commit();
	});

	splitKurs = api.call(async (kurs: GostBlockungKurs) => {
		const { kurs1, kurs2, schueler2 } = await api.server.splitGostBlockungKurs(api.schema, kurs.id);
		this.ergebnismanager.setSplitKurs(kurs1, kurs2, <number[]>schueler2.toArray())
		this.commit();
	});

	addSchieneKurs = api.call(async (kurs: GostBlockungKurs) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		this.ergebnismanager.patchOfKursSchienenAnzahl(kurs.id, kurs.anzahlSchienen + 1);
		const k = this.ergebnismanager.getKursE(kurs.id);
		await this.patchKurs(k, k.id);
		this.commit();
	});

	removeSchieneKurs = api.call(async (kurs: GostBlockungKurs) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis) || (kurs.anzahlSchienen <= 1))
			return;
		this.ergebnismanager.patchOfKursSchienenAnzahl(kurs.id, kurs.anzahlSchienen - 1);
		const k = this.ergebnismanager.getKursE(kurs.id);
		await this.patchKurs(k, k.id);
		this.commit();
	});

	addKursLehrer = api.call(async(kurs_id: number, lehrer_id: number): Promise<GostBlockungKursLehrer | undefined> => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const lehrer = await api.server.addGostBlockungKurslehrer(api.schema, kurs_id, lehrer_id);
		if (lehrer === undefined)
			return
		this.datenmanager.kursAddLehrkraft(kurs_id, lehrer);
		this.ergebnismanager.patchOfKursLehrkaefteChanged();
		this.commit();
		return lehrer;
	});

	removeKursLehrer = api.call(async(kurs_id: number, lehrer_id: number): Promise<void> => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		await api.server.deleteGostBlockungKurslehrer(api.schema, kurs_id, lehrer_id);
		this.datenmanager.kursRemoveLehrkraft(kurs_id, lehrer_id);
		this.ergebnismanager.patchOfKursLehrkaefteChanged();
		this.commit();
	});

	patchSchiene = api.call(async (data: Partial<GostBlockungSchiene>, id : number) => {
		await api.server.patchGostBlockungSchiene(data, api.schema, id);
		const schiene = this.datenmanager.schieneGet(id);
		Object.assign(schiene, data);
	});

	addSchiene = api.call(async (): Promise<GostBlockungSchiene | undefined> => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const schiene = await api.server.addGostBlockungSchiene(api.schema, this.auswahlBlockung.id);
		if (schiene === undefined)
			return
		this.datenmanager.schieneAdd(schiene);
		this.ergebnismanager.setAddSchieneByID(schiene.id)
		this.commit();
		return schiene;
	});

	removeSchiene = api.call(async (schiene: GostBlockungSchiene) => {
		if ((!this.hatBlockung) || (!this.hatErgebnis))
			return;
		const result = await api.server.deleteGostBlockungSchieneByID(api.schema, schiene.id);
		if (!result)
			return;
		this.datenmanager.schieneRemoveByID(result.id);
		this.ergebnismanager.setRemoveSchieneByID(result.id);
		this.commit();
		return result;
	});

	updateKursSchienenZuordnung = api.call(async (idKurs: number, idSchieneAlt: number, idSchieneNeu: number): Promise<boolean> => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return false;
		await api.server.updateGostBlockungsergebnisKursSchieneZuordnung(api.schema, this._state.value.auswahlErgebnis.id, idSchieneAlt, idKurs, idSchieneNeu);
		this.ergebnismanager.setKursSchiene(idKurs, idSchieneAlt, false);
		this.ergebnismanager.setKursSchiene(idKurs, idSchieneNeu, true);
		const ergebnis = this.ergebnismanager.getErgebnis();
		this.datenmanager.ergebnisUpdateBewertung(ergebnis);
		this.commit();
		return true;
	});

	updateKursSchuelerZuordnung = api.call(async (idSchueler: number, idKursNeu: number, idKursAlt: number | undefined): Promise<boolean> => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return false;
		const ergebnisid = this._state.value.auswahlErgebnis.id;
		if (idKursAlt !== undefined) {
			await api.server.deleteGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, idKursAlt);
			await api.server.createGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, idKursNeu);
			this.ergebnismanager.setSchuelerKurs(idSchueler, idKursAlt, false);
		} else {
			await api.server.createGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, idKursNeu);
		}
		this.ergebnismanager.setSchuelerKurs(idSchueler, idKursNeu, true);
		const ergebnis = this.ergebnismanager.getErgebnis();
		this.datenmanager.ergebnisUpdateBewertung(ergebnis);
		this.commit();
		return true;
	});

	removeKursSchuelerZuordnung = api.call(async (idSchueler: number, idKurs: number): Promise<boolean> => {
		let zugeordnet : boolean = this.ergebnismanager.getOfSchuelerOfKursIstZugeordnet(idSchueler, idKurs);
		if (!zugeordnet) {
			const map = this.ergebnismanager.getOfSchuelerMapIDzuUngueltigeKurse();
			const set = map.get(idSchueler);
			if (set !== null) {
				for (const kurs of set) {
					if (kurs.id === idKurs) {
						zugeordnet = true;
						break;
					}
				}
			}
		}
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined) || !zugeordnet)
			return false;
		const ergebnisid = this._state.value.auswahlErgebnis.id;
		await api.server.deleteGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, idKurs);
		this.ergebnismanager.setSchuelerKurs(idSchueler, idKurs, false);
		const ergebnis = this.ergebnismanager.getErgebnis();
		this.datenmanager.ergebnisUpdateBewertung(ergebnis);
		this.commit();
		return true;
	});

	autoKursSchuelerZuordnung = api.call(async (idSchueler : number) => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return;
		const ergebnisid = this._state.value.auswahlErgebnis.id;
		const zuordnungen = this.ergebnismanager.getOfSchuelerNeuzuordnungMitFixierung(idSchueler, false);
		for (const z of zuordnungen.fachwahlenZuKurs) {
			const kursV = this.ergebnismanager.getOfSchuelerOfFachZugeordneterKurs(idSchueler, z.fachID);
			const kursN = (z.kursID < 0) ? null : this.ergebnismanager.getKursE(z.kursID);
			if (kursV !== kursN) {
				if (kursV !== null) {
					await api.server.deleteGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, kursV.id);
					this.ergebnismanager.setSchuelerKurs(idSchueler, kursV.id, false);
				}
				if (kursN !== null) {
					await api.server.createGostBlockungsergebnisKursSchuelerZuordnung(api.schema, ergebnisid, idSchueler, kursN.id);
					this.ergebnismanager.setSchuelerKurs(idSchueler, kursN.id, true);
				}
			}
		}
		const ergebnis = this.ergebnismanager.getErgebnis();
		this.datenmanager.ergebnisUpdateBewertung(ergebnis);
		this.commit();
	});

	removeErgebnisse = api.call(async (ergebnisse: GostBlockungsergebnisListeneintrag[]): Promise<void> => {
		if ((ergebnisse.length <= 0) || (!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return;
		const ergebnisid = this._state.value.auswahlErgebnis.id;
		const reselect = ergebnisse.some(e => e.id === ergebnisid);
		for (const ergebnis of ergebnisse) {
			await api.server.deleteGostBlockungsergebnis(api.schema, ergebnis.id);
			this.datenmanager.ergebnisRemove(ergebnis);
		}
		this.commit();
		if (reselect) {
			for (const e of this.ergebnisse)
				if (!ergebnisse.includes(e)) {
					await this.gotoErgebnis(e);
					break;
				}
		}
	});

	rechneGostBlockung = async (): Promise<List<number>> => {
		const id = this.auswahlBlockung.id;
		let liste;
		try {
			api.status.start(<ApiPendingData>{ name: "gost.kursblockung.berechnen", id: id });
			liste = await api.server.rechneGostBlockung(api.schema, id, 5000);
			await this.setAuswahlBlockung(this.auswahlBlockung, true);
			await this.gotoErgebnis(this._state.value.auswahlErgebnis)
			api.status.stop();
		} catch (e) {
			api.status.stop(e instanceof Error ? e : undefined);
			throw e;
		}
		return liste;
	}

	ergebnisAbleiten = api.call(async () => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return;
		const result = await api.server.dupliziereGostBlockungMitErgebnis(api.schema, this.auswahlErgebnis.id);
		this.mapBlockungen.set(result.id, result);
		this.setPatchedState({mapBlockungen: this.mapBlockungen})
		await this.gotoBlockung(result);
	});

	ergebnisHochschreiben = api.call(async () => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return;
		const abiturjahr = this.abiturjahr;
		const halbjahr = this.halbjahr.next()?.id || this.halbjahr.id;
		const result = await api.server.schreibeGostBlockungsErgebnisHoch(api.schema, this.auswahlErgebnis.id);
		await RouteManager.doRoute(routeGostKursplanung.getRouteBlockung(abiturjahr, halbjahr, result.id));
	});

	ergebnisAktivieren = api.call(async (): Promise<boolean> => {
		if ((!this.hatBlockung) || (this._state.value.auswahlErgebnis === undefined))
			return false;
		await api.server.activateGostBlockungsergebnis(api.schema, this.auswahlErgebnis.id);
		this.jahrgangsdaten.istBlockungFestgelegt[this.halbjahr.id] = true;
		this.auswahlBlockung.istAktiv = true;
		this.datenmanager.daten().istAktiv = true;
		this.ergebnismanager.getErgebnis().istAktiv = true;
		this.auswahlErgebnis.istAktiv = true;
		this.commit();
		return true;
	});

	ergebnisSynchronisieren = api.call(async (): Promise<void> => {
		if ((!this.hatBlockung && !this.jahrgangsdaten.istBlockungFestgelegt[this.halbjahr.id]) || (this._state.value.auswahlErgebnis === undefined))
			return;
		await api.server.syncGostBlockungsergebnis(api.schema, this.auswahlErgebnis.id);
	});

	gotoHalbjahr = async (value: GostHalbjahr) => {
		await RouteManager.doRoute(routeGostKursplanung.getRouteHalbjahr(this.abiturjahr, value.id));
	}

	gotoBlockung = async (value: GostBlockungListeneintrag | undefined) => {
		if (value !== this._state.value.auswahlBlockung) {
			if (value === undefined || value === null)
				await RouteManager.doRoute(routeGostKursplanung.getRouteHalbjahr(this.abiturjahr, this.halbjahr.id));
			else
				await RouteManager.doRoute(routeGostKursplanung.getRouteBlockung(this.abiturjahr, this.halbjahr.id, value.id));
		}
	}

	getPDF = async (title: string): Promise<ApiFile> => {
		if (!this.hatErgebnis)
			throw new DeveloperNotificationException("Die Kurs-Schienen-Zuordnung kann nur gedruckt werden, wenn ein Ergebnis ausgewählt ist.");
		try {
			const list = new ArrayList<number>();
			switch (title) {
				case "Schülerliste markierte Kurse":
					for (const kurs of this.kursAuswahl.value)
						list.add(kurs);
					return await api.server.pdfGostKursplanungKurseMitKursschuelern(list, api.schema, this.ergebnismanager.getErgebnis().id);
				case "Kurse-Schienen-Zuordnung":
					return await api.server.pdfGostKursplanungKurseSchienenZuordnung(list, api.schema, this.ergebnismanager.getErgebnis().id);
				case "Kurse-Schienen-Zuordnung markierter Schüler":
					list.add(this.auswahlSchueler.id);
					return await api.server.pdfGostKursplanungKurseSchienenZuordnung(list, api.schema, this.ergebnismanager.getErgebnis().id);
				case "Kurse-Schienen-Zuordnung gefilterte Schüler":
					for (const schueler of this.schuelerFilter.filtered.value)
						list.add(schueler.id);
					return await api.server.pdfGostKursplanungKurseSchienenZuordnung(list, api.schema, this.ergebnismanager.getErgebnis().id);
				case "Kursbelegung markierter Schüler":
					list.add(this.auswahlSchueler.id);
					return await api.server.pdfGostKursplanungSchuelerMitKursen(list, api.schema, this.ergebnismanager.getErgebnis().id);
				case "Kursbelegung gefilterte Schüler":
					for (const schueler of this.schuelerFilter.filtered.value)
						list.add(schueler.id);
					return await api.server.pdfGostKursplanungSchuelerMitKursen(list, api.schema, this.ergebnismanager.getErgebnis().id);
				default:
					throw new Error();
			}
		} catch(e) {
			throw new DeveloperNotificationException("Es wurde kein gültiges PDF angegeben");
		}
	}

	gotoErgebnis = async (value: GostBlockungsergebnisListeneintrag | number | undefined) => {
		let id;
		if (value instanceof GostBlockungsergebnisListeneintrag)
			id = value.id;
		else
			id = value;
		if ((id !== this.auswahlErgebnis?.id) && (!RouteManager.isActive())) {
			if (this.hatErgebnis && this.hatSchueler && (id !== undefined)) {
				await RouteManager.doRoute(routeGostKursplanung.getRouteSchueler(this.abiturjahr, this.halbjahr.id, this.auswahlBlockung.id, id, this.auswahlSchueler.id));
			} else if (id !== undefined) {
				await RouteManager.doRoute(routeGostKursplanung.getRouteErgebnis(this.abiturjahr, this.halbjahr.id, this.auswahlBlockung.id, id));
			} else {
				await RouteManager.doRoute(routeGostKursplanung.getRouteBlockung(this.abiturjahr, this.halbjahr.id, this.auswahlBlockung.id));
			}
		}
	}

	gotoSchueler = async (schueler: SchuelerListeEintrag) => {
		// TODO alle möglichen Fälle von fehlenden Informationen (Abiturjahr, Blockung und Ergebnis) berücksichtigen
		if ((!this.hatSchueler) || (schueler.id !== this.auswahlSchueler.id))
			await RouteManager.doRoute(routeGostKursplanungSchueler.getRoute(this.abiturjahr, this.halbjahr.id, this.auswahlBlockung.id, this.auswahlErgebnis.id, schueler.id));
	}

	public kurssortierung = computed<'fach' | 'kursart'>({
		get: () => {
			const value = api.config.getValue('gost.kursplanung.kursansicht.sortierung');
			if ((value === undefined) || ((value !== 'kursart') && (value !== 'fach')))
				return 'kursart';
			return value;
		},
		set: (value) => {
			void api.config.setValue('gost.kursplanung.kursansicht.sortierung', value);
			if (this._state.value.ergebnismanager !== undefined) {
				if (value === 'kursart')
					this.ergebnismanager.kursSetSortierungKursartFachNummer();
				else
					this.ergebnismanager.kursSetSortierungFachKursartNummer();
			}
			this.commit();
		}
	});

	protected getListeKursauswahl(): List<number> {
		const result = new ArrayList<number>();
		for (const idKurs of this.kursAuswahl.value)
			result.add(idKurs);
		return result;
	}

	deleteRegeln = async (listRegeln: List<GostBlockungRegel>) : Promise<void> => {
		if (!listRegeln.isEmpty()) {
			const listRegelIDs = new ArrayList<number>();
			for (const regel of listRegeln)
				listRegelIDs.add(regel.id);
			await api.server.deleteGostBlockungRegelnByID(listRegelIDs, api.schema);
			this.datenmanager.regelRemoveListe(listRegeln);
			this.commit();
		}
	}

	addRegeln = async (listRegeln: List<GostBlockungRegel>) : Promise<void> => {
		if (!listRegeln.isEmpty()) {
			listRegeln = await api.server.addGostBlockungRegeln(listRegeln, api.schema, this.auswahlBlockung.id);
			this.datenmanager.regelAddListe(listRegeln);
			this.commit();
		}
	}

	updateRegeln = async (typ: string) => {
		switch (typ) {
			case "fixiereKurseAlle": {
				await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAllerKursSchienenFixierungen());
				break;
			}
			case "loeseKurseAlle": {
				await this.deleteRegeln(this.ergebnismanager.regelGetMengeAllerKursSchienenFixierungen());
				break;
			}
			case "fixiereKursauswahl": {
				const listKursIDs = this.getListeKursauswahl();
				if (!listKursIDs.isEmpty())
					await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAnKursSchienenFixierungen(listKursIDs));
				break;
			}
			case "loeseKursauswahl": {
				const listKursIDs = this.getListeKursauswahl();
				if (!listKursIDs.isEmpty())
					await this.deleteRegeln(this.ergebnismanager.regelGetMengeAnKursSchienenFixierungenDerKurse(listKursIDs));
				break;
			}
			case "fixiereSchuelerAlle": {
				await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAllerSchuelerKursFixierungen());
				break;
			}
			case "fixiereSchuelerAbiturkurseAlle": {
				await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAllerSchuelerAbiturKursFixierungen());
				break;
			}
			case "loeseSchuelerAlle": {
				await this.deleteRegeln(this.ergebnismanager.regelGetMengeAllerSchuelerKursFixierungen());
				break;
			}
			case "fixiereSchuelerKursauswahl": {
				const listKursIDs = this.getListeKursauswahl();
				if (!listKursIDs.isEmpty())
					await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAnKursSchuelerFixierungen(listKursIDs));
				break;
			}
			case "fixiereSchuelerAbiturkurseKursauswahl": {
				const listKursIDs = this.getListeKursauswahl();
				if (!listKursIDs.isEmpty())
					await this.addRegeln(this.ergebnismanager.regelGetDummyMengeAnAbiturKursSchuelerFixierungen(listKursIDs));
				break;
			}
			case "loeseSchuelerKursauswahl": {
				const listKursIDs = this.getListeKursauswahl();
				if (!listKursIDs.isEmpty())
					await this.deleteRegeln(this.ergebnismanager.regelGetMengeAllerSchuelerKursFixierungenDerKurse(listKursIDs));
				break;
			}
			default:
				throw new DeveloperNotificationException("Der Typ " + typ + " für die Aktualisierung von Regeln wird noch nicht unterstützt.");
		}
	}

}
