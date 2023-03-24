package de.nrw.schule.svws.core.kursblockung;

import java.util.Random;

import de.nrw.schule.svws.core.logger.Logger;
import jakarta.validation.constraints.NotNull;

/**
 * Dieser Kursverteilungs-Algorithmus verteilt die Kurse auf ihre Schienen, indem es die Kurslage zufällig verändert und
 * dabei versucht die Nichtwahlen zu minimieren. Die minimale Anzahl an Nichtwahlen wird mit einem
 * Bipartiten-Matching-Algorithmus berechnet.
 * 
 * @author Benjamin A. Bartsch
 */
public class KursblockungAlgorithmusKMatching2 extends KursblockungAlgorithmusK {
	/**
	 * Die Anzahl an Runden ohne Verbesserung, bevor es zum Abbruch kommt.
	 */
	private static final int MAX_RUNDEN_IN_FOLGE_OHNE_VERBESSERUNG = 2000;

	private final @NotNull KursblockungDynSchueler @NotNull [] schuelerAlle;

	/**
	 * Im Konstruktor kann die Klasse die jeweiligen Datenstrukturen aufbauen. Kurse dürfen in diese Methode noch nicht
	 * auf Schienen verteilt werden.
	 * 
	 * @param pRandom Ein {@link Random}-Objekt zur Steuerung des Zufalls über einen Anfangs-Seed.
	 * @param pLogger Logger für Benutzerhinweise, Warnungen und Fehler.
	 * @param pDynDat Die dynamischen Blockungsdaten.
	 */
	public KursblockungAlgorithmusKMatching2(final @NotNull Random pRandom, final @NotNull Logger pLogger,
			final @NotNull KursblockungDynDaten pDynDat) {
		super(pRandom, pLogger, pDynDat);
		schuelerAlle = dynDaten.gibSchuelerArray(false);
	}

	/**
	 * Der Algorithmus entfernt zunächst alle SuS aus ihren Kursen. Anschließend werden die Kurse zufällig verteilt.
	 * Anschließend verändert der Algorithmus die Lage eines zufälligen Kurses. Falls sich die Bewertung verschlechter,
	 * wird die Veränderung rückgängig gemacht.
	 */
	@Override
	public void berechne(final long pMaxTimeMillis) {
		// Keine Kurverteilung, wenn es keine freien Kurse gibt.
		if (dynDaten.gibKurseDieFreiSindAnzahl() == 0) {
			return;
		}

		// Startzeit speichern.
		final long timeStart = System.currentTimeMillis();

		// Entferne SuS aus den Kursen (vorsichtshalber wegen alter Berechnungen).
		dynDaten.aktionSchuelerAusAllenKursenEntfernen();

		// Verteile die Kurse beim ersten Start zufällig.
		dynDaten.aktionKurseFreieZufaelligVerteilen();

		// Speicherung des Start-Zustandes.
		dynDaten.aktionZustandSpeichernK();

		// Optimiere die Kurse. Bricht ab, wenn die Zeit vorbei ist, oder mehrfach keine Verbesserung erfolgt.
		int countKeineVerbesserung = 0;
		int runden = 0;
		do {
			runden++;
			countKeineVerbesserung = verteileKurse() ? 0 : countKeineVerbesserung + 1;
		} while ((countKeineVerbesserung < MAX_RUNDEN_IN_FOLGE_OHNE_VERBESSERUNG)
				&& (System.currentTimeMillis() - timeStart < pMaxTimeMillis));

		System.out.println("runden = " + runden);
	}

	/**
	 * Die Lage einiger Kurse wird verändert. Falls sich die Bewertung verschlechtert, wird die Veränderung rückgängig
	 * gemacht.
	 */
	private boolean verteileKurse() {
		// Ein 1-* Kurse wandern zufällig in eine andere Schiene.
		do {
			// Entferne SuS, sonst dürfen Kurse nicht die Schiene wechseln.
			dynDaten.aktionSchuelerAusAllenKursenEntfernen();

			// Einige wenige Kurse zufällig verteilen.
			dynDaten.aktionKursVerteilenEinenZufaelligenFreien();

			// SuS verteilen
			verteileSuS();

			// Besser? --> Speichern.
			final boolean b1 = (dynDaten.gibCompareZustandK_NW_KD_FW() > 0)
					&& (dynDaten.gibBewertungK_FW_NW_KD_JetztBesser() >= 0);
			final boolean b2 = (dynDaten.gibCompareZustandK_NW_KD_FW() >= 0)
					&& (dynDaten.gibBewertungK_FW_NW_KD_JetztBesser() > 0);
			if (b1 || b2) {
				dynDaten.aktionZustandSpeichernK();
				return true;
			}
		} while (_random.nextBoolean());

		// Schlechter
		dynDaten.aktionZustandLadenK();
		return false;
	}

	/**
	 * Verteilt die SuS. Multikurse der SuS werden zufällig verteilt, die anderen Kurse werden mit Hilfe eines
	 * Matching-Algorithmus verteilt.
	 */
	private void verteileSuS() {
		final @NotNull
		int[] perm = KursblockungStatic.gibPermutation(_random, schuelerAlle.length);

		for (int p = 0; p < perm.length; p++) {
			final int i = perm[p];
			final KursblockungDynSchueler schueler = schuelerAlle[i];
			schueler.aktionKurseVerteilenNurMultikurseZufaellig();
			schueler.aktionKurseVerteilenMitBipartiteMatching();
		}

	}

}
