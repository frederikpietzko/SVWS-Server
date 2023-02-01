import { RouteNode } from "~/router/RouteNode";
import { RouteLehrer, routeLehrer } from "~/router/apps/RouteLehrer";
import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

const SLehrerUnterrichtsdaten = () => import("~/components/lehrer/unterrichtsdaten/SLehrerUnterrichtsdaten.vue");

export class RouteLehrerUnterrichtsdaten extends RouteNode<unknown, RouteLehrer> {

	public constructor() {
		super("lehrer_unterrichtsdaten", "unterrichtsdaten", SLehrerUnterrichtsdaten);
		super.propHandler = (route) => routeLehrer.getProps(route);
		super.text = "Unterrichtsdaten";
	}

	public getRoute(id: number) : RouteLocationRaw {
		return { name: this.name, params: { id: id }};
	}

	public getProps(to: RouteLocationNormalized): Record<string, any> {
		return {
			stammdaten: routeLehrer.data.stammdaten
		};
	}

}

export const routeLehrerUnterrichtsdaten = new RouteLehrerUnterrichtsdaten();
