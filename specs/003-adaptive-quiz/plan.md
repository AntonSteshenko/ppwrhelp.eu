# Implementation plan

Next.js 16 App Router and TypeScript. Use Zod for request/output schemas. Keep the first question and localized SEO copy server-rendered; hydrate a client quiz controller. One POST route accepts locale, versioned bounded history, current signed question and intent (next/preliminary); server calls OpenRouter Chat Completions with JSON Schema and provider.require_parameters. A versioned system prompt and source corpus are server-only. The client uses revision IDs and AbortController to discard stale responses. LocalStorage holds the profile; no server profile persistence. Build the result on the same locale route so it is never indexed separately. Preserve existing sitemap/robots and production analytics script. No Redis; document production traffic risk.

## Constitution check
PASS with explicit official source IDs, dated extracts, 24-language URL structure, accessible closed controls, and typecheck/build plus journey verification. Generated legal interpretations are labelled informational and are not called reviewed merely because a source was provided.
