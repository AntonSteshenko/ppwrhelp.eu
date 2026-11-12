import { z } from "zod";
import { assessmentSchema, questionSchema } from "./schema";

const string = { type: "string" } as const;
const stringArray = { type: "array", items: string } as const;

// Small, non-nullable JSON Schemas are supported by the selected Gemini endpoint.
// The richer public contract is checked with Zod after normalization.
export const providerQuestionJsonSchema = {
  type: "object",
  properties: {
    id: string, factKey: string, title: string, explanation: string,
    selectionMode: { type: "string", enum: ["single", "multiple"] },
    options: { type: "array", minItems: 2, maxItems: 10, items: {
      type: "object",
      properties: { id: string, label: string, code: string, min: { type: "number" }, max: { type: "number" }, unit: string, exclusive: { type: "boolean" } },
      required: ["id", "label", "code", "min", "max", "unit", "exclusive"], additionalProperties: false,
    } },
  },
  required: ["id", "factKey", "title", "explanation", "selectionMode", "options"],
  additionalProperties: false,
} as const;

export const providerAssessmentJsonSchema = {
  type: "object",
  properties: {
    profile: string, scope: string,
    actions: { type: "array", items: {
      type: "object",
      properties: {
        title: string, explanation: string,
        applicability: { type: "string", enum: ["applies", "possible", "verify"] },
        dueDate: string, timingNote: string, conditions: string,
        missingData: stringArray, sourceIds: stringArray,
      },
      required: ["title", "explanation", "applicability", "dueDate", "timingNote", "conditions", "missingData", "sourceIds"],
      additionalProperties: false,
    } },
    possibleExemptions: { type: "array", items: {
      type: "object", properties: { text: string, sourceIds: stringArray },
      required: ["text", "sourceIds"], additionalProperties: false,
    } },
    missingInformation: stringArray, supplierDocuments: stringArray,
  },
  required: ["profile", "scope", "actions", "possibleExemptions", "missingInformation", "supplierDocuments"],
  additionalProperties: false,
} as const;

const providerQuestionSchema = z.object({
  id: z.string(), factKey: z.string(), title: z.string(), explanation: z.string(),
  selectionMode: z.enum(["single", "multiple"]),
  options: z.array(z.object({
    id: z.string(), label: z.string(), code: z.string(), min: z.number(), max: z.number(), unit: z.string(), exclusive: z.boolean(),
  })),
});

const providerAssessmentSchema = z.object({
  profile: z.string(), scope: z.string(),
  actions: z.array(z.object({
    title: z.string(), explanation: z.string(), applicability: z.enum(["applies", "possible", "verify"]),
    dueDate: z.string(), timingNote: z.string(), conditions: z.string(),
    missingData: z.array(z.string()), sourceIds: z.array(z.string()),
  })),
  possibleExemptions: z.array(z.object({ text: z.string(), sourceIds: z.array(z.string()) })),
  missingInformation: z.array(z.string()), supplierDocuments: z.array(z.string()),
});

const code = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

export function parseProviderQuestion(value: unknown) {
  const raw = providerQuestionSchema.parse(value);
  return questionSchema.parse({
    id: code(raw.id), factKey: code(raw.factKey), title: raw.title, explanation: raw.explanation,
    selectionMode: raw.selectionMode,
    options: raw.options.map((option) => {
      const optionCode = code(option.code);
      const isUnknown = ["unknown", "dont_know", "not_sure", "none", "none_of_above"].includes(optionCode);
      const unit = option.unit.trim();
      return {
        id: code(option.id), label: option.label,
        value: { code: optionCode, min: unit ? option.min : null, max: unit ? option.max : null, unit: unit || null },
        exclusive: option.exclusive || isUnknown,
      };
    }),
  });
}

export function parseProviderAssessment(value: unknown) {
  const raw = providerAssessmentSchema.parse(value);
  return assessmentSchema.parse({ ...raw, actions: raw.actions.map((action) => ({
    ...action, dueDate: action.dueDate.trim() || null,
  })) });
}
