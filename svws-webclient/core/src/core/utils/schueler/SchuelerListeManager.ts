import { JavaObject } from '../../../java/lang/JavaObject';
import { HashMap2D } from '../../../core/adt/map/HashMap2D';
import { SchuelerListeEintrag } from '../../../core/data/schueler/SchuelerListeEintrag';
import { KlassenUtils } from '../../../core/utils/klassen/KlassenUtils';
import { KlassenListeEintrag } from '../../../core/data/klassen/KlassenListeEintrag';
import { SchuelerUtils } from '../../../core/utils/schueler/SchuelerUtils';
import { ArrayList } from '../../../java/util/ArrayList';
import { SchuljahresabschnittsUtils } from '../../../core/utils/schule/SchuljahresabschnittsUtils';
import { JavaString } from '../../../java/lang/JavaString';
import { DeveloperNotificationException } from '../../../core/exceptions/DeveloperNotificationException';
import { SchuelerStatus } from '../../../core/types/SchuelerStatus';
import type { Comparator } from '../../../java/util/Comparator';
import type { JavaFunction } from '../../../java/util/function/JavaFunction';
import { KursListeEintrag } from '../../../core/data/kurse/KursListeEintrag';
import { JahrgangsListeEintrag } from '../../../core/data/jahrgang/JahrgangsListeEintrag';
import { Schulgliederung } from '../../../core/types/schule/Schulgliederung';
import type { List } from '../../../java/util/List';
import { Pair } from '../../../core/adt/Pair';
import { AttributMitAuswahl } from '../../../core/utils/AttributMitAuswahl';
import { GostAbiturjahrUtils } from '../../../core/utils/gost/GostAbiturjahrUtils';
import { GostJahrgang } from '../../../core/data/gost/GostJahrgang';
import { JahrgangsUtils } from '../../../core/utils/jahrgang/JahrgangsUtils';
import type { Runnable } from '../../../java/lang/Runnable';
import { JavaLong } from '../../../java/lang/JavaLong';
import { KursUtils } from '../../../core/utils/kurse/KursUtils';
import { Arrays } from '../../../java/util/Arrays';
import { Schuljahresabschnitt } from '../../../core/data/schule/Schuljahresabschnitt';

export class SchuelerListeManager extends JavaObject {

	/**
	 * Ein Filter-Attribut für die Schülerliste. Dieses wird nicht für das Filtern der Schüler verwendet, sondern für eine Mehrfachauswahl
	 */
	public readonly schueler : AttributMitAuswahl<number, SchuelerListeEintrag>;

	private static readonly _schuelerToId : JavaFunction<SchuelerListeEintrag, number> = { apply : (s: SchuelerListeEintrag) => s.id };

	private readonly _mapSchuelerMitStatus : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInJahrgang : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInKlasse : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInKurs : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInSchuljahresabschnitt : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInAbiturjahrgang : HashMap2D<number, number, SchuelerListeEintrag> = new HashMap2D();

	private readonly _mapSchuelerInSchulgliederung : HashMap2D<string, number, SchuelerListeEintrag> = new HashMap2D();

	/**
	 * Das Filter-Attribut für die Jahrgänge
	 */
	public readonly jahrgaenge : AttributMitAuswahl<number, JahrgangsListeEintrag>;

	private static readonly _jahrgangToId : JavaFunction<JahrgangsListeEintrag, number> = { apply : (jg: JahrgangsListeEintrag) => jg.id };

	/**
	 * Das Filter-Attribut für die Klassen
	 */
	public readonly klassen : AttributMitAuswahl<number, KlassenListeEintrag>;

	private static readonly _klasseToId : JavaFunction<KlassenListeEintrag, number> = { apply : (k: KlassenListeEintrag) => k.id };

	/**
	 * Das Filter-Attribut für die Kurse
	 */
	public readonly kurse : AttributMitAuswahl<number, KursListeEintrag>;

	private static readonly _kursToId : JavaFunction<KursListeEintrag, number> = { apply : (k: KursListeEintrag) => k.id };

	/**
	 * Das Filter-Attribut für die Schuljahresabschnitte - die Filterfunktion wird zur Zeit noch nicht genutzt
	 */
	public readonly schuljahresabschnitte : AttributMitAuswahl<number, Schuljahresabschnitt>;

	private static readonly _schuljahresabschnittToId : JavaFunction<Schuljahresabschnitt, number> = { apply : (sja: Schuljahresabschnitt) => sja.id };

	/**
	 * Das Filter-Attribut für die Abiturjahrgänge - die Filterfunktion wird zur Zeit noch nicht genutzt
	 */
	public readonly abiturjahrgaenge : AttributMitAuswahl<number, GostJahrgang>;

	private static readonly _abiturjahrgangToId : JavaFunction<GostJahrgang, number> = { apply : (a: GostJahrgang) => a.abiturjahr };

	/**
	 * Das Filter-Attribut für die Schulgliederungen
	 */
	public readonly schulgliederungen : AttributMitAuswahl<string, Schulgliederung>;

	private static readonly _schulgliederungToId : JavaFunction<Schulgliederung, string> = { apply : (sg: Schulgliederung) => sg.daten.kuerzel };

	private static readonly _comparatorSchulgliederung : Comparator<Schulgliederung> = { compare : (a: Schulgliederung, b: Schulgliederung) => a.ordinal() - b.ordinal() };

	/**
	 * Das Filter-Attribut für den Schüler-Status
	 */
	public readonly schuelerstatus : AttributMitAuswahl<number, SchuelerStatus>;

	private static readonly _schuelerstatusToId : JavaFunction<SchuelerStatus, number> = { apply : (s: SchuelerStatus) => s.id };

	private static readonly _comparatorSchuelerStatus : Comparator<SchuelerStatus> = { compare : (a: SchuelerStatus, b: SchuelerStatus) => a.ordinal() - b.ordinal() };

	/**
	 * Die gefilterte Schüler-Liste, sofern sie schon berechnet wurde
	 */
	private _filtered : List<SchuelerListeEintrag> | null = null;

	/**
	 * Ein Handler für das Ereignis, dass der Schüler-Filter angepasst wurde
	 */
	private readonly _eventHandlerFilterChanged : Runnable = { run : () => this._filtered = null };

	/**
	 * Ein Handler für das Ereignis, dass die Schülerauswahl angepasst wurde
	 */
	private static readonly _eventHandlerSchuelerAuswahlChanged : Runnable = { run : () => {
		// empty block
	} };

	/**
	 * Die Sortier-Ordnung, welche vom Comparator verwendet wird.
	 */
	private _order : List<Pair<string, boolean>> = Arrays.asList(new Pair("klassen", true), new Pair("nachname", true), new Pair("vorname", true));


	/**
	 * Erstellt einen neuen Manager und initialisiert diesen mit den übergebenen Daten
	 *
	 * @param schueler                die Liste der Schüler
	 * @param jahrgaenge              die Liste des Jahrgangskatalogs
	 * @param klassen                 die Liste des Klassenkatalogs
	 * @param kurse                   die Liste des Kurskatalogs
	 * @param schuljahresabschnitte   die Liste der Schuljahresabschnitte
	 * @param abiturjahrgaenge        die Liste der Abiturjahrgänge
	 */
	public constructor(schueler : List<SchuelerListeEintrag>, jahrgaenge : List<JahrgangsListeEintrag>, klassen : List<KlassenListeEintrag>, kurse : List<KursListeEintrag>, schuljahresabschnitte : List<Schuljahresabschnitt>, abiturjahrgaenge : List<GostJahrgang>) {
		super();
		this.schueler = new AttributMitAuswahl(schueler, SchuelerListeManager._schuelerToId, SchuelerUtils.comparator, SchuelerListeManager._eventHandlerSchuelerAuswahlChanged);
		this.initSchueler();
		this.jahrgaenge = new AttributMitAuswahl(jahrgaenge, SchuelerListeManager._jahrgangToId, JahrgangsUtils.comparator, this._eventHandlerFilterChanged);
		this.klassen = new AttributMitAuswahl(klassen, SchuelerListeManager._klasseToId, KlassenUtils.comparator, this._eventHandlerFilterChanged);
		this.kurse = new AttributMitAuswahl(kurse, SchuelerListeManager._kursToId, KursUtils.comparator, this._eventHandlerFilterChanged);
		this.schuljahresabschnitte = new AttributMitAuswahl(schuljahresabschnitte, SchuelerListeManager._schuljahresabschnittToId, SchuljahresabschnittsUtils.comparator, this._eventHandlerFilterChanged);
		this.abiturjahrgaenge = new AttributMitAuswahl(abiturjahrgaenge, SchuelerListeManager._abiturjahrgangToId, GostAbiturjahrUtils.comparator, this._eventHandlerFilterChanged);
		this.schulgliederungen = new AttributMitAuswahl(Arrays.asList(...Schulgliederung.values()), SchuelerListeManager._schulgliederungToId, SchuelerListeManager._comparatorSchulgliederung, this._eventHandlerFilterChanged);
		this.schuelerstatus = new AttributMitAuswahl(Arrays.asList(...SchuelerStatus.values()), SchuelerListeManager._schuelerstatusToId, SchuelerListeManager._comparatorSchuelerStatus, this._eventHandlerFilterChanged);
	}

	private initSchueler() : void {
		for (const s of this.schueler.list()) {
			this._mapSchuelerMitStatus.put(s.status, s.id, s);
			if (s.idJahrgang >= 0)
				this._mapSchuelerInJahrgang.put(s.idJahrgang, s.id, s);
			if (s.idKlasse >= 0)
				this._mapSchuelerInKlasse.put(s.idKlasse, s.id, s);
			for (const idKurs of s.kurse)
				this._mapSchuelerInKurs.put(idKurs, s.id, s);
			if (s.idSchuljahresabschnitt >= 0)
				this._mapSchuelerInSchuljahresabschnitt.put(s.idSchuljahresabschnitt, s.id, s);
			if (s.abiturjahrgang !== null)
				this._mapSchuelerInAbiturjahrgang.put(s.abiturjahrgang, s.id, s);
			if (!JavaString.isBlank(s.schulgliederung))
				this._mapSchuelerInSchulgliederung.put(s.schulgliederung, s.id, s);
		}
	}

	/**
	 * Setzt die Sortier-Ordnung für die gefilterten Listen. Hier wird eine Menge von Paaren angegeben,
	 * welche das zu sortierende Feld als String angebenen und als boolean ob es aufsteigend (true)
	 * oder absteigend (false) sortiert werden soll.
	 *
	 * @param order   die Sortier-Ordnung.
	 */
	public setOrder(order : List<Pair<string, boolean>>) : void {
		this._order = order;
		this._filtered = null;
	}

	/**
	 * Vergleicht zwei Schülerlisteneinträge anhand der spezifizierten Ordnung.
	 *
	 * @param a   der erste Eintrag
	 * @param b   der zweite Eintrag
	 *
	 * @return das Ergebnis des Vergleichs (-1 kleine, 0 gleich und 1 größer)
	 */
	private compare(a : SchuelerListeEintrag, b : SchuelerListeEintrag) : number {
		for (const criteria of this._order) {
			const field : string | null = criteria.a;
			const asc : boolean = (criteria.b === null) || criteria.b;
			let cmp : number = 0;
			if (JavaObject.equalsTranspiler("klassen", (field))) {
				const aKlasse : KlassenListeEintrag | null = this.klassen.get(a.idKlasse);
				const bKlasse : KlassenListeEintrag | null = this.klassen.get(b.idKlasse);
				if ((aKlasse === null) && (bKlasse === null)) {
					cmp = 0;
				} else
					if (aKlasse === null) {
						cmp = -1;
					} else
						if (bKlasse === null) {
							cmp = 1;
						} else {
							cmp = KlassenUtils.comparator.compare(aKlasse, bKlasse);
						}
			} else
				if (JavaObject.equalsTranspiler("nachname", (field))) {
					cmp = JavaString.compareTo(a.nachname, b.nachname);
				} else
					if (JavaObject.equalsTranspiler("vorname", (field))) {
						cmp = JavaString.compareTo(a.vorname, b.vorname);
					} else
						throw new DeveloperNotificationException("Fehler bei der Sortierung. Das Sortierkriterium wird vom Manager nicht unterstützt.")
			if (cmp === 0)
				continue;
			return asc ? cmp : -cmp;
		}
		return JavaLong.compare(a.id, b.id);
	}

	/**
	 * Gibt eine gefilterte Liste der Schüler zurück. Als Filter werden dabei
	 * die Jahrgänge, die Klassen, die Kurse, die Schulgliederungen und der Schülerstatus
	 * beachtet.
	 *
	 * @return die gefilterte Liste
	 */
	public filtered() : List<SchuelerListeEintrag> {
		if (this._filtered !== null)
			return this._filtered;
		const tmpList : List<SchuelerListeEintrag> = new ArrayList();
		for (const eintrag of this.schueler.list()) {
			if (this.jahrgaenge.auswahlExists() && ((eintrag.idJahrgang < 0) || (!this.jahrgaenge.auswahlHasKey(eintrag.idJahrgang))))
				continue;
			if (this.klassen.auswahlExists() && ((eintrag.idKlasse < 0) || (!this.klassen.auswahlHasKey(eintrag.idKlasse))))
				continue;
			if (this.kurse.auswahlExists()) {
				let hatEinenKurs : boolean = false;
				for (const idKurs of eintrag.kurse)
					if (this.kurse.auswahlHasKey(idKurs))
						hatEinenKurs = true;
				if (!hatEinenKurs)
					continue;
			}
			if (this.schulgliederungen.auswahlExists() && ((JavaString.isBlank(eintrag.schulgliederung)) || (!this.schulgliederungen.auswahlHasKey(eintrag.schulgliederung))))
				continue;
			if (this.schuelerstatus.auswahlExists() && (!this.schuelerstatus.auswahlHasKey(eintrag.status)))
				continue;
			tmpList.add(eintrag);
		}
		const comparator : Comparator<SchuelerListeEintrag> = { compare : (a: SchuelerListeEintrag, b: SchuelerListeEintrag) => this.compare(a, b) };
		tmpList.sort(comparator);
		this._filtered = tmpList;
		return this._filtered;
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.utils.schueler.SchuelerListeManager'].includes(name);
	}

}

export function cast_de_svws_nrw_core_utils_schueler_SchuelerListeManager(obj : unknown) : SchuelerListeManager {
	return obj as SchuelerListeManager;
}
