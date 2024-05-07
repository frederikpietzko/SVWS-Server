import { RouteData, type RouteStateInterface } from "~/router/RouteData";

import { routeKatalogFaecher } from "~/router/apps/kataloge/faecher/RouteKatalogFaecher";

interface RouteStateKataloge extends RouteStateInterface {
}

const defaultState: RouteStateKataloge = {
	view: routeKatalogFaecher,
};

export class RouteDataKataloge extends RouteData<RouteStateKataloge> {

	public constructor() {
		super(defaultState);
	}

}
