import type { Locale } from "./locales";

type HomeMessages = {
  headline: string;
  intro: string;
  comingSoon: string;
  languageLabel: string;
};

export const messages: Record<Locale, HomeMessages> = {
  bg: {
    headline: "PPWR на вашия език",
    intro: "Многоезично пространство за правилата на ЕС относно опаковките.",
    comingSoon: "Очаквайте скоро: тест, библиотека с ресурси и новини.",
    languageLabel: "Език",
  },
  hr: {
    headline: "PPWR na vašem jeziku",
    intro: "Višejezični prostor o pravilima EU-a za ambalažu.",
    comingSoon: "Uskoro: kviz, knjižnica izvora i vijesti.",
    languageLabel: "Jezik",
  },
  cs: {
    headline: "PPWR ve vašem jazyce",
    intro: "Vícejazyčný prostor o pravidlech EU pro obaly.",
    comingSoon: "Připravujeme kvíz, knihovnu zdrojů a novinky.",
    languageLabel: "Jazyk",
  },
  da: {
    headline: "PPWR på dit sprog",
    intro: "Et flersproget sted om EU's regler for emballage.",
    comingSoon: "Kommer snart: quiz, ressourcebibliotek og nyheder.",
    languageLabel: "Sprog",
  },
  nl: {
    headline: "PPWR in jouw taal",
    intro: "Een meertalige plek over EU-regels voor verpakkingen.",
    comingSoon: "Binnenkort: quiz, bronnenbibliotheek en nieuws.",
    languageLabel: "Taal",
  },
  en: {
    headline: "PPWR in your language",
    intro: "A multilingual space for EU packaging rules.",
    comingSoon: "Coming soon: a quiz, resource library and news.",
    languageLabel: "Language",
  },
  et: {
    headline: "PPWR sinu keeles",
    intro: "Mitmekeelne koht ELi pakendieeskirjade jaoks.",
    comingSoon: "Peagi tulemas: viktoriin, allikate kogu ja uudised.",
    languageLabel: "Keel",
  },
  fi: {
    headline: "PPWR omalla kielelläsi",
    intro: "Monikielinen sivusto EU:n pakkaussäännöistä.",
    comingSoon: "Tulossa pian: tietovisa, aineistokirjasto ja uutiset.",
    languageLabel: "Kieli",
  },
  fr: {
    headline: "Le PPWR dans votre langue",
    intro: "Un espace multilingue sur les règles de l’UE relatives aux emballages.",
    comingSoon: "Bientôt : un quiz, une bibliothèque de ressources et des actualités.",
    languageLabel: "Langue",
  },
  de: {
    headline: "PPWR in Ihrer Sprache",
    intro: "Ein mehrsprachiger Ort für die EU-Vorschriften zu Verpackungen.",
    comingSoon: "Demnächst: Quiz, Materialsammlung und Nachrichten.",
    languageLabel: "Sprache",
  },
  el: {
    headline: "PPWR στη γλώσσα σας",
    intro: "Ένας πολύγλωσσος χώρος για τους κανόνες της ΕΕ σχετικά με τις συσκευασίες.",
    comingSoon: "Σύντομα: κουίζ, βιβλιοθήκη πηγών και νέα.",
    languageLabel: "Γλώσσα",
  },
  hu: {
    headline: "PPWR az Ön nyelvén",
    intro: "Többnyelvű felület az EU csomagolási szabályairól.",
    comingSoon: "Hamarosan: kvíz, forrástár és hírek.",
    languageLabel: "Nyelv",
  },
  ga: {
    headline: "PPWR i do theanga",
    intro: "Spás ilteangach faoi rialacha an Aontais maidir le pacáistíocht.",
    comingSoon: "Ag teacht go luath: tráth na gceist, leabharlann acmhainní agus nuacht.",
    languageLabel: "Teanga",
  },
  it: {
    headline: "Il PPWR nella tua lingua",
    intro: "Uno spazio multilingua dedicato alle norme UE sugli imballaggi.",
    comingSoon: "In arrivo: quiz, libreria di risorse e news.",
    languageLabel: "Lingua",
  },
  lv: {
    headline: "PPWR jūsu valodā",
    intro: "Daudzvalodu vietne par ES iepakojuma noteikumiem.",
    comingSoon: "Drīzumā: viktorīna, resursu bibliotēka un ziņas.",
    languageLabel: "Valoda",
  },
  lt: {
    headline: "PPWR jūsų kalba",
    intro: "Daugiakalbė erdvė apie ES pakuočių taisykles.",
    comingSoon: "Netrukus: viktorina, išteklių biblioteka ir naujienos.",
    languageLabel: "Kalba",
  },
  mt: {
    headline: "Il-PPWR bil-lingwa tiegħek",
    intro: "Spazju multilingwi dwar ir-regoli tal-UE għall-imballaġġ.",
    comingSoon: "Dalwaqt: kwiżż, librerija ta’ riżorsi u aħbarijiet.",
    languageLabel: "Lingwa",
  },
  pl: {
    headline: "PPWR w Twoim języku",
    intro: "Wielojęzyczne miejsce o unijnych przepisach dotyczących opakowań.",
    comingSoon: "Wkrótce: quiz, biblioteka materiałów i aktualności.",
    languageLabel: "Język",
  },
  pt: {
    headline: "O PPWR na sua língua",
    intro: "Um espaço multilingue sobre as regras da UE relativas às embalagens.",
    comingSoon: "Em breve: questionário, biblioteca de recursos e notícias.",
    languageLabel: "Língua",
  },
  ro: {
    headline: "PPWR în limba ta",
    intro: "Un spațiu multilingv despre normele UE privind ambalajele.",
    comingSoon: "În curând: un quiz, o bibliotecă de resurse și știri.",
    languageLabel: "Limbă",
  },
  sk: {
    headline: "PPWR vo vašom jazyku",
    intro: "Viacjazyčný priestor o pravidlách EÚ pre obaly.",
    comingSoon: "Čoskoro: kvíz, knižnica zdrojov a novinky.",
    languageLabel: "Jazyk",
  },
  sl: {
    headline: "PPWR v vašem jeziku",
    intro: "Večjezični prostor o pravilih EU za embalažo.",
    comingSoon: "Kmalu: kviz, knjižnica virov in novice.",
    languageLabel: "Jezik",
  },
  es: {
    headline: "El PPWR en tu idioma",
    intro: "Un espacio multilingüe sobre las normas de la UE para los envases.",
    comingSoon: "Próximamente: cuestionario, biblioteca de recursos y noticias.",
    languageLabel: "Idioma",
  },
  sv: {
    headline: "PPWR på ditt språk",
    intro: "En flerspråkig plats om EU:s regler för förpackningar.",
    comingSoon: "Snart kommer: frågesport, resursbibliotek och nyheter.",
    languageLabel: "Språk",
  },
};
