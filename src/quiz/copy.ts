import type { Locale } from "@/i18n/locales";
import type { Question } from "./schema";

// Draft UI translations for the MVP. Legal conclusions come from the sourced
// server response and are not represented as human-reviewed translations.
const rows: Record<Locale, string> = {
  bg: "PPWR: какви задължения има вашето предприятие?|Отговорете на няколко въпроса и получете първоначална пътна карта със задължения, срокове и проверки.|В кой сектор работи вашето предприятие?|Ресторантьорство и хотелиерство|Търговия и дистрибуция|Електронна търговия|Промишлено производство|Производство на опаковки|Логистика и транспорт|Земеделие и храни|Услуги|Друго / смесени дейности|Не знам как да класифицирам предприятието",
  cs: "PPWR: jaké povinnosti musí vaše firma splnit?|Odpovězte na několik otázek a získejte první přehled povinností, termínů a potřebných ověření.|V jakém odvětví vaše firma působí?|Pohostinství a ubytování|Obchod a distribuce|Elektronický obchod|Průmyslová výroba|Výroba obalů|Logistika a doprava|Zemědělství a potravinářství|Služby|Jiné / smíšené činnosti|Nevím, jak firmu zařadit",
  hr: "PPWR: koje obveze mora ispuniti vaše poduzeće?|Odgovorite na nekoliko pitanja i dobijte početni pregled obveza, rokova i provjera.|U kojem sektoru posluje vaše poduzeće?|Ugostiteljstvo i smještaj|Trgovina i distribucija|E-trgovina|Industrijska proizvodnja|Proizvodnja ambalaže|Logistika i prijevoz|Poljoprivreda i prehrana|Usluge|Ostalo / mješovite djelatnosti|Ne znam kako svrstati poduzeće",
  da: "PPWR: hvilke krav gælder for din virksomhed?|Besvar nogle få spørgsmål og få et første overblik over forpligtelser, frister og nødvendige kontroller.|Hvilken branche arbejder din virksomhed i?|Restauranter og overnatning|Handel og distribution|E-handel|Industriel produktion|Emballageproduktion|Logistik og transport|Landbrug og fødevarer|Tjenesteydelser|Andet / blandede aktiviteter|Jeg ved ikke, hvordan virksomheden skal klassificeres",
  nl: "PPWR: aan welke verplichtingen moet uw bedrijf voldoen?|Beantwoord enkele vragen en ontvang een eerste overzicht van verplichtingen, termijnen en controles.|In welke sector is uw bedrijf actief?|Horeca en gastvrijheid|Handel en distributie|E-commerce|Industriële productie|Productie van verpakkingen|Logistiek en vervoer|Landbouw en voeding|Diensten|Overig / gemengde activiteiten|Ik weet niet hoe ik het bedrijf moet indelen",
  en: "PPWR: which obligations apply to your business?|Answer a few questions for an initial roadmap of obligations, deadlines and checks to make.|Which sector does your business operate in?|Food service and hospitality|Trade and distribution|E-commerce|Industrial manufacturing|Packaging manufacturing|Logistics and transport|Agriculture and food|Services|Other / mixed activities|I don't know how to classify the business",
  et: "PPWR: millised kohustused kehtivad teie ettevõttele?|Vastake mõnele küsimusele ja saate esialgse ülevaate kohustustest, tähtaegadest ja kontrollidest.|Millises valdkonnas teie ettevõte tegutseb?|Toitlustus ja majutus|Kaubandus ja turustus|E-kaubandus|Tööstuslik tootmine|Pakendite tootmine|Logistika ja transport|Põllumajandus ja toit|Teenused|Muu / segategevus|Ma ei oska ettevõtet liigitada",
  fi: "PPWR: mitä velvoitteita yrityksesi on noudatettava?|Vastaa muutamaan kysymykseen ja saat alustavan katsauksen velvoitteisiin, määräaikoihin ja tarkistuksiin.|Millä toimialalla yrityksesi toimii?|Ravintolat ja majoitus|Kauppa ja jakelu|Verkkokauppa|Teollinen valmistus|Pakkausten valmistus|Logistiikka ja kuljetus|Maatalous ja elintarvikkeet|Palvelut|Muu / monialainen toiminta|En osaa luokitella yritystä",
  fr: "PPWR : quelles obligations pour votre entreprise ?|Répondez à quelques questions pour obtenir une première feuille de route des obligations, échéances et vérifications.|Dans quel secteur votre entreprise exerce-t-elle ?|Restauration et hôtellerie|Commerce et distribution|Commerce électronique|Production industrielle|Fabrication d’emballages|Logistique et transport|Agriculture et alimentation|Services|Autre / activités mixtes|Je ne sais pas classer l’entreprise",
  de: "PPWR: Welche Pflichten gelten für Ihr Unternehmen?|Beantworten Sie einige Fragen und erhalten Sie einen ersten Überblick über Pflichten, Fristen und nötige Prüfungen.|In welcher Branche ist Ihr Unternehmen tätig?|Gastronomie und Beherbergung|Handel und Vertrieb|Onlinehandel|Industrielle Fertigung|Verpackungsherstellung|Logistik und Transport|Landwirtschaft und Lebensmittel|Dienstleistungen|Sonstiges / gemischte Tätigkeiten|Ich weiß nicht, wie ich das Unternehmen einordnen soll",
  el: "PPWR: ποιες υποχρεώσεις ισχύουν για την επιχείρησή σας;|Απαντήστε σε λίγες ερωτήσεις για έναν αρχικό οδηγό υποχρεώσεων, προθεσμιών και ελέγχων.|Σε ποιον τομέα δραστηριοποιείται η επιχείρησή σας;|Εστίαση και φιλοξενία|Εμπόριο και διανομή|Ηλεκτρονικό εμπόριο|Βιομηχανική παραγωγή|Παραγωγή συσκευασιών|Εφοδιαστική και μεταφορές|Γεωργία και τρόφιμα|Υπηρεσίες|Άλλο / μικτές δραστηριότητες|Δεν ξέρω πώς να ταξινομήσω την επιχείρηση",
  hu: "PPWR: milyen kötelezettségek vonatkoznak a vállalkozására?|Válaszoljon néhány kérdésre, és kapjon előzetes áttekintést a kötelezettségekről, határidőkről és ellenőrzésekről.|Melyik ágazatban működik a vállalkozása?|Vendéglátás és szálláshelyek|Kereskedelem és forgalmazás|E-kereskedelem|Ipari gyártás|Csomagolóanyag-gyártás|Logisztika és szállítás|Mezőgazdaság és élelmiszeripar|Szolgáltatások|Egyéb / vegyes tevékenységek|Nem tudom besorolni a vállalkozást",
  ga: "PPWR: cé na hoibleagáid atá ar do ghnólacht?|Freagair cúpla ceist le treochlár tosaigh a fháil maidir le hoibleagáidí, spriocdhátaí agus seiceálacha.|Cén earnáil ina bhfeidhmíonn do ghnólacht?|Bialanna agus fáilteachas|Trádáil agus dáileadh|Ríomhthráchtáil|Déantúsaíocht thionsclaíoch|Déantúsaíocht pacáistíochta|Lóistíocht agus iompar|Talmhaíocht agus bia|Seirbhísí|Eile / gníomhaíochtaí measctha|Níl a fhios agam conas an gnólacht a rangú",
  it: "PPWR: quali obblighi deve rispettare la tua azienda?|Rispondi a poche domande e ottieni una prima roadmap con obblighi, scadenze e verifiche da fare.|In quale settore opera la tua azienda?|Ristorazione e ospitalità|Commercio e distribuzione|E-commerce|Produzione industriale|Produzione di imballaggi|Logistica e trasporti|Agricoltura e alimentare|Servizi|Altro / attività miste|Non so come classificare l’azienda",
  lv: "PPWR: kādi pienākumi attiecas uz jūsu uzņēmumu?|Atbildiet uz dažiem jautājumiem un saņemiet sākotnēju pārskatu par pienākumiem, termiņiem un pārbaudēm.|Kurā nozarē darbojas jūsu uzņēmums?|Ēdināšana un viesmīlība|Tirdzniecība un izplatīšana|E-komercija|Rūpnieciskā ražošana|Iepakojuma ražošana|Loģistika un transports|Lauksaimniecība un pārtika|Pakalpojumi|Cits / jauktas darbības|Nezinu, kā klasificēt uzņēmumu",
  lt: "PPWR: kokie įpareigojimai taikomi jūsų įmonei?|Atsakykite į kelis klausimus ir gaukite pradinę įpareigojimų, terminų ir patikrų apžvalgą.|Kokiame sektoriuje veikia jūsų įmonė?|Maitinimas ir svetingumas|Prekyba ir platinimas|Elektroninė prekyba|Pramoninė gamyba|Pakuočių gamyba|Logistika ir transportas|Žemės ūkis ir maistas|Paslaugos|Kita / mišri veikla|Nežinau, kaip priskirti įmonę",
  mt: "PPWR: liema obbligi japplikaw għan-negozju tiegħek?|Wieġeb ftit mistoqsijiet għal ħarsa inizjali lejn l-obbligi, l-iskadenzi u l-verifiki meħtieġa.|F'liema settur jaħdem in-negozju tiegħek?|Ristoranti u ospitalità|Kummerċ u distribuzzjoni|Kummerċ elettroniku|Produzzjoni industrijali|Produzzjoni ta' imballaġġ|Loġistika u trasport|Agrikoltura u ikel|Servizzi|Oħrajn / attivitajiet imħallta|Ma nafx kif nikklassifika n-negozju",
  pl: "PPWR: jakie obowiązki dotyczą Twojej firmy?|Odpowiedz na kilka pytań i otrzymaj wstępny plan obowiązków, terminów i potrzebnych weryfikacji.|W jakiej branży działa Twoja firma?|Gastronomia i hotelarstwo|Handel i dystrybucja|Handel internetowy|Produkcja przemysłowa|Produkcja opakowań|Logistyka i transport|Rolnictwo i żywność|Usługi|Inne / działalność mieszana|Nie wiem, jak sklasyfikować firmę",
  pt: "PPWR: que obrigações se aplicam à sua empresa?|Responda a algumas perguntas para obter um primeiro roteiro de obrigações, prazos e verificações.|Em que setor opera a sua empresa?|Restauração e hotelaria|Comércio e distribuição|Comércio eletrónico|Produção industrial|Fabrico de embalagens|Logística e transportes|Agricultura e alimentação|Serviços|Outro / atividades mistas|Não sei como classificar a empresa",
  ro: "PPWR: ce obligații se aplică firmei tale?|Răspunde la câteva întrebări pentru o primă hartă a obligațiilor, termenelor și verificărilor.|În ce sector activează firma ta?|Restaurante și ospitalitate|Comerț și distribuție|Comerț electronic|Producție industrială|Producția ambalajelor|Logistică și transport|Agricultură și alimentație|Servicii|Altele / activități mixte|Nu știu cum să clasific firma",
  sk: "PPWR: aké povinnosti platia pre vašu firmu?|Odpovedzte na niekoľko otázok a získajte úvodný prehľad povinností, termínov a kontrol.|V akom odvetví pôsobí vaša firma?|Stravovanie a ubytovanie|Obchod a distribúcia|Elektronický obchod|Priemyselná výroba|Výroba obalov|Logistika a doprava|Poľnohospodárstvo a potraviny|Služby|Iné / zmiešané činnosti|Neviem firmu zaradiť",
  sl: "PPWR: katere obveznosti veljajo za vaše podjetje?|Odgovorite na nekaj vprašanj in prejmite začetni pregled obveznosti, rokov in preverjanj.|V kateri panogi deluje vaše podjetje?|Gostinstvo in nastanitve|Trgovina in distribucija|E-trgovina|Industrijska proizvodnja|Proizvodnja embalaže|Logistika in prevoz|Kmetijstvo in prehrana|Storitve|Drugo / mešane dejavnosti|Ne vem, kako razvrstiti podjetje",
  es: "PPWR: ¿qué obligaciones debe cumplir tu empresa?|Responde a unas preguntas y obtén una primera hoja de ruta con obligaciones, plazos y comprobaciones.|¿En qué sector opera tu empresa?|Restauración y hostelería|Comercio y distribución|Comercio electrónico|Producción industrial|Fabricación de envases|Logística y transporte|Agricultura y alimentación|Servicios|Otro / actividades mixtas|No sé cómo clasificar la empresa",
  sv: "PPWR: vilka skyldigheter gäller för ditt företag?|Svara på några frågor och få en första översikt över skyldigheter, tidsfrister och kontroller.|I vilken bransch verkar ditt företag?|Restaurang och hotell|Handel och distribution|E-handel|Industriell tillverkning|Förpackningstillverkning|Logistik och transport|Jordbruk och livsmedel|Tjänster|Annat / blandad verksamhet|Jag vet inte hur företaget ska klassificeras",
};

const controls: Record<Locale, string> = {
  bg: "Продължи|Назад|Опитай отново|Предварителен резултат|Нов тест|Печат|Завършени въпроси|Проверете|Зареждане…|Резултатът е ориентировъчен",
  cs: "Pokračovat|Zpět|Zkusit znovu|Předběžný výsledek|Nový kvíz|Tisk|Zodpovězené otázky|Ověřit|Načítání…|Výsledek je orientační",
  hr: "Nastavi|Natrag|Pokušaj ponovno|Preliminarni rezultat|Novi kviz|Ispis|Odgovorena pitanja|Provjeriti|Učitavanje…|Rezultat je informativan",
  da: "Fortsæt|Tilbage|Prøv igen|Foreløbigt resultat|Ny quiz|Udskriv|Besvarede spørgsmål|Kontrollér|Indlæser…|Resultatet er vejledende",
  nl: "Verder|Terug|Opnieuw proberen|Voorlopig resultaat|Nieuwe quiz|Afdrukken|Beantwoorde vragen|Controleren|Laden…|Het resultaat is indicatief",
  en: "Continue|Back|Retry|Preliminary result|New quiz|Print|Questions answered|Verify|Loading…|This result is informational",
  et: "Jätka|Tagasi|Proovi uuesti|Esialgne tulemus|Uus küsimustik|Prindi|Vastatud küsimused|Kontrolli|Laadimine…|Tulemus on informatiivne",
  fi: "Jatka|Takaisin|Yritä uudelleen|Alustava tulos|Uusi kysely|Tulosta|Vastatut kysymykset|Tarkista|Ladataan…|Tulos on suuntaa antava",
  fr: "Continuer|Retour|Réessayer|Résultat préliminaire|Nouveau quiz|Imprimer|Questions répondues|À vérifier|Chargement…|Résultat indicatif",
  de: "Weiter|Zurück|Erneut versuchen|Vorläufiges Ergebnis|Neuer Test|Drucken|Beantwortete Fragen|Prüfen|Lädt…|Das Ergebnis dient der Orientierung",
  el: "Συνέχεια|Πίσω|Δοκιμάστε ξανά|Προκαταρκτικό αποτέλεσμα|Νέο κουίζ|Εκτύπωση|Ερωτήσεις που απαντήθηκαν|Επαλήθευση|Φόρτωση…|Το αποτέλεσμα είναι ενδεικτικό",
  hu: "Folytatás|Vissza|Újrapróbálás|Előzetes eredmény|Új kvíz|Nyomtatás|Megválaszolt kérdések|Ellenőrizendő|Betöltés…|Az eredmény tájékoztató jellegű",
  ga: "Lean ar aghaidh|Siar|Bain triail eile as|Toradh sealadach|Tráth na gceist nua|Priontáil|Ceisteanna freagartha|Le fíorú|Ag luchtú…|Treoir faisnéise amháin",
  it: "Continua|Indietro|Riprova|Risultato preliminare|Nuovo quiz|Stampa|Domande completate|Da verificare|Caricamento…|Risultato orientativo",
  lv: "Turpināt|Atpakaļ|Mēģināt vēlreiz|Sākotnējais rezultāts|Jauna aptauja|Drukāt|Atbildētie jautājumi|Jāpārbauda|Ielādē…|Rezultāts ir informatīvs",
  lt: "Tęsti|Atgal|Bandyti dar kartą|Preliminarus rezultatas|Nauja apklausa|Spausdinti|Atsakyti klausimai|Patikrinti|Įkeliama…|Rezultatas yra informacinis",
  mt: "Kompli|Lura|Erġa' pprova|Riżultat preliminari|Kwiżż ġdid|Stampa|Mistoqsijiet imwieġba|Ivverifika|Qed jitgħabba…|Ir-riżultat huwa indikattiv",
  pl: "Dalej|Wstecz|Spróbuj ponownie|Wynik wstępny|Nowy quiz|Drukuj|Pytania z odpowiedzią|Do weryfikacji|Wczytywanie…|Wynik ma charakter informacyjny",
  pt: "Continuar|Voltar|Tentar novamente|Resultado preliminar|Novo questionário|Imprimir|Perguntas respondidas|A verificar|A carregar…|Resultado informativo",
  ro: "Continuă|Înapoi|Reîncearcă|Rezultat preliminar|Quiz nou|Tipărește|Întrebări răspunse|De verificat|Se încarcă…|Rezultatul este informativ",
  sk: "Pokračovať|Späť|Skúsiť znova|Predbežný výsledok|Nový kvíz|Tlačiť|Zodpovedané otázky|Overiť|Načítava sa…|Výsledok je orientačný",
  sl: "Nadaljuj|Nazaj|Poskusi znova|Predhodni rezultat|Nov kviz|Natisni|Odgovorjena vprašanja|Preveriti|Nalaganje…|Rezultat je informativen",
  es: "Continuar|Atrás|Reintentar|Resultado preliminar|Nuevo cuestionario|Imprimir|Preguntas respondidas|Por verificar|Cargando…|Resultado orientativo",
  sv: "Fortsätt|Tillbaka|Försök igen|Preliminärt resultat|Nytt quiz|Skriv ut|Besvarade frågor|Kontrollera|Laddar…|Resultatet är vägledande",
};

const statusText: Record<Locale, string> = {
  bg: "Въпросът не можа да се зареди. Опитайте отново.|ДЕМО — примерен тест без правна оценка",
  cs: "Otázku se nepodařilo načíst. Zkuste to znovu.|DEMO — ukázkový kvíz bez právního posouzení",
  hr: "Pitanje se nije moglo učitati. Pokušajte ponovno.|DEMO — primjer bez pravne procjene",
  da: "Spørgsmålet kunne ikke indlæses. Prøv igen.|DEMO — eksempel uden juridisk vurdering",
  nl: "De vraag kon niet worden geladen. Probeer opnieuw.|DEMO — voorbeeld zonder juridische beoordeling",
  en: "The question could not be loaded. Please retry.|DEMO — sample flow without legal assessment",
  et: "Küsimust ei saanud laadida. Proovige uuesti.|DEMO — näide ilma õigusliku hinnanguta",
  fi: "Kysymystä ei voitu ladata. Yritä uudelleen.|DEMO — esimerkki ilman oikeudellista arviota",
  fr: "La question n’a pas pu être chargée. Réessayez.|DÉMO — exemple sans évaluation juridique",
  de: "Die Frage konnte nicht geladen werden. Erneut versuchen.|DEMO — Beispiel ohne rechtliche Bewertung",
  el: "Η ερώτηση δεν φορτώθηκε. Δοκιμάστε ξανά.|ΕΠΙΔΕΙΞΗ — παράδειγμα χωρίς νομική αξιολόγηση",
  hu: "A kérdés nem tölthető be. Próbálja újra.|DEMÓ — példa jogi értékelés nélkül",
  ga: "Níorbh fhéidir an cheist a luchtú. Bain triail eile as.|LÉIRIÚ — sampla gan measúnú dlíthiúil",
  it: "Impossibile caricare la domanda. Riprova.|DEMO — percorso simulato senza valutazione legale",
  lv: "Jautājumu neizdevās ielādēt. Mēģiniet vēlreiz.|DEMO — piemērs bez juridiska novērtējuma",
  lt: "Nepavyko įkelti klausimo. Bandykite dar kartą.|DEMO — pavyzdys be teisinio vertinimo",
  mt: "Il-mistoqsija ma setgħetx titgħabba. Erġa' pprova.|DEMO — eżempju mingħajr valutazzjoni legali",
  pl: "Nie udało się wczytać pytania. Spróbuj ponownie.|DEMO — przykład bez oceny prawnej",
  pt: "Não foi possível carregar a pergunta. Tente novamente.|DEMO — exemplo sem avaliação jurídica",
  ro: "Întrebarea nu a putut fi încărcată. Reîncearcă.|DEMO — exemplu fără evaluare juridică",
  sk: "Otázku sa nepodarilo načítať. Skúste znova.|DEMO — príklad bez právneho posúdenia",
  sl: "Vprašanja ni bilo mogoče naložiti. Poskusite znova.|DEMO — primer brez pravne ocene",
  es: "No se pudo cargar la pregunta. Vuelve a intentarlo.|DEMO — ejemplo sin evaluación jurídica",
  sv: "Frågan kunde inte laddas. Försök igen.|DEMO — exempel utan juridisk bedömning",
};

export function quizCopy(locale: Locale) {
  const [headline, intro, firstTitle, ...optionLabels] = rows[locale].split("|");
  const [continueLabel, back, retry, preliminary, restart, print, answered, verify, loading, resultTitle] = controls[locale].split("|");
  const [errorMessage, demoMessage] = statusText[locale].split("|");
  return { headline, intro, firstTitle, optionLabels, continueLabel, back, retry, preliminary, restart, print, answered, verify, loading, resultTitle, errorMessage, demoMessage };
}

const sectorCodes = ["hospitality", "trade", "ecommerce", "industrial", "packaging", "logistics", "agriculture", "services", "mixed", "unknown"];

export function firstQuestion(locale: Locale): Question {
  const copy = quizCopy(locale);
  return {
    id: "sector", factKey: "sector", title: copy.firstTitle, explanation: "",
    selectionMode: "single",
    options: copy.optionLabels.map((label, index) => ({
      id: sectorCodes[index], label,
      value: { code: sectorCodes[index], min: null, max: null, unit: null },
      exclusive: index === 9,
    })),
  };
}
