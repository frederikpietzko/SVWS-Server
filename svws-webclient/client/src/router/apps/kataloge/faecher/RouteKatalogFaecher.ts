import type { RouteLocationNormalized, RouteLocationRaw, RouteParams } from "vue-router";

import { BenutzerKompetenz, DeveloperNotificationException, Schulform, ServerMode } from "@core";

import { RouteManager } from "~/router/RouteManager";
import { RouteNode } from "~/router/RouteNode";

import type { RouteApp } from "~/router/apps/RouteApp";
import { routeApp } from "~/router/apps/RouteApp";
import { routeKataloge } from "~/router/apps/kataloge/RouteKataloge";
import { routeKatalogFachDaten } from "~/router/apps/kataloge/faecher/RouteKatalogFachDaten";

import type { AuswahlChildData } from "~/components/AuswahlChildData";
import type { FaecherAppProps } from "~/components/kataloge/faecher/SFaecherAppProps";
import type { FaecherAuswahlProps } from "~/components/kataloge/faecher/SFaecherAuswahlProps";
import { RouteDataKatalogFaecher } from "./RouteDataKatalogFaecher";
import { routeError } from "~/router/error/RouteError";
import { routeFachStundenplan } from "./stundenplan/RouteFachStundenplan";

const SFaecherAuswahl = () => import("~/components/kataloge/faecher/SFaecherAuswahl.vue")
const SFaecherApp = () => import("~/components/kataloge/faecher/SFaecherApp.vue")

export class RouteKatalogFaecher extends RouteNode<RouteDataKatalogFaecher, RouteApp> {

	public constructor() {
		super(Schulform.values(), [ BenutzerKompetenz.KEINE ], "kataloge.faecher", "kataloge/faecher/:id(\\d+)?", SFaecherApp, new RouteDataKatalogFaecher());
		super.mode = ServerMode.STABLE;
		super.propHandler = (route) => this.getProps(route);
		super.text = "Fächer";
		super.setView("liste", SFaecherAuswahl, (route) => this.getAuswahlProps(route));
		super.children = [
			routeKatalogFachDaten,
			routeFachStundenplan,
		];
		super.defaultChild = routeKatalogFachDaten;
	}

	protected async update(to: RouteNode<any, any>, to_params: RouteParams, from: RouteNode<any, any> | undefined, from_params: RouteParams, isEntering: boolean) : Promise<void | Error | RouteLocationRaw> {
		try {
			const { idSchuljahresabschnitt, id } = RouteNode.getIntParams(to_params, ["id", "idSchuljahresabschnitt"]);
			if (idSchuljahresabschnitt === undefined)
				throw new DeveloperNotificationException("Beim Aufruf der Route ist kein gültiger Schuljahresabschnitt gesetzt.");
			if (this.data.idSchuljahresabschnitt !== idSchuljahresabschnitt) {
				const neueID = await this.data.setSchuljahresabschnitt(idSchuljahresabschnitt);
				if (id !== undefined) {
					if (neueID === null)
						return this.getRoute(id);
					const params = { ... to_params};
					params.id = String(neueID);
					const locationRaw : RouteLocationRaw = {};
					locationRaw.name = to.name;
					locationRaw.params = params;
					return locationRaw;
				}
			}
			const eintrag = (id !== undefined) ? this.data.fachListeManager.liste.get(id) : null;
			await this.data.setEintrag(eintrag);
			if (!this.data.fachListeManager.hasDaten()) {
				if (id === undefined) {
					const listFiltered = this.data.fachListeManager.filtered();
					if (listFiltered.isEmpty())
						return;
					return this.getRoute(this.data.fachListeManager.filtered().get(0).id);
				}
				return this.getRoute();
			}
			if (to.name === this.name)
				return this.getChildRoute(this.data.fachListeManager.daten().id, from);
			if (!to.name.startsWith(this.data.view.name))
				for (const child of this.children)
					if (to.name.startsWith(child.name))
						this.data.setView(child, this.children);
		} catch (e) {
			return routeError.getRoute(e as DeveloperNotificationException);
		}
	}

	public getRoute(id?: number) : RouteLocationRaw {
		if (id === undefined)
			return { name: this.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt }};
		return { name: this.defaultChild!.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt, id }};
	}

	public getChildRoute(id: number | undefined, from?: RouteNode<any, any>) : RouteLocationRaw {
		if (from !== undefined && (/(\.|^)stundenplan/).test(from.name))
			return { name: routeFachStundenplan.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt, id } };
		const redirect_name: string = (this.selectedChild === undefined) ? routeKatalogFachDaten.name : this.selectedChild.name;
		return { name: redirect_name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt, id }};
	}


	public getAuswahlProps(to: RouteLocationNormalized): FaecherAuswahlProps {
		return {
			fachListeManager: () => this.data.fachListeManager,
			schuljahresabschnittsauswahl: () => routeApp.data.getSchuljahresabschnittsauswahl(false),
			gotoEintrag: this.data.gotoEintrag,
			setFilter: this.data.setFilter,
			returnToKataloge: routeKataloge.returnToKataloge,
			setzeDefaultSortierungSekII: this.data.setzeDefaultSortierungSekII,
		};
	}

	public getProps(to: RouteLocationNormalized): FaecherAppProps {
		return {
			fachListeManager: () => this.data.fachListeManager,
			// Props für die Navigation
			setTab: this.setTab,
			tab: this.getTab(),
			tabs: this.getTabs(),
			tabsHidden: this.children_hidden().value,
		};
	}

	private getTab(): AuswahlChildData {
		return { name: this.data.view.name, text: this.data.view.text };
	}

	private getTabs(): AuswahlChildData[] {
		const result: AuswahlChildData[] = [];
		for (const c of super.children)
			if (c.hatEineKompetenz() && c.hatSchulform())
				result.push({ name: c.name, text: c.text });
		return result;
	}

	private setTab = async (value: AuswahlChildData) => {
		if (value.name === this.data.view.name)
			return;
		const node = RouteNode.getNodeByName(value.name);
		if (node === undefined)
			throw new DeveloperNotificationException("Unbekannte Route");
		await RouteManager.doRoute({ name: value.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt, id: this.data.fachListeManager.auswahlID() } });
		this.data.setView(node, this.children);
	}
}

export const routeKatalogFaecher = new RouteKatalogFaecher();
