import { JavaObject } from '../../../java/lang/JavaObject';
import { GostBelegpruefungsArt } from '../../../core/abschluss/gost/GostBelegpruefungsArt';
import { ArrayList } from '../../../java/util/ArrayList';
import type { List } from '../../../java/util/List';
import { Class } from '../../../java/lang/Class';
import { AbiturdatenManager } from '../../../core/abschluss/gost/AbiturdatenManager';
import { GostBelegungsfehler } from '../../../core/abschluss/gost/GostBelegungsfehler';

export abstract class GostBelegpruefung extends JavaObject {

	/**
	 * Eine ggf. zuvor durchgeführte Abitur-Belegprüfung, welche in dieser Belegprüfung als Voraussetzung vorhanden sein muss.
	 */
	protected readonly pruefungen_vorher : Array<GostBelegpruefung>;

	/**
	 * Der Daten-Manager für die Abiturdaten
	 */
	protected readonly manager : AbiturdatenManager;

	/**
	 * Die Art der Belegprüfung (nur EF.1, Gesamte Oberstufe, evtl. weitere)
	 */
	protected readonly pruefungs_art : GostBelegpruefungsArt;

	/**
	 * Ein Set von Belegungsfehlern, die bei der Gesamtprüfung entstanden sind.
	 */
	private readonly belegungsfehler : List<GostBelegungsfehler> = new ArrayList<GostBelegungsfehler>();


	/**
	 * Erstellt eine neue Belegprüfung, welche den angegebenen Daten-Manager verwendet.
	 *
	 * @param manager           der Daten-Manager für die Abiturdaten
	 * @param pruefungsArt      die Art der durchzuführenden Prüfung (z.B. EF.1 oder GESAMT)
	 * @param pruefungenVorher   eine vorher durchgeführte Abiturprüfung
	 */
	protected constructor(manager : AbiturdatenManager, pruefungsArt : GostBelegpruefungsArt, ...pruefungenVorher : Array<GostBelegpruefung>) {
		super();
		this.pruefungen_vorher = pruefungenVorher;
		this.manager = manager;
		this.pruefungs_art = pruefungsArt;
	}

	/**
	 * Führt eine Belegprüfung durch.
	 */
	public pruefe() : void {
		this.init();
		if (this.pruefungs_art as unknown === GostBelegpruefungsArt.EF1 as unknown)
			this.pruefeEF1();
		else
			if (this.pruefungs_art as unknown === GostBelegpruefungsArt.GESAMT as unknown)
				this.pruefeGesamt();
	}

	/**
	 * Fügt einen Belegungsfehler zu der Belegprüfung hinzu. Diese Methode wird von den Sub-Klassen
	 * aufgerufen, wenn dort ein Belegungsfehler erkannt wird.
	 *
	 * @param fehler   der hinzuzufügende Belegungsfehler
	 */
	protected addFehler(fehler : GostBelegungsfehler) : void {
		if (!this.belegungsfehler.contains(fehler))
			this.belegungsfehler.add(fehler);
	}

	/**
	 * Gibt die Belegungsfehler zurück, welche bei der Gesamtprüfung aufgetreten sind.
	 *
	 * @return die Belegungsfehler
	 */
	public getBelegungsfehler() : List<GostBelegungsfehler> {
		return this.belegungsfehler;
	}

	/**
	 * Git zurück, ob ein "echter" Belegungsfehler vorliegt und nicht nur eine Warnung oder ein Hinweis.
	 *
	 * @return true, falls ein "echter" Belegungsfehler vorliegt.
	 */
	public hatBelegungsfehler() : boolean {
		for (const fehler of this.belegungsfehler) {
			if (!fehler.istInfo())
				return false;
		}
		return true;
	}

	/**
	 * Initialisiert die Daten für die Belegprüfungen mithilfe des Abiturdaten-Managers
	 */
	protected abstract init() : void;

	/**
	 * Führt alle Belegprüfungen für die EF.1 durch.
	 */
	protected abstract pruefeEF1() : void;

	/**
	 * Führt alle Belegprüfungen für die gesamte Oberstufe durch.
	 */
	protected abstract pruefeGesamt() : void;

	/**
	 * Gibt zurück, ob die angegebenen Belegprüfungsfehler einen "echten" Fehler beinhalten
	 * und nicht nur einen Hinweise / eine Information.
	 *
	 * @param alleFehler   die Belegprüfungsfehler und -informationen der durchgeführten Belegprüfungen
	 *
	 * @return true, falls kein "echter" Belegprüfungsfehler aufgetreten ist, sonst false
	 */
	public static istErfolgreich(alleFehler : List<GostBelegungsfehler>) : boolean {
		for (const fehler of alleFehler) {
			if (!fehler.istInfo())
				return false;
		}
		return true;
	}

	/**
	 * Liefert alle Belegprüfungsfehler der übergebenen Teil-Belegprüfungen zurück.
	 * Doppelte Fehler werden dabei nur einfach zurückgegeben (Set).
	 *
	 * @param pruefungen   die durchgeführten Belegprüfungen, deren Fehler zurückgegeben werden sollen.
	 *
	 * @return die Menge der Belegprüfungsfehler
	 */
	public static getBelegungsfehlerAlle(pruefungen : List<GostBelegpruefung>) : List<GostBelegungsfehler> {
		const fehler : ArrayList<GostBelegungsfehler> = new ArrayList<GostBelegungsfehler>();
		for (const pruefung of pruefungen) {
			fehler.addAll(pruefung.getBelegungsfehler());
		}
		return fehler;
	}

	transpilerCanonicalName(): string {
		return 'de.svws_nrw.core.abschluss.gost.GostBelegpruefung';
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.abschluss.gost.GostBelegpruefung'].includes(name);
	}

	public static class = new Class<GostBelegpruefung>('de.svws_nrw.core.abschluss.gost.GostBelegpruefung');

}

export function cast_de_svws_nrw_core_abschluss_gost_GostBelegpruefung(obj : unknown) : GostBelegpruefung {
	return obj as GostBelegpruefung;
}
