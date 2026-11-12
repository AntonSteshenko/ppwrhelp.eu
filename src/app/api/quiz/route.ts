import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isLocale, locales } from "@/i18n/locales";
import { firstQuestion } from "@/quiz/copy";
import { countryQuestion, marketScopeQuestion, normalizeCountryAnswer } from "@/quiz/country";
import { activitiesQuestion } from "@/quiz/activities";
import { emptySpaceThresholdQuestion } from "@/quiz/threshold-question";
import { PROMPT_VERSION, SYSTEM_PROMPT } from "@/quiz/prompt";
import { parseProviderAssessment, parseProviderQuestion, providerAssessmentJsonSchema, providerQuestionJsonSchema } from "@/quiz/provider-schema";
import { MAX_QUESTIONS, requestSchema, respectsKnownThresholds, validAnswer, validQuestion } from "@/quiz/schema";
import { sourceById, sources } from "@/quiz/sources";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 64_000;
const essential = ["sector", "company_country", "activities", "packaging_role"];

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

function demoQuestion(index: number, locale: string) {
  const english = [
    ["company_country", "Where is the business established?", ["In an EU country", "Outside the EU", "I don't know"]],
    ["operating_countries", "In which countries does the business operate?", ["One EU country", "Several EU countries", "Outside the EU", "I don't know"]],
    ["activities", "What does the business actually do with packaged products?", ["Manufacture", "Fill or pack", "Sell or distribute", "Transport", "I don't know"]],
    ["packaging_role", "How does the business obtain packaging?", ["Make it", "Buy it", "Import it", "I don't know"]],
  ] as const;
  const italian = [
    ["company_country", "In quale Paese ha sede l’azienda?", ["In un Paese UE", "Fuori dall’UE", "Non so"]],
    ["operating_countries", "In quali Paesi opera l’azienda?", ["Un Paese UE", "Più Paesi UE", "Fuori dall’UE", "Non so"]],
    ["activities", "Quali attività svolge effettivamente l’azienda con prodotti imballati?", ["Produce", "Riempie o confeziona", "Vende o distribuisce", "Trasporta", "Non so"]],
    ["packaging_role", "Come si procura gli imballaggi l’azienda?", ["Li produce", "Li acquista", "Li importa", "Non so"]],
  ] as const;
  const data = locale === "it" ? italian : english;
  const [factKey, title, labels] = data[Math.min(index - 1, data.length - 1)];
  return {
    kind: "question" as const, assessment: null,
    question: {
      id: `demo-${factKey}`, factKey, title, explanation: locale === "it" ? "Domanda demo: non viene generata una valutazione legale." : "Demo question — no legal assessment is generated.",
      selectionMode: "multiple" as const,
      options: labels.map((label, i) => ({
        id: `demo-${i}`, label, value: { code: `demo_${i}`, min: null, max: null, unit: null },
        exclusive: i === labels.length - 1,
      })),
    },
  };
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return error("Request too large", 413);
  let body: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return error("Request too large", 413);
    body = JSON.parse(text);
  } catch { return error("Invalid JSON", 400); }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success || !isLocale(parsed.data.locale)) return error("Invalid quiz request", 400);
  const { locale, history: rawHistory, intent } = parsed.data;
  if (JSON.stringify(rawHistory[0].question) !== JSON.stringify(firstQuestion(locale))) return error("Invalid first question", 400);
  if (!rawHistory.every(validAnswer)) return error("Invalid answer", 400);
  const normalizedCountry = rawHistory.length > 1 ? normalizeCountryAnswer(rawHistory[1], locale) : null;
  if (rawHistory.length > 1 && !normalizedCountry) return error("Invalid country question", 400);
  const history = rawHistory.map((entry, index) => index === 1 ? normalizedCountry! : entry);
  const fixedActivities = history.find(({ question }) => question.id === "fixed_activities");
  if (fixedActivities && JSON.stringify(fixedActivities.question) !== JSON.stringify(activitiesQuestion(locale))) {
    return error("Invalid activities question", 400);
  }
  const fixedMarkets = history.find(({ question }) => question.id === "market_scope");
  if (fixedMarkets && JSON.stringify(fixedMarkets.question) !== JSON.stringify(marketScopeQuestion(locale))) {
    return error("Invalid markets question", 400);
  }
  if (new Set(history.map((entry) => entry.question.id)).size !== history.length ||
      new Set(history.map((entry) => entry.question.factKey)).size !== history.length) return error("Repeated question", 400);

  if (history.length === 1 && intent === "next") return NextResponse.json({
    kind: "question", question: countryQuestion(locale), assessment: null, demo: false,
  }, { headers: { "Cache-Control": "no-store" } });

  const facts = new Set(history.map(({ question }) => question.factKey));
  const canAssess = essential.every((key) => facts.has(key));
  if (intent === "preliminary" && history.length < 4) return error("More answers required", 400);
  const mustAssess = intent === "preliminary" || history.length >= MAX_QUESTIONS;

  if (!mustAssess && !facts.has("activities")) {
    return NextResponse.json({ kind: "question", question: activitiesQuestion(locale), assessment: null, demo: false },
      { headers: { "Cache-Control": "no-store" } });
  }

  if (process.env.QUIZ_DEMO_MODE === "true" && process.env.NODE_ENV !== "production") {
    if (mustAssess || history.length >= 4) return NextResponse.json({
      kind: "assessment", question: null, demo: true,
      assessment: { profile: "DEMO — no real legal assessment", scope: "Simulated result for interface testing only", actions: [], possibleExemptions: [], missingInformation: ["A real OpenRouter request and reviewed sources are required"], supplierDocuments: [] },
      sources: [],
    }, { headers: { "Cache-Control": "no-store" } });
    return NextResponse.json({ ...demoQuestion(history.length + 1, locale), demo: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return error("AI is not configured", 503);
  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
  const knownSourceIds = new Set(sources.map(({ id }) => id));
  const language = locales.find(({ code }) => code === locale)?.nativeName || locale;
  const userContent = JSON.stringify({
    locale, language, promptVersion: PROMPT_VERSION, questionCount: history.length,
    maxQuestions: MAX_QUESTIONS, outputType: mustAssess ? "assessment" : "question",
    essentialMissing: essential.filter((key) => !facts.has(key)),
    history: history.map(({ question, selectedIds }) => {
      const canonical = question.factKey === "company_country" ? countryQuestion(locale) : question;
      return {
        factKey: canonical.factKey, question: canonical.title,
        selected: canonical.options.filter(({ id }) => selectedIds.includes(id)).map(({ id, label, value }) => ({ id, label, value })),
      };
    }),
    sources: sources.map(({ id, title, kind, article, excerpt, contextSummary }) => ({ id, title, kind, article, excerpt, contextSummary })),
  });
  const schema = mustAssess ? providerAssessmentJsonSchema : providerQuestionJsonSchema;
  for (let attempt = 0; attempt < 2; attempt++) {
    let response: Response;
    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST", signal: AbortSignal.timeout(20_000),
        headers: {
          Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://www.ppwrhelp.eu",
          "X-OpenRouter-Title": "ppwrhelp.eu",
        },
        body: JSON.stringify({
          model, temperature: 0.2, max_tokens: 4000,
          provider: { require_parameters: true },
          response_format: { type: "json_schema", json_schema: { name: mustAssess ? "ppwr_assessment" : "ppwr_question", strict: true, schema } },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Return only a ${mustAssess ? "preliminary assessment" : "single next question"} object in the required JSON Schema. ${userContent}` + (attempt ? " Previous output was invalid; repair it and follow the schema exactly." : "") },
          ],
        }),
      });
    } catch { return error("AI request timed out or failed", 502); }
    if (!response.ok) {
      if (response.status === 429) return error("AI rate limit reached. Retry later.", 429);
      return error("AI provider unavailable", 502);
    }
    try {
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      const output: unknown = JSON.parse(content);
      if (!mustAssess) {
        const proposedQuestion = parseProviderQuestion(output);
        const question = ["operating_countries", "sales_country", "sales_countries", "market_countries"].includes(proposedQuestion.factKey) ? marketScopeQuestion(locale)
          : proposedQuestion.factKey === "empty_space_ratio_percent" ? emptySpaceThresholdQuestion(proposedQuestion, locale)
          : proposedQuestion;
        if (validQuestion(question) && respectsKnownThresholds(question) &&
            !facts.has(question.factKey) && history.length < MAX_QUESTIONS) {
          return NextResponse.json({ kind: "question", question, assessment: null, demo: false }, { headers: { "Cache-Control": "no-store" } });
        }
        if (process.env.NODE_ENV !== "production") console.warn("Quiz question rejected " + JSON.stringify({ factKey: question.factKey }));
        continue;
      }
      const assessment = parseProviderAssessment(output);
      if (canAssess || mustAssess) {
        if (assessment.actions.some((action) => action.sourceIds.some((id) => !knownSourceIds.has(id))) ||
            assessment.possibleExemptions.some((item) => item.sourceIds.some((id) => !knownSourceIds.has(id)))) continue;
        const actions = assessment.actions.map((action) => ({
          ...action,
          applicability: action.sourceIds.some((id) => sourceById[id].kind === "law") ? action.applicability : "verify",
          dueDate: action.dueDate && action.sourceIds.some((id) => sourceById[id].verifiedDates.includes(action.dueDate!)) ? action.dueDate : null,
        }));
        const usedIds = new Set([...actions.flatMap(({ sourceIds }) => sourceIds),
          ...assessment.possibleExemptions.flatMap(({ sourceIds }) => sourceIds)]);
        return NextResponse.json({ kind: "assessment", question: null, assessment: { ...assessment, actions }, demo: false,
          sources: [...usedIds].map((id) => sourceById[id]),
        }, { headers: { "Cache-Control": "no-store" } });
      }
    } catch (reason) {
      if (process.env.NODE_ENV !== "production") console.warn("Quiz output invalid " + JSON.stringify(reason instanceof z.ZodError ? reason.issues.map((issue) => ({ path: issue.path.join("."), code: issue.code })) : reason instanceof Error ? reason.name : "unknown"));
    }
  }
  return error("AI returned invalid output", 502);
}
