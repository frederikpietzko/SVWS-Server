import { KursblockungAlgorithmusS, cast_de_svws_nrw_core_kursblockung_KursblockungAlgorithmusS } from '../../core/kursblockung/KursblockungAlgorithmusS';
import { KursblockungStatic } from '../../core/kursblockung/KursblockungStatic';
import { Random } from '../../java/util/Random';
import { KursblockungDynDaten } from '../../core/kursblockung/KursblockungDynDaten';
import { KursblockungDynSchueler } from '../../core/kursblockung/KursblockungDynSchueler';
import { Class } from '../../java/lang/Class';
import { Logger } from '../../core/logger/Logger';

export class KursblockungAlgorithmusSMatching extends KursblockungAlgorithmusS {

	/**
	 *  Die Anzahl an Runden ohne Verbesserung, bevor es zum Abbruch kommt.
	 */
	private static readonly MAX_RUNDEN_IN_FOLGE_OHNE_VERBESSERUNG : number = 20;

	/**
	 *  Array der SuS, deren Kurse verteilt werden sollen.
	 */
	private readonly schuelerArr : Array<KursblockungDynSchueler>;

	/**
	 *  Zur Speicherung einer zufälligen Permutation der Indizes der Schüler.
	 */
	private readonly perm : Array<number>;


	/**
	 * Im Konstruktor kann die Klasse die jeweiligen Datenstrukturen aufbauen. Kurse dürfen in diese Methode noch nicht
	 * auf Schienen verteilt werden.
	 *
	 * @param pRandom Ein {@link Random}-Objekt zur Steuerung des Zufalls über einen Anfangs-Seed.
	 * @param pLogger Logger zum Protokollieren von Warnungen und Fehlern.
	 * @param pDynDat Die dynamischen Blockungsdaten.
	 */
	public constructor(pRandom : Random, pLogger : Logger, pDynDat : KursblockungDynDaten) {
		super(pRandom, pLogger, pDynDat);
		this.schuelerArr = pDynDat.gibSchuelerArray(false);
		this.perm = KursblockungStatic.gibPermutation(this._random, this.schuelerArr.length);
	}

	/**
	 * Der Algorithmus verteilt die SuS auf ihre Kurse zufällig. Kommt es während des Verteilens zur Kollision, so wird
	 * der Kurs nicht gewählt.
	 */
	public berechne() : void {
		this.dynDaten.aktionSchuelerAusAllenKursenEntfernen();
		let countKeineVerbesserung : number = 0;
		do {
			countKeineVerbesserung = this.verteileAlleSchueler() ? 0 : (countKeineVerbesserung + 1);
		} while (countKeineVerbesserung < KursblockungAlgorithmusSMatching.MAX_RUNDEN_IN_FOLGE_OHNE_VERBESSERUNG);
	}

	/**
	 * Der Algorithmus verteilt alle SuS in zufälliger Reihenfolge erneut.
	 *
	 * @return TRUE, falls der Zustand sich verbessert hat.
	 */
	private verteileAlleSchueler() : boolean {
		let verbesserung : boolean = false;
		KursblockungStatic.aktionPermutiere(this._random, this.perm);
		for (let p : number = 0; p < this.schuelerArr.length; p++) {
			const i : number = this.perm[p];
			verbesserung = verbesserung || this.verteileEinenSchueler(this.schuelerArr[i]);
		}
		return verbesserung;
	}

	private verteileEinenSchueler(schueler : KursblockungDynSchueler) : boolean {
		this.dynDaten.gibStatistik().aktionBewertungSpeichernS();
		schueler.aktionZustandSpeichernS();
		schueler.aktionKurseAlleEntfernen();
		schueler.aktionKurseVerteilenNurFachartenMitEinemErlaubtenKurs();
		schueler.aktionKurseVerteilenNurMultikurseZufaellig();
		schueler.aktionKurseVerteilenMitBipartiteMatching();
		const cmp : number = this.dynDaten.gibStatistik().gibBewertungZustandS_NW_KD();
		if (cmp < 0)
			schueler.aktionZustandLadenS();
		return cmp > 0;
	}

	transpilerCanonicalName(): string {
		return 'de.svws_nrw.core.kursblockung.KursblockungAlgorithmusSMatching';
	}

	isTranspiledInstanceOf(name : string): boolean {
		return ['de.svws_nrw.core.kursblockung.KursblockungAlgorithmusS', 'de.svws_nrw.core.kursblockung.KursblockungAlgorithmusSMatching'].includes(name);
	}

	public static class = new Class<KursblockungAlgorithmusSMatching>('de.svws_nrw.core.kursblockung.KursblockungAlgorithmusSMatching');

}

export function cast_de_svws_nrw_core_kursblockung_KursblockungAlgorithmusSMatching(obj : unknown) : KursblockungAlgorithmusSMatching {
	return obj as KursblockungAlgorithmusSMatching;
}
