export { ApiSchema } from './api/ApiSchema';
export { ApiServer } from './api/ApiServer';
export { ApiServerAlgorithmen } from './api/ApiServerAlgorithmen';
export { BaseApi } from './api/BaseApi';
export { OpenApiError } from './api/OpenApiError';
export { Service } from './core/Service';
export { SprachendatenManager } from './core/SprachendatenManager';
export { AbschlussManager } from './core/abschluss/AbschlussManager';
export { AbschlussManagerBerufsbildend } from './core/abschluss/AbschlussManagerBerufsbildend';
export { BKAnlageA01Abschluss } from './core/abschluss/bk/a/BKAnlageA01Abschluss';
export { BKAnlageAFach } from './core/abschluss/bk/a/BKAnlageAFach';
export { BKAnlageAFaecher } from './core/abschluss/bk/a/BKAnlageAFaecher';
export { AbschlussFaecherGruppe } from './core/abschluss/ge/AbschlussFaecherGruppe';
export { AbschlussFaecherGruppen } from './core/abschluss/ge/AbschlussFaecherGruppen';
export { ServiceAbschlussHA10 } from './core/abschluss/ge/ServiceAbschlussHA10';
export { ServiceAbschlussHA9 } from './core/abschluss/ge/ServiceAbschlussHA9';
export { ServiceAbschlussMSA } from './core/abschluss/ge/ServiceAbschlussMSA';
export { ServiceBerechtigungMSAQ } from './core/abschluss/ge/ServiceBerechtigungMSAQ';
export { ServicePrognose } from './core/abschluss/ge/ServicePrognose';
export { AbiturdatenManager } from './core/abschluss/gost/AbiturdatenManager';
export { GostBelegpruefung } from './core/abschluss/gost/GostBelegpruefung';
export { GostBelegpruefungErgebnis } from './core/abschluss/gost/GostBelegpruefungErgebnis';
export { GostBelegpruefungErgebnisFehler } from './core/abschluss/gost/GostBelegpruefungErgebnisFehler';
export { GostBelegpruefungsArt } from './core/abschluss/gost/GostBelegpruefungsArt';
export { GostBelegungsfehler } from './core/abschluss/gost/GostBelegungsfehler';
export { GostBelegungsfehlerArt } from './core/abschluss/gost/GostBelegungsfehlerArt';
export { GostFachManager } from './core/abschluss/gost/GostFachManager';
export { AbiturBlockIMarkierAlgorithmus } from './core/abschluss/gost/abitur/services/AbiturBlockIMarkierAlgorithmus';
export { AbiturBlockIMarkierPruefung } from './core/abschluss/gost/abitur/services/AbiturBlockIMarkierPruefung';
export { AbiFaecher } from './core/abschluss/gost/belegpruefung/AbiFaecher';
export { Allgemeines } from './core/abschluss/gost/belegpruefung/Allgemeines';
export { Deutsch } from './core/abschluss/gost/belegpruefung/Deutsch';
export { Fremdsprachen } from './core/abschluss/gost/belegpruefung/Fremdsprachen';
export { GesellschaftswissenschaftenUndReligion } from './core/abschluss/gost/belegpruefung/GesellschaftswissenschaftenUndReligion';
export { KurszahlenUndWochenstunden } from './core/abschluss/gost/belegpruefung/KurszahlenUndWochenstunden';
export { Latinum } from './core/abschluss/gost/belegpruefung/Latinum';
export { LiterarischKuenstlerisch } from './core/abschluss/gost/belegpruefung/LiterarischKuenstlerisch';
export { Mathematik } from './core/abschluss/gost/belegpruefung/Mathematik';
export { Naturwissenschaften } from './core/abschluss/gost/belegpruefung/Naturwissenschaften';
export { Projektkurse } from './core/abschluss/gost/belegpruefung/Projektkurse';
export { Schwerpunkt } from './core/abschluss/gost/belegpruefung/Schwerpunkt';
export { Sport } from './core/abschluss/gost/belegpruefung/Sport';
export { Pair } from './core/adt/Pair';
export { LinkedCollection } from './core/adt/collection/LinkedCollection';
export { LinkedCollectionDescendingIterator } from './core/adt/collection/LinkedCollectionDescendingIterator';
export { LinkedCollectionElement } from './core/adt/collection/LinkedCollectionElement';
export { LinkedCollectionIterator } from './core/adt/collection/LinkedCollectionIterator';
export { AVLMap } from './core/adt/map/AVLMap';
export { AVLMapIntervall } from './core/adt/map/AVLMapIntervall';
export { AVLMapNode } from './core/adt/map/AVLMapNode';
export { AVLMapSubCollection } from './core/adt/map/AVLMapSubCollection';
export { AVLMapSubCollectionIterator } from './core/adt/map/AVLMapSubCollectionIterator';
export { AVLMapSubEntrySet } from './core/adt/map/AVLMapSubEntrySet';
export { AVLMapSubEntrySetIterator } from './core/adt/map/AVLMapSubEntrySetIterator';
export { AVLMapSubKeySet } from './core/adt/map/AVLMapSubKeySet';
export { AVLMapSubKeySetIterator } from './core/adt/map/AVLMapSubKeySetIterator';
export { AVLMapSubMap } from './core/adt/map/AVLMapSubMap';
export { AVLSet } from './core/adt/set/AVLSet';
export { MinHeap } from './core/adt/tree/MinHeap';
export { MinHeapIterator } from './core/adt/tree/MinHeapIterator';
export { BenutzerKennwort } from './core/data/BenutzerKennwort';
export { SimpleOperationResponse } from './core/data/SimpleOperationResponse';
export { Sprachbelegung } from './core/data/Sprachbelegung';
export { Sprachendaten } from './core/data/Sprachendaten';
export { Sprachpruefung } from './core/data/Sprachpruefung';
export { AbschlussErgebnis } from './core/data/abschluss/AbschlussErgebnis';
export { AbschlussErgebnisBerufsbildend } from './core/data/abschluss/AbschlussErgebnisBerufsbildend';
export { GEAbschlussFach } from './core/data/abschluss/GEAbschlussFach';
export { GEAbschlussFaecher } from './core/data/abschluss/GEAbschlussFaecher';
export { Adressbuch } from './core/data/adressbuch/Adressbuch';
export { AdressbuchEintrag } from './core/data/adressbuch/AdressbuchEintrag';
export { AdressbuchKontakt } from './core/data/adressbuch/AdressbuchKontakt';
export { AdressbuchKontaktListe } from './core/data/adressbuch/AdressbuchKontaktListe';
export { Telefonnummer } from './core/data/adressbuch/Telefonnummer';
export { BenutzerDaten } from './core/data/benutzer/BenutzerDaten';
export { BenutzerKompetenzGruppenKatalogEintrag } from './core/data/benutzer/BenutzerKompetenzGruppenKatalogEintrag';
export { BenutzerKompetenzKatalogEintrag } from './core/data/benutzer/BenutzerKompetenzKatalogEintrag';
export { BenutzerListeEintrag } from './core/data/benutzer/BenutzerListeEintrag';
export { BenutzergruppeDaten } from './core/data/benutzer/BenutzergruppeDaten';
export { BenutzergruppeListeEintrag } from './core/data/benutzer/BenutzergruppeListeEintrag';
export { BetriebAnsprechpartner } from './core/data/betrieb/BetriebAnsprechpartner';
export { BetriebListeEintrag } from './core/data/betrieb/BetriebListeEintrag';
export { BetriebStammdaten } from './core/data/betrieb/BetriebStammdaten';
export { DBSchemaListeEintrag } from './core/data/db/DBSchemaListeEintrag';
export { SchemaListeEintrag } from './core/data/db/SchemaListeEintrag';
export { ENMBKAbschluss } from './core/data/enm/ENMBKAbschluss';
export { ENMBKFach } from './core/data/enm/ENMBKFach';
export { ENMDaten } from './core/data/enm/ENMDaten';
export { ENMFach } from './core/data/enm/ENMFach';
export { ENMFloskel } from './core/data/enm/ENMFloskel';
export { ENMFloskelgruppe } from './core/data/enm/ENMFloskelgruppe';
export { ENMFoerderschwerpunkt } from './core/data/enm/ENMFoerderschwerpunkt';
export { ENMJahrgang } from './core/data/enm/ENMJahrgang';
export { ENMKlasse } from './core/data/enm/ENMKlasse';
export { ENMLehrer } from './core/data/enm/ENMLehrer';
export { ENMLeistung } from './core/data/enm/ENMLeistung';
export { ENMLeistungBemerkungen } from './core/data/enm/ENMLeistungBemerkungen';
export { ENMLernabschnitt } from './core/data/enm/ENMLernabschnitt';
export { ENMLerngruppe } from './core/data/enm/ENMLerngruppe';
export { ENMNote } from './core/data/enm/ENMNote';
export { ENMSchueler } from './core/data/enm/ENMSchueler';
export { ENMSprachenfolge } from './core/data/enm/ENMSprachenfolge';
export { ENMTeilleistung } from './core/data/enm/ENMTeilleistung';
export { ENMTeilleistungsart } from './core/data/enm/ENMTeilleistungsart';
export { ENMZP10 } from './core/data/enm/ENMZP10';
export { ErzieherListeEintrag } from './core/data/erzieher/ErzieherListeEintrag';
export { ErzieherStammdaten } from './core/data/erzieher/ErzieherStammdaten';
export { Erzieherart } from './core/data/erzieher/Erzieherart';
export { FachDaten } from './core/data/fach/FachDaten';
export { FachKatalogEintrag } from './core/data/fach/FachKatalogEintrag';
export { FaecherListeEintrag } from './core/data/fach/FaecherListeEintrag';
export { AbiturFachbelegung } from './core/data/gost/AbiturFachbelegung';
export { AbiturFachbelegungHalbjahr } from './core/data/gost/AbiturFachbelegungHalbjahr';
export { AbiturKursMarkierung } from './core/data/gost/AbiturKursMarkierung';
export { Abiturdaten } from './core/data/gost/Abiturdaten';
export { GostBelegpruefungsdaten } from './core/data/gost/GostBelegpruefungsdaten';
export { GostBeratungslehrer } from './core/data/gost/GostBeratungslehrer';
export { GostBlockungKurs } from './core/data/gost/GostBlockungKurs';
export { GostBlockungListeneintrag } from './core/data/gost/GostBlockungListeneintrag';
export { GostBlockungRegel } from './core/data/gost/GostBlockungRegel';
export { GostBlockungSchiene } from './core/data/gost/GostBlockungSchiene';
export { GostBlockungsdaten } from './core/data/gost/GostBlockungsdaten';
export { GostBlockungsergebnis } from './core/data/gost/GostBlockungsergebnis';
export { GostBlockungsergebnisBewertung } from './core/data/gost/GostBlockungsergebnisBewertung';
export { GostBlockungsergebnisKurs } from './core/data/gost/GostBlockungsergebnisKurs';
export { GostBlockungsergebnisListeneintrag } from './core/data/gost/GostBlockungsergebnisListeneintrag';
export { GostBlockungsergebnisSchiene } from './core/data/gost/GostBlockungsergebnisSchiene';
export { GostBlockungsergebnisSchuelerzuordnung } from './core/data/gost/GostBlockungsergebnisSchuelerzuordnung';
export { GostFach } from './core/data/gost/GostFach';
export { GostFachwahl } from './core/data/gost/GostFachwahl';
export { GostJahrgang } from './core/data/gost/GostJahrgang';
export { GostJahrgangsdaten } from './core/data/gost/GostJahrgangsdaten';
export { GostLeistungen } from './core/data/gost/GostLeistungen';
export { GostLeistungenFachbelegung } from './core/data/gost/GostLeistungenFachbelegung';
export { GostLeistungenFachwahl } from './core/data/gost/GostLeistungenFachwahl';
export { GostSchuelerFachwahl } from './core/data/gost/GostSchuelerFachwahl';
export { GostStatistikFachwahl } from './core/data/gost/GostStatistikFachwahl';
export { GostStatistikFachwahlHalbjahr } from './core/data/gost/GostStatistikFachwahlHalbjahr';
export { JahrgangsDaten } from './core/data/jahrgang/JahrgangsDaten';
export { JahrgangsKatalogEintrag } from './core/data/jahrgang/JahrgangsKatalogEintrag';
export { JahrgangsKatalogEintragBezeichnung } from './core/data/jahrgang/JahrgangsKatalogEintragBezeichnung';
export { JahrgangsListeEintrag } from './core/data/jahrgang/JahrgangsListeEintrag';
export { KatalogEintrag } from './core/data/kataloge/KatalogEintrag';
export { KatalogEintragStrassen } from './core/data/kataloge/KatalogEintragStrassen';
export { OrtKatalogEintrag } from './core/data/kataloge/OrtKatalogEintrag';
export { OrtsteilKatalogEintrag } from './core/data/kataloge/OrtsteilKatalogEintrag';
export { KlassenDaten } from './core/data/klassen/KlassenDaten';
export { KlassenListeEintrag } from './core/data/klassen/KlassenListeEintrag';
export { KlassenartKatalogEintrag } from './core/data/klassen/KlassenartKatalogEintrag';
export { KlausurblockungSchienenInput } from './core/data/klausurblockung/KlausurblockungSchienenInput';
export { KlausurblockungSchienenInputSchueler } from './core/data/klausurblockung/KlausurblockungSchienenInputSchueler';
export { KlausurblockungSchienenOutput } from './core/data/klausurblockung/KlausurblockungSchienenOutput';
export { KlausurblockungSchienenOutputKlausur } from './core/data/klausurblockung/KlausurblockungSchienenOutputKlausur';
export { KlausurblockungSchienenOutputs } from './core/data/klausurblockung/KlausurblockungSchienenOutputs';
export { KursblockungInput } from './core/data/kursblockung/KursblockungInput';
export { KursblockungInputFach } from './core/data/kursblockung/KursblockungInputFach';
export { KursblockungInputFachwahl } from './core/data/kursblockung/KursblockungInputFachwahl';
export { KursblockungInputKurs } from './core/data/kursblockung/KursblockungInputKurs';
export { KursblockungInputKursart } from './core/data/kursblockung/KursblockungInputKursart';
export { KursblockungInputRegel } from './core/data/kursblockung/KursblockungInputRegel';
export { KursblockungInputSchueler } from './core/data/kursblockung/KursblockungInputSchueler';
export { KursblockungOutput } from './core/data/kursblockung/KursblockungOutput';
export { KursblockungOutputFachwahlZuKurs } from './core/data/kursblockung/KursblockungOutputFachwahlZuKurs';
export { KursblockungOutputKursZuSchiene } from './core/data/kursblockung/KursblockungOutputKursZuSchiene';
export { KursblockungOutputs } from './core/data/kursblockung/KursblockungOutputs';
export { SchuelerblockungInput } from './core/data/kursblockung/SchuelerblockungInput';
export { SchuelerblockungInputFachwahl } from './core/data/kursblockung/SchuelerblockungInputFachwahl';
export { SchuelerblockungInputKurs } from './core/data/kursblockung/SchuelerblockungInputKurs';
export { SchuelerblockungOutput } from './core/data/kursblockung/SchuelerblockungOutput';
export { SchuelerblockungOutputFachwahlZuKurs } from './core/data/kursblockung/SchuelerblockungOutputFachwahlZuKurs';
export { KursDaten } from './core/data/kurse/KursDaten';
export { KursListeEintrag } from './core/data/kurse/KursListeEintrag';
export { KursartKatalogEintrag } from './core/data/kurse/KursartKatalogEintrag';
export { LehrerKatalogAbgangsgrundEintrag } from './core/data/lehrer/LehrerKatalogAbgangsgrundEintrag';
export { LehrerKatalogAnrechnungsgrundEintrag } from './core/data/lehrer/LehrerKatalogAnrechnungsgrundEintrag';
export { LehrerKatalogBeschaeftigungsartEintrag } from './core/data/lehrer/LehrerKatalogBeschaeftigungsartEintrag';
export { LehrerKatalogEinsatzstatusEintrag } from './core/data/lehrer/LehrerKatalogEinsatzstatusEintrag';
export { LehrerKatalogFachrichtungAnerkennungEintrag } from './core/data/lehrer/LehrerKatalogFachrichtungAnerkennungEintrag';
export { LehrerKatalogFachrichtungEintrag } from './core/data/lehrer/LehrerKatalogFachrichtungEintrag';
export { LehrerKatalogLehramtAnerkennungEintrag } from './core/data/lehrer/LehrerKatalogLehramtAnerkennungEintrag';
export { LehrerKatalogLehramtEintrag } from './core/data/lehrer/LehrerKatalogLehramtEintrag';
export { LehrerKatalogLehrbefaehigungAnerkennungEintrag } from './core/data/lehrer/LehrerKatalogLehrbefaehigungAnerkennungEintrag';
export { LehrerKatalogLehrbefaehigungEintrag } from './core/data/lehrer/LehrerKatalogLehrbefaehigungEintrag';
export { LehrerKatalogLeitungsfunktionEintrag } from './core/data/lehrer/LehrerKatalogLeitungsfunktionEintrag';
export { LehrerKatalogMehrleistungsartEintrag } from './core/data/lehrer/LehrerKatalogMehrleistungsartEintrag';
export { LehrerKatalogMinderleistungsartEintrag } from './core/data/lehrer/LehrerKatalogMinderleistungsartEintrag';
export { LehrerKatalogRechtsverhaeltnisEintrag } from './core/data/lehrer/LehrerKatalogRechtsverhaeltnisEintrag';
export { LehrerKatalogZugangsgrundEintrag } from './core/data/lehrer/LehrerKatalogZugangsgrundEintrag';
export { LehrerListeEintrag } from './core/data/lehrer/LehrerListeEintrag';
export { LehrerPersonaldaten } from './core/data/lehrer/LehrerPersonaldaten';
export { LehrerStammdaten } from './core/data/lehrer/LehrerStammdaten';
export { Schild3KatalogEintragAbiturInfos } from './core/data/schild3/Schild3KatalogEintragAbiturInfos';
export { Schild3KatalogEintragDQRNiveaus } from './core/data/schild3/Schild3KatalogEintragDQRNiveaus';
export { Schild3KatalogEintragDatenart } from './core/data/schild3/Schild3KatalogEintragDatenart';
export { Schild3KatalogEintragFilterFehlendeEintraege } from './core/data/schild3/Schild3KatalogEintragFilterFehlendeEintraege';
export { Schild3KatalogEintragFilterFeldListe } from './core/data/schild3/Schild3KatalogEintragFilterFeldListe';
export { Schild3KatalogEintragFilterSpezial } from './core/data/schild3/Schild3KatalogEintragFilterSpezial';
export { Schild3KatalogEintragLaender } from './core/data/schild3/Schild3KatalogEintragLaender';
export { Schild3KatalogEintragPruefungsordnung } from './core/data/schild3/Schild3KatalogEintragPruefungsordnung';
export { Schild3KatalogEintragPruefungsordnungOption } from './core/data/schild3/Schild3KatalogEintragPruefungsordnungOption';
export { Schild3KatalogEintragSchuelerImportExport } from './core/data/schild3/Schild3KatalogEintragSchuelerImportExport';
export { Schild3KatalogEintragSchuelerStatus } from './core/data/schild3/Schild3KatalogEintragSchuelerStatus';
export { Schild3KatalogEintragVersetzungsvermerke } from './core/data/schild3/Schild3KatalogEintragVersetzungsvermerke';
export { Schueler } from './core/data/schueler/Schueler';
export { SchuelerBetriebsdaten } from './core/data/schueler/SchuelerBetriebsdaten';
export { SchuelerLeistungsdaten } from './core/data/schueler/SchuelerLeistungsdaten';
export { SchuelerLernabschnittBemerkungen } from './core/data/schueler/SchuelerLernabschnittBemerkungen';
export { SchuelerLernabschnittListeEintrag } from './core/data/schueler/SchuelerLernabschnittListeEintrag';
export { SchuelerLernabschnittNachpruefung } from './core/data/schueler/SchuelerLernabschnittNachpruefung';
export { SchuelerLernabschnittNachpruefungsdaten } from './core/data/schueler/SchuelerLernabschnittNachpruefungsdaten';
export { SchuelerLernabschnittsdaten } from './core/data/schueler/SchuelerLernabschnittsdaten';
export { SchuelerListeEintrag } from './core/data/schueler/SchuelerListeEintrag';
export { SchuelerSchulbesuchMerkmal } from './core/data/schueler/SchuelerSchulbesuchMerkmal';
export { SchuelerSchulbesuchSchule } from './core/data/schueler/SchuelerSchulbesuchSchule';
export { SchuelerSchulbesuchsdaten } from './core/data/schueler/SchuelerSchulbesuchsdaten';
export { SchuelerStammdaten } from './core/data/schueler/SchuelerStammdaten';
export { AbgangsartKatalog } from './core/data/schule/AbgangsartKatalog';
export { AbgangsartKatalogDaten } from './core/data/schule/AbgangsartKatalogDaten';
export { AbgangsartKatalogEintrag } from './core/data/schule/AbgangsartKatalogEintrag';
export { AllgemeineMerkmaleKatalogEintrag } from './core/data/schule/AllgemeineMerkmaleKatalogEintrag';
export { BerufskollegAnlageKatalogEintrag } from './core/data/schule/BerufskollegAnlageKatalogEintrag';
export { BerufskollegBerufsebeneKatalogEintrag } from './core/data/schule/BerufskollegBerufsebeneKatalogEintrag';
export { BerufskollegFachklassenKatalog } from './core/data/schule/BerufskollegFachklassenKatalog';
export { BerufskollegFachklassenKatalogDaten } from './core/data/schule/BerufskollegFachklassenKatalogDaten';
export { BerufskollegFachklassenKatalogEintrag } from './core/data/schule/BerufskollegFachklassenKatalogEintrag';
export { BerufskollegFachklassenKatalogIndex } from './core/data/schule/BerufskollegFachklassenKatalogIndex';
export { BildungsgangTypKatalogEintrag } from './core/data/schule/BildungsgangTypKatalogEintrag';
export { EinschulungsartKatalogEintrag } from './core/data/schule/EinschulungsartKatalogEintrag';
export { FoerderschwerpunktEintrag } from './core/data/schule/FoerderschwerpunktEintrag';
export { FoerderschwerpunktKatalogEintrag } from './core/data/schule/FoerderschwerpunktKatalogEintrag';
export { HerkunftBildungsgangKatalogEintrag } from './core/data/schule/HerkunftBildungsgangKatalogEintrag';
export { HerkunftBildungsgangTypKatalogEintrag } from './core/data/schule/HerkunftBildungsgangTypKatalogEintrag';
export { HerkunftKatalogEintrag } from './core/data/schule/HerkunftKatalogEintrag';
export { HerkunftSchulformKatalogEintrag } from './core/data/schule/HerkunftSchulformKatalogEintrag';
export { HerkunftSonstigeKatalogEintrag } from './core/data/schule/HerkunftSonstigeKatalogEintrag';
export { HerkunftsartKatalogEintrag } from './core/data/schule/HerkunftsartKatalogEintrag';
export { HerkunftsartKatalogEintragBezeichnung } from './core/data/schule/HerkunftsartKatalogEintragBezeichnung';
export { HerkunftsschulnummerKatalogEintrag } from './core/data/schule/HerkunftsschulnummerKatalogEintrag';
export { NationalitaetenKatalogEintrag } from './core/data/schule/NationalitaetenKatalogEintrag';
export { OrganisationsformKatalogEintrag } from './core/data/schule/OrganisationsformKatalogEintrag';
export { PruefungsordnungKatalogEintrag } from './core/data/schule/PruefungsordnungKatalogEintrag';
export { ReligionEintrag } from './core/data/schule/ReligionEintrag';
export { ReligionKatalogEintrag } from './core/data/schule/ReligionKatalogEintrag';
export { SchulabschlussAllgemeinbildendKatalogEintrag } from './core/data/schule/SchulabschlussAllgemeinbildendKatalogEintrag';
export { SchulabschlussBerufsbildendKatalogEintrag } from './core/data/schule/SchulabschlussBerufsbildendKatalogEintrag';
export { SchuleAbschnitte } from './core/data/schule/SchuleAbschnitte';
export { SchuleStammdaten } from './core/data/schule/SchuleStammdaten';
export { SchulformGliederungJahrgaenge } from './core/data/schule/SchulformGliederungJahrgaenge';
export { SchulformKatalogEintrag } from './core/data/schule/SchulformKatalogEintrag';
export { SchulformSchulgliederung } from './core/data/schule/SchulformSchulgliederung';
export { SchulgliederungKatalogEintrag } from './core/data/schule/SchulgliederungKatalogEintrag';
export { Schuljahresabschnitt } from './core/data/schule/Schuljahresabschnitt';
export { VerkehrsspracheKatalogEintrag } from './core/data/schule/VerkehrsspracheKatalogEintrag';
export { SchuelerStundenplan } from './core/data/stundenplan/SchuelerStundenplan';
export { SchuelerStundenplanUnterricht } from './core/data/stundenplan/SchuelerStundenplanUnterricht';
export { StundenplanListeEintrag } from './core/data/stundenplan/StundenplanListeEintrag';
export { StundenplanZeitraster } from './core/data/stundenplan/StundenplanZeitraster';
export { StundenplanInputSimple } from './core/data/stundenplanblockung/StundenplanInputSimple';
export { StundenplanInputSimpleFach } from './core/data/stundenplanblockung/StundenplanInputSimpleFach';
export { StundenplanInputSimpleKlasse } from './core/data/stundenplanblockung/StundenplanInputSimpleKlasse';
export { StundenplanInputSimpleKopplung } from './core/data/stundenplanblockung/StundenplanInputSimpleKopplung';
export { StundenplanInputSimpleKurs } from './core/data/stundenplanblockung/StundenplanInputSimpleKurs';
export { StundenplanInputSimpleLehrkraft } from './core/data/stundenplanblockung/StundenplanInputSimpleLehrkraft';
export { StundenplanInputSimpleRaum } from './core/data/stundenplanblockung/StundenplanInputSimpleRaum';
export { KlausurblockungException } from './core/klausurblockung/KlausurblockungException';
export { KlausurblockungSchienenAlgorithmus } from './core/klausurblockung/KlausurblockungSchienenAlgorithmus';
export { KlausurblockungSchienenAlgorithmusAbstract } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusAbstract';
export { KlausurblockungSchienenAlgorithmusGreedy1 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy1';
export { KlausurblockungSchienenAlgorithmusGreedy1b } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy1b';
export { KlausurblockungSchienenAlgorithmusGreedy2 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy2';
export { KlausurblockungSchienenAlgorithmusGreedy2b } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy2b';
export { KlausurblockungSchienenAlgorithmusGreedy3 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy3';
export { KlausurblockungSchienenAlgorithmusGreedy4 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy4';
export { KlausurblockungSchienenAlgorithmusGreedy5 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy5';
export { KlausurblockungSchienenAlgorithmusGreedy6 } from './core/klausurblockung/KlausurblockungSchienenAlgorithmusGreedy6';
export { KlausurblockungSchienenDynDaten } from './core/klausurblockung/KlausurblockungSchienenDynDaten';
export { KursblockungAlgorithmus } from './core/kursblockung/KursblockungAlgorithmus';
export { KursblockungAlgorithmusK } from './core/kursblockung/KursblockungAlgorithmusK';
export { KursblockungAlgorithmusKFachwahlmatrix } from './core/kursblockung/KursblockungAlgorithmusKFachwahlmatrix';
export { KursblockungAlgorithmusKFachwahlmatrix2 } from './core/kursblockung/KursblockungAlgorithmusKFachwahlmatrix2';
export { KursblockungAlgorithmusKMatching } from './core/kursblockung/KursblockungAlgorithmusKMatching';
export { KursblockungAlgorithmusKMatching2 } from './core/kursblockung/KursblockungAlgorithmusKMatching2';
export { KursblockungAlgorithmusKOptimiereBest } from './core/kursblockung/KursblockungAlgorithmusKOptimiereBest';
export { KursblockungAlgorithmusKSatSolver } from './core/kursblockung/KursblockungAlgorithmusKSatSolver';
export { KursblockungAlgorithmusKSchnellW } from './core/kursblockung/KursblockungAlgorithmusKSchnellW';
export { KursblockungAlgorithmusKSchuelervorschlag } from './core/kursblockung/KursblockungAlgorithmusKSchuelervorschlag';
export { KursblockungAlgorithmusKmitS } from './core/kursblockung/KursblockungAlgorithmusKmitS';
export { KursblockungAlgorithmusS } from './core/kursblockung/KursblockungAlgorithmusS';
export { KursblockungAlgorithmusSMatching } from './core/kursblockung/KursblockungAlgorithmusSMatching';
export { KursblockungAlgorithmusSMatchingW } from './core/kursblockung/KursblockungAlgorithmusSMatchingW';
export { KursblockungAlgorithmusSSchnellW } from './core/kursblockung/KursblockungAlgorithmusSSchnellW';
export { KursblockungAlgorithmusSZufaellig } from './core/kursblockung/KursblockungAlgorithmusSZufaellig';
export { KursblockungDynDaten } from './core/kursblockung/KursblockungDynDaten';
export { KursblockungDynFachart } from './core/kursblockung/KursblockungDynFachart';
export { KursblockungDynKurs } from './core/kursblockung/KursblockungDynKurs';
export { KursblockungDynSchiene } from './core/kursblockung/KursblockungDynSchiene';
export { KursblockungDynSchueler } from './core/kursblockung/KursblockungDynSchueler';
export { KursblockungDynStatistik } from './core/kursblockung/KursblockungDynStatistik';
export { KursblockungException } from './core/kursblockung/KursblockungException';
export { KursblockungMatrix } from './core/kursblockung/KursblockungMatrix';
export { KursblockungStatic } from './core/kursblockung/KursblockungStatic';
export { SchuelerblockungAlgorithmus } from './core/kursblockung/SchuelerblockungAlgorithmus';
export { SchuelerblockungDynDaten } from './core/kursblockung/SchuelerblockungDynDaten';
export { SchuelerblockungException } from './core/kursblockung/SchuelerblockungException';
export { Clause } from './core/kursblockung/satsolver/Clause';
export { Heap } from './core/kursblockung/satsolver/Heap';
export { SatSolver3 } from './core/kursblockung/satsolver/SatSolver3';
export { SatSolverA } from './core/kursblockung/satsolver/SatSolverA';
export { SatSolverWrapper } from './core/kursblockung/satsolver/SatSolverWrapper';
export { Variable } from './core/kursblockung/satsolver/Variable';
export { DQR } from './core/types/DQR';
export { Geschlecht } from './core/types/Geschlecht';
export { KursFortschreibungsart } from './core/types/KursFortschreibungsart';
export { Note } from './core/types/Note';
export { PersonalTyp } from './core/types/PersonalTyp';
export { RGBFarbe } from './core/types/RGBFarbe';
export { SchuelerStatus } from './core/types/SchuelerStatus';
export { SprachBelegungSekI } from './core/types/SprachBelegungSekI';
export { Sprachpruefungniveau } from './core/types/Sprachpruefungniveau';
export { Sprachreferenzniveau } from './core/types/Sprachreferenzniveau';
export { BenutzerKompetenz } from './core/types/benutzer/BenutzerKompetenz';
export { BenutzerKompetenzGruppe } from './core/types/benutzer/BenutzerKompetenzGruppe';
export { BenutzerTyp } from './core/types/benutzer/BenutzerTyp';
export { GELeistungsdifferenzierteKursart } from './core/types/ge/GELeistungsdifferenzierteKursart';
export { AbiturBelegungsart } from './core/types/gost/AbiturBelegungsart';
export { GostAbiturFach } from './core/types/gost/GostAbiturFach';
export { GostBesondereLernleistung } from './core/types/gost/GostBesondereLernleistung';
export { GostFachbereich } from './core/types/gost/GostFachbereich';
export { GostFremdsprachenart } from './core/types/gost/GostFremdsprachenart';
export { GostHalbjahr } from './core/types/gost/GostHalbjahr';
export { GostKursart } from './core/types/gost/GostKursart';
export { GostSchriftlichkeit } from './core/types/gost/GostSchriftlichkeit';
export { GostKursblockungRegelParameterTyp } from './core/types/kursblockung/GostKursblockungRegelParameterTyp';
export { GostKursblockungRegelTyp } from './core/types/kursblockung/GostKursblockungRegelTyp';
export { AllgemeinbildendOrganisationsformen } from './core/types/schule/AllgemeinbildendOrganisationsformen';
export { BerufskollegAnlage } from './core/types/schule/BerufskollegAnlage';
export { BerufskollegBerufsebene1 } from './core/types/schule/BerufskollegBerufsebene1';
export { BerufskollegBerufsebene2 } from './core/types/schule/BerufskollegBerufsebene2';
export { BerufskollegBerufsebene3 } from './core/types/schule/BerufskollegBerufsebene3';
export { BerufskollegBildungsgangTyp } from './core/types/schule/BerufskollegBildungsgangTyp';
export { BerufskollegOrganisationsformen } from './core/types/schule/BerufskollegOrganisationsformen';
export { Nationalitaeten } from './core/types/schule/Nationalitaeten';
export { Pruefungsordnung } from './core/types/schule/Pruefungsordnung';
export { SchulabschlussAllgemeinbildend } from './core/types/schule/SchulabschlussAllgemeinbildend';
export { SchulabschlussBerufsbildend } from './core/types/schule/SchulabschlussBerufsbildend';
export { Verkehrssprache } from './core/types/schule/Verkehrssprache';
export { WeiterbildungskollegBildungsgangTyp } from './core/types/schule/WeiterbildungskollegBildungsgangTyp';
export { WeiterbildungskollegOrganisationsformen } from './core/types/schule/WeiterbildungskollegOrganisationsformen';
export { AllgemeineMerkmale } from './core/types/statkue/AllgemeineMerkmale';
export { Einschulungsart } from './core/types/statkue/Einschulungsart';
export { Fachgruppe } from './core/types/statkue/Fachgruppe';
export { Foerderschwerpunkt } from './core/types/statkue/Foerderschwerpunkt';
export { Herkunft } from './core/types/statkue/Herkunft';
export { HerkunftBildungsgang } from './core/types/statkue/HerkunftBildungsgang';
export { HerkunftBildungsgangsTyp } from './core/types/statkue/HerkunftBildungsgangsTyp';
export { HerkunftSchulform } from './core/types/statkue/HerkunftSchulform';
export { HerkunftSonstige } from './core/types/statkue/HerkunftSonstige';
export { Herkunftsarten } from './core/types/statkue/Herkunftsarten';
export { Herkunftsschulnummern } from './core/types/statkue/Herkunftsschulnummern';
export { Jahrgaenge } from './core/types/statkue/Jahrgaenge';
export { Klassenart } from './core/types/statkue/Klassenart';
export { LehrerAbgangsgrund } from './core/types/statkue/LehrerAbgangsgrund';
export { LehrerAnrechnungsgrund } from './core/types/statkue/LehrerAnrechnungsgrund';
export { LehrerBeschaeftigungsart } from './core/types/statkue/LehrerBeschaeftigungsart';
export { LehrerEinsatzstatus } from './core/types/statkue/LehrerEinsatzstatus';
export { LehrerFachrichtung } from './core/types/statkue/LehrerFachrichtung';
export { LehrerFachrichtungAnerkennung } from './core/types/statkue/LehrerFachrichtungAnerkennung';
export { LehrerLehramt } from './core/types/statkue/LehrerLehramt';
export { LehrerLehramtAnerkennung } from './core/types/statkue/LehrerLehramtAnerkennung';
export { LehrerLehrbefaehigung } from './core/types/statkue/LehrerLehrbefaehigung';
export { LehrerLehrbefaehigungAnerkennung } from './core/types/statkue/LehrerLehrbefaehigungAnerkennung';
export { LehrerMehrleistungArt } from './core/types/statkue/LehrerMehrleistungArt';
export { LehrerMinderleistungArt } from './core/types/statkue/LehrerMinderleistungArt';
export { LehrerRechtsverhaeltnis } from './core/types/statkue/LehrerRechtsverhaeltnis';
export { LehrerZugangsgrund } from './core/types/statkue/LehrerZugangsgrund';
export { Religion } from './core/types/statkue/Religion';
export { Schulform } from './core/types/statkue/Schulform';
export { Schulgliederung } from './core/types/statkue/Schulgliederung';
export { ZulaessigeKursart } from './core/types/statkue/ZulaessigeKursart';
export { ZulaessigesFach } from './core/types/statkue/ZulaessigesFach';
export { AdressenUtils } from './core/utils/AdressenUtils';
export { ENMDatenManager } from './core/utils/enm/ENMDatenManager';
export { GostAbiturjahrUtils } from './core/utils/gost/GostAbiturjahrUtils';
export { GostBlockungsdatenManager } from './core/utils/gost/GostBlockungsdatenManager';
export { GostBlockungsergebnisComparator } from './core/utils/gost/GostBlockungsergebnisComparator';
export { GostBlockungsergebnisManager } from './core/utils/gost/GostBlockungsergebnisManager';
export { GostFaecherManager } from './core/utils/gost/GostFaecherManager';
export { GostStatistikFachwahlManager } from './core/utils/gost/GostStatistikFachwahlManager';
export { JahrgangsUtils } from './core/utils/jahrgang/JahrgangsUtils';
export { AbgangsartenManager } from './core/utils/schule/AbgangsartenManager';
export { BerufskollegFachklassenManager } from './core/utils/schule/BerufskollegFachklassenManager';
export { SchuljahresAbschnittsManager } from './core/utils/schule/SchuljahresAbschnittsManager';
export { SchuelerStundenplanManager } from './core/utils/stundenplan/SchuelerStundenplanManager';
export { IOException } from './java/io/IOException';
export { Serializable } from './java/io/Serializable';
export { AbstractStringBuilder } from './java/lang/AbstractStringBuilder';
export { Appendable } from './java/lang/Appendable';
export { ArrayIndexOutOfBoundsException } from './java/lang/ArrayIndexOutOfBoundsException';
export { CharSequence } from './java/lang/CharSequence';
export { Class } from './java/lang/Class';
export { ClassCastException } from './java/lang/ClassCastException';
export { CloneNotSupportedException } from './java/lang/CloneNotSupportedException';
export { Cloneable } from './java/lang/Cloneable';
export { Comparable } from './java/lang/Comparable';
export { Exception } from './java/lang/Exception';
export { IllegalArgumentException } from './java/lang/IllegalArgumentException';
export { IllegalStateException } from './java/lang/IllegalStateException';
export { IndexOutOfBoundsException } from './java/lang/IndexOutOfBoundsException';
export { JavaBoolean } from './java/lang/JavaBoolean';
export { JavaByte } from './java/lang/JavaByte';
export { JavaDouble } from './java/lang/JavaDouble';
export { JavaFloat } from './java/lang/JavaFloat';
export { JavaInteger } from './java/lang/JavaInteger';
export { JavaIterable } from './java/lang/JavaIterable';
export { JavaLong } from './java/lang/JavaLong';
export { JavaObject } from './java/lang/JavaObject';
export { JavaShort } from './java/lang/JavaShort';
export { JavaString } from './java/lang/JavaString';
export { NullPointerException } from './java/lang/NullPointerException';
export { NumberFormatException } from './java/lang/NumberFormatException';
export { RuntimeException } from './java/lang/RuntimeException';
export { StringBuilder } from './java/lang/StringBuilder';
export { StringIndexOutOfBoundsException } from './java/lang/StringIndexOutOfBoundsException';
export { System } from './java/lang/System';
export { Throwable } from './java/lang/Throwable';
export { TranspiledObject } from './java/lang/TranspiledObject';
export { UnsupportedOperationException } from './java/lang/UnsupportedOperationException';
export { AbstractCollection } from './java/util/AbstractCollection';
export { AbstractList } from './java/util/AbstractList';
export { AbstractListIterator } from './java/util/AbstractListIterator';
export { AbstractListListIterator } from './java/util/AbstractListListIterator';
export { AbstractSet } from './java/util/AbstractSet';
export { Arrays } from './java/util/Arrays';
export { Collection } from './java/util/Collection';
export { Collections } from './java/util/Collections';
export { Comparator } from './java/util/Comparator';
export { ConcurrentModificationException } from './java/util/ConcurrentModificationException';
export { Deque } from './java/util/Deque';
export { Enumeration } from './java/util/Enumeration';
export { HashMap } from './java/util/HashMap';
export { HashMapCollection } from './java/util/HashMapCollection';
export { HashSet } from './java/util/HashSet';
export { HashSetIterator } from './java/util/HashSetIterator';
export { JavaIterator } from './java/util/JavaIterator';
export { JavaMap } from './java/util/JavaMap';
export { JavaMapEntry } from './java/util/JavaMapEntry';
export { JavaSet } from './java/util/JavaSet';
export { List } from './java/util/List';
export { ListIterator } from './java/util/ListIterator';
export { NavigableMap } from './java/util/NavigableMap';
export { NavigableSet } from './java/util/NavigableSet';
export { NoSuchElementException } from './java/util/NoSuchElementException';
export { Queue } from './java/util/Queue';
export { Random } from './java/util/Random';
export { RandomAccess } from './java/util/RandomAccess';
export { SortedMap } from './java/util/SortedMap';
export { SortedSet } from './java/util/SortedSet';
export { Vector } from './java/util/Vector';
export { VectorEnumerator } from './java/util/VectorEnumerator';
export { Consumer } from './java/util/function/Consumer';
export { Predicate } from './java/util/function/Predicate';
export { LogConsumerConsole } from './logger/LogConsumerConsole';
export { LogConsumerVector } from './logger/LogConsumerVector';
export { LogData } from './logger/LogData';
export { LogLevel } from './logger/LogLevel';
export { Logger } from './logger/Logger';
