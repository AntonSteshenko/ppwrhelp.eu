import type { Locale } from "@/i18n/locales";
import type { Question } from "./schema";
import { unknownLabel } from "./country";

// The labels express predicates, so no numeric interval straddles the 50% boundary.
export function emptySpaceThresholdQuestion(proposed: Question, locale: Locale): Question {
  const options = [
    { id: "at_most_50", label: "≤ 50%", value: { code: "at_most_50", min: null, max: null, unit: null }, exclusive: false },
    { id: "over_50", label: "> 50%", value: { code: "over_50", min: null, max: null, unit: null }, exclusive: false },
    { id: "unknown", label: unknownLabel(locale), value: { code: "unknown", min: null, max: null, unit: null }, exclusive: true },
  ];
  return { ...proposed, id: "empty_space_threshold", factKey: "empty_space_ratio_percent",
    selectionMode: "single", options };
}
