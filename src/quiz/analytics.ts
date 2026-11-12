export type QuizEvent = "quiz_viewed" | "quiz_started" | "question_completed" | "quiz_completed" | "ai_error" | "quiz_shared";

// The existing production script remains for page analytics. Its custom-event
// interface has not been verified, so quiz events are intentionally disabled.
// Never add answers, option IDs, business details, or profile text here.
export function emitQuizEvent(_event: QuizEvent): void {}
