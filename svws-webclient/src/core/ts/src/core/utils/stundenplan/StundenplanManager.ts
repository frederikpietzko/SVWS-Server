import { JavaObject } from '../../../java/lang/JavaObject';
import { HashMap2D } from '../../../core/adt/map/HashMap2D';
import { StundenplanUnterrichtsverteilung, cast_de_svws_nrw_core_data_stundenplan_StundenplanUnterrichtsverteilung } from '../../../core/data/stundenplan/StundenplanUnterrichtsverteilung';
import { StundenplanKlasse } from '../../../core/data/stundenplan/StundenplanKlasse';
import { HashMap } from '../../../java/util/HashMap';
import { ArrayList } from '../../../java/util/ArrayList';
import { StundenplanKurs } from '../../../core/data/stundenplan/StundenplanKurs';
import { JavaString } from '../../../java/lang/JavaString';
import { DeveloperNotificationException } from '../../../core/exceptions/DeveloperNotificationException';
import { StundenplanJahrgang } from '../../../core/data/stundenplan/StundenplanJahrgang';
import { DateUtils } from '../../../core/utils/DateUtils';
import type { Comparator } from '../../../java/util/Comparator';
import { StundenplanSchueler } from '../../../core/data/stundenplan/StundenplanSchueler';
import { StundenplanKlassenunterricht } from '../../../core/data/stundenplan/StundenplanKlassenunterricht';
import { StundenplanLehrer } from '../../../core/data/stundenplan/StundenplanLehrer';
import { StringUtils } from '../../../core/utils/StringUtils';
import { StundenplanUnterricht, cast_de_svws_nrw_core_data_stundenplan_StundenplanUnterricht } from '../../../core/data/stundenplan/StundenplanUnterricht';
import type { List } from '../../../java/util/List';
import { cast_java_util_List } from '../../../java/util/List';
import { StundenplanKalenderwochenzuordnung } from '../../../core/data/stundenplan/StundenplanKalenderwochenzuordnung';
import { Stundenplan, cast_de_svws_nrw_core_data_stundenplan_Stundenplan } from '../../../core/data/stundenplan/Stundenplan';
import { AVLSet } from '../../../core/adt/set/AVLSet';
import { StundenplanPausenaufsicht } from '../../../core/data/stundenplan/StundenplanPausenaufsicht';
import { CollectionUtils } from '../../../core/utils/CollectionUtils';
import { MapUtils } from '../../../core/utils/MapUtils';
import { StundenplanZeitraster } from '../../../core/data/stundenplan/StundenplanZeitraster';
import { StundenplanPausenzeit } from '../../../core/data/stundenplan/StundenplanPausenzeit';
import { Map2DUtils } from '../../../core/utils/Map2DUtils';
import { StundenplanAufsichtsbereich } from '../../../core/data/stundenplan/StundenplanAufsichtsbereich';
import { StundenplanRaum } from '../../../core/data/stundenplan/StundenplanRaum';
import { BlockungsUtils } from '../../../core/utils/BlockungsUtils';
import { StundenplanSchiene } from '../../../core/data/stundenplan/StundenplanSchiene';
import { StundenplanFach } from '../../../core/data/stundenplan/StundenplanFach';
import { JavaLong } from '../../../java/lang/JavaLong';
import { Wochentag } from '../../../core/types/Wochentag';
import { StundenplanKomplett, cast_de_svws_nrw_core_data_stundenplan_StundenplanKomplett } from '../../../core/data/stundenplan/StundenplanKomplett';

export class StundenplanManager extends JavaObject {

	private static readonly _compAufsichtsbereich : Comparator<StundenplanAufsichtsbereich> = { compare : (a: StundenplanAufsichtsbereich, b: StundenplanAufsichtsbereich) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compFach : Comparator<StundenplanFach> = { compare : (a: StundenplanFach, b: StundenplanFach) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compJahrgang : Comparator<StundenplanJahrgang> = { compare : (a: StundenplanJahrgang, b: StundenplanJahrgang) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compKWZ : Comparator<StundenplanKalenderwochenzuordnung> = { compare : (a: StundenplanKalenderwochenzuordnung, b: StundenplanKalenderwochenzuordnung) => {
		if (a.jahr < b.jahr)
			return -1;
		if (a.jahr > b.jahr)
			return +1;
		if (a.kw < b.kw)
			return -1;
		if (a.kw > b.kw)
			return +1;
		if (a.wochentyp < b.wochentyp)
			return -1;
		if (a.wochentyp > b.wochentyp)
			return +1;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compKlasse : Comparator<StundenplanKlasse> = { compare : (a: StundenplanKlasse, b: StundenplanKlasse) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compKlassenunterricht : Comparator<StundenplanKlassenunterricht> = { compare : (a: StundenplanKlassenunterricht, b: StundenplanKlassenunterricht) => {
		if (a.idKlasse < b.idKlasse)
			return -1;
		if (a.idKlasse > b.idKlasse)
			return +1;
		if (a.idFach < b.idFach)
			return -1;
		if (a.idFach > b.idFach)
			return +1;
		if (a.wochenstunden < b.wochenstunden)
			return -1;
		if (a.wochenstunden > b.wochenstunden)
			return +1;
		return JavaString.compareTo(a.bezeichnung, b.bezeichnung);
	} };

	private static readonly _compKurs : Comparator<StundenplanKurs> = { compare : (a: StundenplanKurs, b: StundenplanKurs) => JavaLong.compare(a.id, b.id) };

	private static readonly _compLehrer : Comparator<StundenplanLehrer> = { compare : (a: StundenplanLehrer, b: StundenplanLehrer) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compPausenaufsicht : Comparator<StundenplanPausenaufsicht> = { compare : (a: StundenplanPausenaufsicht, b: StundenplanPausenaufsicht) => JavaLong.compare(a.id, b.id) };

	private static readonly _compPausenzeit : Comparator<StundenplanPausenzeit> = { compare : (a: StundenplanPausenzeit, b: StundenplanPausenzeit) => {
		if (a.wochentag < b.wochentag)
			return -1;
		if (a.wochentag > b.wochentag)
			return +1;
		const beginnA : number = a.beginn === null ? -1 : a.beginn;
		const beginnB : number = b.beginn === null ? -1 : b.beginn;
		if (beginnA < beginnB)
			return -1;
		if (beginnA > beginnB)
			return +1;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compRaum : Comparator<StundenplanRaum> = { compare : (a: StundenplanRaum, b: StundenplanRaum) => {
		const result : number = JavaString.compareTo(a.kuerzel, b.kuerzel);
		if (result !== 0)
			return result;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compSchiene : Comparator<StundenplanSchiene> = { compare : (a: StundenplanSchiene, b: StundenplanSchiene) => {
		if (a.idJahrgang < b.idJahrgang)
			return -1;
		if (a.idJahrgang > b.idJahrgang)
			return +1;
		if (a.nummer < b.nummer)
			return -1;
		if (a.nummer > b.nummer)
			return +1;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compSchueler : Comparator<StundenplanSchueler> = { compare : (a: StundenplanSchueler, b: StundenplanSchueler) => {
		if (a.idKlasse < b.idKlasse)
			return -1;
		if (a.idKlasse > b.idKlasse)
			return +1;
		const cmpNachname : number = JavaString.compareTo(a.nachname, b.nachname);
		if (cmpNachname !== 0)
			return cmpNachname;
		const cmpVorname : number = JavaString.compareTo(a.vorname, b.vorname);
		if (cmpVorname !== 0)
			return cmpVorname;
		return JavaLong.compare(a.id, b.id);
	} };

	private static readonly _compUnterricht : Comparator<StundenplanUnterricht> = { compare : (a: StundenplanUnterricht, b: StundenplanUnterricht) => JavaLong.compare(a.id, b.id) };

	private static readonly _compZeitraster : Comparator<StundenplanZeitraster> = { compare : (a: StundenplanZeitraster, b: StundenplanZeitraster) => {
		if (a.wochentag < b.wochentag)
			return -1;
		if (a.wochentag > b.wochentag)
			return +1;
		if (a.unterrichtstunde < b.unterrichtstunde)
			return -1;
		if (a.unterrichtstunde > b.unterrichtstunde)
			return +1;
		return JavaLong.compare(a.id, b.id);
	} };

	private readonly _aufsichtsbereich_by_id : HashMap<number, StundenplanAufsichtsbereich> = new HashMap();

	private readonly _aufsichtsbereichmenge : List<StundenplanAufsichtsbereich> = new ArrayList();

	private readonly _fach_by_id : HashMap<number, StundenplanFach> = new HashMap();

	private readonly _fachmenge : List<StundenplanFach> = new ArrayList();

	private readonly _jahrgang_by_id : HashMap<number, StundenplanJahrgang> = new HashMap();

	private readonly _jahrgangmenge : List<StundenplanJahrgang> = new ArrayList();

	private readonly _kwz_by_id : HashMap<number, StundenplanKalenderwochenzuordnung> = new HashMap();

	private readonly _kwzmenge : List<StundenplanKalenderwochenzuordnung> = new ArrayList();

	private readonly _kwz_by_jahr_and_kw : HashMap2D<number, number, StundenplanKalenderwochenzuordnung> = new HashMap2D();

	private readonly _klasse_by_id : HashMap<number, StundenplanKlasse> = new HashMap();

	private readonly _klassenmenge : List<StundenplanKlasse> = new ArrayList();

	private readonly _klassenunterricht_by_idKlasse_and_idFach : HashMap2D<number, number, StundenplanKlassenunterricht> = new HashMap2D();

	private readonly _klassenunterrichtmenge : List<StundenplanKlassenunterricht> = new ArrayList();

	private readonly _klassenunterrichtmenge_by_idKlasse : HashMap<number, List<StundenplanKlassenunterricht>> = new HashMap();

	private readonly _klassenunterrichtmenge_by_idSchueler : HashMap<number, List<StundenplanKlassenunterricht>> = new HashMap();

	private readonly _klassenunterrichtmenge_by_idLehrer : HashMap<number, List<StundenplanKlassenunterricht>> = new HashMap();

	private readonly _kurs_by_id : HashMap<number, StundenplanKurs> = new HashMap();

	private readonly _kursmenge : List<StundenplanKurs> = new ArrayList();

	private readonly _kursmenge_by_idSchueler : HashMap<number, List<StundenplanKurs>> = new HashMap();

	private readonly _kursmenge_by_idLehrer : HashMap<number, List<StundenplanKurs>> = new HashMap();

	private readonly _kursmenge_by_idKlasse : HashMap<number, List<StundenplanKurs>> = new HashMap();

	private readonly _lehrer_by_id : HashMap<number, StundenplanLehrer> = new HashMap();

	private readonly _lehrermenge : List<StundenplanLehrer> = new ArrayList();

	private readonly _lehrermenge_by_idUnterricht : HashMap<number, List<StundenplanLehrer>> = new HashMap();

	private readonly _pausenaufsicht_by_id : HashMap<number, StundenplanPausenaufsicht> = new HashMap();

	private readonly _pausenaufsichtmenge : List<StundenplanPausenaufsicht> = new ArrayList();

	private readonly _pausenaufsichtmenge_by_wochentag : HashMap<number, List<StundenplanPausenaufsicht>> = new HashMap();

	private readonly _pausenaufsichtmenge_by_idPausenzeit : HashMap<number, List<StundenplanPausenaufsicht>> = new HashMap();

	private readonly _pausenzeit_by_id : HashMap<number, StundenplanPausenzeit> = new HashMap();

	private readonly _pausenzeitmenge : List<StundenplanPausenzeit> = new ArrayList();

	private readonly _pausenzeitmenge_by_wochentag : HashMap<number, List<StundenplanPausenzeit>> = new HashMap();

	private readonly _pausenzeitmengeOhneLeere : List<StundenplanPausenzeit> = new ArrayList();

	private _pausenzeitMinutenMin : number | null = null;

	private _pausenzeitMinutenMax : number | null = null;

	private _pausenzeitMinutenMinOhneLeere : number | null = null;

	private _pausenzeitMinutenMaxOhneLeere : number | null = null;

	private readonly _raum_by_id : HashMap<number, StundenplanRaum> = new HashMap();

	private readonly _raummenge : List<StundenplanRaum> = new ArrayList();

	private readonly _schiene_by_id : HashMap<number, StundenplanSchiene> = new HashMap();

	private readonly _schienenmenge : List<StundenplanSchiene> = new ArrayList();

	private readonly _schueler_by_id : HashMap<number, StundenplanSchueler> = new HashMap();

	private readonly _schuelermenge : List<StundenplanSchueler> = new ArrayList();

	private readonly schuelermenge_by_idKlasse : HashMap<number, List<StundenplanSchueler>> = new HashMap();

	private readonly _schuelermenge_by_idKurs : HashMap<number, List<StundenplanSchueler>> = new HashMap();

	private readonly _unterricht_by_id : HashMap<number, StundenplanUnterricht> = new HashMap();

	private readonly _unterrichtmenge : List<StundenplanUnterricht> = new ArrayList();

	private readonly _unterrichtmenge_by_idKlasse : HashMap<number, List<StundenplanUnterricht>> = new HashMap();

	private readonly _unterrichtmenge_by_idKurs : HashMap<number, List<StundenplanUnterricht>> = new HashMap();

	private readonly _unterrichtmenge_by_idZeitraster : HashMap<number, List<StundenplanUnterricht>> = new HashMap();

	private readonly _unterrichtmenge_by_idZeitraster_and_wochentyp : HashMap2D<number, number, List<StundenplanUnterricht>> = new HashMap2D();

	private readonly _unterrichtmenge_by_idKlasse_and_idFach : HashMap2D<number, number, List<StundenplanUnterricht>> = new HashMap2D();

	private _unterrichtHatMultiWochen : boolean = false;

	private readonly _zeitraster_by_id : HashMap<number, StundenplanZeitraster> = new HashMap();

	private readonly _zeitraster_by_wochentag_and_stunde : HashMap2D<number, number, StundenplanZeitraster> = new HashMap2D();

	private readonly _zeitrastermenge : List<StundenplanZeitraster> = new ArrayList();

	private readonly _zeitrastermengeOhneLeere : List<StundenplanZeitraster> = new ArrayList();

	private readonly _zeitrastermenge_by_wochentag : HashMap<number, List<StundenplanZeitraster>> = new HashMap();

	private readonly _zeitrastermenge_by_stunde : HashMap<number, List<StundenplanZeitraster>> = new HashMap();

	private _zeitrasterMinutenMin : number | null = null;

	private _zeitrasterMinutenMax : number | null = null;

	private _zeitrasterMinutenMinOhneLeere : number | null = null;

	private _zeitrasterMinutenMaxOhneLeere : number | null = null;

	private readonly _zeitrasterMinutenMinByStunde : HashMap<number, number | null> = new HashMap();

	private readonly _zeitrasterMinutenMaxByStunde : HashMap<number, number | null> = new HashMap();

	private _zeitrasterWochentagMin : number = Wochentag.MONTAG.id;

	private _zeitrasterWochentagMax : number = Wochentag.MONTAG.id;

	private _zeitrasterWochentageAlsEnumRange : Array<Wochentag> = [Wochentag.MONTAG];

	private _zeitrasterStundeMin : number = 1;

	private _zeitrasterStundeMax : number = 1;

	private _zeitrasterStundenRange : Array<number> = [1];

	private _zeitrasterStundeMinOhneLeere : number = 1;

	private _zeitrasterStundeMaxOhneLeere : number = 1;

	private _zeitrasterStundenRangeOhneLeere : Array<number> = [1];

	private readonly _stundenplanID : number;

	private readonly _stundenplanWochenTypModell : number;

	private readonly _stundenplanSchuljahresAbschnittID : number;

	private readonly _stundenplanGueltigAb : string;

	private readonly _stundenplanGueltigBis : string;

	private readonly _stundenplanBezeichnung : string;


	/**
	 * Der {@link StundenplanManager} benötigt vier data-Objekte und baut damit eine Datenstruktur für schnelle Zugriffe auf.
	 *
	 * @param daten                 liefert die Grund-Daten des Stundenplanes.
	 * @param unterrichte           liefert die Informationen zu allen {@link StundenplanUnterricht} im Stundenplan. Die Liste darf leer sein.
	 * @param pausenaufsichten      liefert die Informationen zu allen {@link StundenplanPausenaufsicht} im Stundenplan. Die Liste darf leer sein.
	 * @param unterrichtsverteilung liefert die Informationen zu der Unterrichtsverteilung eines Stundenplans. Darf NULL sein.
	 */
	public constructor(daten : Stundenplan, unterrichte : List<StundenplanUnterricht>, pausenaufsichten : List<StundenplanPausenaufsicht>, unterrichtsverteilung : StundenplanUnterrichtsverteilung | null);

	/**
	 * Dieser Manager baut mit Hilfe des {@link StundenplanKomplett}-Objektes eine Datenstruktur für schnelle Zugriffe auf.
	 *
	 * @param stundenplanKomplett  Beinhaltet alle relevanten Daten für einen Stundenplan.
	 */
	public constructor(stundenplanKomplett : StundenplanKomplett);

	/**
	 * Implementation for method overloads of 'constructor'
	 */
	public constructor(__param0 : Stundenplan | StundenplanKomplett, __param1? : List<StundenplanUnterricht>, __param2? : List<StundenplanPausenaufsicht>, __param3? : StundenplanUnterrichtsverteilung | null) {
		super();
		if (((typeof __param0 !== "undefined") && ((__param0 instanceof JavaObject) && ((__param0 as JavaObject).isTranspiledInstanceOf('de.svws_nrw.core.data.stundenplan.Stundenplan')))) && ((typeof __param1 !== "undefined") && ((__param1 instanceof JavaObject) && ((__param1 as JavaObject).isTranspiledInstanceOf('java.util.List'))) || (__param1 === null)) && ((typeof __param2 !== "undefined") && ((__param2 instanceof JavaObject) && ((__param2 as JavaObject).isTranspiledInstanceOf('java.util.List'))) || (__param2 === null)) && ((typeof __param3 !== "undefined") && ((__param3 instanceof JavaObject) && ((__param3 as JavaObject).isTranspiledInstanceOf('de.svws_nrw.core.data.stundenplan.StundenplanUnterrichtsverteilung'))) || (__param3 === null))) {
			const daten : Stundenplan = cast_de_svws_nrw_core_data_stundenplan_Stundenplan(__param0);
			const unterrichte : List<StundenplanUnterricht> = cast_java_util_List(__param1);
			const pausenaufsichten : List<StundenplanPausenaufsicht> = cast_java_util_List(__param2);
			const unterrichtsverteilung : StundenplanUnterrichtsverteilung | null = cast_de_svws_nrw_core_data_stundenplan_StundenplanUnterrichtsverteilung(__param3);
			this._stundenplanID = daten.id;
			this._stundenplanWochenTypModell = daten.wochenTypModell;
			this._stundenplanSchuljahresAbschnittID = daten.idSchuljahresabschnitt;
			this._stundenplanGueltigAb = daten.gueltigAb;
			this._stundenplanGueltigBis = daten.gueltigBis;
			this._stundenplanBezeichnung = daten.bezeichnungStundenplan;
			let uv : StundenplanUnterrichtsverteilung | null = unterrichtsverteilung;
			if (uv === null) {
				uv = new StundenplanUnterrichtsverteilung();
				uv.id = this._stundenplanID;
			}
			DeveloperNotificationException.ifTrue("Stundenplan.id != StundenplanUnterrichtsverteilung.id", daten.id !== uv.id);
			this.initAll(daten.kalenderwochenZuordnung, uv.faecher, daten.jahrgaenge, daten.zeitraster, daten.raeume, daten.pausenzeiten, daten.aufsichtsbereiche, uv.lehrer, uv.schueler, daten.schienen, uv.klassen, uv.klassenunterricht, pausenaufsichten, uv.kurse, unterrichte);
		} else if (((typeof __param0 !== "undefined") && ((__param0 instanceof JavaObject) && ((__param0 as JavaObject).isTranspiledInstanceOf('de.svws_nrw.core.data.stundenplan.StundenplanKomplett')))) && (typeof __param1 === "undefined") && (typeof __param2 === "undefined") && (typeof __param3 === "undefined")) {
			const stundenplanKomplett : StundenplanKomplett = cast_de_svws_nrw_core_data_stundenplan_StundenplanKomplett(__param0);
			this._stundenplanID = stundenplanKomplett.daten.id;
			this._stundenplanWochenTypModell = stundenplanKomplett.daten.wochenTypModell;
			this._stundenplanSchuljahresAbschnittID = stundenplanKomplett.daten.idSchuljahresabschnitt;
			this._stundenplanGueltigAb = stundenplanKomplett.daten.gueltigAb;
			this._stundenplanGueltigBis = stundenplanKomplett.daten.gueltigBis;
			this._stundenplanBezeichnung = stundenplanKomplett.daten.bezeichnungStundenplan;
			DeveloperNotificationException.ifTrue("Stundenplan.id != StundenplanUnterrichtsverteilung.id", stundenplanKomplett.daten.id !== stundenplanKomplett.unterrichtsverteilung.id);
			this.initAll(stundenplanKomplett.daten.kalenderwochenZuordnung, stundenplanKomplett.unterrichtsverteilung.faecher, stundenplanKomplett.daten.jahrgaenge, stundenplanKomplett.daten.zeitraster, stundenplanKomplett.daten.raeume, stundenplanKomplett.daten.pausenzeiten, stundenplanKomplett.daten.aufsichtsbereiche, stundenplanKomplett.unterrichtsverteilung.lehrer, stundenplanKomplett.unterrichtsverteilung.schueler, stundenplanKomplett.daten.schienen, stundenplanKomplett.unterrichtsverteilung.klassen, stundenplanKomplett.unterrichtsverteilung.klassenunterricht, stundenplanKomplett.pausenaufsichten, stundenplanKomplett.unterrichtsverteilung.kurse, stundenplanKomplett.unterrichte);
		} else throw new Error('invalid method overload');
	}

	private initAll(listKWZ : List<StundenplanKalenderwochenzuordnung>, listFach : List<StundenplanFach>, listJahrgang : List<StundenplanJahrgang>, listZeitraster : List<StundenplanZeitraster>, listRaum : List<StundenplanRaum>, listPausenzeit : List<StundenplanPausenzeit>, listAufsichtsbereich : List<StundenplanAufsichtsbereich>, listLehrer : List<StundenplanLehrer>, listSchueler : List<StundenplanSchueler>, listSchiene : List<StundenplanSchiene>, listKlasse : List<StundenplanKlasse>, listKlassenunterricht : List<StundenplanKlassenunterricht>, listPausenaufsicht : List<StundenplanPausenaufsicht>, listKurs : List<StundenplanKurs>, listUnterricht : List<StundenplanUnterricht>) : void {
		console.log(JSON.stringify("INIT START"));
		DeveloperNotificationException.ifTrue("stundenplanWochenTypModell < 0", this._stundenplanWochenTypModell < 0);
		DeveloperNotificationException.ifTrue("stundenplanWochenTypModell == 1", this._stundenplanWochenTypModell === 1);
		this.kalenderwochenzuordnungAddAll(listKWZ);
		this.fachAddAll(listFach);
		this.jahrgangAddAll(listJahrgang);
		this.zeitrasterAddAll(listZeitraster);
		this.raumAddAll(listRaum);
		this.pausenzeitAddAll(listPausenzeit);
		this.aufsichtsbereichAddAll(listAufsichtsbereich);
		this.lehrerAddAll(listLehrer);
		this.schuelerAddAll(listSchueler);
		this.klasseAddAll(listKlasse);
		this.schieneAddAll(listSchiene);
		this.klassenunterrichtAddAll(listKlassenunterricht);
		this.pausenaufsichtAddAll(listPausenaufsicht);
		this.kursAddAll(listKurs);
		this.unterrichtAddAll(listUnterricht);
		console.log(JSON.stringify("INIT ENDE"));
	}

	private update_aufsichtsbereichmenge() : void {
		this._aufsichtsbereichmenge.clear();
		this._aufsichtsbereichmenge.addAll(this._aufsichtsbereich_by_id.values());
		this._aufsichtsbereichmenge.sort(StundenplanManager._compAufsichtsbereich);
	}

	private update_fachmenge() : void {
		this._fachmenge.clear();
		this._fachmenge.addAll(this._fach_by_id.values());
		this._fachmenge.sort(StundenplanManager._compFach);
	}

	private update_jahrgangmenge() : void {
		this._jahrgangmenge.clear();
		this._jahrgangmenge.addAll(this._jahrgang_by_id.values());
		this._jahrgangmenge.sort(StundenplanManager._compJahrgang);
	}

	private update_kwzmenge_update_kwz_by_jahr_and_kw() : void {
		this._kwzmenge.clear();
		this._kwzmenge.addAll(this._kwz_by_id.values());
		this._kwz_by_jahr_and_kw.clear();
		for (const kwz of this._kwzmenge)
			DeveloperNotificationException.ifMap2DPutOverwrites(this._kwz_by_jahr_and_kw, kwz.jahr, kwz.kw, kwz);
		const infoVon : Array<number> = DateUtils.extractFromDateISO8601(this._stundenplanGueltigAb);
		const infoBis : Array<number> = DateUtils.extractFromDateISO8601(this._stundenplanGueltigBis);
		const jahrVon : number = infoVon[6];
		const jahrBis : number = infoBis[6];
		const kwVon : number = infoVon[5];
		const kwBis : number = infoBis[5];
		DeveloperNotificationException.ifTrue("jahrVon > jahrBis", jahrVon > jahrBis);
		DeveloperNotificationException.ifTrue("(jahrVon == jahrBis) && (kwVon > kwBis)", (jahrVon === jahrBis) && (kwVon > kwBis));
		for (let jahr : number = jahrVon; jahr <= jahrBis; jahr++) {
			const von : number = (jahr === jahrVon) ? kwVon : 1;
			const bis : number = (jahr === jahrBis) ? kwBis : DateUtils.gibKalenderwochenOfJahr(jahr);
			for (let kw : number = von; kw <= bis; kw++)
				if (!this._kwz_by_jahr_and_kw.contains(jahr, kw)) {
					const kwz : StundenplanKalenderwochenzuordnung = new StundenplanKalenderwochenzuordnung();
					kwz.id = -1;
					kwz.jahr = jahr;
					kwz.kw = kw;
					kwz.wochentyp = this.kalenderwochenzuordnungGetWochentypOrDefault(jahr, kw);
					DeveloperNotificationException.ifMap2DPutOverwrites(this._kwz_by_jahr_and_kw, kwz.jahr, kwz.kw, kwz);
					this._kwzmenge.add(kwz);
				}
		}
		this._kwzmenge.sort(StundenplanManager._compKWZ);
	}

	private update_klassenmenge() : void {
		this._klassenmenge.clear();
		this._klassenmenge.addAll(this._klasse_by_id.values());
		this._klassenmenge.sort(StundenplanManager._compKlasse);
	}

	private update_klassenunterrichtmenge() : void {
		this._klassenunterrichtmenge.clear();
		this._klassenunterrichtmenge.addAll(this._klassenunterricht_by_idKlasse_and_idFach.getNonNullValuesAsList());
		this._klassenunterrichtmenge.sort(StundenplanManager._compKlassenunterricht);
	}

	private update_klassenunterrichtmenge_by_idKlasse() : void {
		this._klassenunterrichtmenge_by_idKlasse.clear();
		for (const klassenunterricht of this._klassenunterricht_by_idKlasse_and_idFach.getNonNullValuesAsList())
			MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idKlasse, klassenunterricht.idKlasse).add(klassenunterricht);
		for (const klasse of this._klasse_by_id.values())
			MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idKlasse, klasse.id).sort(StundenplanManager._compKlassenunterricht);
	}

	private update_klassenunterrichtmenge_by_idSchueler() : void {
		this._klassenunterrichtmenge_by_idSchueler.clear();
		for (const klassenunterricht of this._klassenunterricht_by_idKlasse_and_idFach.getNonNullValuesAsList())
			for (const idSchueler of klassenunterricht.schueler)
				MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idSchueler, idSchueler).add(klassenunterricht);
		for (const schueler of this._schueler_by_id.values())
			MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idSchueler, schueler.id).sort(StundenplanManager._compKlassenunterricht);
	}

	private update_klassenunterrichtmenge_by_idLehrer() : void {
		this._klassenunterrichtmenge_by_idLehrer.clear();
		for (const klassenunterricht of this._klassenunterricht_by_idKlasse_and_idFach.getNonNullValuesAsList())
			for (const idLehrer of klassenunterricht.lehrer)
				MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idLehrer, idLehrer).add(klassenunterricht);
		for (const lehrer of this._lehrer_by_id.values())
			MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idLehrer, lehrer.id).sort(StundenplanManager._compKlassenunterricht);
	}

	private update_kursmenge() : void {
		this._kursmenge.clear();
		this._kursmenge.addAll(this._kurs_by_id.values());
		this._kursmenge.sort(StundenplanManager._compKurs);
	}

	private update_kursmenge_by_idSchueler() : void {
		this._kursmenge_by_idSchueler.clear();
		for (const kurs of this._kurs_by_id.values())
			for (const idSchueler of kurs.schueler)
				MapUtils.getOrCreateArrayList(this._kursmenge_by_idSchueler, idSchueler).add(kurs);
		for (const schueler of this._schueler_by_id.values())
			MapUtils.getOrCreateArrayList(this._kursmenge_by_idSchueler, schueler.id).sort(StundenplanManager._compKurs);
	}

	private update_kursmenge_by_idLehrer() : void {
		this._kursmenge_by_idLehrer.clear();
		for (const kurs of this._kurs_by_id.values())
			for (const idLehrer of kurs.lehrer)
				MapUtils.getOrCreateArrayList(this._kursmenge_by_idLehrer, idLehrer).add(kurs);
		for (const lehrer of this._lehrer_by_id.values())
			MapUtils.getOrCreateArrayList(this._kursmenge_by_idLehrer, lehrer.id).sort(StundenplanManager._compKurs);
	}

	private update_kursmenge_by_idKlasse() : void {
		this._kursmenge_by_idKlasse.clear();
		for (const kurs of this._kurs_by_id.values())
			for (const idSchueler of kurs.schueler) {
				const schueler : StundenplanSchueler = DeveloperNotificationException.ifMapGetIsNull(this._schueler_by_id, idSchueler);
				if ((schueler.idKlasse > 0) && (!MapUtils.getOrCreateArrayList(this._kursmenge_by_idKlasse, schueler.idKlasse).contains(kurs)))
					MapUtils.getOrCreateArrayList(this._kursmenge_by_idKlasse, schueler.idKlasse).add(kurs);
			}
		for (const klasse of this._klasse_by_id.values())
			MapUtils.getOrCreateArrayList(this._kursmenge_by_idKlasse, klasse.id).sort(StundenplanManager._compKurs);
	}

	private update_lehrermenge() : void {
		this._lehrermenge.clear();
		this._lehrermenge.addAll(this._lehrer_by_id.values());
		this._lehrermenge.sort(StundenplanManager._compLehrer);
	}

	private update_lehrermenge_by_idUnterricht() : void {
		this._lehrermenge_by_idUnterricht.clear();
		for (const u of this._unterricht_by_id.values()) {
			for (const idLehrer of u.lehrer) {
				const lehrer : StundenplanLehrer = DeveloperNotificationException.ifMapGetIsNull(this._lehrer_by_id, idLehrer);
				MapUtils.getOrCreateArrayList(this._lehrermenge_by_idUnterricht, u.id).add(lehrer);
			}
			MapUtils.getOrCreateArrayList(this._lehrermenge_by_idUnterricht, u.id).sort(StundenplanManager._compLehrer);
		}
	}

	private update_pausenaufsichtmenge() : void {
		this._pausenaufsichtmenge.clear();
		this._pausenaufsichtmenge.addAll(this._pausenaufsicht_by_id.values());
		this._pausenaufsichtmenge.sort(StundenplanManager._compPausenaufsicht);
	}

	private update_pausenaufsichtmenge_by_wochentag() : void {
		this._pausenaufsichtmenge_by_wochentag.clear();
		for (const a of this._pausenaufsicht_by_id.values()) {
			const p : StundenplanPausenzeit = DeveloperNotificationException.ifMapGetIsNull(this._pausenzeit_by_id, a.idPausenzeit);
			MapUtils.getOrCreateArrayList(this._pausenaufsichtmenge_by_wochentag, p.wochentag).add(a);
		}
		for (const wochentag of Wochentag.values())
			MapUtils.getOrCreateArrayList(this._pausenaufsichtmenge_by_wochentag, wochentag.id).sort(StundenplanManager._compPausenaufsicht);
	}

	private update_pausenaufsichtmenge_by_idPausenzeit() : void {
		this._pausenaufsichtmenge_by_idPausenzeit.clear();
		for (const a of this._pausenaufsicht_by_id.values())
			MapUtils.getOrCreateArrayList(this._pausenaufsichtmenge_by_idPausenzeit, a.idPausenzeit).add(a);
		for (const z of this._pausenzeit_by_id.values())
			MapUtils.getOrCreateArrayList(this._pausenaufsichtmenge_by_idPausenzeit, z.id).sort(StundenplanManager._compPausenaufsicht);
	}

	private update_pausenzeitmenge() : void {
		this._pausenzeitmenge.clear();
		this._pausenzeitmenge.addAll(this._pausenzeit_by_id.values());
		this._pausenzeitmenge.sort(StundenplanManager._compPausenzeit);
		this._pausenzeitMinutenMin = null;
		this._pausenzeitMinutenMax = null;
		for (const p of this._pausenzeitmenge) {
			this._pausenzeitMinutenMin = BlockungsUtils.minII(this._pausenzeitMinutenMin, p.beginn);
			this._pausenzeitMinutenMax = BlockungsUtils.maxII(this._pausenzeitMinutenMax, p.ende);
		}
	}

	private update_pausenzeitmengeOhnePausenaufsicht() : void {
		this._pausenzeitmengeOhneLeere.clear();
		for (const z of this._pausenzeit_by_id.values())
			if (!DeveloperNotificationException.ifMapGetIsNull(this._pausenaufsichtmenge_by_idPausenzeit, z.id).isEmpty())
				this._pausenzeitmengeOhneLeere.add(z);
		this._pausenzeitmengeOhneLeere.sort(StundenplanManager._compPausenzeit);
		this._pausenzeitMinutenMinOhneLeere = null;
		this._pausenzeitMinutenMaxOhneLeere = null;
		for (const p of this._pausenzeitmengeOhneLeere) {
			this._pausenzeitMinutenMinOhneLeere = BlockungsUtils.minII(this._pausenzeitMinutenMinOhneLeere, p.beginn);
			this._pausenzeitMinutenMaxOhneLeere = BlockungsUtils.maxII(this._pausenzeitMinutenMaxOhneLeere, p.ende);
		}
	}

	private update_pausenzeitmenge_by_wochentag() : void {
		this._pausenzeitmenge_by_wochentag.clear();
		for (const z of this._pausenzeit_by_id.values())
			MapUtils.getOrCreateArrayList(this._pausenzeitmenge_by_wochentag, z.wochentag).add(z);
		for (const wochentag of Wochentag.values())
			MapUtils.getOrCreateArrayList(this._pausenzeitmenge_by_wochentag, wochentag.id).sort(StundenplanManager._compPausenzeit);
	}

	private update_raummenge() : void {
		this._raummenge.clear();
		this._raummenge.addAll(this._raum_by_id.values());
		this._raummenge.sort(StundenplanManager._compRaum);
	}

	private update_schienenmenge() : void {
		this._schienenmenge.clear();
		this._schienenmenge.addAll(this._schiene_by_id.values());
		this._schienenmenge.sort(StundenplanManager._compSchiene);
	}

	private update_schuelermenge() : void {
		this._schuelermenge.clear();
		this._schuelermenge.addAll(this._schueler_by_id.values());
		this._schuelermenge.sort(StundenplanManager._compSchueler);
	}

	private update_schuelermenge_by_idKlasse() : void {
		this.schuelermenge_by_idKlasse.clear();
		for (const klasse of this._klasse_by_id.values()) {
			for (const idSchueler of klasse.schueler) {
				const schueler : StundenplanSchueler = DeveloperNotificationException.ifMapGetIsNull(this._schueler_by_id, idSchueler);
				MapUtils.getOrCreateArrayList(this.schuelermenge_by_idKlasse, klasse.id).add(schueler);
			}
			MapUtils.getOrCreateArrayList(this.schuelermenge_by_idKlasse, klasse.id).sort(StundenplanManager._compSchueler);
		}
	}

	private update_schuelermenge_by_idKurs() : void {
		this._schuelermenge_by_idKurs.clear();
		for (const kurs of this._kurs_by_id.values()) {
			for (const idSchueler of kurs.schueler) {
				const schueler : StundenplanSchueler = DeveloperNotificationException.ifMapGetIsNull(this._schueler_by_id, idSchueler);
				MapUtils.getOrCreateArrayList(this._schuelermenge_by_idKurs, kurs.id).add(schueler);
			}
			MapUtils.getOrCreateArrayList(this._schuelermenge_by_idKurs, kurs.id).sort(StundenplanManager._compSchueler);
		}
	}

	private update_unterrichtmenge() : void {
		this._unterrichtmenge.clear();
		this._unterrichtmenge.addAll(this._unterricht_by_id.values());
		this._unterrichtmenge.sort(StundenplanManager._compUnterricht);
		this._unterrichtHatMultiWochen = false;
		for (const u of this._unterrichtmenge)
			if (u.wochentyp > 0) {
				this._unterrichtHatMultiWochen = true;
				break;
			}
	}

	private update_unterrichtmenge_by_idKlasse() : void {
		this._unterrichtmenge_by_idKlasse.clear();
		for (const unterricht of this._unterricht_by_id.values())
			for (const idKlasse of unterricht.klassen)
				MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKlasse, idKlasse).add(unterricht);
		for (const klasse of this._klasse_by_id.values())
			MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKlasse, klasse.id).sort(StundenplanManager._compUnterricht);
	}

	private update_unterrichtmenge_by_idKurs() : void {
		this._unterrichtmenge_by_idKurs.clear();
		for (const u of this._unterricht_by_id.values())
			if (u.idKurs !== null)
				MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKurs, u.idKurs).add(u);
		for (const kurs of this._kurs_by_id.values())
			MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKurs, kurs.id).sort(StundenplanManager._compUnterricht);
	}

	private update_unterrichtmenge_by_idZeitraster() : void {
		this._unterrichtmenge_by_idZeitraster.clear();
		for (const u of this._unterricht_by_id.values())
			MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster, u.idZeitraster).add(u);
		for (const z of this._zeitraster_by_id.values())
			MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster, z.id).sort(StundenplanManager._compUnterricht);
	}

	private update_unterrichtmenge_by_idKlasse_and_idFach() : void {
		this._unterrichtmenge_by_idKlasse_and_idFach.clear();
		for (const u of this._unterricht_by_id.values())
			for (const idKlasse of u.klassen)
				Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKlasse_and_idFach, idKlasse, u.idFach).add(u);
		for (const idKlasse of this._unterrichtmenge_by_idKlasse_and_idFach.getKeySet())
			for (const idFach of this._unterrichtmenge_by_idKlasse_and_idFach.getKeySetOf(idKlasse))
				Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idKlasse_and_idFach, idKlasse, idFach).sort(StundenplanManager._compUnterricht);
	}

	private update_unterrichtmenge_by_idZeitraster_and_wochentyp() : void {
		this._unterrichtmenge_by_idZeitraster_and_wochentyp.clear();
		for (const u of this._unterricht_by_id.values())
			Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, u.idZeitraster, u.wochentyp).add(u);
		for (const idKlasse of this._unterrichtmenge_by_idZeitraster_and_wochentyp.getKeySet())
			for (const wochentyp of this._unterrichtmenge_by_idZeitraster_and_wochentyp.getKeySetOf(idKlasse))
				Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, idKlasse, wochentyp).sort(StundenplanManager._compUnterricht);
	}

	private update_zeitraster_by_wochentag_and_stunde() : void {
		this._zeitraster_by_wochentag_and_stunde.clear();
		for (const zeitraster of this._zeitraster_by_id.values())
			DeveloperNotificationException.ifMap2DPutOverwrites(this._zeitraster_by_wochentag_and_stunde, zeitraster.wochentag, zeitraster.unterrichtstunde, zeitraster);
	}

	private update_zeitrastermenge() : void {
		this._zeitrastermenge.clear();
		this._zeitrastermenge.addAll(this._zeitraster_by_id.values());
		this._zeitrastermenge.sort(StundenplanManager._compZeitraster);
		this._zeitrasterMinutenMinByStunde.clear();
		this._zeitrasterMinutenMaxByStunde.clear();
		this._zeitrasterMinutenMin = null;
		this._zeitrasterMinutenMax = null;
		this._zeitrasterWochentagMin = Wochentag.SONNTAG.id + 1;
		this._zeitrasterWochentagMax = Wochentag.MONTAG.id - 1;
		this._zeitrasterStundeMin = 999;
		this._zeitrasterStundeMax = -999;
		for (const z of this._zeitrastermenge) {
			this._zeitrasterMinutenMin = BlockungsUtils.minII(this._zeitrasterMinutenMin, z.stundenbeginn);
			this._zeitrasterMinutenMax = BlockungsUtils.maxII(this._zeitrasterMinutenMax, z.stundenende);
			this._zeitrasterWochentagMin = BlockungsUtils.minVI(this._zeitrasterWochentagMin, z.wochentag);
			this._zeitrasterWochentagMax = BlockungsUtils.maxVI(this._zeitrasterWochentagMax, z.wochentag);
			this._zeitrasterStundeMin = BlockungsUtils.minVI(this._zeitrasterStundeMin, z.unterrichtstunde);
			this._zeitrasterStundeMax = BlockungsUtils.maxVI(this._zeitrasterStundeMax, z.unterrichtstunde);
			this._zeitrasterMinutenMinByStunde.put(z.unterrichtstunde, BlockungsUtils.minII(this._zeitrasterMinutenMinByStunde.get(z.unterrichtstunde), z.stundenbeginn));
			this._zeitrasterMinutenMaxByStunde.put(z.unterrichtstunde, BlockungsUtils.maxII(this._zeitrasterMinutenMaxByStunde.get(z.unterrichtstunde), z.stundenende));
		}
		this._zeitrasterWochentagMin = (this._zeitrasterWochentagMin === Wochentag.SONNTAG.id + 1) ? Wochentag.MONTAG.id : this._zeitrasterWochentagMin;
		this._zeitrasterWochentagMax = (this._zeitrasterWochentagMax === Wochentag.MONTAG.id - 1) ? Wochentag.MONTAG.id : this._zeitrasterWochentagMax;
		this._zeitrasterStundeMin = (this._zeitrasterStundeMin === 999) ? 1 : this._zeitrasterStundeMin;
		this._zeitrasterStundeMax = (this._zeitrasterStundeMax === -999) ? 1 : this._zeitrasterStundeMax;
		this._zeitrasterWochentageAlsEnumRange = Array(this._zeitrasterWochentagMax - this._zeitrasterWochentagMin + 1).fill(null);
		for (let i : number = 0; i < this._zeitrasterWochentageAlsEnumRange.length; i++)
			this._zeitrasterWochentageAlsEnumRange[i] = Wochentag.fromIDorException(this._zeitrasterWochentagMin + i);
		this._zeitrasterStundenRange = Array(this._zeitrasterStundeMax - this._zeitrasterStundeMin + 1).fill(0);
		for (let i : number = 0; i < this._zeitrasterStundenRange.length; i++)
			this._zeitrasterStundenRange[i] = this._zeitrasterStundeMin + i;
	}

	private update_zeitrastermengeOhneLeereUnterrichtmenge() : void {
		this._zeitrastermengeOhneLeere.clear();
		for (const z of this._zeitraster_by_id.values())
			if (!MapUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster, z.id).isEmpty())
				this._zeitrastermengeOhneLeere.add(z);
		this._zeitrastermengeOhneLeere.sort(StundenplanManager._compZeitraster);
		this._zeitrasterMinutenMinOhneLeere = null;
		this._zeitrasterMinutenMaxOhneLeere = null;
		this._zeitrasterStundeMinOhneLeere = 999;
		this._zeitrasterStundeMaxOhneLeere = -999;
		for (const z of this._zeitrastermengeOhneLeere) {
			this._zeitrasterMinutenMinOhneLeere = BlockungsUtils.minII(this._zeitrasterMinutenMinOhneLeere, z.stundenbeginn);
			this._zeitrasterMinutenMaxOhneLeere = BlockungsUtils.maxII(this._zeitrasterMinutenMaxOhneLeere, z.stundenende);
			this._zeitrasterStundeMinOhneLeere = BlockungsUtils.minVI(this._zeitrasterStundeMinOhneLeere, z.unterrichtstunde);
			this._zeitrasterStundeMaxOhneLeere = BlockungsUtils.maxVI(this._zeitrasterStundeMaxOhneLeere, z.unterrichtstunde);
		}
		this._zeitrasterStundeMinOhneLeere = (this._zeitrasterStundeMinOhneLeere === 999) ? 1 : this._zeitrasterStundeMinOhneLeere;
		this._zeitrasterStundeMaxOhneLeere = (this._zeitrasterStundeMaxOhneLeere === -999) ? 1 : this._zeitrasterStundeMaxOhneLeere;
		this._zeitrasterStundenRangeOhneLeere = Array(this._zeitrasterStundeMaxOhneLeere - this._zeitrasterStundeMinOhneLeere + 1).fill(0);
		for (let i : number = 0; i < this._zeitrasterStundenRangeOhneLeere.length; i++)
			this._zeitrasterStundenRangeOhneLeere[i] = this._zeitrasterStundeMinOhneLeere + i;
	}

	private update_zeitrastermenge_by_wochentag() : void {
		this._zeitrastermenge_by_wochentag.clear();
		for (const zeitraster of this._zeitraster_by_id.values())
			MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_wochentag, zeitraster.wochentag).add(zeitraster);
		for (const wochentag of this._zeitrastermenge_by_wochentag.keySet())
			MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_wochentag, wochentag).sort(StundenplanManager._compZeitraster);
	}

	private update_zeitrastermenge_by_stunde() : void {
		this._zeitrastermenge_by_stunde.clear();
		for (const zeitraster of this._zeitraster_by_id.values())
			MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_stunde, zeitraster.unterrichtstunde).add(zeitraster);
		for (const stunde of this._zeitrastermenge_by_stunde.keySet())
			MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_stunde, stunde).sort(StundenplanManager._compZeitraster);
	}

	private aufsichtsbereichRevalidate() : void {
		this.update_aufsichtsbereichmenge();
	}

	private aufsichtsbereichAddOhneUpdate(aufsichtsbereich : StundenplanAufsichtsbereich) : void {
		StundenplanManager.aufsichtsbereichCheck(aufsichtsbereich);
		DeveloperNotificationException.ifMapPutOverwrites(this._aufsichtsbereich_by_id, aufsichtsbereich.id, aufsichtsbereich);
	}

	/**
	 * Fügt ein {@link StundenplanAufsichtsbereich}-Objekt hinzu.
	 * <br>Laufzeit: O(|StundenplanAufsichtsbereich|), da aufsichtsbereichUpdate() aufgerufen wird.
	 *
	 * @param aufsichtsbereich  Das {@link StundenplanAufsichtsbereich}-Objekt, welches hinzugefügt werden soll.
	 */
	public aufsichtsbereichAdd(aufsichtsbereich : StundenplanAufsichtsbereich) : void {
		this.aufsichtsbereichAddOhneUpdate(aufsichtsbereich);
		this.aufsichtsbereichRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanAufsichtsbereich}-Objekte hinzu.
	 * <br>Laufzeit: O(|StundenplanAufsichtsbereich|), da aufsichtsbereichUpdate() aufgerufen wird.
	 *
	 * @param listAufsichtsbereich  Die Menge der {@link StundenplanAufsichtsbereich}-Objekte, welche hinzugefügt werden soll.
	 */
	public aufsichtsbereichAddAll(listAufsichtsbereich : List<StundenplanAufsichtsbereich>) : void {
		for (const aufsichtsbereich of listAufsichtsbereich)
			this.aufsichtsbereichAddOhneUpdate(aufsichtsbereich);
		this.aufsichtsbereichRevalidate();
	}

	private static aufsichtsbereichCheck(aufsichtsbereich : StundenplanAufsichtsbereich) : void {
		DeveloperNotificationException.ifInvalidID("aufsicht.id", aufsichtsbereich.id);
		DeveloperNotificationException.ifStringIsBlank("aufsicht.kuerzel", aufsichtsbereich.kuerzel);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanAufsichtsbereich}-Objekt.
	 *
	 * @param idAufsichtsbereich  Die Datenbank-ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanAufsichtsbereich}-Objekt.
	 */
	public aufsichtsbereichGetByIdOrException(idAufsichtsbereich : number) : StundenplanAufsichtsbereich {
		return DeveloperNotificationException.ifMapGetIsNull(this._aufsichtsbereich_by_id, idAufsichtsbereich);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanAufsichtsbereich}-Objekte.
	 * <br> Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanAufsichtsbereich}-Objekte.
	 */
	public aufsichtsbereichGetMengeAsList() : List<StundenplanAufsichtsbereich> {
		return this._aufsichtsbereichmenge;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanAufsichtsbereich}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanAufsichtsbereich#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanAufsichtsbereich#beschreibung}
	 * <br>{@link StundenplanAufsichtsbereich#kuerzel}
	 *
	 * @param aufsichtsbereich  Das neue {@link StundenplanAufsichtsbereich}-Objekt, dessen Attribute kopiert werden.
	 */
	public aufsichtsbereichPatchAttributes(aufsichtsbereich : StundenplanAufsichtsbereich) : void {
		StundenplanManager.aufsichtsbereichCheck(aufsichtsbereich);
		DeveloperNotificationException.ifMapRemoveFailes(this._aufsichtsbereich_by_id, aufsichtsbereich.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._aufsichtsbereich_by_id, aufsichtsbereich.id, aufsichtsbereich);
		this.aufsichtsbereichRevalidate();
	}

	private aufsichtsbereichRemoveOhneUpdateById(idAufsichtsbereich : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._aufsichtsbereich_by_id, idAufsichtsbereich);
	}

	/**
	 * Entfernt ein {@link StundenplanAufsichtsbereich}-Objekt anhand seiner ID.
	 * <br>Laufzeit: O(|StundenplanAufsichtsbereich|), da aufsichtsbereichUpdate() aufgerufen wird.
	 *
	 * @param idAufsichtsbereich  Die Datenbank-ID des {@link StundenplanAufsichtsbereich}-Objekts, welches entfernt werden soll.
	 */
	public aufsichtsbereichRemoveById(idAufsichtsbereich : number) : void {
		this.aufsichtsbereichRemoveOhneUpdateById(idAufsichtsbereich);
		this.aufsichtsbereichRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanAufsichtsbereich}-Objekte.
	 *
	 * @param listAufsichtsbereich  Die Liste der zu entfernenden {@link StundenplanAufsichtsbereich}-Objekte.
	 */
	public aufsichtsbereichRemoveAll(listAufsichtsbereich : List<StundenplanAufsichtsbereich>) : void {
		for (const aufsichtsbereich of listAufsichtsbereich)
			this.aufsichtsbereichRemoveOhneUpdateById(aufsichtsbereich.id);
		this.aufsichtsbereichRevalidate();
	}

	private fachRevalidate() : void {
		this.update_fachmenge();
		this.update_unterrichtmenge_by_idKlasse_and_idFach();
	}

	private fachAddOhneUpdate(fach : StundenplanFach) : void {
		StundenplanManager.fachCheck(fach);
		DeveloperNotificationException.ifMapPutOverwrites(this._fach_by_id, fach.id, fach);
	}

	/**
	 * Fügt ein {@link StundenplanFach}-Objekt hinzu.
	 * <br>Laufzeit: O(|StundenplanFach|), da fachUpdate() aufgerufen wird.
	 *
	 * @param fach  Das {@link StundenplanFach}-Objekt, welches hinzugefügt werden soll.
	 */
	public fachAdd(fach : StundenplanFach) : void {
		this.fachAddOhneUpdate(fach);
		this.fachRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanFach}-Objekte hinzu.
	 * <br>Laufzeit: O(|StundenplanFach|), da fachUpdate() aufgerufen wird.
	 *
	 * @param listFach  Die Menge der {@link StundenplanFach}-Objekte, welche hinzugefügt werden soll.
	 */
	public fachAddAll(listFach : List<StundenplanFach>) : void {
		for (const fach of listFach)
			this.fachAddOhneUpdate(fach);
		this.fachRevalidate();
	}

	private static fachCheck(fach : StundenplanFach) : void {
		DeveloperNotificationException.ifInvalidID("fach.id", fach.id);
		DeveloperNotificationException.ifStringIsBlank("fach.bezeichnung", fach.bezeichnung);
		DeveloperNotificationException.ifStringIsBlank("fach.kuerzel", fach.kuerzel);
	}

	/**
	 * Liefert das Fach mit der übergebenen ID.
	 *
	 * @param idFach  Die Datenbank-ID des Faches.
	 *
	 * @return  das Fach mit der übergebenen ID.
	 */
	public fachGetByIdOrException(idFach : number) : StundenplanFach {
		return DeveloperNotificationException.ifMapGetIsNull(this._fach_by_id, idFach);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanFach}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanFach}-Objekte.
	 */
	public fachGetMengeAsList() : List<StundenplanFach> {
		return this._fachmenge;
	}

	private jahrgangRevalidate() : void {
		this.update_jahrgangmenge();
	}

	private jahrgangAddOhneUpdate(jahrgang : StundenplanJahrgang) : void {
		StundenplanManager.jahrgangCheck(jahrgang);
		DeveloperNotificationException.ifMapPutOverwrites(this._jahrgang_by_id, jahrgang.id, jahrgang);
	}

	/**
	 * Fügt ein {@link StundenplanJahrgang}-Objekt hinzu.
	 * <br>Laufzeit: O(|StundenplanJahrgang|), da jahrgangUpdate() aufgerufen wird.
	 *
	 * @param jahrgang  Das {@link StundenplanJahrgang}-Objekt, welches hinzugefügt werden soll.
	 */
	public jahrgangAdd(jahrgang : StundenplanJahrgang) : void {
		this.jahrgangAddOhneUpdate(jahrgang);
		this.jahrgangRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanJahrgang}-Objekte hinzu.
	 * <br>Laufzeit: O(|StundenplanJahrgang|), da jahrgangUpdate() aufgerufen wird.
	 *
	 * @param listJahrgang  Die Menge der {@link StundenplanJahrgang}-Objekte, welche hinzugefügt werden soll.
	 */
	public jahrgangAddAll(listJahrgang : List<StundenplanJahrgang>) : void {
		for (const jahrgang of listJahrgang)
			this.jahrgangAddOhneUpdate(jahrgang);
		this.jahrgangRevalidate();
	}

	private static jahrgangCheck(jahrgang : StundenplanJahrgang) : void {
		DeveloperNotificationException.ifInvalidID("jahrgang.id", jahrgang.id);
		DeveloperNotificationException.ifStringIsBlank("jahrgang.bezeichnung", jahrgang.bezeichnung);
		DeveloperNotificationException.ifStringIsBlank("jahrgang.kuerzel", jahrgang.kuerzel);
	}

	/**
	 * Liefert das {@link StundenplanJahrgang}-Objekt mit der übergebenen ID.
	 *
	 * @param idJahrgang  Die Datenbank-ID des {@link StundenplanJahrgang}-Objekts.
	 *
	 * @return das {@link StundenplanJahrgang}-Objekt mit der übergebenen ID.
	 */
	public jahrgangGetByIdOrException(idJahrgang : number) : StundenplanJahrgang {
		return DeveloperNotificationException.ifMapGetIsNull(this._jahrgang_by_id, idJahrgang);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanJahrgang}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanJahrgang}-Objekte.
	 */
	public jahrgangGetMengeAsList() : List<StundenplanJahrgang> {
		return this._jahrgangmenge;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanJahrgang}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanJahrgang#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanJahrgang#bezeichnung}
	 * <br>{@link StundenplanJahrgang#kuerzel}
	 *
	 * @param jahrgang  Das neue {@link StundenplanJahrgang}-Objekt, dessen Attribute kopiert werden.
	 */
	public jahrgangPatchAttributes(jahrgang : StundenplanJahrgang) : void {
		StundenplanManager.jahrgangCheck(jahrgang);
		DeveloperNotificationException.ifMapRemoveFailes(this._jahrgang_by_id, jahrgang.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._jahrgang_by_id, jahrgang.id, jahrgang);
		this.jahrgangRevalidate();
	}

	private jahrgangRemoveOhneUpdateById(idJahrgang : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._jahrgang_by_id, idJahrgang);
	}

	/**
	 * Entfernt ein {@link StundenplanJahrgang}-Objekt anhand seiner ID.
	 * <br>Laufzeit: O(|StundenplanJahrgang|), da jahrgangUpdate() aufgerufen wird.
	 *
	 * @param idJahrgang  Die Datenbank-ID des {@link StundenplanJahrgang}-Objekts, welches entfernt werden soll.
	 */
	public jahrgangRemoveById(idJahrgang : number) : void {
		this.jahrgangRemoveOhneUpdateById(idJahrgang);
		this.jahrgangRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanJahrgang}-Objekte.
	 *
	 * @param listJahrgang  Die Liste der zu entfernenden {@link StundenplanJahrgang}-Objekte.
	 */
	public jahrgangRemoveAll(listJahrgang : List<StundenplanJahrgang>) : void {
		for (const jahrgang of listJahrgang)
			this.jahrgangRemoveOhneUpdateById(jahrgang.id);
		this.jahrgangRevalidate();
	}

	private kalenderwochenzuordnungRevalidate() : void {
		this.update_kwzmenge_update_kwz_by_jahr_and_kw();
	}

	private kalenderwochenzuordnungAddOhneUpdate(kwz : StundenplanKalenderwochenzuordnung) : void {
		this.kalenderwochenzuordnungCheck(kwz);
		DeveloperNotificationException.ifMapPutOverwrites(this._kwz_by_id, kwz.id, kwz);
	}

	/**
	 * Fügt ein {@link StundenplanKalenderwochenzuordnung}-Objekt hinzu.
	 *
	 * @param kwz  Das {@link StundenplanKalenderwochenzuordnung}-Objekt, welches hinzugefügt werden soll.
	 */
	public kalenderwochenzuordnungAdd(kwz : StundenplanKalenderwochenzuordnung) : void {
		this.kalenderwochenzuordnungAddOhneUpdate(kwz);
		this.kalenderwochenzuordnungRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanKalenderwochenzuordnung}-Objekte hinzu.
	 *
	 * @param listKWZ  Die Menge der {@link StundenplanKalenderwochenzuordnung}-Objekte, welche hinzugefügt werden soll.
	 */
	public kalenderwochenzuordnungAddAll(listKWZ : List<StundenplanKalenderwochenzuordnung>) : void {
		for (const kwz of listKWZ)
			this.kalenderwochenzuordnungAddOhneUpdate(kwz);
		this.kalenderwochenzuordnungRevalidate();
	}

	private kalenderwochenzuordnungCheck(kwz : StundenplanKalenderwochenzuordnung) : void {
		DeveloperNotificationException.ifInvalidID("kwz.id", kwz.id);
		DeveloperNotificationException.ifTrue("(kwz.jahr < DateUtils.MIN_GUELTIGES_JAHR) || (kwz.jahr > DateUtils.MAX_GUELTIGES_JAHR)", (kwz.jahr < DateUtils.MIN_GUELTIGES_JAHR) || (kwz.jahr > DateUtils.MAX_GUELTIGES_JAHR));
		DeveloperNotificationException.ifTrue("(kwz.kw < 1) || (kwz.kw > DateUtils.gibKalenderwochenOfJahr(kwz.jahr))", (kwz.kw < 1) || (kwz.kw > DateUtils.gibKalenderwochenOfJahr(kwz.jahr)));
		DeveloperNotificationException.ifTrue("kwz.wochentyp > stundenplanWochenTypModell", kwz.wochentyp > this._stundenplanWochenTypModell);
		DeveloperNotificationException.ifTrue("kwz.wochentyp <=0", kwz.wochentyp <= 0);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKWZ Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 */
	public kalenderwochenzuordnungGetByIdOrException(idKWZ : number) : StundenplanKalenderwochenzuordnung {
		return DeveloperNotificationException.ifMapGetIsNull(this._kwz_by_id, idKWZ);
	}

	/**
	 * Liefert das dem Jahr und der Kalenderwoche zugeordnete {@link StundenplanKalenderwochenzuordnung}-Objekt der Auswahl-Menge.
	 * <br>Hinweis: Einige Objekte dieser Menge können die ID = -1 haben, falls sie erzeugt wurden und nicht aus der DB stammen.
	 * <br>Laufzeit: O(1)
	 *
	 * @param jahr           Das Jahr der Kalenderwoche.
	 * @param kalenderwoche  Die gewünschten Kalenderwoche.
	 *
	 * @return das dem Jahr und der Kalenderwoche zugeordnete {@link StundenplanKalenderwochenzuordnung}-Objekt der Auswahl-Menge.
	 */
	public kalenderwochenzuordnungGetByJahrAndKWOrException(jahr : number, kalenderwoche : number) : StundenplanKalenderwochenzuordnung {
		return DeveloperNotificationException.ifMap2DGetIsNull(this._kwz_by_jahr_and_kw, jahr, kalenderwoche);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 * <br>Hinweis: Einige Objekte dieser Menge können die ID = -1 haben, falls sie erzeugt wurden und nicht aus der DB stammen.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 */
	public kalenderwochenzuordnungGetMengeAsList() : List<StundenplanKalenderwochenzuordnung> {
		return this._kwzmenge;
	}

	/**
	 * Liefert eine String-Darstellung der Kalenderwoche des {@link StundenplanKalenderwochenzuordnung}-Objekts.
	 * <br>Beispiel: Jahr 2023, KW  5 --> "30.01.2023 - 05.02.2023 (KW 2023.5)"
	 * <br>Beispiel: Jahr 2025, KW  1 --> "30.12.2024 - 05.01.2025 (KW 2025.1)"
	 * <br>Beispiel: Jahr 2026, KW 53 --> "28.12.2026 - 03.01.2027 (KW 2026.53)"
	 * <br>Laufzeit: O(1)
	 *
	 * @param kwz  Das {@link StundenplanKalenderwochenzuordnung}-Objekt.
	 *
	 * @return eine String-Darstellung der Kalenderwoche des {@link StundenplanKalenderwochenzuordnung}-Objekts.
	 */
	public kalenderwochenzuordnungGetWocheAsString(kwz : StundenplanKalenderwochenzuordnung) : string {
		const sMo : string = DateUtils.gibDatumDesMontagsOfJahrAndKalenderwoche(kwz.jahr, kwz.kw);
		const sSo : string = DateUtils.gibDatumDesSonntagsOfJahrAndKalenderwoche(kwz.jahr, kwz.kw);
		const sMoGer : string = DateUtils.gibDatumGermanFormat(sMo);
		const sSoGer : string = DateUtils.gibDatumGermanFormat(sSo);
		const sJahrKW : string = "(KW " + kwz.jahr + "." + kwz.kw + ")";
		return sMoGer! + " - " + sSoGer! + " " + sJahrKW!;
	}

	/**
	 * Liefert den zugeordneten Wochentyp, oder den Default-Wochentyp, welcher sich aus der Kalenderwoche berechnet.
	 * <br>Laufzeit: O(1)
	 *
	 * @param jahr           Das Jahr der Kalenderwoche. Es muss zwischen {@link DateUtils#MIN_GUELTIGES_JAHR} und {@link DateUtils#MAX_GUELTIGES_JAHR} liegen.
	 * @param kalenderwoche  Die gewünschten Kalenderwoche. Es muss zwischen 1 und {@link DateUtils#gibKalenderwochenOfJahr(int)} liegen.
	 *
	 * @return den zugeordneten Wochentyp, oder den Default-Wochentyp, welcher sich aus der Kalenderwoche berechnet.
	 */
	public kalenderwochenzuordnungGetWochentypOrDefault(jahr : number, kalenderwoche : number) : number {
		DeveloperNotificationException.ifSmaller("jahr", jahr, DateUtils.MIN_GUELTIGES_JAHR);
		DeveloperNotificationException.ifGreater("jahr", jahr, DateUtils.MAX_GUELTIGES_JAHR);
		DeveloperNotificationException.ifSmaller("kalenderwoche", kalenderwoche, 1);
		DeveloperNotificationException.ifGreater("kalenderwoche", kalenderwoche, DateUtils.gibKalenderwochenOfJahr(jahr));
		if (this._stundenplanWochenTypModell === 0)
			return 0;
		const z : StundenplanKalenderwochenzuordnung | null = this._kwz_by_jahr_and_kw.getOrNull(jahr, kalenderwoche);
		if (z !== null)
			return z.wochentyp;
		const wochentyp : number = kalenderwoche % this._stundenplanWochenTypModell;
		return wochentyp === 0 ? this._stundenplanWochenTypModell : wochentyp;
	}

	/**
	 * Liefert TRUE, falls intern ein Mapping von "Jahr, Kalenderwoche" den Wochentyp verwendet wird.
	 * <br>Hinweis: Das Mapping muss existieren UND {@link #_stundenplanWochenTypModell} muss mindestens 2 sein.
	 * <br>Laufzeit: O(1)
	 *
	 * @param jahr           Das Jahr der Kalenderwoche. Es muss zwischen {@link DateUtils#MIN_GUELTIGES_JAHR} und {@link DateUtils#MAX_GUELTIGES_JAHR} liegen.
	 * @param kalenderwoche  Die gewünschten Kalenderwoche. Es muss zwischen 1 und {@link DateUtils#gibKalenderwochenOfJahr(int)} liegen.
	 *
	 * @return TRUE, falls intern ein Mapping von "Jahr, Kalenderwoche" den Wochentyp verwendet wird.
	 */
	public kalenderwochenzuordnungGetWochentypUsesMapping(jahr : number, kalenderwoche : number) : boolean {
		DeveloperNotificationException.ifSmaller("jahr", jahr, DateUtils.MIN_GUELTIGES_JAHR);
		DeveloperNotificationException.ifGreater("jahr", jahr, DateUtils.MAX_GUELTIGES_JAHR);
		DeveloperNotificationException.ifSmaller("kalenderwoche", kalenderwoche, 1);
		DeveloperNotificationException.ifGreater("kalenderwoche", kalenderwoche, DateUtils.gibKalenderwochenOfJahr(jahr));
		const z : StundenplanKalenderwochenzuordnung | null = this._kwz_by_jahr_and_kw.getOrNull(jahr, kalenderwoche);
		return (this._stundenplanWochenTypModell >= 2) && (z !== null);
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanKalenderwochenzuordnung}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanKalenderwochenzuordnung#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanKalenderwochenzuordnung#jahr}
	 * <br>{@link StundenplanKalenderwochenzuordnung#kw}
	 * <br>{@link StundenplanKalenderwochenzuordnung#wochentyp}
	 *
	 * @param kwz  Das neue {@link StundenplanKalenderwochenzuordnung}-Objekt, dessen Attribute kopiert werden.
	 */
	public kalenderwochenzuordnungPatchAttributes(kwz : StundenplanKalenderwochenzuordnung) : void {
		this.kalenderwochenzuordnungCheck(kwz);
		DeveloperNotificationException.ifMapRemoveFailes(this._kwz_by_id, kwz.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._kwz_by_id, kwz.id, kwz);
		this.kalenderwochenzuordnungRevalidate();
	}

	private kalenderwochenzuordnungRemoveOhneUpdateById(idKWZ : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._kwz_by_id, idKWZ);
	}

	/**
	 * Entfernt ein {@link StundenplanKalenderwochenzuordnung}-Objekt anhand seiner Datenbank-ID.
	 *
	 * @param idKWZ  Die Datenbank-ID des {@link StundenplanKalenderwochenzuordnung}-Objekts, welches entfernt werden soll.
	 */
	public kalenderwochenzuordnungRemoveById(idKWZ : number) : void {
		this.kalenderwochenzuordnungRemoveOhneUpdateById(idKWZ);
		this.kalenderwochenzuordnungRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 *
	 * @param listKWZ  Die Liste der zu entfernenden {@link StundenplanKalenderwochenzuordnung}-Objekte.
	 */
	public kalenderwochenzuordnungRemoveAll(listKWZ : List<StundenplanKalenderwochenzuordnung>) : void {
		for (const kwz of listKWZ)
			this.kalenderwochenzuordnungRemoveOhneUpdateById(kwz.id);
		this.kalenderwochenzuordnungRevalidate();
	}

	private klasseRevalidate() : void {
		this.update_klassenmenge();
		this.update_schuelermenge_by_idKlasse();
		this.update_kursmenge_by_idKlasse();
		this.update_unterrichtmenge_by_idKlasse();
		this.update_klassenunterrichtmenge_by_idKlasse();
		this.update_unterrichtmenge_by_idKlasse_and_idFach();
	}

	private klasseAddOhneUpdate(klasse : StundenplanKlasse) : void {
		this.klasseCheck(klasse);
		DeveloperNotificationException.ifMapPutOverwrites(this._klasse_by_id, klasse.id, klasse);
	}

	/**
	 * Fügt ein {@link StundenplanKlasse}-Objekt hinzu.
	 *
	 * @param klasse  Das {@link StundenplanKlasse}-Objekt, welches hinzugefügt werden soll.
	 */
	public klasseAdd(klasse : StundenplanKlasse) : void {
		this.klasseAddOhneUpdate(klasse);
		this.klasseRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanKlasse}-Objekte hinzu.
	 *
	 * @param listKlasse  Die Menge der {@link StundenplanKlasse}-Objekte, welche hinzugefügt werden soll.
	 */
	public klasseAddAll(listKlasse : List<StundenplanKlasse>) : void {
		for (const klasse of listKlasse)
			this.klasseAddOhneUpdate(klasse);
		this.klasseRevalidate();
	}

	private klasseCheck(klasse : StundenplanKlasse) : void {
		DeveloperNotificationException.ifInvalidID("klasse.id", klasse.id);
		DeveloperNotificationException.ifStringIsBlank("klasse.kuerzel", klasse.kuerzel);
		for (const idJahrgang of klasse.jahrgaenge)
			DeveloperNotificationException.ifMapNotContains("_jahrgang_by_id", this._jahrgang_by_id, idJahrgang);
		for (const idSchueler of klasse.schueler)
			DeveloperNotificationException.ifMapNotContains("_schueler_by_id", this._schueler_by_id, idSchueler);
	}

	/**
	 * Liefert das {@link StundenplanKlasse}-Objekt mit der übergebenen ID.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID des {@link StundenplanKlasse}-Objekts.
	 *
	 * @return das {@link StundenplanKlasse}-Objekt mit der übergebenen ID.
	 */
	public klasseGetByIdOrException(idKlasse : number) : StundenplanKlasse {
		return DeveloperNotificationException.ifMapGetIsNull(this._klasse_by_id, idKlasse);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKlasse}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanKlasse}-Objekte.
	 */
	public klasseGetMengeAsList() : List<StundenplanKlasse> {
		return this._klassenmenge;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanKlasse}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanKlasse#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanKlasse#bezeichnung}
	 * <br>{@link StundenplanKlasse#kuerzel}
	 * <br>{@link StundenplanKlasse#jahrgaenge}
	 * <br>{@link StundenplanKlasse#schueler}
	 *
	 * @param klasse  Das neue {@link StundenplanKlasse}-Objekt, dessen Attribute kopiert werden.
	 */
	public klassePatchAttributes(klasse : StundenplanKlasse) : void {
		this.klasseCheck(klasse);
		DeveloperNotificationException.ifMapRemoveFailes(this._klasse_by_id, klasse.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._klasse_by_id, klasse.id, klasse);
		this.klasseRevalidate();
	}

	private klasseRemoveOhneUpdateById(idKlasse : number) : void {
		for (const u of DeveloperNotificationException.ifMapGetIsNull(this._klassenunterrichtmenge_by_idKlasse, idKlasse))
			this.klassenunterrichtRemoveOhneUpdateById(u.idKlasse, u.idFach);
		DeveloperNotificationException.ifMapRemoveFailes(this._klasse_by_id, idKlasse);
	}

	/**
	 * Entfernt ein {@link StundenplanKlasse}-Objekt anhand seiner ID.
	 *
	 * @param idKlasse  Die Datenbank-ID des {@link StundenplanKlasse}-Objekts, welches entfernt werden soll.
	 */
	public klasseRemoveById(idKlasse : number) : void {
		this.klasseRemoveOhneUpdateById(idKlasse);
		this.klasseRevalidate();
		this.klassenunterrichtRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanKlasse}-Objekte.
	 *
	 * @param listKlasse  Die Liste der zu entfernenden {@link StundenplanKlasse}-Objekte.
	 */
	public klasseRemoveAll(listKlasse : List<StundenplanKlasse>) : void {
		for (const klasse of listKlasse)
			this.klasseRemoveOhneUpdateById(klasse.id);
		this.klasseRevalidate();
		this.klassenunterrichtRevalidate();
		this.unterrichtRevalidate();
	}

	private klassenunterrichtRevalidate() : void {
		this.update_klassenunterrichtmenge();
		this.update_klassenunterrichtmenge_by_idKlasse();
		this.update_klassenunterrichtmenge_by_idLehrer();
		this.update_klassenunterrichtmenge_by_idSchueler();
	}

	private klassenunterrichtAddOhneUpdate(klassenunterricht : StundenplanKlassenunterricht) : void {
		this.klassenunterrichtCheck(klassenunterricht);
		DeveloperNotificationException.ifMap2DPutOverwrites(this._klassenunterricht_by_idKlasse_and_idFach, klassenunterricht.idKlasse, klassenunterricht.idFach, klassenunterricht);
	}

	/**
	 * Fügt ein {@link StundenplanKlassenunterricht}-Objekt hinzu.
	 *
	 * @param klassenunterricht  Das {@link StundenplanKlassenunterricht}-Objekt, welches hinzugefügt werden soll.
	 */
	public klassenunterrichtAdd(klassenunterricht : StundenplanKlassenunterricht) : void {
		this.klassenunterrichtAddOhneUpdate(klassenunterricht);
		this.klassenunterrichtRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanKlassenunterricht}-Objekte hinzu.
	 *
	 * @param listKlassenunterricht  Die Menge der {@link StundenplanKlassenunterricht}-Objekte, welche hinzugefügt werden soll.
	 */
	private klassenunterrichtAddAll(listKlassenunterricht : List<StundenplanKlassenunterricht>) : void {
		for (const klassenunterricht of listKlassenunterricht)
			this.klassenunterrichtAddOhneUpdate(klassenunterricht);
		this.klassenunterrichtRevalidate();
	}

	private klassenunterrichtCheck(klassenunterricht : StundenplanKlassenunterricht) : void {
		DeveloperNotificationException.ifMapNotContains("_klasse_by_id", this._klasse_by_id, klassenunterricht.idKlasse);
		DeveloperNotificationException.ifMapNotContains("_fach_by_id", this._fach_by_id, klassenunterricht.idFach);
		for (const idSchiene of klassenunterricht.schienen)
			DeveloperNotificationException.ifMapNotContains("_schiene_by_id", this._schiene_by_id, idSchiene);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKlassenunterricht}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanKlassenunterricht}-Objekte.
	 */
	public klassenunterrichtGetMengeAsList() : List<StundenplanKlassenunterricht> {
		return this._klassenunterrichtmenge;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKlassenunterricht}-Objekte der Klasse.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 *
	 * @return eine Liste aller {@link StundenplanKlassenunterricht}-Objekte der Klasse.
	 */
	public klassenunterrichtGetMengeByKlasseIdAsList(idKlasse : number) : List<StundenplanKlassenunterricht> {
		return MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idKlasse, idKlasse);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKlassenunterricht}-Objekte des Lehrers.
	 * <br> Laufzeit: O(1)
	 *
	 * @param idLehrer  Die Datenbank-ID des Lehrers.
	 *
	 * @return eine Liste aller {@link StundenplanKlassenunterricht}-Objekte des Lehrers.
	 */
	public klassenunterrichtGetMengeByLehrerIdAsList(idLehrer : number) : List<StundenplanKlassenunterricht> {
		return MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idLehrer, idLehrer);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKlassenunterricht}-Objekte des Schülers.
	 * <br> Laufzeit: O(1)
	 *
	 * @param idSchueler  Die Datenbank-ID des Schülers.
	 *
	 * @return eine Liste aller {@link StundenplanKlassenunterricht}-Objekte des Schülers.
	 */
	public klassenunterrichtGetMengeBySchuelerIdAsList(idSchueler : number) : List<StundenplanKlassenunterricht> {
		return MapUtils.getOrCreateArrayList(this._klassenunterrichtmenge_by_idSchueler, idSchueler);
	}

	/**
	 * Liefert die IST-Wochenstunden des {@link StundenplanKlassenunterricht}.
	 * <br>Hinweis: Durch AB-Wochen, ist der Rückgabewert eine Kommazahl, da nur Stundenanteile gesetzt sein können.
	 * <br>Laufzeit: O(|Unterrichte des Klassenunterricht|)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 * @param idFach    Die Datenbank-ID des Faches.
	 *
	 * @return die IST-Wochenstunden des {@link StundenplanKlassenunterricht}.
	 */
	public klassenunterrichtGetWochenstundenIst(idKlasse : number, idFach : number) : number {
		let summe : number = 0;
		const faktor : number = (this._stundenplanWochenTypModell === 0) ? 1 : this._stundenplanWochenTypModell;
		const listU : List<StundenplanUnterricht> = DeveloperNotificationException.ifMap2DGetIsNull(this._unterrichtmenge_by_idKlasse_and_idFach, idKlasse, idFach);
		for (const u of listU)
			summe += (u.wochentyp === 0) ? faktor : 1;
		return ((summe * 100.0 / faktor) as number) / 100.0;
	}

	/**
	 * Liefert die SOLL-Wochenstunden des {@link StundenplanKlassenunterricht}.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 * @param idFach    Die Datenbank-ID des Faches.
	 *
	 * @return die SOLL-Wochenstunden des {@link StundenplanKlassenunterricht}.
	 */
	public klassenunterrichtGetWochenstundenSoll(idKlasse : number, idFach : number) : number {
		return DeveloperNotificationException.ifMap2DGetIsNull(this._klassenunterricht_by_idKlasse_and_idFach, idKlasse, idFach).wochenstunden;
	}

	private klassenunterrichtRemoveOhneUpdateById(idKlasse : number, idFach : number) : void {
		for (const u of DeveloperNotificationException.ifMap2DGetIsNull(this._unterrichtmenge_by_idKlasse_and_idFach, idKlasse, idFach))
			this.unterrichtRemoveByIdOhneUpdate(u.id);
		DeveloperNotificationException.ifMap2DRemoveFailes(this._klassenunterricht_by_idKlasse_and_idFach, idKlasse, idFach);
	}

	/**
	 * Entfernt ein {@link StundenplanKlassenunterricht}-Objekt anhand seiner ID.
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 * @param idFach    Die Datenbank-ID des Faches.
	 */
	public klassenunterrichtRemoveById(idKlasse : number, idFach : number) : void {
		this.klassenunterrichtRemoveOhneUpdateById(idKlasse, idFach);
		this.klassenunterrichtRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanKlassenunterricht}-Objekte.
	 *
	 * @param listKlassenunterricht  Die Liste der zu entfernenden {@link StundenplanKlassenunterricht}-Objekte.
	 */
	public klassenunterrichtRemoveAll(listKlassenunterricht : List<StundenplanKlassenunterricht>) : void {
		for (const klassenunterricht of listKlassenunterricht)
			this.klassenunterrichtRemoveOhneUpdateById(klassenunterricht.idKlasse, klassenunterricht.idFach);
		this.klassenunterrichtRevalidate();
		this.unterrichtRevalidate();
	}

	private kursRevalidate() : void {
		this.update_kursmenge();
		this.update_kursmenge_by_idKlasse();
		this.update_kursmenge_by_idLehrer();
		this.update_kursmenge_by_idSchueler();
		this.update_schuelermenge_by_idKurs();
		this.update_unterrichtmenge_by_idKurs();
	}

	private kursAddOhneUpdate(kurs : StundenplanKurs) : void {
		this.kursCheck(kurs);
		DeveloperNotificationException.ifMapPutOverwrites(this._kurs_by_id, kurs.id, kurs);
	}

	/**
	 * Fügt ein {@link StundenplanKurs}-Objekt hinzu.
	 *
	 * @param kurs  Das {@link StundenplanKurs}-Objekt, welches hinzugefügt werden soll.
	 */
	public kursAdd(kurs : StundenplanKurs) : void {
		this.kursAddOhneUpdate(kurs);
		this.kursRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanKurs}-Objekte hinzu.
	 *
	 * @param listKurs  Die Menge der {@link StundenplanKurs}-Objekte, welche hinzugefügt werden soll.
	 */
	public kursAddAll(listKurs : List<StundenplanKurs>) : void {
		for (const kurs of listKurs)
			this.kursAddOhneUpdate(kurs);
		this.kursRevalidate();
	}

	private kursCheck(kurs : StundenplanKurs) : void {
		DeveloperNotificationException.ifInvalidID("kurs.id", kurs.id);
		DeveloperNotificationException.ifStringIsBlank("kurs.bezeichnung", kurs.bezeichnung);
		DeveloperNotificationException.ifSmaller("kurs.wochenstunden", kurs.wochenstunden, 0);
		for (const idSchieneDesKurses of kurs.schienen)
			DeveloperNotificationException.ifMapNotContains("_schiene_by_id", this._schiene_by_id, idSchieneDesKurses);
		for (const idJahrgangDesKurses of kurs.jahrgaenge)
			DeveloperNotificationException.ifMapNotContains("_jahrgang_by_id", this._jahrgang_by_id, idJahrgangDesKurses);
		for (const idSchuelerDesKurses of kurs.schueler)
			DeveloperNotificationException.ifMapNotContains("_schueler_by_id", this._schueler_by_id, idSchuelerDesKurses);
		for (const idLehrerDesKurses of kurs.lehrer)
			DeveloperNotificationException.ifMapNotContains("_lehrer_by_id", this._lehrer_by_id, idLehrerDesKurses);
	}

	/**
	 * Liefert das {@link StundenplanKurs}-Objekt mit der übergebenen ID.
	 *
	 * @param idKurs  Die Datenbank-ID des {@link StundenplanKurs}-Objekts.
	 *
	 * @return das {@link StundenplanKurs}-Objekt mit der übergebenen ID.
	 */
	public kursGetByIdOrException(idKurs : number) : StundenplanKurs {
		return DeveloperNotificationException.ifMapGetIsNull(this._kurs_by_id, idKurs);
	}

	/**
	 * Liefert TRUE, falls der übergebene Kurs am (Wochentyp / Wochentag / Unterrichtsstunde) stattfindet.
	 * <br>Laufzeit: O(|Unterrichtmenge des Kurses|)
	 *
	 * @param idKurs            Die Datenbank-ID des Kurses.
	 * @param wochentyp         Der Typ der Woche (beispielsweise bei AB-Wochen).
	 * @param wochentag         Der gewünschte {@link Wochentag}.
	 * @param unterrichtstunde  Die gewünschte Unterrichtsstunde.
	 *
	 * @return TRUE, falls der übergebene Kurs am (wochentyp / wochentag / Unterrichtsstunde) stattfindet.
	 */
	public kursGetHatUnterrichtAm(idKurs : number, wochentyp : number, wochentag : Wochentag, unterrichtstunde : number) : boolean {
		for (const u of this.unterrichtGetMengeByKursIdAndWochentyp(idKurs, wochentyp)) {
			const z : StundenplanZeitraster = this.zeitrasterGetByIdOrException(u.idZeitraster);
			if ((z.wochentag === wochentag.id) && (z.unterrichtstunde === unterrichtstunde))
				return true;
		}
		return false;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKurs}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanKurs}-Objekte.
	 */
	public kursGetMengeAsList() : List<StundenplanKurs> {
		return this._kursmenge;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKurs}-Objekte der Klasse.
	 * <br> Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 *
	 * @return eine Liste aller {@link StundenplanKurs}-Objekte der Klasse.
	 */
	public kursGetMengeByKlasseIdAsList(idKlasse : number) : List<StundenplanKurs> {
		return MapUtils.getOrCreateArrayList(this._kursmenge_by_idKlasse, idKlasse);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKurs}-Objekte des Lehrers.
	 * <br> Laufzeit: O(1)
	 *
	 * @param idLehrer  Die Datenbank-ID des Lehrers.
	 *
	 * @return eine Liste aller {@link StundenplanKurs}-Objekte des Lehrers.
	 */
	public kursGetMengeByLehrerIdAsList(idLehrer : number) : List<StundenplanKurs> {
		return MapUtils.getOrCreateArrayList(this._kursmenge_by_idLehrer, idLehrer);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanKurs}-Objekte des Schülers.
	 * <br> Laufzeit: O(1)
	 *
	 * @param idSchueler  Die Datenbank-ID des Schülers.
	 *
	 * @return eine Liste aller {@link StundenplanKurs}-Objekte des Schülers.
	 */
	public kursGetMengeBySchuelerIdAsList(idSchueler : number) : List<StundenplanKurs> {
		return MapUtils.getOrCreateArrayList(this._kursmenge_by_idSchueler, idSchueler);
	}

	/**
	 * Liefert gefilterte Kurs-IDs, deren Unterricht zu (Wochentyp / Wochentag / Unterrichtsstunde) passt.
	 *
	 * @param idsKurs          Die Liste aller Kurs-IDs.
	 * @param wochentyp        Der Typ der Woche (beispielsweise bei AB-Wochen).
	 * @param wochentag        Der gewünschte {@link Wochentag}.
	 * @param unterrichtstunde Die gewünschte Unterrichtsstunde.
	 *
	 * @return gefilterte Kurs-IDs, deren Unterricht zu (Wochentyp / Wochentag / Unterrichtsstunde) passt.
	 */
	public kursGetMengeGefiltertByWochentypAndWochentagAndStunde(idsKurs : List<number>, wochentyp : number, wochentag : Wochentag, unterrichtstunde : number) : List<number> {
		return CollectionUtils.toFilteredArrayList(idsKurs, { test : (idKurs: number) => this.kursGetHatUnterrichtAm(idKurs!, wochentyp, wochentag, unterrichtstunde) });
	}

	/**
	 * Liefert gefilterte Kurs-IDs, deren Unterricht zu (Datum / Unterrichtsstunde) passt.
	 *
	 * @param idsKurs          Die Liste aller Kurs-IDs.
	 * @param datumISO8601     Das Datum. Daraus ergibt sich (Wochentyp / Wochentag).
	 * @param unterrichtstunde Die gewünschte Unterrichtsstunde.
	 *
	 * @return gefilterte Kurs-IDs, deren Unterricht zu (Datum / Unterrichtsstunde) passt.
	 */
	public kursGetMengeGefiltertByDatumAndStunde(idsKurs : List<number>, datumISO8601 : string, unterrichtstunde : number) : List<number> {
		const e : Array<number> | null = DateUtils.extractFromDateISO8601(datumISO8601);
		const wochentyp : number = this.kalenderwochenzuordnungGetWochentypOrDefault(e[6], e[5]);
		const wochentag : Wochentag = Wochentag.fromIDorException(e[3]);
		return this.kursGetMengeGefiltertByWochentypAndWochentagAndStunde(idsKurs, wochentyp, wochentag, unterrichtstunde);
	}

	/**
	 * Liefert die IST-Wochenstunden des {@link StundenplanKurs}.
	 * <br>Hinweis: Durch AB-Wochen, ist der Rückgabewert eine Kommazahl, da nur Stundenanteile gesetzt sein können.
	 * <br>Laufzeit: O(|Unterrichte des Kurses|)
	 *
	 * @param idKurs  Die Datenbank-ID des Kurses.
	 *
	 * @return die IST-Wochenstunden des {@link StundenplanKlassenunterricht}.
	 */
	public kursGetWochenstundenIst(idKurs : number) : number {
		let summe : number = 0;
		const faktor : number = (this._stundenplanWochenTypModell === 0) ? 1 : this._stundenplanWochenTypModell;
		const listU : List<StundenplanUnterricht> = DeveloperNotificationException.ifMapGetIsNull(this._unterrichtmenge_by_idKurs, idKurs);
		for (const u of listU)
			summe += (u.wochentyp === 0) ? faktor : 1;
		return ((summe * 100.0 / faktor) as number) / 100.0;
	}

	/**
	 * Liefert die Wochenstunden des Kurses.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKurs  Die Datenbank-ID des Kurses.
	 *
	 * @return die Wochenstunden des Kurses.
	 */
	public kursGetWochenstundenSoll(idKurs : number) : number {
		return DeveloperNotificationException.ifMapGetIsNull(this._kurs_by_id, idKurs).wochenstunden;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanKurs}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanKurs#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanKurs#bezeichnung}
	 * <br>{@link StundenplanKurs#wochenstunden}
	 * <br>{@link StundenplanKurs#jahrgaenge}
	 * <br>{@link StundenplanKurs#schienen}
	 * <br>{@link StundenplanKurs#schueler}
	 *
	 * @param kurs  Das neue {@link StundenplanKurs}-Objekt, dessen Attribute kopiert werden.
	 */
	public kursPatchAttributtes(kurs : StundenplanKurs) : void {
		this.kursCheck(kurs);
		DeveloperNotificationException.ifMapRemoveFailes(this._kurs_by_id, kurs.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._kurs_by_id, kurs.id, kurs);
		this.kursRevalidate();
	}

	private kursRemoveOhneUpdateById(idKurs : number) : void {
		for (const u of DeveloperNotificationException.ifMapGetIsNull(this._unterrichtmenge_by_idKurs, idKurs))
			this.unterrichtRemoveByIdOhneUpdate(u.id);
		DeveloperNotificationException.ifMapRemoveFailes(this._kurs_by_id, idKurs);
	}

	/**
	 * Entfernt ein {@link StundenplanKurs}-Objekt anhand seiner ID.
	 *
	 * @param idKurs  Die Datenbank-ID des {@link StundenplanKurs}-Objekts, welches entfernt werden soll.
	 */
	public kursRemoveById(idKurs : number) : void {
		this.kursRemoveOhneUpdateById(idKurs);
		this.kursRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanKurs}-Objekte.
	 *
	 * @param listKurs  Die Liste der zu entfernenden {@link StundenplanKurs}-Objekte.
	 */
	public kursRemoveAll(listKurs : List<StundenplanKurs>) : void {
		for (const kurs of listKurs)
			this.kursRemoveOhneUpdateById(kurs.id);
		this.kursRevalidate();
		this.unterrichtRevalidate();
	}

	private lehrerRevalidate() : void {
		this.update_lehrermenge();
		this.update_lehrermenge_by_idUnterricht();
		this.update_klassenunterrichtmenge_by_idLehrer();
		this.update_kursmenge_by_idLehrer();
	}

	private lehrerAddOhneUpdate(lehrer : StundenplanLehrer) : void {
		this.lehrerCheck(lehrer);
		DeveloperNotificationException.ifMapPutOverwrites(this._lehrer_by_id, lehrer.id, lehrer);
	}

	/**
	 * Fügt ein {@link StundenplanLehrer}-Objekt hinzu.
	 *
	 * @param lehrer  Das {@link StundenplanLehrer}-Objekt, welches hinzugefügt werden soll.
	 */
	public lehrerAdd(lehrer : StundenplanLehrer) : void {
		this.lehrerAddOhneUpdate(lehrer);
		this.lehrerRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanLehrer}-Objekte hinzu.
	 *
	 * @param listLehrer  Die Menge der {@link StundenplanLehrer}-Objekte, welche hinzugefügt werden soll.
	 */
	public lehrerAddAll(listLehrer : List<StundenplanLehrer>) : void {
		for (const lehrer of listLehrer)
			this.lehrerAddOhneUpdate(lehrer);
		this.lehrerRevalidate();
	}

	private lehrerCheck(lehrer : StundenplanLehrer) : void {
		DeveloperNotificationException.ifInvalidID("lehrer.id", lehrer.id);
		DeveloperNotificationException.ifStringIsBlank("lehrer.kuerzel", lehrer.kuerzel);
		DeveloperNotificationException.ifStringIsBlank("lehrer.nachname", lehrer.nachname);
		DeveloperNotificationException.ifStringIsBlank("lehrer.vorname", lehrer.vorname);
		for (const idFachDesLehrers of lehrer.faecher)
			DeveloperNotificationException.ifMapNotContains("_fach_by_id", this._fach_by_id, idFachDesLehrers);
	}

	/**
	 * Liefert das {@link StundenplanLehrer}-Objekt mit der übergebenen ID.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idLehrer  Die Datenbank-ID des {@link StundenplanLehrer}-Objekts.
	 *
	 * @return das {@link StundenplanLehrer}-Objekt mit der übergebenen ID.
	 */
	public lehrerGetByIdOrException(idLehrer : number) : StundenplanLehrer {
		return DeveloperNotificationException.ifMapGetIsNull(this._lehrer_by_id, idLehrer);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanLehrer}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanLehrer}-Objekte.
	 */
	public lehrerGetMengeAsList() : List<StundenplanLehrer> {
		return this._lehrermenge;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanLehrer}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanLehrer#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanLehrer#kuerzel}
	 * <br>{@link StundenplanLehrer#nachname}
	 * <br>{@link StundenplanLehrer#vorname}
	 * <br>{@link StundenplanLehrer#faecher}
	 *
	 * @param lehrer  Das neue {@link StundenplanLehrer}-Objekt, dessen Attribute kopiert werden.
	 */
	public lehrerPatchAttributes(lehrer : StundenplanLehrer) : void {
		this.lehrerCheck(lehrer);
		DeveloperNotificationException.ifMapRemoveFailes(this._lehrer_by_id, lehrer.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._lehrer_by_id, lehrer.id, lehrer);
		this.lehrerRevalidate();
	}

	private lehrerRemoveOhneUpdateById(idLehrer : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._lehrer_by_id, idLehrer);
	}

	/**
	 * Entfernt ein {@link StundenplanLehrer}-Objekt anhand seiner ID.
	 *
	 * @param idLehrer  Die Datenbank-ID des {@link StundenplanLehrer}-Objekts, welches entfernt werden soll.
	 */
	public lehrerRemoveById(idLehrer : number) : void {
		this.lehrerRemoveOhneUpdateById(idLehrer);
		this.lehrerRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanLehrer}-Objekte.
	 *
	 * @param listLehrer  Die Liste der zu entfernenden {@link StundenplanLehrer}-Objekte.
	 */
	public lehrerRemoveAll(listLehrer : List<StundenplanLehrer>) : void {
		for (const lehrer of listLehrer)
			this.lehrerRemoveOhneUpdateById(lehrer.id);
		this.lehrerRevalidate();
		this.unterrichtRevalidate();
	}

	private pausenaufsichtRevalidate() : void {
		this.update_pausenaufsichtmenge();
		this.update_pausenaufsichtmenge_by_idPausenzeit();
		this.update_pausenaufsichtmenge_by_wochentag();
		this.update_pausenzeitmengeOhnePausenaufsicht();
	}

	private pausenaufsichtAddOhneUpdate(pausenaufsicht : StundenplanPausenaufsicht) : void {
		this.pausenaufsichtCheck(pausenaufsicht);
		DeveloperNotificationException.ifMapPutOverwrites(this._pausenaufsicht_by_id, pausenaufsicht.id, pausenaufsicht);
	}

	/**
	 * Fügt ein {@link StundenplanPausenaufsicht}-Objekt hinzu.
	 *
	 * @param pausenaufsicht  Das {@link StundenplanPausenaufsicht}-Objekt, welches hinzugefügt werden soll.
	 */
	public pausenaufsichtAdd(pausenaufsicht : StundenplanPausenaufsicht) : void {
		this.pausenaufsichtAddOhneUpdate(pausenaufsicht);
		this.pausenaufsichtRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanPausenaufsicht}-Objekte hinzu.
	 *
	 * @param listPausenaufsicht  Die Menge der {@link StundenplanPausenaufsicht}-Objekte, welche hinzugefügt werden soll.
	 */
	private pausenaufsichtAddAll(listPausenaufsicht : List<StundenplanPausenaufsicht>) : void {
		for (const pausenaufsicht of listPausenaufsicht)
			this.pausenaufsichtAddOhneUpdate(pausenaufsicht);
		this.pausenaufsichtRevalidate();
	}

	private pausenaufsichtCheck(pausenaufsicht : StundenplanPausenaufsicht) : void {
		DeveloperNotificationException.ifInvalidID("pausenaufsicht.id", pausenaufsicht.id);
		DeveloperNotificationException.ifMapNotContains("_map_idLehrer_zu_lehrer", this._lehrer_by_id, pausenaufsicht.idLehrer);
		DeveloperNotificationException.ifMapNotContains("_map_idPausenzeit_zu_pausenzeit", this._pausenzeit_by_id, pausenaufsicht.idPausenzeit);
		DeveloperNotificationException.ifTrue("(pa.wochentyp > 0) && (pa.wochentyp > stundenplanWochenTypModell)", (pausenaufsicht.wochentyp > 0) && (pausenaufsicht.wochentyp > this._stundenplanWochenTypModell));
		for (const idAufsichtsbereich of pausenaufsicht.bereiche)
			DeveloperNotificationException.ifMapNotContains("_aufsichtsbereich_by_id", this._aufsichtsbereich_by_id, idAufsichtsbereich);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanPausenaufsicht}-Objekt.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idPausenaufsicht Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanPausenaufsicht}-Objekt.
	 */
	public pausenaufsichtGetByIdOrException(idPausenaufsicht : number) : StundenplanPausenaufsicht {
		return DeveloperNotificationException.ifMapGetIsNull(this._pausenaufsicht_by_id, idPausenaufsicht);
	}

	/**
	 * Liefert eine sortierte Liste aller {@link StundenplanPausenaufsicht}-Objekte.
	 * <br> Laufzeit: O(1)
	 *
	 * @return eine sortierte Liste aller {@link StundenplanPausenaufsicht}-Objekte.
	 */
	public pausenaufsichtGetMengeAsList() : List<StundenplanPausenaufsicht> {
		return this._pausenaufsichtmenge;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenaufsicht}-Objekte eines bestimmten Wochentages.
	 * <br> Laufzeit: O(1)
	 *
	 * @param wochentag  Die ID des ENUMS {@link Wochentag}.
	 *
	 * @return eine Liste aller {@link StundenplanPausenaufsicht}-Objekte eines bestimmten Wochentages.
	 */
	public pausenaufsichtGetMengeByWochentagOrEmptyList(wochentag : number) : List<StundenplanPausenaufsicht> {
		return MapUtils.getOrCreateArrayList(this._pausenaufsichtmenge_by_wochentag, wochentag);
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanPausenaufsicht}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanPausenaufsicht#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanPausenaufsicht#idLehrer}
	 * <br>{@link StundenplanPausenaufsicht#idPausenzeit}
	 * <br>{@link StundenplanPausenaufsicht#wochentyp}
	 * <br>{@link StundenplanPausenaufsicht#bereiche}
	 *
	 * @param pausenaufsicht  Das neue {@link StundenplanPausenaufsicht}-Objekt, dessen Attribute kopiert werden.
	 */
	public pausenaufsichtPatchAttributes(pausenaufsicht : StundenplanPausenaufsicht) : void {
		this.pausenaufsichtCheck(pausenaufsicht);
		DeveloperNotificationException.ifMapRemoveFailes(this._pausenaufsicht_by_id, pausenaufsicht.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._pausenaufsicht_by_id, pausenaufsicht.id, pausenaufsicht);
		this.pausenaufsichtRevalidate();
	}

	private pausenaufsichtRemoveOhneUpdateById(idPausenaufsicht : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._pausenaufsicht_by_id, idPausenaufsicht);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanPausenaufsicht}-Objekt.
	 * <br>Laufzeit: O(|StundenplanPausenaufsicht|), da pausenaufsichtUpdate() aufgerufen wird.
	 *
	 * @param idPausenaufsicht  Die ID des {@link StundenplanPausenaufsicht}-Objekts.
	 */
	public pausenaufsichtRemoveById(idPausenaufsicht : number) : void {
		this.pausenaufsichtRemoveOhneUpdateById(idPausenaufsicht);
		this.pausenaufsichtRevalidate();
	}

	private pausenzeitRevalidate() : void {
		this.update_pausenzeitmenge();
		this.update_pausenzeitmenge_by_wochentag();
		this.update_pausenaufsichtmenge_by_idPausenzeit();
		this.update_pausenzeitmengeOhnePausenaufsicht();
	}

	private pausenzeitAddOhneUpdate(pausenzeit : StundenplanPausenzeit) : void {
		StundenplanManager.pausenzeitCheck(pausenzeit);
		DeveloperNotificationException.ifMapPutOverwrites(this._pausenzeit_by_id, pausenzeit.id, pausenzeit);
	}

	/**
	 * Fügt ein {@link StundenplanPausenzeit}-Objekt hinzu.
	 *
	 * @param pausenzeit  Das {@link StundenplanPausenzeit}-Objekt, welches hinzugefügt werden soll.
	 */
	public pausenzeitAdd(pausenzeit : StundenplanPausenzeit) : void {
		this.pausenzeitAddOhneUpdate(pausenzeit);
		this.pausenzeitRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanPausenzeit}-Objekte hinzu.
	 *
	 * @param listPausenzeit  Die Menge der {@link StundenplanPausenzeit}-Objekte, welche hinzugefügt werden soll.
	 */
	public pausenzeitAddAll(listPausenzeit : List<StundenplanPausenzeit>) : void {
		for (const pausenzeit of listPausenzeit)
			this.pausenzeitAddOhneUpdate(pausenzeit);
		this.pausenzeitRevalidate();
	}

	private static pausenzeitCheck(pausenzeit : StundenplanPausenzeit) : void {
		DeveloperNotificationException.ifInvalidID("pause.id", pausenzeit.id);
		Wochentag.fromIDorException(pausenzeit.wochentag);
		if ((pausenzeit.beginn !== null) && (pausenzeit.ende !== null))
			DeveloperNotificationException.ifTrue("pausenzeit.beginn >= pausenzeit.ende", pausenzeit.beginn >= pausenzeit.ende);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanPausenzeit}-Objekt.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idPausenzeit Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanPausenzeit}-Objekt.
	 */
	public pausenzeitGetByIdOrException(idPausenzeit : number) : StundenplanPausenzeit {
		return DeveloperNotificationException.ifMapGetIsNull(this._pausenzeit_by_id, idPausenzeit);
	}

	/**
	 * Liefert die Beginn-Uhrzeit der {@link StundenplanPausenzeit} oder den leeren String, falls diese NULL ist.
	 * <br>Beispiel: "09:30" oder ""
	 * <br>Laufzeit: O(1)
	 *
	 * @param idPausenzeit  Die Datenbank-ID des {@link StundenplanPausenzeit}.
	 *
	 * @return die Beginn-Uhrzeit der {@link StundenplanPausenzeit} oder den leeren String, falls diese NULL ist.
	 */
	public pausenzeitGetByIdStringOfUhrzeitBeginn(idPausenzeit : number) : string {
		const pausenzeit : StundenplanPausenzeit = DeveloperNotificationException.ifMapGetIsNull(this._pausenzeit_by_id, idPausenzeit);
		return (pausenzeit.beginn === null) ? "" : DateUtils.getStringOfUhrzeitFromMinuten(pausenzeit.beginn);
	}

	/**
	 * Liefert die End-Uhrzeit der {@link StundenplanPausenzeit} oder den leeren String, falls diese NULL ist.
	 * <br>Beispiel: "10:15" oder ""
	 * <br>Laufzeit: O(1)
	 *
	 * @param idPausenzeit  Die Datenbank-ID des {@link StundenplanPausenzeit}.
	 *
	 * @return die End-Uhrzeit der {@link StundenplanPausenzeit} oder den leeren String, falls diese NULL ist.
	 */
	public pausenzeitGetByIdStringOfUhrzeitEnde(idPausenzeit : number) : string {
		const pausenzeit : StundenplanPausenzeit = DeveloperNotificationException.ifMapGetIsNull(this._pausenzeit_by_id, idPausenzeit);
		return (pausenzeit.ende === null) ? "" : DateUtils.getStringOfUhrzeitFromMinuten(pausenzeit.ende);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenzeit}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanPausenzeit}-Objekte.
	 */
	public pausenzeitGetMengeAsList() : List<StundenplanPausenzeit> {
		return this._pausenzeitmenge;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenzeit}-Objekte eines bestimmten Wochentages, oder eine leere Liste.
	 * <br> Laufzeit: O(1)
	 *
	 * @param wochentag  Die ID des ENUMS {@link Wochentag}.
	 *
	 * @return eine Liste aller {@link StundenplanPausenzeit}-Objekte eines bestimmten Wochentages, oder eine leere Liste.
	 */
	public pausenzeitGetMengeByWochentagOrEmptyList(wochentag : number) : List<StundenplanPausenzeit> {
		return MapUtils.getOrCreateArrayList(this._pausenzeitmenge_by_wochentag, wochentag);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanPausenzeit}-Objekte, die mindestens eine {@link StundenplanPausenaufsicht} beinhalten.
	 * <br> Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanPausenzeit}-Objekte, die mindestens eine {@link StundenplanPausenaufsicht} beinhalten.
	 */
	public pausenzeitGetMengeNichtLeereAsList() : List<StundenplanPausenzeit> {
		return this._pausenzeitmengeOhneLeere;
	}

	/**
	 * Liefert das Minimum aller {@link StundenplanPausenzeit#beginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Minimum aller {@link StundenplanPausenzeit#beginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitGetMinutenMin() : number {
		return this._pausenzeitMinutenMin === null ? 480 : this._pausenzeitMinutenMin;
	}

	/**
	 * Liefert das Maximum aller {@link StundenplanPausenzeit#ende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Maximum aller {@link StundenplanPausenzeit#ende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitGetMinutenMax() : number {
		return this._pausenzeitMinutenMax === null ? 480 : this._pausenzeitMinutenMax;
	}

	/**
	 * Liefert das Minimum aller {@link StundenplanPausenzeit#beginn}-Objekte und aller {@link StundenplanZeitraster#stundenbeginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Minimum aller {@link StundenplanPausenzeit#beginn}-Objekte und aller {@link StundenplanZeitraster#stundenbeginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitUndZeitrasterGetMinutenMin() : number {
		const min : number | null = BlockungsUtils.minII(this._pausenzeitMinutenMin, this._zeitrasterMinutenMin);
		return min === null ? 480 : min;
	}

	/**
	 * Liefert das Minimum aller nicht leeren {@link StundenplanPausenzeit#beginn}-Objekte und aller {@link StundenplanZeitraster#stundenbeginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Minimum aller nicht leeren {@link StundenplanPausenzeit#beginn}-Objekte und aller {@link StundenplanZeitraster#stundenbeginn}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitUndZeitrasterGetMinutenMinOhneLeere() : number {
		const min : number | null = BlockungsUtils.minII(this._pausenzeitMinutenMinOhneLeere, this._zeitrasterMinutenMinOhneLeere);
		return min === null ? 480 : min;
	}

	/**
	 * Liefert das Maximum aller {@link StundenplanPausenzeit#ende}-Objekte und aller {@link StundenplanZeitraster#stundenende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Maximum aller {@link StundenplanPausenzeit#ende}-Objekte und aller {@link StundenplanZeitraster#stundenende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitUndZeitrasterGetMinutenMax() : number {
		const max : number | null = BlockungsUtils.maxII(this._pausenzeitMinutenMax, this._zeitrasterMinutenMax);
		return max === null ? 480 : max;
	}

	/**
	 * Liefert das Maximum aller nicht leeren {@link StundenplanPausenzeit#ende}-Objekte und aller {@link StundenplanZeitraster#stundenende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @return das Maximum aller nicht leeren {@link StundenplanPausenzeit#ende}-Objekte und aller {@link StundenplanZeitraster#stundenende}-Objekte, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public pausenzeitUndZeitrasterGetMinutenMaxOhneLeere() : number {
		const max : number | null = BlockungsUtils.maxII(this._pausenzeitMinutenMaxOhneLeere, this._zeitrasterMinutenMaxOhneLeere);
		return max === null ? 480 : max;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanPausenzeit}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanPausenzeit#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanPausenzeit#beginn}
	 * <br>{@link StundenplanPausenzeit#bezeichnung}
	 * <br>{@link StundenplanPausenzeit#ende}
	 * <br>{@link StundenplanPausenzeit#wochentag}
	 *
	 * @param pausenzeit  Das neue {@link StundenplanPausenzeit}-Objekt, dessen Attribute kopiert werden.
	 */
	public pausenzeitPatchAttributes(pausenzeit : StundenplanPausenzeit) : void {
		StundenplanManager.pausenzeitCheck(pausenzeit);
		DeveloperNotificationException.ifMapRemoveFailes(this._pausenzeit_by_id, pausenzeit.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._pausenzeit_by_id, pausenzeit.id, pausenzeit);
		this.pausenzeitRevalidate();
	}

	private pausenzeitRemoveOhneUpdateById(idPausenzeit : number) : void {
		for (const a of DeveloperNotificationException.ifMapGetIsNull(this._pausenaufsichtmenge_by_idPausenzeit, idPausenzeit))
			this.pausenaufsichtRemoveOhneUpdateById(a.id);
		DeveloperNotificationException.ifMapRemoveFailes(this._pausenzeit_by_id, idPausenzeit);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanPausenzeit}-Objekt.
	 *
	 * @param idPausenzeit  Die ID des {@link StundenplanPausenzeit}-Objekts.
	 */
	public pausenzeitRemoveById(idPausenzeit : number) : void {
		this.pausenzeitRemoveOhneUpdateById(idPausenzeit);
		this.pausenzeitRevalidate();
		this.pausenaufsichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanPausenzeit}-Objekte.
	 *
	 * @param listPausenzeit  Die Liste der zu entfernenden {@link StundenplanPausenzeit}-Objekte.
	 */
	public pausenzeitRemoveAll(listPausenzeit : List<StundenplanPausenzeit>) : void {
		for (const pausenzeit of listPausenzeit)
			this.pausenzeitRemoveOhneUpdateById(pausenzeit.id);
		this.pausenzeitRevalidate();
		this.pausenaufsichtRevalidate();
	}

	private raumRevalidate() : void {
		this.update_raummenge();
	}

	private raumAddOhneUpdate(raum : StundenplanRaum) : void {
		StundenplanManager.raumCheck(raum);
		DeveloperNotificationException.ifMapPutOverwrites(this._raum_by_id, raum.id, raum);
	}

	/**
	 * Fügt ein {@link StundenplanRaum}-Objekt hinzu.
	 *
	 * @param raum  Das {@link StundenplanRaum}-Objekt, welches hinzugefügt werden soll.
	 */
	public raumAdd(raum : StundenplanRaum) : void {
		this.raumAddOhneUpdate(raum);
		this.raumRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanRaum}-Objekte hinzu.
	 *
	 * @param listRaum  Die Menge der {@link StundenplanRaum}-Objekte, welche hinzugefügt werden soll.
	 */
	public raumAddAll(listRaum : List<StundenplanRaum>) : void {
		for (const raum of listRaum)
			this.raumAddOhneUpdate(raum);
		this.raumRevalidate();
	}

	private static raumCheck(raum : StundenplanRaum) : void {
		DeveloperNotificationException.ifInvalidID("raum.id", raum.id);
		DeveloperNotificationException.ifStringIsBlank("raum.kuerzel", raum.kuerzel);
		DeveloperNotificationException.ifTrue("raum.groesse < 0", raum.groesse < 0);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanRaum}-Objekt.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idRaum Die ID des angefragten-Objektes.
	 *
	 * @return das zur ID zugehörige {@link StundenplanRaum}-Objekt.
	 */
	public raumGetByIdOrException(idRaum : number) : StundenplanRaum {
		return DeveloperNotificationException.ifMapGetIsNull(this._raum_by_id, idRaum);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanRaum}-Objekte.
	 * <br>Laufzeit: O(1)
	 *
	 * @return eine Liste aller {@link StundenplanRaum}-Objekte.
	 */
	public raumGetMengeAsList() : List<StundenplanRaum> {
		return this._raummenge;
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanRaum}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanRaum#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanRaum#beschreibung}
	 * <br>{@link StundenplanRaum#groesse}
	 * <br>{@link StundenplanRaum#kuerzel}
	 *
	 * @param raum  Das neue {@link StundenplanRaum}-Objekt, dessen Attribute kopiert werden.
	 */
	public raumPatchAttributes(raum : StundenplanRaum) : void {
		StundenplanManager.raumCheck(raum);
		DeveloperNotificationException.ifMapRemoveFailes(this._raum_by_id, raum.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._raum_by_id, raum.id, raum);
		this.raumRevalidate();
	}

	private raumRemoveOhneUpdateById(idRaum : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._raum_by_id, idRaum);
	}

	/**
	 * Entfernt aus dem Stundenplan eine existierendes {@link StundenplanRaum}-Objekt.
	 *
	 * @param idRaum  Die ID des {@link StundenplanRaum}-Objekts.
	 */
	public raumRemoveById(idRaum : number) : void {
		this.raumRemoveOhneUpdateById(idRaum);
		this.raumRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanRaum}-Objekte.
	 *
	 * @param listRaum  Die Liste der zu entfernenden {@link StundenplanRaum}-Objekte.
	 */
	public raumRemoveAll(listRaum : List<StundenplanRaum>) : void {
		for (const raum of listRaum)
			this.raumRemoveOhneUpdateById(raum.id);
		this.raumRevalidate();
	}

	private schieneRevalidate() : void {
		this.update_schienenmenge();
	}

	private schieneAddOhneUpdate(schiene : StundenplanSchiene) : void {
		this.schieneCheck(schiene);
		DeveloperNotificationException.ifMapPutOverwrites(this._schiene_by_id, schiene.id, schiene);
	}

	/**
	 * Fügt ein {@link StundenplanSchiene}-Objekt hinzu.
	 *
	 * @param schiene  Das {@link StundenplanSchiene}-Objekt, welches hinzugefügt werden soll.
	 */
	public schieneAdd(schiene : StundenplanSchiene) : void {
		this.schieneAddOhneUpdate(schiene);
		this.schieneRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanSchiene}-Objekte hinzu.
	 *
	 * @param listSchiene  Die Menge der {@link StundenplanSchiene}-Objekte, welche hinzugefügt werden soll.
	 */
	public schieneAddAll(listSchiene : List<StundenplanSchiene>) : void {
		for (const schiene of listSchiene)
			this.schieneAddOhneUpdate(schiene);
		this.schieneRevalidate();
	}

	private schieneCheck(schiene : StundenplanSchiene) : void {
		DeveloperNotificationException.ifInvalidID("schiene.id", schiene.id);
		DeveloperNotificationException.ifTrue("schiene.nummer <= 0", schiene.nummer <= 0);
		DeveloperNotificationException.ifStringIsBlank("schiene.bezeichnung", schiene.bezeichnung);
		DeveloperNotificationException.ifMapNotContains("_jahrgang_by_id", this._jahrgang_by_id, schiene.idJahrgang);
	}

	private schuelerRevalidate() : void {
		this.update_schuelermenge();
		this.update_schuelermenge_by_idKlasse();
		this.update_schuelermenge_by_idKurs();
		this.update_klassenunterrichtmenge_by_idSchueler();
		this.update_kursmenge_by_idSchueler();
	}

	private schuelerAddOhneUpdate(schueler : StundenplanSchueler) : void {
		StundenplanManager.schuelerCheck(schueler);
		DeveloperNotificationException.ifMapPutOverwrites(this._schueler_by_id, schueler.id, schueler);
	}

	/**
	 * Fügt ein {@link StundenplanSchueler}-Objekt hinzu.
	 *
	 * @param schueler  Das {@link StundenplanSchueler}-Objekt, welches hinzugefügt werden soll.
	 */
	public schuelerAdd(schueler : StundenplanSchueler) : void {
		this.schuelerAddOhneUpdate(schueler);
		this.schuelerRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanSchueler}-Objekte hinzu.
	 *
	 * @param listSchueler  Die Menge der {@link StundenplanSchueler}-Objekte, welche hinzugefügt werden soll.
	 */
	public schuelerAddAll(listSchueler : List<StundenplanSchueler>) : void {
		for (const schueler of listSchueler)
			this.schuelerAddOhneUpdate(schueler);
		this.schuelerRevalidate();
	}

	private static schuelerCheck(schueler : StundenplanSchueler) : void {
		DeveloperNotificationException.ifInvalidID("schueler.id", schueler.id);
		DeveloperNotificationException.ifStringIsBlank("schueler.nachname", schueler.nachname);
		DeveloperNotificationException.ifStringIsBlank("schueler.vorname", schueler.vorname);
	}

	/**
	 * Liefert alle {@link StundenplanSchueler}-Objekte der Klasse.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 *
	 * @return alle {@link StundenplanSchueler}-Objekte der Klasse.
	 */
	public schuelerGetMengeByKlasseIdAsListOrException(idKlasse : number) : List<StundenplanSchueler> {
		return DeveloperNotificationException.ifMapGetIsNull(this.schuelermenge_by_idKlasse, idKlasse);
	}

	/**
	 * Liefert die Anzahl der {@link StundenplanSchueler}-Objekte der Klasse.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKlasse  Die Datenbank-ID der Klasse.
	 *
	 * @return die Anzahl der {@link StundenplanSchueler}-Objekte der Klasse.
	 */
	public schuelerGetAnzahlByKlasseIdOrException(idKlasse : number) : number {
		return DeveloperNotificationException.ifMapGetIsNull(this.schuelermenge_by_idKlasse, idKlasse).size();
	}

	/**
	 * Liefert alle {@link StundenplanSchueler}-Objekte des Kurses.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKurs  Die Datenbank-ID des Kurses.
	 *
	 * @return alle {@link StundenplanSchueler}-Objekte des Kurses.
	 */
	public schuelerGetMengeByKursIdAsListOrException(idKurs : number) : List<StundenplanSchueler> {
		return DeveloperNotificationException.ifMapGetIsNull(this._schuelermenge_by_idKurs, idKurs);
	}

	/**
	 * Liefert die Anzahl der  {@link StundenplanSchueler}-Objekte des Kurses.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idKurs  Die Datenbank-ID des Kurses.
	 *
	 * @return die Anzahl der  {@link StundenplanSchueler}-Objekte des Kurses.
	 */
	public schuelerGetAnzahlByKursIdAsListOrException(idKurs : number) : number {
		return DeveloperNotificationException.ifMapGetIsNull(this._schuelermenge_by_idKurs, idKurs).size();
	}

	/**
	 * Liefert die ID des Schuljahresabschnitts des Stundenplans.
	 *
	 * @return die ID des Schuljahresabschnitts des Stundenplans.
	 */
	public getIDSchuljahresabschnitt() : number {
		return this._stundenplanSchuljahresAbschnittID;
	}

	/**
	 * Liefert das Datum, ab dem der Stundenplan gültig ist.
	 *
	 * @return das Datum, ab dem der Stundenplan gültig ist.
	 */
	public getGueltigAb() : string {
		return this._stundenplanGueltigAb;
	}

	/**
	 * Liefert das Datum, bis wann der Stundenplan gültig ist.
	 *
	 * @return das Datum, bis wann der Stundenplan gültig ist.
	 */
	public getGueltigBis() : string {
		return this._stundenplanGueltigBis;
	}

	/**
	 * Liefert die textuelle Beschreibung des Stundenplans.
	 *
	 * @return die textuelle Beschreibung des Stundenplans.
	 */
	public getBezeichnungStundenplan() : string {
		return this._stundenplanBezeichnung;
	}

	/**
	 * Liefert das (globale) Wochentyp-Modell für die Wochen des Stundenplans. <br>
	 * 0: Stundenplan gilt jede Woche. <br>
	 * 1: Ungültiger Wert. <br>
	 * N: Stundenplan wiederholt sich alle N Wochen. <br>
	 * <br>Laufzeit: O(1)
	 *
	 * @return das (globale) Wochentyp-Modell für die Wochen des Stundenplans.
	 */
	public getWochenTypModell() : number {
		return this._stundenplanWochenTypModell;
	}

	/**
	 * Liefert die Datenbank-ID des Schülers.<br>
	 * Wirft eine Exception, falls in den Daten nicht genau ein Schüler geladen wurde.
	 *
	 * @return  Die Datenbank-ID des Schülers.
	 */
	public schuelerGetIDorException() : number {
		const size : number = this._schuelermenge.size();
		DeveloperNotificationException.ifTrue("getSchuelerID() geht nicht bei " + size + " Schülern!", size !== 1);
		return this._schuelermenge.get(0).id;
	}

	/**
	 * Liefert das (globale) Wochentyp-Modell für die Wochen des Stundenplans. <br>
	 * 0: Stundenplan gilt jede Woche. <br>
	 * 1: Ungültiger Wert. <br>
	 * N: Stundenplan wiederholt sich alle N Wochen. <br>
	 * <br>Laufzeit: O(1)
	 *
	 * @return das (globale) Wochentyp-Modell für die Wochen des Stundenplans.
	 */
	public stundenplanGetWochenTypModell() : number {
		return this._stundenplanWochenTypModell;
	}

	/**
	 * Liefert zum übergebenen Wochentyp einen passenden String.
	 * <br>Beispiel: 0 -> "Alle", 1 -> "A-Woche", ...
	 * <br>Laufzeit: O(1)
	 *
	 * @param wochenTyp  Der umzuwandelnde Wochentyp.
	 *
	 * @return zum übergebenen Wochentyp einen passenden String.
	 */
	public stundenplanGetWochenTypAsString(wochenTyp : number) : string {
		if (wochenTyp <= 0)
			return "Alle";
		const zahl : number = wochenTyp - 1;
		const z2 : number = Math.trunc(zahl / 26);
		const z1 : number = zahl - z2 * 26;
		return StringUtils.numberToLetterIndex1(z2)! + StringUtils.numberToLetterIndex0(z1)! + "-Woche";
	}

	/**
	 * Liefert die Datenbank-ID des Stundenplans.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die Datenbank-ID des Stundenplans.
	 */
	public stundenplanGetID() : number {
		return this._stundenplanID;
	}

	private unterrichtRevalidate() : void {
		this.update_unterrichtmenge();
		this.update_unterrichtmenge_by_idKlasse();
		this.update_unterrichtmenge_by_idKlasse_and_idFach();
		this.update_unterrichtmenge_by_idKurs();
		this.update_unterrichtmenge_by_idZeitraster();
		this.update_unterrichtmenge_by_idZeitraster_and_wochentyp();
		this.update_lehrermenge_by_idUnterricht();
		this.update_zeitrastermengeOhneLeereUnterrichtmenge();
	}

	private unterrichtAddOhneUpdate(u : StundenplanUnterricht) : void {
		this.unterrichtCheck(u);
		DeveloperNotificationException.ifMapPutOverwrites(this._unterricht_by_id, u.id, u);
	}

	/**
	 * Fügt ein {@link StundenplanUnterricht}-Objekt hinzu.
	 *
	 * @param unterricht  Das {@link StundenplanUnterricht}-Objekt, welches hinzugefügt werden soll.
	 */
	public unterrichtAdd(unterricht : StundenplanUnterricht) : void {
		this.unterrichtAddOhneUpdate(unterricht);
		this.unterrichtRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanUnterricht}-Objekte hinzu.
	 *
	 * @param listUnterricht  Die Menge der {@link StundenplanUnterricht}-Objekte, welche hinzugefügt werden soll.
	 */
	public unterrichtAddAll(listUnterricht : List<StundenplanUnterricht>) : void {
		for (const unterricht of listUnterricht)
			this.unterrichtAddOhneUpdate(unterricht);
		this.unterrichtRevalidate();
	}

	private unterrichtCheck(u : StundenplanUnterricht) : void {
		DeveloperNotificationException.ifInvalidID("u.id", u.id);
		DeveloperNotificationException.ifMapNotContains("_zeitraster_by_id", this._zeitraster_by_id, u.idZeitraster);
		DeveloperNotificationException.ifTrue("u.wochentyp > stundenplanWochenTypModell", u.wochentyp > this._stundenplanWochenTypModell);
		DeveloperNotificationException.ifTrue("u.wochentyp < 0", u.wochentyp < 0);
		DeveloperNotificationException.ifMapNotContains("_fach_by_id", this._fach_by_id, u.idFach);
		for (const idLehrkraftDesUnterrichts of u.lehrer)
			DeveloperNotificationException.ifMapNotContains("_lehrer_by_id", this._lehrer_by_id, idLehrkraftDesUnterrichts);
		for (const idKlasseDesUnterrichts of u.klassen)
			DeveloperNotificationException.ifMapNotContains("_klasse_by_id", this._klasse_by_id, idKlasseDesUnterrichts);
		for (const idRaumDesUnterrichts of u.raeume)
			DeveloperNotificationException.ifMapNotContains("_raum_by_id", this._raum_by_id, idRaumDesUnterrichts);
		for (const idSchieneDesUnterrichts of u.schienen)
			DeveloperNotificationException.ifMapNotContains("_schiene_by_id", this._schiene_by_id, idSchieneDesUnterrichts);
	}

	/**
	 * Liefert das {@link StundenplanUnterricht}-Objekt zur übergebenen ID.
	 * <br>Laufzeit: O(1)
	 * <br>Hinweis: Unnötige Methode, denn man bekommt die Objekte über Zeitraster-Abfragen.
	 *
	 * @param idUnterricht  Die Datenbank-ID des Unterrichts.
	 *
	 * @return das {@link StundenplanUnterricht}-Objekt zur übergebenen ID.
	 */
	public unterrichtGetByIdOrException(idUnterricht : number) : StundenplanUnterricht {
		return DeveloperNotificationException.ifMapGetIsNull(this._unterricht_by_id, idUnterricht);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekte einer Klasse mit einem bestimmten Wochentyp.
	 *
	 * @param idKlasse   Die Datenbank-ID der Klasse.
	 * @param wochentyp  Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekte einer Klasse mit einem bestimmten Wochentyp.
	 */
	public unterrichtGetMengeByKlasseIdAndWochentyp(idKlasse : number, wochentyp : number) : List<StundenplanUnterricht> {
		DeveloperNotificationException.ifTrue("wochentyp > stundenplanWochenTypModell", wochentyp > this._stundenplanWochenTypModell);
		const listU : List<StundenplanUnterricht> = DeveloperNotificationException.ifMapGetIsNull(this._unterrichtmenge_by_idKlasse, idKlasse);
		return CollectionUtils.toFilteredArrayList(listU, { test : (u: StundenplanUnterricht) => (u.wochentyp === 0) || (u.wochentyp === wochentyp) });
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekte einer Klasse in einer bestimmten Kalenderwoche.
	 *
	 * @param idKlasse       Die Datenbank-ID der Klasse.
	 * @param jahr           Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche  Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekte einer Klasse in einer bestimmten Kalenderwoche.
	 */
	public unterrichtGetMengeByKlasseIdAndJahrAndKW(idKlasse : number, jahr : number, kalenderwoche : number) : List<StundenplanUnterricht> {
		const wochentyp : number = this.kalenderwochenzuordnungGetWochentypOrDefault(jahr, kalenderwoche);
		return this.unterrichtGetMengeByKlasseIdAndWochentyp(idKlasse, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekte eines Klassenunterrichts (Klasse, Fach) mit einem bestimmten Wochentyp.
	 *
	 * @param idKlasse   Die Datenbank-ID der Klasse.
	 * @param idFach     Die Datenbank-ID des Faches.
	 * @param wochentyp  Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekte eines Klassenunterrichts (Klasse, Fach) mit einem bestimmten Wochentyp.
	 */
	public unterrichtGetMengeByKlasseIdAndFachIdAndWochentyp(idKlasse : number, idFach : number, wochentyp : number) : List<StundenplanUnterricht> {
		DeveloperNotificationException.ifTrue("wochentyp > stundenplanWochenTypModell", wochentyp > this._stundenplanWochenTypModell);
		const listU : List<StundenplanUnterricht> = DeveloperNotificationException.ifMap2DGetIsNull(this._unterrichtmenge_by_idKlasse_and_idFach, idKlasse, idFach);
		return CollectionUtils.toFilteredArrayList(listU, { test : (u: StundenplanUnterricht) => (u.wochentyp === 0) || (u.wochentyp === wochentyp) });
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekte eines Klassenunterrichts (Klasse, Fach) in einer bestimmten Kalenderwoche.
	 *
	 * @param idKlasse       Die Datenbank-ID der Klasse.
	 * @param idFach         Die Datenbank-ID des Faches.
	 * @param jahr           Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche  Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekte eines Klassenunterrichts (Klasse, Fach) in einer bestimmten Kalenderwoche.
	 */
	public unterrichtGetMengeByKlasseIdAndFachIdAndJahrAndKW(idKlasse : number, idFach : number, jahr : number, kalenderwoche : number) : List<StundenplanUnterricht> {
		const wochentyp : number = this.kalenderwochenzuordnungGetWochentypOrDefault(jahr, kalenderwoche);
		return this.unterrichtGetMengeByKlasseIdAndFachIdAndWochentyp(idKlasse, idFach, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} eines Kurses mit einem bestimmten Wochentyp.
	 *
	 * @param idkurs     Die ID des Kurses.
	 * @param wochentyp  Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 */
	public unterrichtGetMengeByKursIdAndWochentyp(idkurs : number, wochentyp : number) : List<StundenplanUnterricht> {
		DeveloperNotificationException.ifTrue("wochentyp > stundenplanWochenTypModell", wochentyp > this._stundenplanWochenTypModell);
		const listU : List<StundenplanUnterricht> = DeveloperNotificationException.ifMapGetIsNull(this._unterrichtmenge_by_idKurs, idkurs);
		return CollectionUtils.toFilteredArrayList(listU, { test : (u: StundenplanUnterricht) => (u.wochentyp === 0) || (u.wochentyp === wochentyp) });
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} einer Kursmenge mit einem bestimmten Wochentyp.
	 *
	 * @param idsKurs   Die IDs aller Kurse.
	 * @param wochentyp Der gewünschten Wochentyp. Der Wert 0 ist nur dann erlaubt, wenn wochenTypModell ebenfalls 0 ist.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} einer Kursmenge mit einem bestimmten Wochentyp.
	 */
	public unterrichtGetMengeByKursIdsAndWochentyp(idsKurs : Array<number>, wochentyp : number) : List<StundenplanUnterricht> {
		const result : ArrayList<StundenplanUnterricht> = new ArrayList();
		for (const idKurs of idsKurs)
			result.addAll(this.unterrichtGetMengeByKursIdAndWochentyp(idKurs, wochentyp));
		return result;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 *
	 * @param idKurs        Die ID des Kurses.
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} eines Kurses in einer bestimmten Kalenderwoche.
	 */
	public unterrichtGetMengeByKursIdAndJahrAndKW(idKurs : number, jahr : number, kalenderwoche : number) : List<StundenplanUnterricht> {
		const wochentyp : number = this.kalenderwochenzuordnungGetWochentypOrDefault(jahr, kalenderwoche);
		return this.unterrichtGetMengeByKursIdAndWochentyp(idKurs, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht} einer Kursmenge in einer bestimmten Kalenderwoche.
	 *
	 * @param idsKurs       Die IDs aller Kurse.
	 * @param jahr          Das Jahr der Kalenderwoche (muss zwischen 2000 und 3000 liegen).
	 * @param kalenderwoche Die gewünschten Kalenderwoche (muss zwischen 1 und 53 liegen).
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht} einer Kursmenge in einer bestimmten Kalenderwoche.
	 */
	public unterrichtGetMengeByKursIdsAndJahrAndKW(idsKurs : Array<number>, jahr : number, kalenderwoche : number) : List<StundenplanUnterricht> {
		const wochentyp : number = this.kalenderwochenzuordnungGetWochentypOrDefault(jahr, kalenderwoche);
		return this.unterrichtGetMengeByKursIdsAndWochentyp(idsKurs, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekt, die im übergeben Zeitraster und Wochentyp liegen.
	 *
	 * @param idZeitraster  Die Datenbank-ID des Zeitrasters.
	 * @param wochentyp     Der Wochentyp (0 jede Woche, 1 nur Woche A, 2 nur Woche B, ...)
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekt, die im übergeben Zeitraster und Wochentyp liegen.
	 */
	public unterrichtGetMengeByZeitrasterIdAndWochentypOrEmptyList(idZeitraster : number, wochentyp : number) : List<StundenplanUnterricht> {
		return Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, idZeitraster, wochentyp);
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekt, die im übergeben Zeitraster und Wochentyp liegen.
	 *
	 * @param wochentag  Der {@link Wochentag}-ENUM.
	 * @param stunde     Die Unterrichtsstunde.
	 * @param wochentyp  Der Wochentyp (0 jede Woche, 1 nur Woche A, 2 nur Woche B, ...)
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekt, die im übergeben Zeitraster und Wochentyp liegen.
	 */
	public unterrichtGetMengeByWochentagAndStundeAndWochentypOrEmptyList(wochentag : Wochentag, stunde : number, wochentyp : number) : List<StundenplanUnterricht> {
		const zeitraster : StundenplanZeitraster | null = this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag.id, stunde);
		if (zeitraster !== null)
			return Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, zeitraster.id, wochentyp);
		return new ArrayList();
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekten, die im übergebenen Zeitraster und Wochentyp liegen.
	 * Falls der Parameter inklWoche0 TRUE ist, wird Unterricht des Wochentyps 0 hinzugefügt.
	 *
	 * @param idZeitraster  Die Datenbank-ID des Zeitrasters.
	 * @param wochentyp     Der Wochentyp
	 * @param inklWoche0    falls TRUE, wird Unterricht des Wochentyps 0 hinzugefügt.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekten, die im übergebenen Zeitraster und Wochentyp liegen.
	 */
	public unterrichtGetMengeByZeitrasterIdAndWochentypAndInklusiveOrEmptyList(idZeitraster : number, wochentyp : number, inklWoche0 : boolean) : List<StundenplanUnterricht> {
		if ((wochentyp === 0) || (!inklWoche0))
			return this.unterrichtGetMengeByZeitrasterIdAndWochentypOrEmptyList(idZeitraster, wochentyp);
		const list : List<StundenplanUnterricht> = new ArrayList();
		list.addAll(this.unterrichtGetMengeByZeitrasterIdAndWochentypOrEmptyList(idZeitraster, wochentyp));
		list.addAll(this.unterrichtGetMengeByZeitrasterIdAndWochentypOrEmptyList(idZeitraster, 0));
		return list;
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanUnterricht}-Objekten, die in der Stundenplanzelle "wochentag, stunde" und "wochentyp" liegen.
	 * Falls der Parameter inklWoche0 TRUE ist, wird Unterricht des Wochentyps 0 hinzugefügt.
	 *
	 * @param wochentag     Der {@link Wochentag}-ENUM.
	 * @param stunde        Die Unterrichtsstunde.
	 * @param wochentyp     Der Wochentyp (0 jede Woche, 1 nur Woche A, 2 nur Woche B, ...)
	 * @param inklWoche0    falls TRUE, wird Unterricht des Wochentyps 0 hinzugefügt.
	 *
	 * @return eine Liste aller {@link StundenplanUnterricht}-Objekten, die in der Stundenplanzelle "wochentag, stunde" und "wochentyp" liegen.
	 */
	public unterrichtGetMengeByWochentagAndStundeAndWochentypAndInklusiveOrEmptyList(wochentag : Wochentag, stunde : number, wochentyp : number, inklWoche0 : boolean) : List<StundenplanUnterricht> {
		const idZeitraster : number = this.zeitrasterGetByWochentagAndStundeOrException(wochentag.id, stunde).id;
		return this.unterrichtGetMengeByZeitrasterIdAndWochentypAndInklusiveOrEmptyList(idZeitraster, wochentyp, inklWoche0);
	}

	/**
	 * Liefert eine String-Repräsentation des das Fach- oder Kurs-Kürzel eines {@link StundenplanUnterricht}.
	 * <br>Beispiel: "M-LK1-Suffix" bei Kursen und "M" Fachkürzel bei Klassenunterricht.
	 * <br>Laufzeit: O(1)
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return eine String-Repräsentation des das Fach- oder Kurs-Kürzel eines {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDStringOfFachOderKursKuerzel(idUnterricht : number) : string {
		const unterricht : StundenplanUnterricht = DeveloperNotificationException.ifMapGetIsNull(this._unterricht_by_id, idUnterricht);
		if (unterricht.idKurs === null) {
			const fach : StundenplanFach = DeveloperNotificationException.ifMapGetIsNull(this._fach_by_id, unterricht.idFach);
			return fach.kuerzel;
		}
		const kurs : StundenplanKurs = DeveloperNotificationException.ifMapGetIsNull(this._kurs_by_id, unterricht.idKurs);
		return kurs.bezeichnung;
	}

	/**
	 * Liefert eine String-Repräsentation der Klassenmenge des {@link StundenplanUnterricht}.
	 * <br>Beispiel: "5a" bei einer Klasse und "7a,7b" bei mehreren (z.B. Französisch...)
	 * <br>Laufzeit: O(1)
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return eine String-Repräsentation der Klassenmenge des {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDStringOfKlassen(idUnterricht : number) : string {
		const unterricht : StundenplanUnterricht = DeveloperNotificationException.ifMapGetIsNull(this._unterricht_by_id, idUnterricht);
		const kuerzel : AVLSet<string> = new AVLSet();
		for (const idKlasse of unterricht.klassen) {
			const klasse : StundenplanKlasse = DeveloperNotificationException.ifMapGetIsNull(this._klasse_by_id, idKlasse);
			kuerzel.add(klasse.kuerzel);
		}
		return StringUtils.collectionToCommaSeparatedString(kuerzel);
	}

	/**
	 * Liefert eine String-Repräsentation der Raummenge des {@link StundenplanUnterricht}.
	 * <br>Beispiel: "1.01" bei einem Raum und "T1, T2" bei mehreren (z.B. Sporthallen...)
	 * <br>Laufzeit: O(1)
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return eine String-Repräsentation der Raummenge des {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDStringOfRaeume(idUnterricht : number) : string {
		const unterricht : StundenplanUnterricht = DeveloperNotificationException.ifMapGetIsNull(this._unterricht_by_id, idUnterricht);
		const kuerzel : AVLSet<string> = new AVLSet();
		for (const idRaum of unterricht.raeume) {
			const raum : StundenplanRaum = DeveloperNotificationException.ifMapGetIsNull(this._raum_by_id, idRaum);
			kuerzel.add(raum.kuerzel);
		}
		return StringUtils.collectionToCommaSeparatedString(kuerzel);
	}

	/**
	 * Liefert die Menge aller {@link StundenplanLehrer}-Objekte des {@link StundenplanUnterricht}.
	 * <br>Laufzeit: O(1)
	 *
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return die Menge aller {@link StundenplanLehrer}-Objekte des {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDLehrerMenge(idUnterricht : number) : List<StundenplanLehrer> {
		return MapUtils.getOrCreateArrayList(this._lehrermenge_by_idUnterricht, idUnterricht);
	}

	/**
	 * Liefert die Menge aller {@link StundenplanLehrer} des {@link StundenplanUnterricht} als kommaseparierter String.
	 * <br>Laufzeit: O(|Ergebnis|)
	 *
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return die Menge aller {@link StundenplanLehrer} des {@link StundenplanUnterricht} als kommaseparierter String.
	 */
	public unterrichtGetByIDLehrerMengeAsString(idUnterricht : number) : string {
		const lehrkraefteDesUnterrichts : List<StundenplanLehrer> = MapUtils.getOrCreateArrayList(this._lehrermenge_by_idUnterricht, idUnterricht);
		const listeDerKuerzel : List<string> = new ArrayList();
		for (const lehkraft of lehrkraefteDesUnterrichts)
			listeDerKuerzel.add(lehkraft.kuerzel);
		return StringUtils.collectionToCommaSeparatedString(listeDerKuerzel);
	}

	/**
	 * Liefert die erste {@link StundenplanLehrer} des {@link StundenplanUnterricht} oder NULL falls nicht existent.
	 * <br>Laufzeit: O(|Ergebnis|)
	 *
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return eine String-Repräsentation der Raummenge des {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDLehrerFirstOrNull(idUnterricht : number) : StundenplanLehrer | null {
		const lehrerDesUnterrichts : List<StundenplanLehrer> = MapUtils.getOrCreateArrayList(this._lehrermenge_by_idUnterricht, idUnterricht);
		return lehrerDesUnterrichts.isEmpty() ? null : DeveloperNotificationException.ifListGetFirstFailes("lehrerDesUnterrichts.first", lehrerDesUnterrichts);
	}

	/**
	 * Liefert die erste {@link StundenplanLehrer} des {@link StundenplanUnterricht} oder NULL falls nicht existent.
	 * <br>Laufzeit: O(|Ergebnis|)
	 *
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}.
	 *
	 * @return eine String-Repräsentation der Raummenge des {@link StundenplanUnterricht}.
	 */
	public unterrichtGetByIDLehrerFirstAsStringOrEmpty(idUnterricht : number) : string {
		const lehrkraft : StundenplanLehrer | null = this.unterrichtGetByIDLehrerFirstOrNull(idUnterricht);
		return lehrkraft === null ? "" : lehrkraft.kuerzel;
	}

	/**
	 * Liefert TRUE, falls es {@link StundenplanUnterricht} gibt, der einen Wochentyp > 0 hat.
	 * <br>Laufzeit: O(1)
	 *
	 * @return TRUE, falls es {@link StundenplanUnterricht} gibt, der einen Wochentyp > 0 hat.
	 */
	public unterrichtHatMultiWochen() : boolean {
		return this._unterrichtHatMultiWochen;
	}

	private unterrichtRemoveByIdOhneUpdate(idUnterricht : number) : void {
		DeveloperNotificationException.ifMapRemoveFailes(this._unterricht_by_id, idUnterricht);
	}

	/**
	 * Entfernt aus dem Stundenplan ein existierendes {@link StundenplanUnterricht}-Objekt.
	 *
	 * @param idUnterricht  Die Datenbank-ID des {@link StundenplanUnterricht}-Objekts.
	 */
	public unterrichtRemoveById(idUnterricht : number) : void {
		this.unterrichtRemoveByIdOhneUpdate(idUnterricht);
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanUnterricht}-Objekte.
	 *
	 * @param listUnterricht  Die Liste der zu entfernenden {@link StundenplanUnterricht}-Objekte.
	 */
	public unterrichtRemoveAll(listUnterricht : List<StundenplanUnterricht>) : void {
		for (const unterricht of listUnterricht)
			this.unterrichtRemoveByIdOhneUpdate(unterricht.id);
		this.unterrichtRevalidate();
	}

	/**
	 * Liefert eine String-Menge aller Uhrzeiten der Zeitraster einer bestimmten Unterrichtsstunde. Dabei werden identische Uhrzeiten zusammengefasst.
	 * <br>Beispiel:  "08:00-8:45", falls sie nicht abweichen.
	 * <br>Beispiel:  "Mo-Mi 08:00-8:45", "Do 07:55-8:40", "Fr 07:40-8:25", falls sie abweichen.
	 *
	 * @param stunde  Die Nr. der Unterrichtsstunde.
	 *
	 * @return eine String-Menge aller Uhrzeiten der Zeitraster einer bestimmten Unterrichtsstunde. Dabei werden identische Uhrzeiten zusammengefasst.
	 */
	public unterrichtsstundeGetUhrzeitenAsStrings(stunde : number) : List<string> {
		const listUhrzeit : List<string> = new ArrayList();
		const listWochentagVon : List<string> = new ArrayList();
		const listWochentagBis : List<string> = new ArrayList();
		for (let wochentag : number = this._zeitrasterWochentagMin; wochentag <= this._zeitrasterWochentagMax; wochentag++) {
			const sUhrzeit : string = this.unterrichtsstundeGetUhrzeitAsString(wochentag, stunde);
			const sWochentag : string = Wochentag.fromIDorException(wochentag).kuerzel;
			if (listUhrzeit.isEmpty()) {
				listUhrzeit.add(sUhrzeit);
				listWochentagVon.add(sWochentag);
				listWochentagBis.add(sWochentag);
				continue;
			}
			const sUhrzeitDavor : string = DeveloperNotificationException.ifListGetLastFailes("listUhrzeit", listUhrzeit);
			if (JavaObject.equalsTranspiler(sUhrzeitDavor, (sUhrzeit))) {
				listWochentagBis.set(listWochentagBis.size() - 1, sWochentag);
			} else {
				listUhrzeit.add(sUhrzeit);
				listWochentagVon.add(sWochentag);
				listWochentagBis.add(sWochentag);
			}
		}
		if (listUhrzeit.size() <= 1)
			return listUhrzeit;
		for (let i : number = 0; i < listUhrzeit.size(); i++) {
			const sUhrzeit : string = listUhrzeit.get(i);
			const sWochentagVon : string = listWochentagVon.get(i);
			const sWochentagBis : string = listWochentagBis.get(i);
			if (JavaObject.equalsTranspiler(sWochentagVon, (sWochentagBis)))
				listUhrzeit.set(i, sWochentagVon! + " " + sUhrzeit!);
			else
				listUhrzeit.set(i, sWochentagVon! + "-" + sWochentagBis! + " " + sUhrzeit!);
		}
		return listUhrzeit;
	}

	private unterrichtsstundeGetUhrzeitAsString(wochentag : number, stunde : number) : string {
		const zeitraster : StundenplanZeitraster | null = this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag, stunde);
		if (zeitraster === null)
			return "???";
		const sBeginn : string = (zeitraster.stundenbeginn === null) ? "??:??" : DateUtils.getStringOfUhrzeitFromMinuten(zeitraster.stundenbeginn);
		const sEnde : string = (zeitraster.stundenende === null) ? "??:??" : DateUtils.getStringOfUhrzeitFromMinuten(zeitraster.stundenende);
		return sBeginn! + " - " + sEnde! + " Uhr";
	}

	private zeitrasterRevalidate() : void {
		this.update_zeitrastermenge();
		this.update_zeitrastermenge_by_wochentag();
		this.update_zeitrastermenge_by_stunde();
		this.update_zeitraster_by_wochentag_and_stunde();
		this.update_unterrichtmenge_by_idZeitraster();
		this.update_unterrichtmenge_by_idZeitraster_and_wochentyp();
		this.update_zeitrastermengeOhneLeereUnterrichtmenge();
	}

	private zeitrasterAddOhneUpdate(zeitraster : StundenplanZeitraster) : void {
		StundenplanManager.zeitrasterCheck(zeitraster);
		DeveloperNotificationException.ifMapPutOverwrites(this._zeitraster_by_id, zeitraster.id, zeitraster);
	}

	/**
	 * Fügt ein {@link StundenplanZeitraster}-Objekt hinzu.
	 *
	 * @param zeitraster  Das {@link StundenplanZeitraster}-Objekt, welches hinzugefügt werden soll.
	 */
	public zeitrasterAdd(zeitraster : StundenplanZeitraster) : void {
		this.zeitrasterAddOhneUpdate(zeitraster);
		this.zeitrasterRevalidate();
	}

	/**
	 * Fügt alle {@link StundenplanZeitraster}-Objekte hinzu.
	 *
	 * @param listZeitraster  Die Menge der {@link StundenplanZeitraster}-Objekte, welche hinzugefügt werden soll.
	 */
	public zeitrasterAddAll(listZeitraster : List<StundenplanZeitraster>) : void {
		for (const zeitraster of listZeitraster)
			this.zeitrasterAddOhneUpdate(zeitraster);
		this.zeitrasterRevalidate();
	}

	private static zeitrasterCheck(zeitraster : StundenplanZeitraster) : void {
		DeveloperNotificationException.ifInvalidID("zeitraster.id", zeitraster.id);
		Wochentag.fromIDorException(zeitraster.wochentag);
		DeveloperNotificationException.ifTrue("(zeit.unterrichtstunde < 0) || (zeit.unterrichtstunde > 29)", (zeitraster.unterrichtstunde < 0) || (zeitraster.unterrichtstunde > 29));
		if ((zeitraster.stundenbeginn !== null) && (zeitraster.stundenende !== null)) {
			const beginn : number = zeitraster.stundenbeginn.valueOf();
			const ende : number = zeitraster.stundenende.valueOf();
			DeveloperNotificationException.ifTrue("beginn >= ende", beginn >= ende);
		}
	}

	/**
	 * Liefert eine Liste aller {@link StundenplanZeitraster}-Objekte.
	 *
	 * @return eine Liste aller {@link StundenplanZeitraster}-Objekte.
	 */
	public getListZeitraster() : List<StundenplanZeitraster> {
		return this._zeitrastermenge;
	}

	/**
	 * Liefert eine Liste der {@link StundenplanZeitraster}-Objekte zu einem bestimmten Wochentag.
	 *
	 * @param wochentag der Wochentag der gewünschten Zeitraster-Objekte
	 *
	 * @return eine Liste aller {@link StundenplanZeitraster}-Objekte zum übergebenen Wochentag.
	 */
	public getListZeitrasterZuWochentag(wochentag : Wochentag) : List<StundenplanZeitraster> {
		return CollectionUtils.toFilteredArrayList(this._zeitrastermenge, { test : (z: StundenplanZeitraster) => (wochentag.id === z.wochentag) });
	}

	/**
	 * Liefert eine Liste der {@link StundenplanZeitraster}-Objekte zu einer bestimmten Unterrichtsstunde.
	 *
	 * @param unterrichtstunde   die Unterrichtsstunde der gewünschten Zeitraster-Objekte
	 *
	 * @return eine Liste aller {@link StundenplanZeitraster}-Objekte zur übergebenen Unterrichtsstunde.
	 */
	public getListZeitrasterZuStunde(unterrichtstunde : number) : List<StundenplanZeitraster> {
		return CollectionUtils.toFilteredArrayList(this._zeitrastermenge, { test : (z: StundenplanZeitraster) => (unterrichtstunde === z.unterrichtstunde) });
	}

	/**
	 * Liefert die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Intervall berühren.
	 *
	 * @param zeitrasterStart    Das {@link StundenplanZeitraster} zu dem es startet.
	 * @param minutenVerstrichen Die verstrichene Zeit (in Minuten) seit der "startzeit" .
	 *
	 * @return die passende Menge an {@link StundenplanZeitraster}-Objekten.
	 */
	public getZeitrasterByStartVerstrichen(zeitrasterStart : StundenplanZeitraster, minutenVerstrichen : number) : List<StundenplanZeitraster> {
		const wochentag : Wochentag | null = Wochentag.fromIDorException(zeitrasterStart.wochentag);
		const startzeit : number = DeveloperNotificationException.ifNull("zeitrasterStart.stundenbeginn ist NULL", zeitrasterStart.stundenbeginn).valueOf();
		return this.getZeitrasterByWochentagStartVerstrichen(wochentag, startzeit, minutenVerstrichen);
	}

	/**
	 * Liefert die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Zeit-Intervall berühren.<br>
	 *
	 * @param wochentag          Der {@link Wochentag} des Zeit-Intervalls.
	 * @param beginn             Der Beginn des Zeit-Intervalls.
	 * @param minutenVerstrichen Daraus ergibt sich das Ende des Zeit-Intervalls.
	 *
	 * @return die passende Menge an {@link StundenplanZeitraster}-Objekten, welche das Intervall berührt.
	 */
	public getZeitrasterByWochentagStartVerstrichen(wochentag : Wochentag, beginn : number, minutenVerstrichen : number) : List<StundenplanZeitraster> {
		const ende : number = beginn + minutenVerstrichen;
		return CollectionUtils.toFilteredArrayList(this._zeitrastermenge, { test : (z: StundenplanZeitraster) => (wochentag.id === z.wochentag) && this.zeitrasterGetSchneidenSich(beginn, ende, z.stundenbeginn, z.stundenende) });
	}

	/**
	 * Liefert das {@link StundenplanZeitraster}-Objekt der nächsten Stunde am selben Wochentag.
	 *
	 * @param zeitraster Das aktuelle {@link StundenplanZeitraster}-Objekt.
	 *
	 * @return das {@link StundenplanZeitraster}-Objekt der nächsten Stunde am selben Wochentag.
	 */
	public getZeitrasterNext(zeitraster : StundenplanZeitraster) : StundenplanZeitraster {
		return this._zeitraster_by_wochentag_and_stunde.getNonNullOrException(zeitraster.wochentag, zeitraster.unterrichtstunde + 1);
	}

	/**
	 * Liefert den kleinsten Minuten-Wert aller Zeitraster, oder 480 (8 Uhr).
	 * <br>Laufzeit: O(1)
	 *
	 * @return den kleinsten Minuten-Wert aller Zeitraster, oder 480 (8 Uhr).
	 */
	public zeitrasterGetMinutenMin() : number {
		return (this._zeitrasterMinutenMin === null) ? 480 : this._zeitrasterMinutenMin;
	}

	/**
	 * Liefert das Minimum aller {@link StundenplanZeitraster#stundenbeginn}-Objekte einer bestimmten Unterrichtsstunde, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @param stunde  Die Unterrichtsstunde, deren Minimum gesucht wird.
	 *
	 * @return das Minimum aller {@link StundenplanZeitraster#stundenbeginn}-Objekte einer bestimmten Unterrichtsstunde, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public zeitrasterGetMinutenMinDerStunde(stunde : number) : number {
		const min : number | null = this._zeitrasterMinutenMinByStunde.get(stunde);
		return (min === null) ? 480 : min;
	}

	/**
	 * Liefert den größten Minuten-Wert aller Zeitraster, oder 480 (8 Uhr).
	 * <br>Laufzeit: O(1)
	 *
	 * @return den größten Minuten-Wert aller Zeitraster, oder 480 (8 Uhr).
	 */
	public zeitrasterGetMinutenMax() : number {
		return (this._zeitrasterMinutenMax === null) ? 480 : this._zeitrasterMinutenMax;
	}

	/**
	 * Liefert das Maximum aller {@link StundenplanZeitraster#stundenbeginn}-Objekte einer bestimmten Unterrichtsstunde, oder 480 (8 Uhr) falls keines vorhanden ist.
	 * <br>Laufzeit: O(1)
	 *
	 * @param stunde  Die Unterrichtsstunde, deren Maximum gesucht wird.
	 *
	 * @return das Maximum aller {@link StundenplanZeitraster#stundenbeginn}-Objekte einer bestimmten Unterrichtsstunde, oder 480 (8 Uhr) falls keines vorhanden ist.
	 */
	public zeitrasterGetMinutenMaxDerStunde(stunde : number) : number {
		const max : number | null = this._zeitrasterMinutenMaxByStunde.get(stunde);
		return (max === null) ? 480 : max;
	}

	/**
	 * Liefert die kleinste Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die kleinste Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetStundeMin() : number {
		return this._zeitrasterStundeMin;
	}

	/**
	 * Liefert die kleinste nicht leere Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die kleinste nicht leere Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetStundeMinOhneLeere() : number {
		return this._zeitrasterStundeMinOhneLeere;
	}

	/**
	 * Liefert die größte Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die größte Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetStundeMax() : number {
		return this._zeitrasterStundeMax;
	}

	/**
	 * Liefert die größte nicht leere Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die größte nicht leere Stunde aller Zeitraster, oder 1 falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetStundeMaxOhneLeere() : number {
		return this._zeitrasterStundeMaxOhneLeere;
	}

	/**
	 * Liefert die ID des kleinsten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die ID des kleinsten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetWochentagMin() : number {
		return this._zeitrasterWochentagMin;
	}

	/**
	 * Liefert den kleinsten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return den kleinsten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetWochentagMinEnum() : Wochentag {
		return Wochentag.fromIDorException(this._zeitrasterWochentagMin);
	}

	/**
	 * Liefert die ID des größten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return die ID des größten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetWochentagMax() : number {
		return this._zeitrasterWochentagMax;
	}

	/**
	 * Liefert den größten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 * <br>Laufzeit: O(1)
	 *
	 * @return den größten {@link Wochentag} oder den Montag falls es keine Zeitraster gibt.
	 */
	public zeitrasterGetWochentagMaxEnum() : Wochentag {
		return Wochentag.fromIDorException(this._zeitrasterWochentagMax);
	}

	/**
	 * Liefert das zur ID zugehörige {@link StundenplanZeitraster}-Objekt.
	 *
	 * @param idZeitraster  Die Datenbank-ID des Zeitrasters.
	 *
	 * @return das zur ID zugehörige {@link StundenplanZeitraster}-Objekt.
	 */
	public zeitrasterGetByIdOrException(idZeitraster : number) : StundenplanZeitraster {
		return DeveloperNotificationException.ifMapGetIsNull(this._zeitraster_by_id, idZeitraster);
	}

	/**
	 * Liefert die Beginn-Uhrzeit des {@link StundenplanZeitraster} oder den leeren String, falls diese NULL ist.
	 * <br>Beispiel: "09:30" oder ""
	 * <br>Laufzeit: O(1)
	 *
	 * @param idZeitraster  Die Datenbank-ID des {@link StundenplanZeitraster}.
	 *
	 * @return die Beginn-Uhrzeit des {@link StundenplanZeitraster} oder den leeren String, falls diese NULL ist.
	 */
	public zeitrasterGetByIdStringOfUhrzeitBeginn(idZeitraster : number) : string {
		const zeitraster : StundenplanZeitraster = DeveloperNotificationException.ifMapGetIsNull(this._zeitraster_by_id, idZeitraster);
		return (zeitraster.stundenbeginn === null) ? "" : DateUtils.getStringOfUhrzeitFromMinuten(zeitraster.stundenbeginn);
	}

	/**
	 * Liefert die End-Uhrzeit des {@link StundenplanZeitraster} oder den leeren String, falls diese NULL ist.
	 * <br>Beispiel: "10:15" oder ""
	 * <br>Laufzeit: O(1)
	 *
	 * @param idZeitraster  Die Datenbank-ID des {@link StundenplanZeitraster}.
	 *
	 * @return die End-Uhrzeit des {@link StundenplanZeitraster} oder den leeren String, falls diese NULL ist.
	 */
	public zeitrasterGetByIdStringOfUhrzeitEnde(idZeitraster : number) : string {
		const zeitraster : StundenplanZeitraster = DeveloperNotificationException.ifMapGetIsNull(this._zeitraster_by_id, idZeitraster);
		return (zeitraster.stundenende === null) ? "" : DateUtils.getStringOfUhrzeitFromMinuten(zeitraster.stundenende);
	}

	/**
	 * Liefert das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt.
	 *
	 * @param wochentag  Die ENUM-ID des {@link Wochentag} des gesuchten Zeitrasters.
	 * @param stunde     Die Unterrichtsstunde des gesuchten Zeitrasters.
	 *
	 * @return das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt.
	 * @throws DeveloperNotificationException falls kein Zeitraster-Eintrag existiert
	 */
	public zeitrasterGetByWochentagAndStundeOrException(wochentag : number, stunde : number) : StundenplanZeitraster {
		return this._zeitraster_by_wochentag_and_stunde.getNonNullOrException(wochentag, stunde);
	}

	/**
	 * Liefert das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt, falls es existiert, sonst NULL.
	 *
	 * @param wochentag  Die ENUM-ID des {@link Wochentag} des gesuchten Zeitrasters.
	 * @param stunde     Die Unterrichtsstunde des gesuchten Zeitrasters.
	 *
	 * @return das zu (wochentag, stunde) zugehörige {@link StundenplanZeitraster}-Objekt, falls es existiert, sonst NULL.
	 */
	public zeitrasterGetByWochentagAndStundeOrNull(wochentag : number, stunde : number) : StundenplanZeitraster | null {
		return this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag, stunde);
	}

	/**
	 * Liefert TRUE, falls die Intervalle [beginn1, ende1] und [beginn2, ende2] sich schneiden.
	 *
	 * @param beginn1  Der Anfang (inklusive) des ersten Intervalls (in Minuten) seit 0 Uhr.
	 * @param ende1    Das Ende (inklusive) des ersten Intervalls (in Minuten) seit 0 Uhr.
	 * @param iBeginn2 Der Anfang (inklusive) des zweiten Intervalls (in Minuten) seit 0 Uhr.
	 * @param iEnde2   Das Ende (inklusive) des zweiten Intervalls (in Minuten) seit 0 Uhr.
	 *
	 * @return TRUE, falls die Intervalle [beginn1, ende1] und [beginn2, ende2] sich schneiden.
	 */
	public zeitrasterGetSchneidenSich(beginn1 : number, ende1 : number, iBeginn2 : number | null, iEnde2 : number | null) : boolean {
		const beginn2 : number = DeveloperNotificationException.ifNull("zeitraster.stundenbeginn ist NULL!", iBeginn2).valueOf();
		const ende2 : number = DeveloperNotificationException.ifNull("zeitraster.stundenende ist NULL!", iEnde2).valueOf();
		DeveloperNotificationException.ifTrue("beginn1 < 0", beginn1 < 0);
		DeveloperNotificationException.ifTrue("beginn2 < 0", beginn2 < 0);
		DeveloperNotificationException.ifTrue("beginn1 > ende1", beginn1 > ende1);
		DeveloperNotificationException.ifTrue("beginn2 > ende2", beginn2 > ende2);
		return !((ende1 < beginn2) || (ende2 < beginn1));
	}

	/**
	 * Liefert alle verwendeten sortierten Unterrichtsstunden der {@link StundenplanZeitraster}.
	 * Das Array beinhaltet alle Zahlen von {@link #zeitrasterGetStundeMin()} bis {@link #zeitrasterGetStundeMax()}.
	 * <br>Laufzeit: O(1), da Referenz auf ein Array.
	 *
	 * @return alle verwendeten sortierten Unterrichtsstunden der {@link StundenplanZeitraster}.
	 */
	public zeitrasterGetStundenRange() : Array<number> {
		return this._zeitrasterStundenRange;
	}

	/**
	 * Liefert alle verwendeten sortierten Unterrichtsstunden der nicht leeren {@link StundenplanZeitraster}.
	 * Das Array beinhaltet alle Zahlen von {@link #zeitrasterGetStundeMinOhneLeere()} bis {@link #zeitrasterGetStundeMaxOhneLeere()}.
	 * <br>Laufzeit: O(1), da Referenz auf ein Array.
	 *
	 * @return alle verwendeten sortierten Unterrichtsstunden der nicht leeren {@link StundenplanZeitraster}.
	 */
	public zeitrasterGetStundenRangeOhneLeere() : Array<number> {
		return this._zeitrasterStundenRangeOhneLeere;
	}

	/**
	 * Liefert alle verwendeten sortierten {@link Wochentag}-Objekte der {@link StundenplanZeitraster}.
	 * Das Array beinhaltet alle {@link Wochentag}-Objekte von {@link #zeitrasterGetWochentagMin} bis {@link #zeitrasterGetWochentagMax()}.
	 * <br>Laufzeit: O(1), da Referenz auf ein Array.
	 *
	 * @return alle verwendeten sortierten {@link Wochentag}-Objekte der {@link StundenplanZeitraster}.
	 */
	public zeitrasterGetWochentageAlsEnumRange() : Array<Wochentag> {
		return this._zeitrasterWochentageAlsEnumRange;
	}

	/**
	 * Liefert TRUE, falls es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 0 gibt.
	 *
	 * @param idZeitraster  Die Datenbank-ID des Zeitrasters.
	 *
	 * @return TRUE, falls es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 0 gibt.
	 */
	public zeitrasterHatUnterrichtMitWochentyp0(idZeitraster : number) : boolean {
		return !Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, idZeitraster, 0).isEmpty();
	}

	/**
	 * Liefert TRUE, falls das Zeitraster existiert und es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 0 gibt.
	 *
	 * @param wochentag  Der {@link Wochentag}-ENUM.
	 * @param stunde     Die Unterrichtsstunde.
	 *
	 * @return TRUE, falls das Zeitraster existiert und es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 0 gibt.
	 */
	public zeitrasterHatUnterrichtMitWochentyp0ByWochentagAndStunde(wochentag : Wochentag, stunde : number) : boolean {
		const zeitraster : StundenplanZeitraster | null = this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag.id, stunde);
		return (zeitraster !== null) && this.zeitrasterHatUnterrichtMitWochentyp0(zeitraster.id);
	}

	/**
	 * Liefert TRUE, falls es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 1 bis N gibt.
	 *
	 * @param idZeitraster  Die Datenbank-ID des Zeitrasters.
	 *
	 * @return TRUE, falls es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 1 bis N gibt.
	 */
	public zeitrasterHatUnterrichtMitWochentyp1BisN(idZeitraster : number) : boolean {
		for (let wochentyp : number = 1; wochentyp <= this._stundenplanWochenTypModell; wochentyp++)
			if (!Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, idZeitraster, wochentyp).isEmpty())
				return true;
		return false;
	}

	/**
	 * Liefert TRUE, falls das Zeitraster existiert und es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 1 bis N gibt.
	 *
	 * @param wochentag  Der {@link Wochentag}-ENUM.
	 * @param stunde     Die Unterrichtsstunde.
	 *
	 * @return TRUE, falls das Zeitraster existiert und es mindestens einen Unterricht im Zeitraster mit einem einen Wochentyp 1 bis N gibt.
	 */
	public zeitrasterHatUnterrichtMitWochentyp1BisNByWochentagAndStunde(wochentag : Wochentag, stunde : number) : boolean {
		const zeitraster : StundenplanZeitraster | null = this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag.id, stunde);
		return (zeitraster !== null) && this.zeitrasterHatUnterrichtMitWochentyp1BisN(zeitraster.id);
	}

	/**
	 * Liefert TRUE, falls es in der Stundenplanzelle "wochtag, stunde" Unterricht eines "wochentyps" gibt.
	 *
	 * @param wochentag  Der {@link Wochentag}-ENUM.
	 * @param stunde     Die Unterrichtsstunde.
	 * @param wochentyp  Der Wochentyp (0 jede Woche, 1 nur Woche A, 2 nur Woche B, ...)
	 *
	 * @return TRUE, falls es in der Stundenplanzelle "wochtag, stunde" Unterricht eines "wochentyps" gibt.
	 */
	public zeitrasterHatUnterrichtByWochentagAndStundeAndWochentyp(wochentag : Wochentag, stunde : number, wochentyp : number) : boolean {
		const zeitraster : StundenplanZeitraster | null = this._zeitraster_by_wochentag_and_stunde.getOrNull(wochentag.id, stunde);
		if (zeitraster === null)
			return false;
		return !Map2DUtils.getOrCreateArrayList(this._unterrichtmenge_by_idZeitraster_and_wochentyp, zeitraster.id, wochentyp).isEmpty();
	}

	/**
	 * Liefert TRUE, falls zu (wochentag, stunde) ein zugehöriges {@link StundenplanZeitraster}-Objekt existiert.
	 *
	 * @param wochentag  Der ENUM-ID des {@link Wochentag} des Zeitrasters.
	 * @param stunde     Die Unterrichtsstunde des Zeitrasters.
	 *
	 * @return TRUE, falls zu (wochentag, stunde) ein zugehöriges {@link StundenplanZeitraster}-Objekt existiert.
	 */
	public zeitrasterExistsByWochentagAndStunde(wochentag : number, stunde : number) : boolean {
		return this._zeitraster_by_wochentag_and_stunde.contains(wochentag, stunde);
	}

	/**
	 * Liefert TRUE, falls ein {@link StundenplanZeitraster}-Objekt mit dem Wochentag existiert.
	 *
	 * @param wochentag  Der Wochentag, deren Zeitrastermenge überprüft wird.
	 *
	 * @return TRUE, falls ein {@link StundenplanZeitraster}-Objekt mit dem Wochentag existiert.
	 */
	public zeitrasterExistsByWochentag(wochentag : number) : boolean {
		return !MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_wochentag, wochentag).isEmpty();
	}

	/**
	 * Aktualisiert das vorhandene {@link StundenplanZeitraster}-Objekt durch das neue Objekt.
	 * <br>Die folgenden Attribute werden nicht aktualisiert:
	 * <br>{@link StundenplanZeitraster#id}
	 * <br>
	 * <br>Die folgenden Attribute werden kopiert:
	 * <br>{@link StundenplanZeitraster#stundenbeginn}
	 * <br>{@link StundenplanZeitraster#stundenende}
	 * <br>{@link StundenplanZeitraster#unterrichtstunde}
	 * <br>{@link StundenplanZeitraster#wochentag}
	 *
	 * @param zeitraster  Das neue {@link StundenplanZeitraster}-Objekt, dessen Attribute kopiert werden.
	 */
	public zeitrasterPatchAttributes(zeitraster : StundenplanZeitraster) : void {
		StundenplanManager.zeitrasterCheck(zeitraster);
		DeveloperNotificationException.ifMapRemoveFailes(this._zeitraster_by_id, zeitraster.id);
		DeveloperNotificationException.ifMapPutOverwrites(this._zeitraster_by_id, zeitraster.id, zeitraster);
		this.zeitrasterRevalidate();
	}

	private zeitrasterRemoveOhneUpdate(idZeitraster : number) : void {
		for (const u of DeveloperNotificationException.ifMapGetIsNull(this._unterrichtmenge_by_idZeitraster, idZeitraster))
			this.unterrichtRemoveByIdOhneUpdate(u.id);
		DeveloperNotificationException.ifMapRemoveFailes(this._zeitraster_by_id, idZeitraster);
	}

	/**
	 * Entfernt aus dem Stundenplan ein existierendes {@link StundenplanZeitraster}-Objekt.
	 * <br> Hinweis: Kaskadierend werden auch alle {@link StundenplanUnterricht}-Objekte gelöscht.
	 *
	 * @param idZeitraster  Die Datenbank-ID des {@link StundenplanZeitraster}-Objekts.
	 */
	public zeitrasterRemoveById(idZeitraster : number) : void {
		this.zeitrasterRemoveOhneUpdate(idZeitraster);
		this.zeitrasterRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanZeitraster}-Objekte aus dem Stundenplan.
	 * <br> Hinweis: Kaskadierend werden auch alle {@link StundenplanUnterricht}-Objekte gelöscht.
	 *
	 * @param listZeitraster  Die {@link StundenplanZeitraster}-Objekte, die entfernt werden sollen.
	 */
	public zeitrasterRemoveAll(listZeitraster : List<StundenplanZeitraster>) : void {
		for (const zeitraster of listZeitraster)
			this.zeitrasterRemoveOhneUpdate(zeitraster.id);
		this.zeitrasterRevalidate();
		this.unterrichtRevalidate();
	}

	/**
	 * Entfernt alle {@link StundenplanZeitraster}-Objekte, die einen bestimmten Wochentag haben.
	 *
	 * @param wochentagEnumID  Die ID des {@link Wochentag}.
	 */
	public zeitrasterRemoveAllByWochentag(wochentagEnumID : number) : void {
		this.zeitrasterRemoveAll(MapUtils.getOrCreateArrayList(this._zeitrastermenge_by_wochentag, wochentagEnumID));
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.utils.stundenplan.StundenplanManager'].includes(name);
	}

}

export function cast_de_svws_nrw_core_utils_stundenplan_StundenplanManager(obj : unknown) : StundenplanManager {
	return obj as StundenplanManager;
}
