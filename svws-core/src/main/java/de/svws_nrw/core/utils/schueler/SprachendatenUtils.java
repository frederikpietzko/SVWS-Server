package de.svws_nrw.core.utils.schueler;

import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

import de.svws_nrw.core.data.schueler.Sprachbelegung;
import de.svws_nrw.core.data.schueler.Sprachendaten;
import de.svws_nrw.core.data.schueler.Sprachpruefung;
import de.svws_nrw.core.types.fach.Sprachpruefungniveau;

import java.util.Comparator;

import jakarta.validation.constraints.NotNull;


/**
 * Diese Klasse stellt Methoden zur Verfügung um Daten zur Sprachenfolge und den Sprachprüfungen zu
 * bearbeiten und Auswertungen durchzuführen.
 */
public final class SprachendatenUtils {

	private SprachendatenUtils() {
		throw new IllegalStateException("Instantiation not allowed");
	}

    /**
     * Prüft, ob eine unterrichtliche Belegung der übergebenen Sprache existiert.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param sprache   das einstellige Kürzel der Sprache
     *
     * @return true, falls eine Belegung existiert und ansonsten false
     */
    public static boolean hatSprachbelegung(final Sprachendaten sprachendaten, final String sprache) {

        if (sprachendaten == null || sprachendaten.belegungen == null || sprache == null || "".equals(sprache)) {
            return false;
        }

        return getSprachbelegung(sprachendaten, sprache) != null;
    }


    /**
     * Prüft, ob eine unterrichtliche Belegung der übergebenen Sprache in der Sekundarstufe I existiert.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param sprache   das einstellige Kürzel der Sprache
     *
     * @return true, falls eine Belegung existiert und ansonsten false
     */
    public static boolean hatSprachbelegungInSekI(final Sprachendaten sprachendaten, final String sprache) {

        if (sprachendaten == null || sprachendaten.belegungen == null || sprache == null || "".equals(sprache)) {
            return false;
        }

        final Sprachbelegung belegung = getSprachbelegung(sprachendaten, sprache);

        if (belegung != null && getJahrgangNumerisch(belegung.belegungVonJahrgang) > 0) {
            return getJahrgangNumerisch(belegung.belegungVonJahrgang) <= 10;
        }

        return false;
    }


    /**
     * Prüft, ob eine unterrichtliche Belegung der übergebenen Sprache in der Sekundarstufe I mit der angegebenen Belegungsdauer existiert.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param sprache das einstellige Kürzel der Sprache
     * @param mindestBelegdauer Zulässig sind Werte 1 bis 5 für die minimale Dauer der Sprachbelegung, damit die Sprache berücksichtigt wird.
     *
     * @return true, falls eine Belegung existiert und ansonsten false
     */
    public static boolean hatSprachbelegungInSekIMitDauer(final Sprachendaten sprachendaten, final String sprache, final Integer mindestBelegdauer) {

        if (sprachendaten == null || sprachendaten.belegungen == null || sprache == null || "".equals(sprache) || mindestBelegdauer == null || mindestBelegdauer <= 0) {
            return false;
        }

        final Sprachbelegung belegung = getSprachbelegung(sprachendaten, sprache);

        if (belegung == null) {
            return false;
        }

        int belegtVonJahrgangNumerisch;
        int belegtBisJahrgangNumerisch;
        int letzterJahrgangSekI;

        if (belegung.belegungVonJahrgang != null) {
            belegtVonJahrgangNumerisch = getJahrgangNumerisch(belegung.belegungVonJahrgang);
            belegtBisJahrgangNumerisch = getJahrgangNumerisch(belegung.belegungBisJahrgang);

            letzterJahrgangSekI = 10;
            if (belegtVonJahrgangNumerisch == 6 || belegtVonJahrgangNumerisch == 8) {
                // Es liegt eine Sprachbelegung aus G8 vor. Daher ist der letzte Jahrgang Sek-I die Klasse 9
                letzterJahrgangSekI = 9;
            }

            if (0 < belegtVonJahrgangNumerisch && belegtVonJahrgangNumerisch <= 10) {
                if (belegtBisJahrgangNumerisch == 0 || belegtBisJahrgangNumerisch > letzterJahrgangSekI) {
                    // Bei leerem Ende oder Ende in der Sekundarstufe II wähle als Ende den letzten Sek-I Jahrgang
                    belegtBisJahrgangNumerisch = letzterJahrgangSekI;
                }
                return ((belegtBisJahrgangNumerisch - belegtVonJahrgangNumerisch + 1) >= mindestBelegdauer);
            }
        }

        return false;
    }


    /**
     * Gibt die zu der übergebenen Sprache gehörende Sprachbelegung zurück.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param sprache   das einstellige Kürzel der Sprache
     *
     * @return die Sprachbelegung oder null, falls keine existiert
     */
    public static Sprachbelegung getSprachbelegung(final Sprachendaten sprachendaten, final String sprache) {

        if (sprachendaten == null || sprachendaten.belegungen == null || sprache == null || "".equals(sprache)) {
            return null;
        }

        final @NotNull List<@NotNull Sprachbelegung> belegungen = sprachendaten.belegungen;
        for (final Sprachbelegung belegung : belegungen) {
            if (sprache.equals(belegung.sprache)) {
                return belegung;
            }
        }

        return null;
    }


    /**
     * Liefert die Sprachen aus der Sprachenfolge zurück, deren Beginn im angegebenen Zeitraum liegt und die angegebene Dauer besitzt.
     * Dabei wird davon ausgegangen, dass Sprachen ohne Ende der Belegung am Ende der Sekundarstufe I belegt wurden.
     * Bei einem Schüler der Sek-II wird auch nur die Dauer der Belegung in der Sek-I betrachtet.
     * Sprachprüfungen werden nicht berücksichtigt.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param belegungbeginnStart Es werden nur Sprachen berücksichtigt, deren Belegungsbeginn größer oder gleich dem angegebenen ASDJahrgang ist.
     * @param belegungbeginnEnde Es werden nur Sprachen berücksichtigt, deren Belegungsbeginn kleiner oder gleich dem angegebenen ASDJahrgang ist.
     * @param mindestBelegdauer Zulässig sind Werte 1 bis 5 für die minimale Dauer der Sprachbelegung, damit die Sprache berücksichtigt wird.
     *
     * @return List mit Sprachbelegungen, die die Kriterien erfüllen. Die Liste ist nach Belegungsbeginn aufsteigend sortiert
     */
    public static @NotNull List<@NotNull Sprachbelegung> getSprachlegungenNachBeginnUndDauerEndeSekI(final Sprachendaten sprachendaten, final String belegungbeginnStart, final String belegungbeginnEnde, final Integer mindestBelegdauer) {

        final @NotNull List<@NotNull Sprachbelegung> belegungen = new ArrayList<>();

        if (sprachendaten != null && sprachendaten.belegungen != null
            && belegungbeginnStart != null && !belegungbeginnStart.equals("")
            && belegungbeginnEnde != null && !belegungbeginnEnde.equals("")
            && mindestBelegdauer != null && mindestBelegdauer >= 0) {

            int belegtVonJahrgangNumerisch;
            int belegtBisJahrgangNumerisch;
            int letzterJahrgangSekI;
            final HashSet<String> gefundeneSprachen = new HashSet<>();

            final @NotNull List<@NotNull Sprachbelegung> alleBelegungen = sprachendaten.belegungen;
            for (final Sprachbelegung belegung : alleBelegungen) {
                if (belegung.belegungVonJahrgang != null) {
                    belegtVonJahrgangNumerisch = getJahrgangNumerisch(belegung.belegungVonJahrgang);
                    belegtBisJahrgangNumerisch = getJahrgangNumerisch(belegung.belegungBisJahrgang);

                    letzterJahrgangSekI = 10;
                    if (belegtVonJahrgangNumerisch == 6 || belegtVonJahrgangNumerisch == 8) {
                        // Es liegt eine Sprachbelegung aus G8 vor. Daher ist der letzte Jahrgang Sek-I die Klasse 9
                        letzterJahrgangSekI = 9;
                    }

                    if (belegtVonJahrgangNumerisch > 0 && getJahrgangNumerisch(belegungbeginnStart) <= belegtVonJahrgangNumerisch  && belegtVonJahrgangNumerisch <= getJahrgangNumerisch(belegungbeginnEnde)) {
                        if (belegtBisJahrgangNumerisch == 0 || belegtBisJahrgangNumerisch > letzterJahrgangSekI) {
                            // Bei leerem Ende oder Ende in der Sekundarstufe II wähle als Ende den letzten Sek-I Jahrgang
                            belegtBisJahrgangNumerisch = letzterJahrgangSekI;
                        }
                        if ((belegtBisJahrgangNumerisch - belegtVonJahrgangNumerisch + 1) >= mindestBelegdauer) {
                            // Eintragungen evtl. Doppelungen vermeiden
                            if (!gefundeneSprachen.contains(belegung.sprache)) {
                                belegungen.add(belegung);
                            }
                            gefundeneSprachen.add(belegung.sprache);
                        }
                    }
                }
            }
        }
        if (!belegungen.isEmpty()) {
        	final Comparator<@NotNull Sprachbelegung> comparator = (final @NotNull Sprachbelegung a, final @NotNull Sprachbelegung b) -> Integer.compare(getJahrgangNumerisch(a.belegungVonJahrgang), getJahrgangNumerisch(b.belegungVonJahrgang));
            belegungen.sort(comparator);
        }
        return belegungen;
    }


    /**
     * Prüft, ob die übergebene Sprache als eine fortgeführte Fremdsprache in der gymnasialen Oberstufe
     * gemäß APO-GOSt ab EF belegt werden kann. Dazu zählen alle belegten Sprachen mit mind. 2 Jahren Belegung in Sek-I
     * sowie Sprachen aus bestimmten Sprachprüfungen.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     * @param sprache das einstellige Kürzel der Sprache
     *
     * @return true, falls die Sprache als fortgeführte Fremdsprache als EF belegt werden kann, andernfalls false
     */
    public static boolean istFortfuehrbareSpracheInGOSt(final Sprachendaten sprachendaten, final String sprache) {

        if (sprachendaten == null || sprache == null || "".equals(sprache)) {
            return false;
        }

        if (hatSprachbelegungInSekIMitDauer(sprachendaten, sprache, 2)) {
            return true;
        }

        // Sofern bisher keine fortgeführte Fremdsprache zur übergebenen Sprache gefunden wurde,
        // durchsuche nun die Sprachprüfungen.
        final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
        if (pruefungen != null) {
            for (final Sprachpruefung pruefung : pruefungen) {

                // Prüfe, ob die Sprachprüfung, die gesuchte Sprache hat bzw. diese ersetzen kann
                if (!sprache.equals(pruefung.sprache) && !sprache.equals(pruefung.ersetzteSprache)) {
                    continue;
                }

                // Prüfe auf erfolgreiche HSU Prüfung auf HA10/MSA-Niveau
                if (pruefung.istHSUPruefung && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4)) {
                    return true;
                }

                // Prüfe auf erfolgreiche Feststellungsprüfung auf HA10/MSA-Niveau
                if (pruefung.istFeststellungspruefung  && (pruefung.note != null) && (pruefung.note <= 4)
                    && ((pruefung.kannBelegungAlsFortgefuehrteSpracheErlauben && pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id)
                         || ((pruefung.kannErstePflichtfremdspracheErsetzen || pruefung.kannZweitePflichtfremdspracheErsetzen || pruefung.kannWahlpflichtfremdspracheErsetzen) && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id)))) {
                    return true;
                }
            }
        }

        return false;
    }



    /**
     * Sammelt alle Sprachen, die in der GOSt als fortgeführte Sprachen belegt werden können, sei
     * es aufgrund einer Belegung von mindestens zwei Jahren oder aufgrund einer Sprachprüfung.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return Liste alle Sprachen, die in der GOSt fortgeführt werden können.
     */
    public static @NotNull List<@NotNull String> getFortfuehrbareSprachenInGOSt(final Sprachendaten sprachendaten) {

    	final @NotNull List<@NotNull String> sprachen = new ArrayList<>();

        // Sammle die Sprachen mit einer Belegung von mindestens zwei Jahren
        if (sprachendaten != null) {
            final @NotNull List<@NotNull Sprachbelegung> belegungen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "05", "10", 2);

            for (final Sprachbelegung belegung : belegungen) {
                sprachen.add(belegung.sprache);
            }

            // Ergänze evtl. vorhandene Sprachprüfungen, die die Fortführung in der Oberstufe ermöglichen
            final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
            if (pruefungen != null) {
                for (final Sprachpruefung pruefung : pruefungen) {

                    // Prüfe auf erfolgreiche HSU Prüfung auf HA10/MSA-Niveau
                    if (pruefung.istHSUPruefung && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4)) {
						if (!(pruefung.ersetzteSprache == null || pruefung.ersetzteSprache.equals(""))) {
							sprachen.add(pruefung.ersetzteSprache);
						} else if (!(pruefung.sprache == null || pruefung.sprache.equals(""))) {
							sprachen.add(pruefung.sprache);
						}
                    }

                    // Prüfe auf erfolgreiche Feststellungsprüfung auf HA10/MSA-Niveau
                    if (pruefung.istFeststellungspruefung  && (pruefung.note != null) && (pruefung.note <= 4)
                        && ((pruefung.kannBelegungAlsFortgefuehrteSpracheErlauben && pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id)
                        || ((pruefung.kannErstePflichtfremdspracheErsetzen || pruefung.kannZweitePflichtfremdspracheErsetzen || pruefung.kannWahlpflichtfremdspracheErsetzen) && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id)))) {
						if (!(pruefung.ersetzteSprache == null || pruefung.ersetzteSprache.equals(""))) {
							sprachen.add(pruefung.ersetzteSprache);
						} else if (!(pruefung.sprache == null || pruefung.sprache.equals(""))) {
							sprachen.add(pruefung.sprache);
						}
                    }
                }
            }
        }

        return sprachen;
    }


    /**
     * Prüft für den Zeitpunkt Ende Sek-I, ob eine Fremdsprache im Umfang von mindestens 4 Jahren belegt wurde.
     * Dabei wird davon ausgegangen, dass Sprachen ohne Ende der Belegung am Ende der Sekundarstufe I belegt wurden.
     * Ist dies in der Sprachenfolge nicht der Fall, werden zusätzlich evtl. Sprachprüfungen herangezogen.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return true, falls der Nachweis gemäß der aktuellen Sprachdaten erfüllt ist, andernfalls false.
     */
    public static boolean hatEineSpracheMitMin4JahrenDauerEndeSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return false;

        // Alle Sprachen, die bis einschließlich Klasse 7 gestartet werden, erfüllen die Bedingung von mindestens 4 Jahren Dauer, wenn sie nicht vorher abgewählt werden konnten.
        // Im Gymnasium G8 gibt es keinen Beginn in der Klasse 7, aber die Bedingung wird durch den Beginn in Stufe 6 ebenfalls erfüllt.
        final int anzahlSprachen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "05", "07", 4).size();
        if (anzahlSprachen >= 1)
            return true;

        // Sofern bisher keine fortgeführte Fremdsprache gefunden wurde, durchsuche nun die Sprachprüfungen.
        final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
        if (pruefungen != null) {
            for (final Sprachpruefung pruefung : pruefungen) {
                // Prüfe auf erfolgreiche Feststellungsprüfung auf HA10/MSA-Niveau, die eine vierjährige Sprachen ersetzen kann
                if (pruefung.istFeststellungspruefung && (pruefung.kannErstePflichtfremdspracheErsetzen || pruefung.kannZweitePflichtfremdspracheErsetzen || pruefung.kannWahlpflichtfremdspracheErsetzen) && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4))
                    return true;
            }
        }
        return false;
    }


    /**
     * Prüft für den Zeitpunkt Ende Sek-I, ob eine zweite Fremdsprache im Umfang von mindestens 4 Jahren belegt wurde.
     * Dabei wird davon ausgegangen, dass Sprachen ohne Ende der Belegung am Ende der Sekundarstufe I belegt wurden.
     * Ist dies in der Sprachenfolge nicht der Fall, werden zusätzlich evtl. Sprachprüfungen herangezogen.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return true, falls der Nachweis gemäß der aktuellen Sprachdaten erfüllt ist, andernfalls false.
     */
    public static boolean hatZweiSprachenMitMin4JahrenDauerEndeSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return false;

        // Alle Sprachen, die bis einschließlich Klasse 7 gestartet werden, erfüllen die Bedingung von mindestens 4 Jahren Dauer, wenn sie nicht vorher abgewählt werden konnten.
        // Im Gymnasium G8 gibt es keinen Beginn in der Klasse 7, aber die Bedingung wird durch den Beginn in Stufe 6 ebenfalls erfüllt.
        final @NotNull List<@NotNull Sprachbelegung> belegungen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "05", "07", 4);
        final int anzahlSprachen = belegungen.size();
        if (anzahlSprachen >= 2)
            return true;

        // Sofern bisher keine oder nur eine fortgeführte Fremdsprache gefunden wurde, durchsuche nun die Sprachprüfungen.
        if (anzahlSprachen == 1) {
            final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
            if (pruefungen != null) {
                for (final Sprachpruefung pruefung : pruefungen) {
                    // Prüfe auf erfolgreiche Feststellungsprüfung auf HA10/MSA-Niveau, die eine vierjährige Sprachen ersetzen kann
                    if ((pruefung.istFeststellungspruefung && (pruefung.kannErstePflichtfremdspracheErsetzen || pruefung.kannZweitePflichtfremdspracheErsetzen || pruefung.kannWahlpflichtfremdspracheErsetzen) && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4))
                        	&& (!belegungen.get(0).sprache.equals(pruefung.sprache))) // Evtl. doppelte Eintragungen bei Belegung und Prüfung abfangen
                    	return true;
                }
            }
        }

        // Da nur eine Sprache mit einer Prüfung ersetzt werden kann, erfolgt bei anzahlSprachen == 0 die Rückgabe false.
        return false;
    }


    /**
     * Prüft für den Zeitpunkt Ende Sek-I, ob eine Fremdsprache ab Kasse 8/9 im Umfang von mindestens 2 Jahren belegt wurde.
     * Dabei wird davon ausgegangen, dass Sprachen ohne Ende der Belegung am Ende der Sekundarstufe I belegt wurden.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return true, falls der Nachweis gemäß der aktuellen Sprachdaten erfüllt ist, andernfalls false.
     */
    public static boolean hatSpracheMit2JahrenDauerEndeSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return false;
        final int anzahlSprachen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "08", "10", 2).size();
        return (anzahlSprachen >= 1);
        // Sofern bisher keine fortgeführte Fremdsprache gefunden wurde, müssen die Sprachprüfungen nicht durchsucht werden,
        // da Sprachfeststellungsprüfungen nur erste und zweite Sprachen (also Klasse 05 bis 07) ersetzen können.
    }


    /**
     * Prüft, ob eine Sprachfeststellungsprüfung auf dem Niveau der Einführungsphase (EF) der GOSt vorliegt.
     * Nach §11 (2) APO-GOSt setzt das eine Prüfung in der gleichen Sprache am Ende der Sek-I voraus
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return true, falls entsprechende Sprachprüfungen vorhanden sind, andernfalls false.
     */
    public static boolean hatSprachfeststellungspruefungAufEFNiveau(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return false;

        // Sofern bisher keine fortgeführte Fremdsprache gefunden wurde, durchsuche nun die Sprachprüfungen.
        final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
        if (pruefungen != null) {
            for (final Sprachpruefung pruefungS1 : pruefungen) {
                // Prüfe auf erfolgreiche Feststellungsprüfung auf HA10/MSA-Niveau
                if (pruefungS1.istFeststellungspruefung && (pruefungS1.kannErstePflichtfremdspracheErsetzen || pruefungS1.kannZweitePflichtfremdspracheErsetzen || pruefungS1.kannWahlpflichtfremdspracheErsetzen) && (pruefungS1.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefungS1.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefungS1.note != null) && (pruefungS1.note <= 4)) {
                    for (final Sprachpruefung pruefungEF : pruefungen) {
                        // Prüfe auf erfolgreiche Feststellungsprüfung auf EF-Niveau zur gefundenen Prüfungssprache
                        if (pruefungEF.istFeststellungspruefung && pruefungEF.ersetzteSprache.equals(pruefungS1.ersetzteSprache) && (pruefungEF.kannErstePflichtfremdspracheErsetzen || pruefungEF.kannZweitePflichtfremdspracheErsetzen || pruefungEF.kannWahlpflichtfremdspracheErsetzen) && pruefungEF.anspruchsniveauId == Sprachpruefungniveau.EF.daten.id && (pruefungEF.note != null) && (pruefungEF.note <= 4))
                            return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Gibt die Fremdsprache zurück, die als erste Fremdsprache der Sekundarstufe I gewertet werden kann.
     * Im Falle einer Sprachprüfung als erste Pflichtfremdsprache wird diese mit der als Ersatz eingetragene Fremdsprache zurückgegeben.
     * Ist keine Sprachprüfung als erste Pflichtfremdsprache vorhanden, so wird die als erste Sprache in der Sekundarstufe I belegt
     * Sprache zurückgegeben, unabhängig von deren Belegdauer.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return Die erste belegte Sprache (gemäß Belegung oder Prüfung) oder null, falls keine existiert
     */
    public static String getErsteSpracheInSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return null;

        final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
        if (pruefungen != null) {
            for (final Sprachpruefung pruefung : pruefungen) {
                if (pruefung.istFeststellungspruefung && pruefung.kannErstePflichtfremdspracheErsetzen && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4))
                    return pruefung.ersetzteSprache;
            }
        }

        final @NotNull List<@NotNull Sprachbelegung> belegungen = sprachendaten.belegungen;
        if (belegungen != null) {
            // Wähle alle Sprachen mit Beginn in der Sekundarstufe I aus
            final @NotNull List<@NotNull Sprachbelegung> sprachbelegungen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "05", "10", 0);
            if (!sprachbelegungen.isEmpty())
                return sprachbelegungen.get(0).sprache;
        }
        return null;
    }


    /**
     * Gibt die Fremdsprache zurück, die als zweite Fremdsprache der Sekundarstufe I gewertet werden kann.
     * Im Falle einer Sprachprüfung als zweite Pflichtfremdsprache bzw. WP-Sprache wird diese mit der als Ersatz eingetragene Fremdsprache zurückgegeben.
     * Ist keine Sprachprüfung als zweite Pflichtfremdsprache bzw. WP-Sprache vorhanden, so wird die als zweite Sprache in der Sekundarstufe I belegt
     * Sprache zurückgegeben, unabhängig von deren Belegdauer.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return Die zweite belegte Sprache (gemäß Belegung oder Prüfung) oder null, falls keine existiert
     */
    public static String getZweiteSpracheInSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return null;

        String pruefungErsteSprache = "";
        String pruefungZweiteSprache = "";
        final @NotNull List<@NotNull Sprachpruefung> pruefungen = sprachendaten.pruefungen;
        if (pruefungen != null) {
            for (final Sprachpruefung pruefung : pruefungen) {
                if (pruefung.istFeststellungspruefung && pruefung.kannErstePflichtfremdspracheErsetzen && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4)) {
                    pruefungErsteSprache = pruefung.ersetzteSprache;
                }
                if (pruefung.istFeststellungspruefung && (pruefung.kannZweitePflichtfremdspracheErsetzen || pruefung.kannWahlpflichtfremdspracheErsetzen) && (pruefung.anspruchsniveauId == Sprachpruefungniveau.HA10.daten.id || pruefung.anspruchsniveauId == Sprachpruefungniveau.MSA.daten.id) && (pruefung.note != null) && (pruefung.note <= 4)) {
                    pruefungZweiteSprache = pruefung.ersetzteSprache;
                }
            }
        }
        if (!pruefungZweiteSprache.equals(""))
            return pruefungZweiteSprache;

        final @NotNull List<@NotNull Sprachbelegung> belegungen = sprachendaten.belegungen;
        if (belegungen != null) {
            // Wähle alle Sprachen mit Beginn in der Sekundarstufe I aus
        	final @NotNull List<@NotNull Sprachbelegung> sprachbelegungen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "05", "10", 0);

            if (!pruefungErsteSprache.equals("")) {
                // Eine Prüfung für die erste Fremdsprache ist vorhanden, daher muss die erste Sprache in der Sprachenfolge ungleich der Prüfungssprache die zweite Fremdsprache sein.
                for (final Sprachbelegung sprachbelegung : sprachbelegungen) {
                    if (!sprachbelegung.sprache.equals(pruefungErsteSprache))
                        return sprachbelegung.sprache;
                }
            } else {
                // Keine Prüfung für die Fremdsprachen vorhanden, daher muss die zweite Sprache in der Sprachenfolge die zweite Fremdsprache sein.
                if (sprachbelegungen.size() > 1)
                    return sprachbelegungen.get(1).sprache;
            }
        }
        return null;
    }


    /**
     * Ermittelt, ob eine Fremdsprache ab Kasse 8/9 im Umfang von mindestens 2 Jahren belegt wurde und gibt sie zurück
     * Dabei wird davon ausgegangen, dass Sprachen ohne Ende der Belegung am Ende der Sekundarstufe I belegt wurden.
     *
     * @param sprachendaten die Sprachendaten mit Sprachbelegungen und Sprachprüfungen
     *
     * @return Sprache, falls eine Belegung vorhanden ist, sonst null
     */
    public static String getSpracheMit2JahrenDauerEndeSekI(final Sprachendaten sprachendaten) {
        if (sprachendaten == null)
            return null;

        final @NotNull List<@NotNull Sprachbelegung> belegungen = sprachendaten.belegungen;
        if (belegungen != null) {
            // Wähle alle Sprachen mit Beginn in der Sekundarstufe I aus, die in Klassen 8, 9 oder 10 begonnen wurden.
        	final @NotNull List<@NotNull Sprachbelegung> sprachbelegungen = getSprachlegungenNachBeginnUndDauerEndeSekI(sprachendaten, "08", "10", 2);
            if (!sprachbelegungen.isEmpty())
                return sprachbelegungen.get(0).sprache;
        }
        // Sofern bisher keine fortgeführte Fremdsprache gefunden wurde, müssen die Sprachprüfungen nicht durchsucht werden,
        // da Sprachfeststellungsprüfungen nur erste und zweite Sprachen (also Klasse 05 bis 07) ersetzen können.
        return null;
    }


    /**
     * Hilfsfunktion, die einen ASDJahrgang nach APO-SI und APO-GOSt und in einen numerischen Wert für Vergleiche umwandelt.
     * Dabei wird EF zu 11, Q1 zu 12 und Q2 zu 13. Die übrigen Stufen werden gemäß ihrer numerischen Stufenangaben umgewandelt.
     *
     * @param kuerzelJg   der in den mumerischen Wert umzuwandelnde ASDJahrgang.
     *
     * @return Wert des ASDJahrgangs zwischen 5 und 13, wenn dieser nicht bestimmt werden kann, wird der Wert 0 zurückgegeben.
     */
    private static int getJahrgangNumerisch(final String kuerzelJg) {
        if (kuerzelJg == null || kuerzelJg.equals(""))
            return 0;
        switch (kuerzelJg) {
            case "EF":
                return 11;
            case "Q1":
                return 12;
            case "Q2":
                return 13;
            default:
                try {
                    return Integer.parseInt(kuerzelJg);
                } catch (@SuppressWarnings("unused") final NumberFormatException e) {
                    return 0;
                }
        }
    }

}
