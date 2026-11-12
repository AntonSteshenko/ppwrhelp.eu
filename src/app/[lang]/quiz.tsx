"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import type { Locale } from "@/i18n/locales";
import { quizCopy } from "@/quiz/copy";
import { countryQuestion, normalizeCountryAnswer } from "@/quiz/country";
import { activitiesQuestion } from "@/quiz/activities";
import { emitQuizEvent } from "@/quiz/analytics";
import { answerSchema, assessmentSchema, MAX_QUESTIONS, modelOutputSchema, questionSchema, SCHEMA_VERSION, validAnswer, type Answer, type Assessment, type Question } from "@/quiz/schema";

type CitedSource = { id: string; title: string; url: string; article: string; kind: string };
type Result = { assessment: Assessment; sources: CitedSource[]; demo: boolean };
const storedSchema = z.object({
  version: z.literal(SCHEMA_VERSION), locale: z.string(), savedAt: z.number(),
  history: z.array(answerSchema).max(MAX_QUESTIONS),
  current: questionSchema.nullable(),
  result: z.object({ assessment: assessmentSchema, sources: z.array(z.object({
    id: z.string(), title: z.string(), url: z.string(), article: z.string(), kind: z.string(),
  })), demo: z.boolean() }).nullable(),
});
const responseSchema = modelOutputSchema.extend({
  demo: z.boolean(), sources: storedSchema.shape.result.unwrap().shape.sources.optional(),
});

const sectionLabels: Record<Locale, readonly [string, string, string, string]> = {
  bg: ["Профил", "Опаковки", "Оценка", "Източници"], cs: ["Profil", "Obaly", "Posouzení", "Zdroje"],
  hr: ["Profil", "Ambalaža", "Procjena", "Izvori"], da: ["Profil", "Emballage", "Vurdering", "Kilder"],
  nl: ["Profiel", "Verpakkingen", "Beoordeling", "Bronnen"], en: ["Profile", "Packaging", "Assessment", "Sources"],
  et: ["Profiil", "Pakendid", "Hinnang", "Allikad"], fi: ["Profiili", "Pakkaukset", "Arvio", "Lähteet"],
  fr: ["Profil", "Emballages", "Évaluation", "Sources"], de: ["Profil", "Verpackungen", "Bewertung", "Quellen"],
  el: ["Προφίλ", "Συσκευασίες", "Αξιολόγηση", "Πηγές"], hu: ["Profil", "Csomagolás", "Értékelés", "Források"],
  ga: ["Próifíl", "Pacáistiú", "Measúnú", "Foinsí"], it: ["Profilo", "Imballaggi", "Valutazione", "Fonti"],
  lv: ["Profils", "Iepakojums", "Novērtējums", "Avoti"], lt: ["Profilis", "Pakuotės", "Vertinimas", "Šaltiniai"],
  mt: ["Profil", "Imballaġġ", "Valutazzjoni", "Sorsi"], pl: ["Profil", "Opakowania", "Ocena", "Źródła"],
  pt: ["Perfil", "Embalagens", "Avaliação", "Fontes"], ro: ["Profil", "Ambalaje", "Evaluare", "Surse"],
  sk: ["Profil", "Obaly", "Posúdenie", "Zdroje"], sl: ["Profil", "Embalaža", "Ocena", "Viri"],
  es: ["Perfil", "Envases", "Evaluación", "Fuentes"], sv: ["Profil", "Förpackningar", "Bedömning", "Källor"],
};

const cancelLabels: Record<Locale, string> = {
  bg: "Отмени теста", cs: "Zrušit kvíz", hr: "Otkaži kviz", da: "Annuller quizzen",
  nl: "Quiz annuleren", en: "Cancel quiz", et: "Tühista küsimustik", fi: "Peruuta kysely",
  fr: "Annuler le quiz", de: "Quiz abbrechen", el: "Ακύρωση κουίζ", hu: "Kvíz megszakítása",
  ga: "Cealaigh an tráth na gceist", it: "Annulla quiz", lv: "Atcelt testu", lt: "Atšaukti testą",
  mt: "Ikkanċella l-kwiżż", pl: "Anuluj quiz", pt: "Cancelar questionário", ro: "Anulează quizul",
  sk: "Zrušiť kvíz", sl: "Prekliči kviz", es: "Cancelar cuestionario", sv: "Avbryt quizet",
};

const details: Record<Locale, readonly [string, string, string, string, string, string, string, string, string]> = {
  bg: ["Приоритетни действия", "Възможни изключения", "Липсваща информация", "Документи от доставчици", "Обхват", "Срок", "Условия", "Липсващи данни", "Сподели теста"],
  cs: ["Prioritní kroky", "Možné výjimky", "Chybějící informace", "Dokumenty od dodavatelů", "Rozsah", "Termín", "Podmínky", "Chybějící údaje", "Sdílet kvíz"],
  hr: ["Prioritetne radnje", "Moguća izuzeća", "Podaci koji nedostaju", "Dokumenti dobavljača", "Opseg", "Rok", "Uvjeti", "Podaci koji nedostaju", "Podijeli kviz"],
  da: ["Prioriterede handlinger", "Mulige undtagelser", "Manglende oplysninger", "Dokumenter fra leverandører", "Omfang", "Frist", "Betingelser", "Manglende data", "Del quiz"],
  nl: ["Prioritaire acties", "Mogelijke uitzonderingen", "Ontbrekende informatie", "Documenten van leveranciers", "Reikwijdte", "Termijn", "Voorwaarden", "Ontbrekende gegevens", "Deel quiz"],
  en: ["Priority actions", "Possible exemptions", "Missing information", "Supplier documents", "Scope", "Deadline", "Conditions", "Missing data", "Share quiz"],
  et: ["Esmased tegevused", "Võimalikud erandid", "Puuduv teave", "Tarnijate dokumendid", "Ulatus", "Tähtaeg", "Tingimused", "Puuduvad andmed", "Jaga küsimustikku"],
  fi: ["Ensisijaiset toimet", "Mahdolliset poikkeukset", "Puuttuvat tiedot", "Toimittajien asiakirjat", "Soveltamisala", "Määräaika", "Ehdot", "Puuttuvat tiedot", "Jaa kysely"],
  fr: ["Actions prioritaires", "Exemptions possibles", "Informations manquantes", "Documents fournisseurs", "Périmètre", "Échéance", "Conditions", "Données manquantes", "Partager le quiz"],
  de: ["Vorrangige Maßnahmen", "Mögliche Ausnahmen", "Fehlende Angaben", "Lieferantendokumente", "Umfang", "Frist", "Bedingungen", "Fehlende Daten", "Quiz teilen"],
  el: ["Δράσεις προτεραιότητας", "Πιθανές εξαιρέσεις", "Ελλιπή στοιχεία", "Έγγραφα προμηθευτών", "Πεδίο", "Προθεσμία", "Προϋποθέσεις", "Ελλιπή δεδομένα", "Κοινοποίηση κουίζ"],
  hu: ["Elsődleges teendők", "Lehetséges mentességek", "Hiányzó információk", "Beszállítói dokumentumok", "Hatókör", "Határidő", "Feltételek", "Hiányzó adatok", "Kvíz megosztása"],
  ga: ["Gníomhartha tosaíochta", "Díolúintí féideartha", "Faisnéis ar iarraidh", "Doiciméid soláthraithe", "Raon feidhme", "Spriocdháta", "Coinníollacha", "Sonraí ar iarraidh", "Roinn an tráth na gceist"],
  it: ["Azioni prioritarie", "Possibili esenzioni", "Informazioni mancanti", "Documenti da richiedere ai fornitori", "Perimetro", "Scadenza", "Condizioni", "Dati mancanti", "Condividi il quiz"],
  lv: ["Prioritārās darbības", "Iespējamie izņēmumi", "Trūkstošā informācija", "Piegādātāju dokumenti", "Tvērums", "Termiņš", "Nosacījumi", "Trūkstošie dati", "Dalīties ar testu"],
  lt: ["Prioritetiniai veiksmai", "Galimos išimtys", "Trūkstama informacija", "Tiekėjų dokumentai", "Apimtis", "Terminas", "Sąlygos", "Trūkstami duomenys", "Dalintis testu"],
  mt: ["Azzjonijiet prijoritarji", "Eżenzjonijiet possibbli", "Informazzjoni nieqsa", "Dokumenti tal-fornituri", "Ambitu", "Skadenza", "Kundizzjonijiet", "Dejta nieqsa", "Aqsam il-kwiżż"],
  pl: ["Działania priorytetowe", "Możliwe wyjątki", "Brakujące informacje", "Dokumenty od dostawców", "Zakres", "Termin", "Warunki", "Brakujące dane", "Udostępnij quiz"],
  pt: ["Ações prioritárias", "Possíveis isenções", "Informação em falta", "Documentos dos fornecedores", "Âmbito", "Prazo", "Condições", "Dados em falta", "Partilhar questionário"],
  ro: ["Acțiuni prioritare", "Posibile exceptări", "Informații lipsă", "Documente de la furnizori", "Domeniu", "Termen", "Condiții", "Date lipsă", "Distribuie quizul"],
  sk: ["Prioritné kroky", "Možné výnimky", "Chýbajúce informácie", "Dokumenty dodávateľov", "Rozsah", "Termín", "Podmienky", "Chýbajúce údaje", "Zdieľať kvíz"],
  sl: ["Prednostni ukrepi", "Možne izjeme", "Manjkajoče informacije", "Dokumenti dobaviteljev", "Obseg", "Rok", "Pogoji", "Manjkajoči podatki", "Deli kviz"],
  es: ["Acciones prioritarias", "Posibles exenciones", "Información pendiente", "Documentos de proveedores", "Alcance", "Plazo", "Condiciones", "Datos pendientes", "Compartir cuestionario"],
  sv: ["Prioriterade åtgärder", "Möjliga undantag", "Saknad information", "Leverantörsdokument", "Omfattning", "Tidsfrist", "Villkor", "Saknade uppgifter", "Dela quiz"],
};

const reportWords: Record<Locale, readonly [string, string, string, string]> = {
  bg: ["Хронологичен план", "Приложимо", "Възможно", "Информация въз основа на предоставените отговори; не удостоверява съответствие. Обхват: ЕС; националните правила изискват проверка."],
  cs: ["Časový plán", "Platí", "Možné", "Informativní orientace podle poskytnutých odpovědí; nejde o potvrzení souladu. Rozsah: EU; vnitrostátní pravidla je třeba ověřit."],
  hr: ["Vremenski plan", "Primjenjivo", "Moguće", "Informativne smjernice prema danim odgovorima; ne potvrđuju usklađenost. Obuhvat: EU; nacionalna pravila treba provjeriti."],
  da: ["Tidsplan", "Gælder", "Muligt", "Vejledende oplysninger baseret på svarene; ikke en certificering af overholdelse. Omfang: EU; nationale regler skal kontrolleres."],
  nl: ["Tijdlijn", "Van toepassing", "Mogelijk", "Informatieve oriëntatie op basis van uw antwoorden; geen certificering van naleving. Reikwijdte: EU; nationale regels moeten worden gecontroleerd."],
  en: ["Timeline", "Applies", "Possible", "Informational guidance based on your answers; this is not a compliance certification. EU scope; national rules require verification."],
  et: ["Ajajoon", "Kohaldub", "Võimalik", "Vastustel põhinev informatiivne suunis; see ei tõenda nõuetele vastavust. ELi ulatus; riiklikke eeskirju tuleb kontrollida."],
  fi: ["Aikataulu", "Soveltuu", "Mahdollinen", "Vastauksiin perustuva alustava tieto; ei vaatimustenmukaisuuden todistus. Soveltamisala EU; kansalliset säännöt on tarkistettava."],
  fr: ["Calendrier", "Applicable", "Possible", "Orientation informative fondée sur vos réponses ; ne certifie pas la conformité. Portée UE ; les règles nationales restent à vérifier."],
  de: ["Zeitplan", "Anwendbar", "Möglich", "Informative Orientierung anhand Ihrer Antworten; keine Bescheinigung der Konformität. EU-Geltungsbereich; nationale Regeln sind zu prüfen."],
  el: ["Χρονοδιάγραμμα", "Εφαρμόζεται", "Πιθανό", "Ενημερωτική καθοδήγηση βάσει των απαντήσεων· δεν αποτελεί πιστοποίηση συμμόρφωσης. Πεδίο ΕΕ· οι εθνικοί κανόνες χρειάζονται έλεγχο."],
  hu: ["Ütemterv", "Alkalmazandó", "Lehetséges", "A válaszokon alapuló tájékoztató útmutatás; nem megfelelőségi tanúsítvány. Uniós hatókör; a nemzeti szabályokat ellenőrizni kell."],
  ga: ["Amlíne", "Infheidhme", "Féideartha", "Treoir faisnéise bunaithe ar na freagraí; ní deimhniú comhlíonta í. Raon AE; ní mór rialacha náisiúnta a fhíorú."],
  it: ["Roadmap cronologica", "Applicabile", "Possibile", "Orientamento informativo basato sulle risposte fornite; non costituisce una certificazione di conformità. Copertura UE; norme nazionali da verificare."],
  lv: ["Laika plāns", "Piemērojams", "Iespējams", "Informatīvas vadlīnijas, balstoties uz atbildēm; tas nav atbilstības apliecinājums. ES tvērums; valstu noteikumi jāpārbauda."],
  lt: ["Laiko planas", "Taikoma", "Galima", "Informacinės gairės pagal atsakymus; tai nėra atitikties patvirtinimas. ES apimtis; nacionalines taisykles reikia patikrinti."],
  mt: ["Skeda taż-żmien", "Applikabbli", "Possibbli", "Gwida informattiva bbażata fuq it-tweġibiet; mhijiex ċertifikazzjoni ta' konformità. Ambitu tal-UE; ir-regoli nazzjonali jeħtieġu verifika."],
  pl: ["Harmonogram", "Dotyczy", "Możliwe", "Wskazówki informacyjne na podstawie odpowiedzi; nie stanowią potwierdzenia zgodności. Zakres UE; przepisy krajowe wymagają weryfikacji."],
  pt: ["Cronograma", "Aplicável", "Possível", "Orientação informativa baseada nas respostas; não certifica a conformidade. Âmbito UE; as regras nacionais exigem verificação."],
  ro: ["Calendar", "Se aplică", "Posibil", "Orientare informativă bazată pe răspunsuri; nu certifică conformitatea. Domeniu UE; normele naționale necesită verificare."],
  sk: ["Časový plán", "Platí", "Možné", "Informatívne usmernenie podľa odpovedí; nejde o potvrdenie súladu. Rozsah EÚ; vnútroštátne pravidlá treba overiť."],
  sl: ["Časovni načrt", "Velja", "Možno", "Informativna usmeritev na podlagi odgovorov; ni potrdilo o skladnosti. Obseg EU; nacionalna pravila je treba preveriti."],
  es: ["Calendario", "Aplicable", "Posible", "Orientación informativa basada en las respuestas; no certifica el cumplimiento. Alcance UE; hay que verificar las normas nacionales."],
  sv: ["Tidsplan", "Gäller", "Möjligt", "Vägledande information utifrån svaren; ingen certifiering av efterlevnad. EU-omfattning; nationella regler behöver kontrolleras."],
};

export default function Quiz({ locale, initialQuestion, demoMode }: { locale: Locale; initialQuestion: Question; demoMode?: boolean }) {
  const copy = quizCopy(locale);
  const [history, setHistory] = useState<Answer[]>([]);
  const [current, setCurrent] = useState<Question | null>(initialQuestion);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [demo, setDemo] = useState(false);
  const revision = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const lastIntent = useRef<"next" | "preliminary">("next");
  const key = `ppwr-quiz-v${SCHEMA_VERSION}-${locale}`;
  const labels = details[locale];
  const report = reportWords[locale];

  useEffect(() => {
    try {
      const saved = storedSchema.safeParse(JSON.parse(localStorage.getItem(key) || "null"));
      const storedDemo = saved.success && (saved.data.result?.demo || saved.data.current?.id.startsWith("demo-") ||
        saved.data.history.some(({ question }) => question.id.startsWith("demo-")));
      const savedHistory = saved.success ? saved.data.history.map((entry, index) =>
        index === 1 ? normalizeCountryAnswer(entry, locale) : entry) : [];
      if (saved.success && Boolean(storedDemo) === Boolean(demoMode) && saved.data.locale === locale &&
          savedHistory.every((entry) => entry && validAnswer(entry)) &&
          Date.now() - saved.data.savedAt < 7 * 86400000) {
        const restored = savedHistory as Answer[];
        const currentQuestion = saved.data.current?.factKey === "company_country" ? countryQuestion(locale)
          : saved.data.current?.factKey === "operating_countries" && restored.length === 2 ? activitiesQuestion(locale)
          : saved.data.current;
        setHistory(restored); setCurrent(currentQuestion);
        setResult(saved.data.result); setDemo(Boolean(saved.data.result?.demo));
        if (!currentQuestion && !saved.data.result && restored.length) {
          void advance(restored, "next");
        }
      } else if (saved.success && Boolean(storedDemo) !== Boolean(demoMode)) {
        localStorage.removeItem(key);
      }
    } catch { /* discard invalid browser state */ }
    setHydrated(true); emitQuizEvent("quiz_viewed");
  }, [key, locale, demoMode]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (history.length === 0 && current?.id === initialQuestion.id && !result) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify({ version: SCHEMA_VERSION, locale, savedAt: Date.now(), history, current, result }));
    }
    catch { /* the quiz still works without browser persistence */ }
  }, [hydrated, key, locale, history, current, result, initialQuestion.id]);

  async function advance(nextHistory: Answer[], intent: "next" | "preliminary") {
    controller.current?.abort();
    const abort = new AbortController(); controller.current = abort;
    const id = ++revision.current;
    lastIntent.current = intent; setLoading(true); setError("");
    try {
      const response = await fetch("/api/quiz", {
        method: "POST", signal: abort.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: SCHEMA_VERSION, locale, intent, history: nextHistory }),
      });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(copy.errorMessage);
      const parsed = responseSchema.parse(body);
      if (revision.current !== id) return;
      setDemo(parsed.demo);
      if (parsed.kind === "question" && parsed.question) setCurrent(parsed.question);
      else if (parsed.kind === "assessment" && parsed.assessment) {
        setResult({ assessment: parsed.assessment, sources: parsed.sources || [], demo: parsed.demo });
        emitQuizEvent("quiz_completed");
      } else throw new Error(copy.errorMessage);
    } catch (reason) {
      if (revision.current !== id || abort.signal.aborted) return;
      setError(reason instanceof Error && reason.message === copy.errorMessage ? reason.message : copy.errorMessage);
      emitQuizEvent("ai_error");
    } finally { if (revision.current === id) setLoading(false); }
  }

  function choose(optionId: string, exclusive: boolean) {
    if (!current || loading) return;
    if (current.selectionMode === "single" || exclusive) setSelected([optionId]);
    else setSelected((old) => {
      const withoutExclusive = old.filter((id) => !current.options.find((option) => option.id === id)?.exclusive);
      return withoutExclusive.includes(optionId) ? withoutExclusive.filter((id) => id !== optionId) : [...withoutExclusive, optionId];
    });
  }

  function submit() {
    if (!current || selected.length === 0 || loading) return;
    const nextHistory = [...history, { question: current, selectedIds: selected }];
    if (!history.length) emitQuizEvent("quiz_started");
    emitQuizEvent("question_completed");
    setHistory(nextHistory); setCurrent(null); setSelected([]); setResult(null);
    if (nextHistory.length === 1) {
      setCurrent(countryQuestion(locale));
      return;
    }
    if (!nextHistory.some(({ question }) => question.factKey === "activities") && nextHistory.length < MAX_QUESTIONS) {
      setCurrent(activitiesQuestion(locale));
      return;
    }
    void advance(nextHistory, "next");
  }

  function back() {
    controller.current?.abort(); revision.current++;
    setLoading(false); setError(""); setResult(null);
    const prior = history.at(-1);
    if (!prior) { setCurrent(initialQuestion); setSelected([]); return; }
    setHistory(history.slice(0, -1)); setCurrent(prior.question); setSelected(prior.selectedIds);
  }

  function restart() {
    controller.current?.abort(); revision.current++;
    try { localStorage.removeItem(key); } catch { /* storage may be disabled */ }
    setHistory([]); setCurrent(initialQuestion);
    setSelected([]); setResult(null); setDemo(false); setError(""); setLoading(false);
  }

  async function share() {
    const url = `${location.origin}/${locale}`;
    if (navigator.share) await navigator.share({ url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url).catch(() => undefined);
    emitQuizEvent("quiz_shared");
  }

  const canPreliminary = history.length >= 4;

  return (
    <section className="quiz-area" aria-live="polite">
      <div className="quiz-progress">
        <span>{copy.answered}: {history.length} / {MAX_QUESTIONS}</span>
        <ol>{sectionLabels[locale].slice(0, 3).map((phase, i) => <li key={phase} className={history.length >= i * 3 ? "phase-active" : ""}>{phase}</li>)}</ol>
        {!result && (history.length > 0 || selected.length > 0 || loading || error) &&
          <button className="quiz-reset" type="button" onClick={restart}>{cancelLabels[locale]}</button>}
      </div>
      {demo && <p className="demo-banner" role="status">{copy.demoMessage}</p>}
      {current && !result && <div className="question-card">
        <p className="question-index">{String(history.length + 1).padStart(2, "0")} / {MAX_QUESTIONS}</p>
        <h2>{current.title}</h2>
        {current.explanation && <p className="question-explanation">{current.explanation}</p>}
        {current.factKey === "company_country" ? <select className="country-select" aria-label={current.title}
          value={selected[0] || ""} onChange={(event) => setSelected(event.target.value ? [event.target.value] : [])} disabled={loading}>
          <option value="">—</option>
          {current.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select> : <div className="options" role="group" aria-label={current.title}>
          {current.options.map((option) => <label key={option.id} className={`option ${selected.includes(option.id) ? "option-selected" : ""}`}>
            <input type={current.selectionMode === "single" ? "radio" : "checkbox"} name={current.id}
              checked={selected.includes(option.id)} onChange={() => choose(option.id, option.exclusive)} disabled={loading} />
            <span>{option.label}</span>
          </label>)}
        </div>}
        <div className="quiz-actions">
          {history.length > 0 && <button className="button-quiet" type="button" onClick={back}>{copy.back}</button>}
          <button className="button-primary" type="button" disabled={!selected.length || loading} onClick={submit}>{copy.continueLabel}</button>
        </div>
        {canPreliminary && <button className="preliminary-link" type="button" onClick={() => { setCurrent(null); void advance(history, "preliminary"); }}>{copy.preliminary}</button>}
      </div>}
      {loading && <div className="status-card" role="status"><span className="spinner" />{copy.loading}<button className="button-quiet" type="button" onClick={back}>{copy.back}</button></div>}
      {error && <div className="status-card error-card" role="alert"><p>{error}</p><div className="quiz-actions"><button className="button-quiet" type="button" onClick={back}>{copy.back}</button>{canPreliminary && <button className="button-quiet" type="button" onClick={() => void advance(history, "preliminary")}>{copy.preliminary}</button>}<button className="button-primary" type="button" onClick={() => void advance(history, lastIntent.current)}>{copy.retry}</button></div></div>}
      {result && <div className="report-card">
        <p className="eyebrow">{copy.resultTitle}</p>
        <h2>{sectionLabels[locale][2]}</h2>
        <p>{result.assessment.profile}</p>
        <h3>{labels[4]}</h3><p>{result.assessment.scope}</p>
        <h3>{report[0]}</h3>
        <ol>{[...result.assessment.actions].sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999")).map((action, i) => <li key={`${action.title}-${i}`}>{action.dueDate ? <time dateTime={action.dueDate}>{action.dueDate}</time> : copy.verify} — {action.title}</li>)}</ol>
        <h3>{labels[0]}</h3>
        {result.assessment.actions.length ? <ol className="action-list">{result.assessment.actions.map((action, i) => <li key={`${action.title}-${i}`}>
          <h4>{action.title}</h4><p>{action.explanation}</p>
          <p><strong>{action.applicability === "verify" ? copy.verify : action.applicability === "applies" ? report[1] : report[2]}</strong> · {labels[5]}: {action.dueDate || copy.verify}{action.timingNote ? ` · ${action.timingNote}` : ""}</p>
          {action.conditions && <p>{labels[6]}: {action.conditions}</p>}
          {action.missingData.length > 0 && <p>{labels[7]}: {action.missingData.join(", ")}</p>}
          {action.sourceIds.map((id) => { const source = result.sources.find((item) => item.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer">{source.title} · {source.article} ↗</a> : null; })}
        </li>)}</ol> : <p>{copy.verify}</p>}
        {result.assessment.possibleExemptions.length > 0 && <><h3>{labels[1]}</h3><ul>{result.assessment.possibleExemptions.map((item, i) => <li key={i}>{item.text}{item.sourceIds.length === 0 && ` · ${copy.verify}`}{item.sourceIds.map((id) => { const source = result.sources.find((entry) => entry.id === id); return source ? <span key={id}> · <a href={source.url} target="_blank" rel="noreferrer">{source.article} ↗</a></span> : null; })}</li>)}</ul></>}
        {result.assessment.missingInformation.length > 0 && <><h3>{labels[2]}</h3><ul>{result.assessment.missingInformation.map((item) => <li key={item}>{item}</li>)}</ul></>}
        {result.assessment.supplierDocuments.length > 0 && <><h3>{labels[3]}</h3><ul>{result.assessment.supplierDocuments.map((item) => <li key={item}>{item}</li>)}</ul></>}
        <h3>{sectionLabels[locale][3]}</h3><ul>{result.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title} · {source.article} ↗</a></li>)}</ul>
        <p className="disclaimer">{report[3]}</p>
        <div className="quiz-actions report-actions"><button className="button-quiet" type="button" onClick={back}>{copy.back}</button><button className="button-quiet" type="button" onClick={() => window.print()}>{copy.print}</button><button className="button-quiet" type="button" onClick={() => void share()}>{labels[8]}</button><button className="button-primary" type="button" onClick={restart}>{copy.restart}</button></div>
      </div>}
    </section>
  );
}
