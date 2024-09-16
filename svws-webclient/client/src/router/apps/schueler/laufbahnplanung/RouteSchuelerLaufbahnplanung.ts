import type { RouteLocationNormalized, RouteLocationRaw, RouteParams } from "vue-router";
import type { SchuelerLaufbahnplanungProps } from "@comp";

import { BenutzerKompetenz, DeveloperNotificationException, ServerMode } from "@core";

import { api } from "~/router/Api";
import { RouteNode } from "~/router/RouteNode";
import { routeError } from "~/router/error/RouteError";
import { routeSchueler, type RouteSchueler } from "~/router/apps/schueler/RouteSchueler";
import { RouteDataSchuelerLaufbahnplanung } from "~/router/apps/schueler/laufbahnplanung/RouteDataSchuelerLaufbahnplanung";

import { ConfigElement } from "~/components/Config";
import { SSchuelerLaufbahnplanung } from "@comp";
import { routeApp } from "../../RouteApp";
import { schulformenGymOb } from "~/router/RouteHelper";

export class RouteSchuelerLaufbahnplanung extends RouteNode<RouteDataSchuelerLaufbahnplanung, RouteSchueler> {

	public constructor() {
		super(schulformenGymOb, [
			BenutzerKompetenz.OBERSTUFE_LAUFBAHNPLANUNG_ALLGEMEIN,
			BenutzerKompetenz.OBERSTUFE_LAUFBAHNPLANUNG_FUNKTIONSBEZOGEN,
		], "schueler.laufbahnplanung", "laufbahnplanung", SSchuelerLaufbahnplanung, new RouteDataSchuelerLaufbahnplanung());
		super.mode = ServerMode.STABLE;
		super.propHandler = (route) => this.getProps(route);
		super.text = "Laufbahnplanung";
		this.isHidden = (params?: RouteParams) => {
			return this.checkHidden(params);
		}
		api.config.addElements([new ConfigElement("app.gost.belegpruefungsart", "user", "gesamt")]);
		api.config.addElements([new ConfigElement("app.schueler.laufbahnplanung.modus", "user", "normal")]);
		api.config.addElements([new ConfigElement("app.schueler.laufbahnplanung.faecher.anzeigen", "user", "alle")]);
	}

	protected checkHidden(params?: RouteParams) {
		try {
			const { id } = (params !== undefined) ? RouteNode.getIntParams(params, ["id"]) : {id: undefined};
			if (!routeSchueler.data.schuelerListeManager.hasDaten())
				return false;
			const abiturjahr = routeSchueler.data.schuelerListeManager.auswahl().abiturjahrgang;
			if (((abiturjahr !== null) && routeSchueler.data.schuelerListeManager.abiturjahrgaenge.get(abiturjahr))
				&& (api.benutzerHatKompetenz(BenutzerKompetenz.OBERSTUFE_LAUFBAHNPLANUNG_ALLGEMEIN)
					|| (api.benutzerHatKompetenz(BenutzerKompetenz.OBERSTUFE_LAUFBAHNPLANUNG_FUNKTIONSBEZOGEN) && api.benutzerKompetenzenAbiturjahrgaenge.has(abiturjahr))))
				return false;
			return routeSchueler.getRoute(id);
		} catch (e) {
			return routeError.getRoute(e as DeveloperNotificationException);
		}
	}

	protected async update(to: RouteNode<any, any>, to_params: RouteParams, from: RouteNode<any, any> | undefined, from_params: RouteParams, isEntering: boolean) : Promise<void | Error | RouteLocationRaw> {
		try {
			if (isEntering) {
			// Wenn man in die Laufbahnplanung wechselt und von einer Gost-Route per Schülerlink kommt, dann im Filter direkt den Jahrgang wählen
				if (from?.checkSuccessorOf('gost')) {
					for (const e of routeSchueler.data.schuelerListeManager.jahrgaenge.list())
						if (e.id === routeSchueler.data.schuelerListeManager.auswahl().idJahrgang) {
							routeSchueler.data.schuelerListeManager.jahrgaenge.auswahlAdd(e);
							await routeSchueler.data.setFilter();
							break;
						}
				}
			}
			const { id } = RouteNode.getIntParams(to_params, ["id"]);
			if (this.parent === undefined)
				throw new DeveloperNotificationException("Fehler: Die Route ist ungültig - Parent ist nicht definiert");
			if (id === undefined) {
				await this.data.ladeDaten(null);
			} else {
				try {
					await this.data.ladeDaten(this.parent.data.schuelerListeManager.liste.get(id));
				} catch(error) {
					return routeSchueler.getRoute(id);
				}
			}
		} catch (e) {
			return routeError.getRoute(e as DeveloperNotificationException);
		}
	}

	public async leave(from: RouteNode<any, any>, from_params: RouteParams): Promise<void> {
		await this.data.clear();
	}

	public getRoute(id: number) : RouteLocationRaw {
		return { name: this.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt, id }};
	}

	public getProps(to: RouteLocationNormalized): SchuelerLaufbahnplanungProps {
		return {
			setWahl: this.data.setWahl,
			setGostBelegpruefungsArt: this.data.setGostBelegpruefungsArt,
			getPdfWahlbogen: this.data.getPdfWahlbogen,
			exportLaufbahnplanung: this.data.exportLaufbahnplanung,
			importLaufbahnplanung: this.data.importLaufbahnplanung,
			schueler: this.data.auswahl,
			gostJahrgangsdaten: this.data.gostJahrgangsdaten,
			gostLaufbahnBeratungsdaten: () => this.data.gostLaufbahnBeratungsdaten,
			patchBeratungsdaten: this.data.patchBeratungsdaten,
			gostBelegpruefungsArt: () => this.data.gostBelegpruefungsArt,
			gostBelegpruefungErgebnis: () => this.data.gostBelegpruefungErgebnis,
			abiturdatenManager: () => this.data.abiturdatenManager,
			mapLehrer: this.data.mapLehrer,
			id: this.data.id,
			zwischenspeicher: this.data.zwischenspeicher,
			saveLaufbahnplanung: this.data.saveLaufbahnplanung,
			restoreLaufbahnplanung: this.data.restoreLaufbahnplanung,
			resetFachwahlen: this.data.resetFachwahlen,
			modus: this.data.modus,
			setModus: this.data.setModus,
			faecherAnzeigen: this.data.faecherAnzeigen,
			setFaecherAnzeigen: this.data.setFaecherAnzeigen,
			gotoKursblockung: this.data.gotoKursblockung,
		};
	}

}

export const routeSchuelerLaufbahnplanung = new RouteSchuelerLaufbahnplanung();

