import { z } from "zod";

export const MAX_QUESTIONS = 20;
export const SCHEMA_VERSION = 2;

export const optionSchema = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,48}$/),
  label: z.string().trim().min(1).max(180),
  value: z.object({
    code: z.string().regex(/^[a-z0-9_-]{1,64}$/),
    min: z.number().finite().nullable(),
    max: z.number().finite().nullable(),
    unit: z.string().max(24).nullable(),
  }),
  exclusive: z.boolean(),
});

export const questionSchema = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,64}$/),
  factKey: z.string().regex(/^[a-z0-9_-]{1,64}$/),
  title: z.string().trim().min(1).max(240),
  explanation: z.string().max(420),
  selectionMode: z.enum(["single", "multiple"]),
  options: z.array(optionSchema).min(2).max(250),
});

export const answerSchema = z.object({
  question: questionSchema,
  selectedIds: z.array(z.string()).min(1).max(12),
});

export const actionSchema = z.object({
  title: z.string().min(1).max(180),
  explanation: z.string().max(600),
  applicability: z.enum(["applies", "possible", "verify"]),
  dueDate: z.string().nullable(),
  timingNote: z.string().max(220),
  conditions: z.string().max(400),
  missingData: z.array(z.string().max(150)).max(8),
  sourceIds: z.array(z.string().max(64)).max(5),
});

export const assessmentSchema = z.object({
  profile: z.string().max(700),
  scope: z.string().max(500),
  actions: z.array(actionSchema).max(8),
  possibleExemptions: z.array(z.object({
    text: z.string().max(250), sourceIds: z.array(z.string().max(64)).max(5),
  })).max(8),
  missingInformation: z.array(z.string().max(180)).max(12),
  supplierDocuments: z.array(z.string().max(180)).max(10),
});

export const modelOutputSchema = z.object({
  kind: z.enum(["question", "assessment"]),
  question: questionSchema.nullable(),
  assessment: assessmentSchema.nullable(),
});

export const requestSchema = z.object({
  version: z.literal(SCHEMA_VERSION),
  locale: z.string().min(2).max(2),
  intent: z.enum(["next", "preliminary"]),
  history: z.array(answerSchema).min(1).max(MAX_QUESTIONS),
});

export type Question = z.infer<typeof questionSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type QuizRequest = z.infer<typeof requestSchema>;

export function validQuestion(question: Question): boolean {
  const options = question.options;
  if (question.factKey !== "company_country" && options.length > 12) return false;
  if (new Set(options.map((option) => option.id)).size !== options.length) return false;
  if (!options.every(({ value }) => value.min === null || value.max === null || value.min <= value.max)) return false;
  return options.every(({ value, exclusive }) =>
    !["unknown", "none", "none_of_above"].includes(value.code) || exclusive,
  );
}

export function validAnswer(answer: Answer): boolean {
  if (!validQuestion(answer.question)) return false;
  const ids = new Set(answer.selectedIds);
  if (ids.size !== answer.selectedIds.length) return false;
  if (answer.question.selectionMode === "single" && ids.size !== 1) return false;
  const options = answer.question.options;
  if (![...ids].every((id) => options.some((option) => option.id === id))) return false;
  if (options.some((option) => ids.has(option.id) && option.exclusive) && ids.size !== 1) return false;
  return true;
}

// Only thresholds represented by a reviewed source extract belong here.
const sourcedThresholds: Record<string, number[]> = { empty_space_ratio_percent: [50] };

export function respectsKnownThresholds(question: Question): boolean {
  const thresholds = sourcedThresholds[question.factKey] || [];
  return question.options.every(({ value }) => thresholds.every((threshold) =>
    value.min === null || value.max === null || !(value.min <= threshold && value.max > threshold),
  ));
}
