import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/locales";
import { firstQuestion, quizCopy } from "@/quiz/copy";
import { countryQuestion, marketScopeQuestion, normalizeCountryAnswer } from "@/quiz/country";
import { activitiesQuestion } from "@/quiz/activities";
import { respectsKnownThresholds, validAnswer, type Answer, type Question } from "@/quiz/schema";

describe("quiz data", () => {
  it("renders a complete fixed first question in every supported language", () => {
    for (const { code } of locales) {
      const question = firstQuestion(code);
      expect(quizCopy(code).headline.length).toBeGreaterThan(10);
      expect(question.options).toHaveLength(10);
      expect(question.options.every((option) => option.label.length > 0)).toBe(true);
      expect(question.options[9].exclusive).toBe(true);
    }
    expect(firstQuestion("it").title).toBe("In quale settore opera la tua azienda?");
  });

  it("offers only EU countries in the country select and closed market categories", () => {
    for (const { code } of locales) {
      const countries = countryQuestion(code);
      expect(countries.options).toHaveLength(29);
      expect(countries.options.some((option) => option.id === "it")).toBe(true);
      expect(countries.options.some((option) => option.id === "gb")).toBe(false);
      expect(countries.options.some((option) => option.id === "outside_eu")).toBe(true);
      expect(activitiesQuestion(code).options).toHaveLength(8);
      expect(marketScopeQuestion(code).options).toHaveLength(4);
    }
    const old: Answer = { question: { ...countryQuestion("it"), options: [
      ...countryQuestion("it").options,
      { id: "gb", label: "Regno Unito", value: { code: "gb", min: null, max: null, unit: null }, exclusive: false },
    ] }, selectedIds: ["gb"] };
    expect(normalizeCountryAnswer(old, "it")?.selectedIds).toEqual(["outside_eu"]);
  });

  it("rejects unknown combined with other selections and invalid numeric intervals", () => {
    const question: Question = {
      id: "activity", factKey: "activities", title: "Activities?", explanation: "",
      selectionMode: "multiple", options: [
        { id: "a", label: "A", value: { code: "a", min: 1, max: 10, unit: "units" }, exclusive: false },
        { id: "unknown", label: "Unknown", value: { code: "unknown", min: null, max: null, unit: null }, exclusive: true },
      ],
    };
    expect(validAnswer({ question, selectedIds: ["a"] })).toBe(true);
    expect(validAnswer({ question, selectedIds: ["a", "unknown"] })).toBe(false);
    expect(validAnswer({ question: { ...question, options: [{ ...question.options[0], value: { code: "a", min: 10, max: 1, unit: "units" } }, question.options[1]] }, selectedIds: ["a"] })).toBe(false);
  });

  it("requires closed intervals to stay on one side of a sourced threshold", () => {
    const question: Question = {
      id: "empty_space", factKey: "empty_space_ratio_percent", title: "Ratio?", explanation: "",
      selectionMode: "single", options: [
        { id: "below", label: "At most", value: { code: "below", min: 0, max: 50, unit: "%" }, exclusive: false },
        { id: "above", label: "Above", value: { code: "above", min: 51, max: 100, unit: "%" }, exclusive: false },
      ],
    };
    expect(respectsKnownThresholds(question)).toBe(true);
    expect(respectsKnownThresholds({ ...question, options: [
      { ...question.options[0], value: { code: "crosses", min: 40, max: 60, unit: "%" } }, question.options[1],
    ] })).toBe(false);
  });
});
