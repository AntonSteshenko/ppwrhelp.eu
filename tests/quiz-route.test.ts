import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { firstQuestion } from "@/quiz/copy";
import { countryQuestion } from "@/quiz/country";
import { activitiesQuestion } from "@/quiz/activities";
import { POST } from "@/app/api/quiz/route";
import { SCHEMA_VERSION, type Answer } from "@/quiz/schema";

const first: Answer = { question: firstQuestion("it"), selectedIds: ["services"] };
const second: Answer = { question: countryQuestion("it"), selectedIds: ["it"] };
const third: Answer = { question: activitiesQuestion("it"), selectedIds: ["uses_packaging"] };

function request(history: Answer[], intent: "next" | "preliminary" = "next") {
  return new NextRequest("http://localhost:3000/api/quiz", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version: SCHEMA_VERSION, locale: "it", intent, history }),
  });
}

describe("quiz API", () => {
  beforeEach(() => { vi.stubEnv("QUIZ_DEMO_MODE", "true"); });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it("enforces essential facts before a preliminary assessment", async () => {
    const response = await POST(request([first], "preliminary"));
    expect(response.status).toBe(400);
  });

  it("returns the full country select without calling OpenRouter", async () => {
    const provider = vi.fn();
    vi.stubGlobal("fetch", provider);
    const response = await POST(request([first]));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.question.factKey).toBe("company_country");
    expect(body.question.options.find((option: { id: string }) => option.id === "it").label).toBe("Italia");
    expect(body.question.options.length).toBe(29);
    expect(body.question.options.some((option: { id: string }) => option.id === "gb")).toBe(false);
    expect(provider).not.toHaveBeenCalled();
  });

  it("walks through the explicit demo without presenting legal actions", async () => {
    const history = [first, second];
    for (const fact of ["activities", "packaging_role"]) {
      const response = await POST(request(history));
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.demo).toBe(fact === "packaging_role");
      expect(body.question.factKey).toBe(fact);
      history.push({ question: body.question, selectedIds: [body.question.options[0].id] });
    }
    const result = await (await POST(request(history, "preliminary"))).json();
    expect(result.kind).toBe("assessment");
    expect(result.demo).toBe(true);
    expect(result.assessment.actions).toEqual([]);
  });

  it("rejects oversized or malformed requests", async () => {
    const oversized = new NextRequest("http://localhost:3000/api/quiz", { method: "POST", body: "x".repeat(64001) });
    expect((await POST(oversized)).status).toBe(413);
    const invalid = request([{ ...first, selectedIds: ["services", "unknown"] }]);
    expect((await POST(invalid)).status).toBe(400);
  });

  it("rejects unknown source references rather than displaying them", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    const history = [first, second, ...["operating_countries", "activities", "packaging_role"].map((factKey) => ({
      question: {
        id: factKey, factKey, title: factKey, explanation: "", selectionMode: "single" as const,
        options: [
          { id: "yes", label: "Yes", value: { code: "yes", min: null, max: null, unit: null }, exclusive: false },
          { id: "no", label: "No", value: { code: "no", min: null, max: null, unit: null }, exclusive: false },
        ],
      }, selectedIds: ["yes"],
    }))];
    const output = {
        profile: "Test", scope: "EU", actions: [{
          title: "Unsupported claim", explanation: "Test", applicability: "applies", dueDate: "",
          timingNote: "", conditions: "", missingData: [], sourceIds: ["invented-source"],
        }], possibleExemptions: [], missingInformation: [], supplierDocuments: [],
    };
    const mock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(output) } }] }) });
    vi.stubGlobal("fetch", mock);
    const response = await POST(request(history, "preliminary"));
    expect(response.status).toBe(502);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("returns a provider error without inventing a result", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    expect((await POST(request([first, second, third]))).status).toBe(429);
  });

  it("accepts a structured OpenRouter question and keeps its Italian text", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    const output = {
      id: "packaging_role", factKey: "packaging_role", title: "Quale ruolo ha l’azienda nella filiera?",
      explanation: "", selectionMode: "single", options: [
        { id: "eu", label: "In un Paese UE", code: "eu", min: 0, max: 0, unit: "", exclusive: false },
        { id: "unknown", label: "Non so", code: "unknown", min: 0, max: 0, unit: "", exclusive: true },
      ],
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(output) } }] }) }));
    const response = await POST(request([first, second, third]));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.demo).toBe(false);
    expect(body.question.title).toBe(output.title);
    expect(body.question.options[0].value).toEqual({ code: "eu", min: null, max: null, unit: null });
  });

  it("turns a threshold-crossing AI question into unambiguous closed answers", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    const role: Answer = { question: {
      id: "packaging_role", factKey: "packaging_role", title: "Ruolo?", explanation: "", selectionMode: "single",
      options: [
        { id: "buyer", label: "Acquirente", value: { code: "buyer", min: null, max: null, unit: null }, exclusive: false },
        { id: "unknown", label: "Non so", value: { code: "unknown", min: null, max: null, unit: null }, exclusive: true },
      ],
    }, selectedIds: ["buyer"] };
    const output = { id: "empty_space", factKey: "empty_space_ratio_percent", title: "Quanto spazio vuoto ha l’imballaggio?",
      explanation: "", selectionMode: "single", options: [
        { id: "low", label: "0–50%", code: "low", min: 0, max: 50, unit: "%", exclusive: false },
        { id: "high", label: "50–100%", code: "high", min: 50, max: 100, unit: "%", exclusive: false },
      ] };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(output) } }] }) }));
    const response = await POST(request([first, second, third, role]));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.question.options.map((option: { label: string }) => option.label)).toEqual(["≤ 50%", "> 50%", "Non so"]);
  });

  it("replaces partial country lists with complete market categories", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    const output = { id: "sales_country", factKey: "sales_country", title: "In quali Paesi vendi?",
      explanation: "", selectionMode: "multiple", options: [
        { id: "at", label: "Austria", code: "at", min: 0, max: 0, unit: "", exclusive: false },
        { id: "be", label: "Belgio", code: "be", min: 0, max: 0, unit: "", exclusive: false },
      ] };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(output) } }] }) }));
    const response = await POST(request([first, second, third]));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.question.factKey).toBe("operating_countries");
    expect(body.question.options.map((option: { id: string }) => option.id)).toEqual(["establishment_only", "other_eu", "outside_eu", "unknown"]);
  });

  it("allows questions after ten answers and assesses after twenty", async () => {
    vi.stubEnv("QUIZ_DEMO_MODE", "false");
    vi.stubEnv("OPENROUTER_API_KEY", "test-key");
    const extra = Array.from({ length: 17 }, (_, i) => ({
      question: {
        id: `q${i}`, factKey: `fact_${i}`, title: `Question ${i}`, explanation: "",
        selectionMode: "single" as const,
        options: [
          { id: "yes", label: "Yes", value: { code: "yes", min: null, max: null, unit: null }, exclusive: false },
          { id: "no", label: "No", value: { code: "no", min: null, max: null, unit: null }, exclusive: false },
        ],
      }, selectedIds: ["yes"],
    }));
    const history = [first, second, third, ...extra];
    const nextQuestion = { id: "next_fact", factKey: "next_fact", title: "Un’altra domanda?", explanation: "",
      selectionMode: "single", options: [
        { id: "yes", label: "Sì", code: "yes", min: 0, max: 0, unit: "", exclusive: false },
        { id: "no", label: "No", code: "no", min: 0, max: 0, unit: "", exclusive: false },
      ] };
    const output = {
      profile: "Test", scope: "EU", actions: [], possibleExemptions: [],
      missingInformation: [], supplierDocuments: [],
    };
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(nextQuestion) } }] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(output) } }] }) }));
    const afterTen = await POST(request(history.slice(0, 10)));
    expect(afterTen.status).toBe(200);
    expect((await afterTen.json()).kind).toBe("question");
    const response = await POST(request(history));
    expect(response.status).toBe(200);
    expect((await response.json()).kind).toBe("assessment");
  });
});
