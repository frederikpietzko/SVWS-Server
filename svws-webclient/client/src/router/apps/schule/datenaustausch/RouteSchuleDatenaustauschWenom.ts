import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

import { BenutzerKompetenz, Schulform, ServerMode } from "@core";

import { RouteNode } from "~/router/RouteNode";
import { routeSchuleDatenaustausch, type RouteSchuleDatenaustausch } from "~/router/apps/schule/datenaustausch/RouteSchuleDatenaustausch";

import type { SchuleDatenaustauschWenomProps } from "~/components/schule/datenaustausch/wenom/SSchuleDatenaustauschWenomProps";
import { routeApp } from "../../RouteApp";

const SSchuleDatenaustauschWenom = () => import("~/components/schule/datenaustausch/wenom/SSchuleDatenaustauschWenom.vue");

export class RouteSchuleDatenaustauschWenom extends RouteNode<any, RouteSchuleDatenaustausch> {

	public constructor() {
		super(Schulform.values(), [ BenutzerKompetenz.KEINE ], "schule.datenaustausch.wenom", "wenom", SSchuleDatenaustauschWenom);
		super.mode = ServerMode.DEV;
		super.propHandler = (route) => this.getProps(route);
		super.text = "Webnotenmanager";
	}

	public async enter() {
		return routeSchuleDatenaustausch.data.ladeCredentials();
	}

	public getRoute() : RouteLocationRaw {
		return { name: this.name, params: { idSchuljahresabschnitt: routeApp.data.idSchuljahresabschnitt }};
	}

	public getProps(to: RouteLocationNormalized): SchuleDatenaustauschWenomProps {
		return {
			secretSet: () => routeSchuleDatenaustausch.data.secretSet,
			setWenomCredentials: routeSchuleDatenaustausch.data.setWenomCredentials,
			wenomSynchronize: routeSchuleDatenaustausch.data.wenomSynchronize,
			wenomTruncate: routeSchuleDatenaustausch.data.wenomTruncate,
			wenomRemoveCredentials: routeSchuleDatenaustausch.data.wenomRemoveCredential,
		};
	}
}

export const routeSchuleDatenaustauschWenom = new RouteSchuleDatenaustauschWenom();

