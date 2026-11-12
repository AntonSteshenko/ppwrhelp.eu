import type { Locale } from "@/i18n/locales";
import type { Answer, Question } from "./schema";
import { countryCodes } from "./country-codes";

const wording: Record<Locale, readonly [string, string, string]> = {
  bg: ["В коя държава е установено вашето предприятие?", "Не знам", "Извън ЕС"],
  cs: ["Ve které zemi má vaše firma sídlo?", "Nevím", "Mimo EU"],
  hr: ["U kojoj je državi osnovano vaše poduzeće?", "Ne znam", "Izvan EU-a"],
  da: ["I hvilket land er din virksomhed etableret?", "Jeg ved det ikke", "Uden for EU"],
  nl: ["In welk land is uw bedrijf gevestigd?", "Ik weet het niet", "Buiten de EU"],
  en: ["In which country is your business established?", "I don't know", "Outside the EU"],
  et: ["Millises riigis on teie ettevõte asutatud?", "Ma ei tea", "Väljaspool ELi"],
  fi: ["Mihin maahan yrityksesi on sijoittautunut?", "En tiedä", "EU:n ulkopuolella"],
  fr: ["Dans quel pays votre entreprise est-elle établie ?", "Je ne sais pas", "Hors de l’UE"],
  de: ["In welchem Land ist Ihr Unternehmen niedergelassen?", "Ich weiß es nicht", "Außerhalb der EU"],
  el: ["Σε ποια χώρα είναι εγκατεστημένη η επιχείρησή σας;", "Δεν γνωρίζω", "Εκτός ΕΕ"],
  hu: ["Melyik országban van bejegyezve a vállalkozása?", "Nem tudom", "Az EU-n kívül"],
  ga: ["Cén tír ina bhfuil do ghnó bunaithe?", "Níl a fhios agam", "Lasmuigh den AE"],
  it: ["In quale Paese ha sede la tua azienda?", "Non so", "Fuori dall’UE"],
  lv: ["Kurā valstī ir reģistrēts jūsu uzņēmums?", "Nezinu", "Ārpus ES"],
  lt: ["Kurioje šalyje įsteigta jūsų įmonė?", "Nežinau", "Už ES ribų"],
  mt: ["F'liema pajjiż hija stabbilita l-kumpanija tiegħek?", "Ma nafx", "Barra l-UE"],
  pl: ["W którym kraju ma siedzibę Twoja firma?", "Nie wiem", "Poza UE"],
  pt: ["Em que país está estabelecida a sua empresa?", "Não sei", "Fora da UE"],
  ro: ["În ce țară este stabilită compania dumneavoastră?", "Nu știu", "În afara UE"],
  sk: ["V ktorej krajine má vaša spoločnosť sídlo?", "Neviem", "Mimo EÚ"],
  sl: ["V kateri državi ima vaše podjetje sedež?", "Ne vem", "Zunaj EU"],
  es: ["¿En qué país está establecida tu empresa?", "No lo sé", "Fuera de la UE"],
  sv: ["I vilket land är ditt företag etablerat?", "Jag vet inte", "Utanför EU"],
};

export function unknownLabel(locale: Locale): string { return wording[locale][1]; }

// EUR-Lex Member States list, reviewed 2026-11-11:
// https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=legissum:member_states
export const euCountryCodes = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE".split(" ");

export function countryQuestion(locale: Locale): Question {
  const [title, unknown, outside] = wording[locale];
  const names = new Intl.DisplayNames([locale, "en"], { type: "region" });
  const countries = euCountryCodes.map((code) => ({
    id: code.toLowerCase(), label: names.of(code) || code,
    value: { code: code.toLowerCase(), min: null, max: null, unit: null },
    exclusive: false,
  })).sort((a, b) => a.label.localeCompare(b.label, locale));
  return {
    id: "company_country", factKey: "company_country", title, explanation: "", selectionMode: "single",
    options: [...countries, { id: "outside_eu", label: outside,
      value: { code: "outside_eu", min: null, max: null, unit: null }, exclusive: false },
      { id: "unknown", label: unknown,
      value: { code: "unknown", min: null, max: null, unit: null }, exclusive: true }],
  };
}

export function normalizeCountryAnswer(answer: Answer, locale: Locale): Answer | null {
  if (answer.question.id !== "company_country" || answer.question.factKey !== "company_country" ||
      answer.selectedIds.length !== 1) return null;
  const selected = answer.selectedIds[0];
  if (selected !== "unknown" && selected !== "outside_eu" &&
      !countryCodes.includes(selected.toUpperCase())) return null;
  const id = selected === "unknown" || selected === "outside_eu" || euCountryCodes.includes(selected.toUpperCase())
    ? selected : "outside_eu";
  return { question: countryQuestion(locale), selectedIds: [id] };
}

const marketWording: Record<Locale, string> = {
  bg: "В кои пазари работи вашето предприятие?|Само в държавата на установяване|И в други държави от ЕС|Извън ЕС|Не знам",
  cs: "Na kterých trzích vaše firma působí?|Jen v zemi sídla|Také v jiných zemích EU|Mimo EU|Nevím",
  hr: "Na kojim tržištima posluje vaše poduzeće?|Samo u državi sjedišta|I u drugim državama EU-a|Izvan EU-a|Ne znam",
  da: "På hvilke markeder er din virksomhed aktiv?|Kun i etableringslandet|Også i andre EU-lande|Uden for EU|Jeg ved det ikke",
  nl: "Op welke markten is uw bedrijf actief?|Alleen in het vestigingsland|Ook in andere EU-landen|Buiten de EU|Ik weet het niet",
  en: "In which markets does your business operate?|Only in its country of establishment|Also in other EU countries|Outside the EU|I don't know",
  et: "Millistel turgudel teie ettevõte tegutseb?|Ainult asukohariigis|Ka teistes ELi riikides|Väljaspool ELi|Ma ei tea",
  fi: "Millä markkinoilla yrityksesi toimii?|Vain sijoittautumismaassa|Myös muissa EU-maissa|EU:n ulkopuolella|En tiedä",
  fr: "Sur quels marchés votre entreprise exerce-t-elle ?|Uniquement dans son pays d'établissement|Aussi dans d'autres pays de l'UE|Hors de l'UE|Je ne sais pas",
  de: "Auf welchen Märkten ist Ihr Unternehmen tätig?|Nur im Niederlassungsland|Auch in anderen EU-Ländern|Außerhalb der EU|Ich weiß es nicht",
  el: "Σε ποιες αγορές δραστηριοποιείται η επιχείρησή σας;|Μόνο στη χώρα εγκατάστασης|Και σε άλλες χώρες της ΕΕ|Εκτός ΕΕ|Δεν γνωρίζω",
  hu: "Mely piacokon működik a vállalkozása?|Csak a székhely szerinti országban|Más uniós országokban is|Az EU-n kívül|Nem tudom",
  ga: "Cé na margaí ina n-oibríonn do ghnó?|Sa tír bhunaithe amháin|I dtíortha AE eile freisin|Lasmuigh den AE|Níl a fhios agam",
  it: "In quali mercati opera la tua azienda?|Solo nel Paese della sede|Anche in altri Paesi UE|Fuori dall’UE|Non so",
  lv: "Kuros tirgos darbojas jūsu uzņēmums?|Tikai reģistrācijas valstī|Arī citās ES valstīs|Ārpus ES|Nezinu",
  lt: "Kuriose rinkose veikia jūsų įmonė?|Tik įsisteigimo šalyje|Taip pat kitose ES šalyse|Už ES ribų|Nežinau",
  mt: "F'liema swieq topera l-kumpanija tiegħek?|Fil-pajjiż ta' stabbiliment biss|Ukoll f'pajjiżi oħra tal-UE|Barra l-UE|Ma nafx",
  pl: "Na jakich rynkach działa Twoja firma?|Tylko w kraju siedziby|Także w innych krajach UE|Poza UE|Nie wiem",
  pt: "Em que mercados opera a sua empresa?|Apenas no país onde está estabelecida|Também noutros países da UE|Fora da UE|Não sei",
  ro: "Pe ce piețe activează compania dumneavoastră?|Doar în țara sediului|Și în alte țări UE|În afara UE|Nu știu",
  sk: "Na ktorých trhoch pôsobí vaša spoločnosť?|Len v krajine sídla|Aj v iných krajinách EÚ|Mimo EÚ|Neviem",
  sl: "Na katerih trgih deluje vaše podjetje?|Samo v državi sedeža|Tudi v drugih državah EU|Zunaj EU|Ne vem",
  es: "¿En qué mercados opera tu empresa?|Solo en el país de establecimiento|También en otros países de la UE|Fuera de la UE|No lo sé",
  sv: "På vilka marknader är ditt företag verksamt?|Endast i etableringslandet|Även i andra EU-länder|Utanför EU|Jag vet inte",
};

export function marketScopeQuestion(locale: Locale): Question {
  const [title, ...labels] = marketWording[locale].split("|");
  const codes = ["establishment_only", "other_eu", "outside_eu", "unknown"];
  return {
    id: "market_scope", factKey: "operating_countries", title, explanation: "", selectionMode: "multiple",
    options: labels.map((label, index) => ({
      id: codes[index], label, value: { code: codes[index], min: null, max: null, unit: null },
      exclusive: index === 0 || index === 3,
    })),
  };
}
