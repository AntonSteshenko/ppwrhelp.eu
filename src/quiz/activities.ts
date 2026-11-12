import type { Locale } from "@/i18n/locales";
import type { Question } from "./schema";

const text: Record<Locale, string> = {
  bg: "Какво прави вашето предприятие с опаковки или опаковани продукти?|Произвежда опаковки|Пълни или опакова продукти|Внася опаковки или опаковани продукти|Продава или разпространява|Транспортира или складира|Използва опаковки в дейността си|Нищо от изброеното|Не знам",
  cs: "Co vaše firma dělá s obaly nebo balenými výrobky?|Vyrábí obaly|Plní nebo balí výrobky|Dováží obaly nebo balené výrobky|Prodává nebo distribuuje|Přepravuje nebo skladuje|Používá obaly při své činnosti|Nic z uvedeného|Nevím",
  hr: "Što vaše poduzeće radi s ambalažom ili pakiranim proizvodima?|Proizvodi ambalažu|Puni ili pakira proizvode|Uvozi ambalažu ili pakirane proizvode|Prodaje ili distribuira|Prevozi ili skladišti|Koristi ambalažu u poslovanju|Ništa od navedenog|Ne znam",
  da: "Hvad gør din virksomhed med emballage eller emballerede produkter?|Fremstiller emballage|Fylder eller pakker produkter|Importerer emballage eller emballerede produkter|Sælger eller distribuerer|Transporterer eller opbevarer|Bruger emballage i driften|Ingen af disse|Jeg ved det ikke",
  nl: "Wat doet uw bedrijf met verpakkingen of verpakte producten?|Maakt verpakkingen|Vult of verpakt producten|Importeert verpakkingen of verpakte producten|Verkoopt of distribueert|Vervoert of slaat op|Gebruikt verpakkingen in de bedrijfsvoering|Geen van deze|Ik weet het niet",
  en: "What does your business do with packaging or packaged products?|Manufactures packaging|Fills or packs products|Imports packaging or packaged products|Sells or distributes|Transports or stores|Uses packaging in its operations|None of these|I don't know",
  et: "Mida teeb teie ettevõte pakendite või pakendatud toodetega?|Valmistab pakendeid|Täidab või pakendab tooteid|Impordib pakendeid või pakendatud tooteid|Müüb või turustab|Transpordib või ladustab|Kasutab pakendeid oma tegevuses|Mitte ükski neist|Ma ei tea",
  fi: "Mitä yrityksesi tekee pakkausten tai pakattujen tuotteiden kanssa?|Valmistaa pakkauksia|Täyttää tai pakkaa tuotteita|Tuo pakkauksia tai pakattuja tuotteita|Myy tai jakelee|Kuljettaa tai varastoi|Käyttää pakkauksia toiminnassaan|Ei mikään näistä|En tiedä",
  fr: "Que fait votre entreprise avec les emballages ou les produits emballés ?|Fabrique des emballages|Remplit ou emballe des produits|Importe des emballages ou des produits emballés|Vend ou distribue|Transporte ou stocke|Utilise des emballages dans ses activités|Aucune de ces activités|Je ne sais pas",
  de: "Was macht Ihr Unternehmen mit Verpackungen oder verpackten Produkten?|Stellt Verpackungen her|Füllt oder verpackt Produkte|Importiert Verpackungen oder verpackte Produkte|Verkauft oder vertreibt|Transportiert oder lagert|Verwendet Verpackungen im Betrieb|Nichts davon|Ich weiß es nicht",
  el: "Τι κάνει η επιχείρησή σας με συσκευασίες ή συσκευασμένα προϊόντα;|Κατασκευάζει συσκευασίες|Γεμίζει ή συσκευάζει προϊόντα|Εισάγει συσκευασίες ή συσκευασμένα προϊόντα|Πωλεί ή διανέμει|Μεταφέρει ή αποθηκεύει|Χρησιμοποιεί συσκευασίες στη λειτουργία της|Κανένα από αυτά|Δεν γνωρίζω",
  hu: "Mit tesz vállalkozása a csomagolással vagy csomagolt termékekkel?|Csomagolást gyárt|Termékeket tölt vagy csomagol|Csomagolást vagy csomagolt termékeket importál|Értékesít vagy forgalmaz|Szállít vagy tárol|Csomagolást használ a működésében|Egyik sem|Nem tudom",
  ga: "Cad a dhéanann do ghnó le pacáistíocht nó táirgí pacáistithe?|Déanann sé pacáistíocht|Líonann nó pacáistíonn sé táirgí|Allmhairíonn sé pacáistíocht nó táirgí pacáistithe|Díolann nó dáileann sé|Iompraíonn nó stórálann sé|Úsáideann sé pacáistíocht ina chuid oibre|Ceann ar bith díobh seo|Níl a fhios agam",
  it: "Quali attività svolge la tua azienda con imballaggi o prodotti imballati?|Produce imballaggi|Riempie o confeziona prodotti|Importa imballaggi o prodotti imballati|Vende o distribuisce|Trasporta o immagazzina|Utilizza imballaggi nella propria attività|Nessuna delle precedenti|Non so",
  lv: "Ko jūsu uzņēmums dara ar iepakojumu vai iepakotām precēm?|Ražo iepakojumu|Pilda vai iepako preces|Importē iepakojumu vai iepakotas preces|Pārdod vai izplata|Pārvadā vai uzglabā|Izmanto iepakojumu savā darbībā|Neviens no minētajiem|Nezinu",
  lt: "Ką jūsų įmonė daro su pakuotėmis ar supakuotais produktais?|Gamina pakuotes|Pildo arba pakuoja produktus|Importuoja pakuotes ar supakuotus produktus|Parduoda arba platina|Veža arba sandėliuoja|Naudoja pakuotes savo veikloje|Nė vieno iš šių|Nežinau",
  mt: "X'tagħmel il-kumpanija tiegħek bl-imballaġġ jew bi prodotti ppakkjati?|Timmanifattura imballaġġ|Timla jew tippakkja prodotti|Timporta imballaġġ jew prodotti ppakkjati|Tbigħ jew tqassam|Tittrasporta jew taħżen|Tuża imballaġġ fl-operat tagħha|L-ebda waħda minn dawn|Ma nafx",
  pl: "Co Twoja firma robi z opakowaniami lub produktami w opakowaniach?|Produkuje opakowania|Napełnia lub pakuje produkty|Importuje opakowania lub produkty w opakowaniach|Sprzedaje lub dystrybuuje|Transportuje lub magazynuje|Używa opakowań w działalności|Żadne z powyższych|Nie wiem",
  pt: "O que faz a sua empresa com embalagens ou produtos embalados?|Fabrica embalagens|Enche ou embala produtos|Importa embalagens ou produtos embalados|Vende ou distribui|Transporta ou armazena|Utiliza embalagens na sua atividade|Nenhuma das anteriores|Não sei",
  ro: "Ce face compania cu ambalajele sau produsele ambalate?|Produce ambalaje|Umple sau ambalează produse|Importă ambalaje sau produse ambalate|Vinde sau distribuie|Transportă sau depozitează|Folosește ambalaje în activitatea sa|Niciuna dintre acestea|Nu știu",
  sk: "Čo robí vaša spoločnosť s obalmi alebo balenými výrobkami?|Vyrába obaly|Plní alebo balí výrobky|Dováža obaly alebo balené výrobky|Predáva alebo distribuuje|Prepravuje alebo skladuje|Používa obaly pri svojej činnosti|Nič z uvedeného|Neviem",
  sl: "Kaj vaše podjetje počne z embalažo ali pakiranimi izdelki?|Izdeluje embalažo|Polni ali pakira izdelke|Uvaža embalažo ali pakirane izdelke|Prodaja ali distribuira|Prevaža ali skladišči|Uporablja embalažo pri poslovanju|Nič od navedenega|Ne vem",
  es: "¿Qué hace tu empresa con envases o productos envasados?|Fabrica envases|Llena o envasa productos|Importa envases o productos envasados|Vende o distribuye|Transporta o almacena|Usa envases en su actividad|Ninguna de las anteriores|No lo sé",
  sv: "Vad gör ditt företag med förpackningar eller förpackade produkter?|Tillverkar förpackningar|Fyller eller förpackar produkter|Importerar förpackningar eller förpackade produkter|Säljer eller distribuerar|Transporterar eller lagrar|Använder förpackningar i verksamheten|Inget av detta|Jag vet inte",
};

const codes = ["makes_packaging", "fills_packs", "imports", "sells_distributes", "transports_stores", "uses_packaging", "none", "unknown"];

export function activitiesQuestion(locale: Locale): Question {
  const [title, ...labels] = text[locale].split("|");
  return {
    id: "fixed_activities", factKey: "activities", title, explanation: "", selectionMode: "multiple",
    options: labels.map((label, index) => ({
      id: codes[index], label,
      value: { code: codes[index], min: null, max: null, unit: null },
      exclusive: index >= 6,
    })),
  };
}
