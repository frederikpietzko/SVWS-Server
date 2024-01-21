import type { RouteLocationNormalized, RouteLocationRaw, RouteParams } from "vue-router";
import type { SchuelerLaufbahnplanungProps } from "@comp";

import { BenutzerKompetenz, Schulform, ServerMode } from "@core";

import { api } from "~/router/Api";
import { RouteNode } from "~/router/RouteNode";
import { routeError } from "~/router/error/RouteError";
import { routeSchueler, type RouteSchueler } from "~/router/apps/schueler/RouteSchueler";
import { RouteDataSchuelerLaufbahnplanung } from "~/router/apps/schueler/laufbahnplanung/RouteDataSchuelerLaufbahnplanung";

import { ConfigElement } from "~/components/Config";
import { SSchuelerLaufbahnplanung } from "@comp";

export class RouteSchuelerLaufbahnplanung extends RouteNode<RouteDataSchuelerLaufbahnplanung, RouteSchueler> {

	public constructor() {
		super(Schulform.getMitGymOb(), [ BenutzerKompetenz.KEINE ], "schueler.laufbahnplanung", "laufbahnplanung", SSchuelerLaufbahnplanung, new RouteDataSchuelerLaufbahnplanung());
		super.mode = ServerMode.STABLE;
		super.propHandler = (route) => this.getProps(route);
		super.text = "Laufbahnplanung";
		this.isHidden = (params?: RouteParams) => {
			if ((params === undefined) || (params.id === undefined) || (params.id instanceof Array))
				return routeError.getRoute(new Error("Fehler: Die Parameter der Route sind nicht gültig gesetzt."));
			if (!routeSchueler.data.schuelerListeManager.hasDaten())
				return false;
			const abiturjahr = routeSchueler.data.schuelerListeManager.auswahl().abiturjahrgang;
			return (abiturjahr && routeSchueler.data.schuelerListeManager.abiturjahrgaenge.get(abiturjahr)) ? false : routeSchueler.getRoute(parseInt(params.id));
		}
		api.config.addElements([new ConfigElement("app.gost.belegpruefungsart", "user", "gesamt")]);
		api.config.addElements([new ConfigElement("app.schueler.laufbahnplanung.modus", "user", "normal")]);
		api.config.addElements([new ConfigElement("app.schueler.laufbahnplanung.faecher.alle_anzeigen", "user", "false")]);
	}

	public async update(to: RouteNode<unknown, any>, to_params: RouteParams) : Promise<void | Error | RouteLocationRaw> {
		if (to_params.id instanceof Array)
			return routeError.getRoute(new Error("Fehler: Die Parameter der Route dürfen keine Arrays sein"));
		if (this.parent === undefined)
			return routeError.getRoute(new Error("Fehler: Die Route ist ungültig - Parent ist nicht definiert"));
		if (to_params.id === undefined) {
			await this.data.ladeDaten(null);
		} else {
			const id = parseInt(to_params.id);
			try {
				await this.data.ladeDaten(this.parent.data.schuelerListeManager.liste.get(id));
			} catch(error) {
				return routeSchueler.getRoute(id);
			}
		}
	}

	public async leave(from: RouteNode<unknown, any>, from_params: RouteParams): Promise<void> {
		await this.data.clear();
	}

	public getRoute(id: number) : RouteLocationRaw {
		return { name: this.name, params: { id }};
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
			faecherNichtWaehlbarAusblenden: this.data.faecherNichtWaehlbarAusblenden,
			setFaecherNichtWaehlbarAusblenden: this.data.setFaecherNichtWaehlbarAusblenden,
			gotoKursblockung: this.data.gotoKursblockung,
		};
	}

}

export const routeSchuelerLaufbahnplanung = new RouteSchuelerLaufbahnplanung();

