# ppwrhelp.eu

Next.js 16 / TypeScript MVP for a multilingual PPWR orientation quiz. The sector question is rendered immediately; the country and activities questions are also fixed, then OpenRouter chooses later closed questions and prepares a preliminary report. The quiz contains **at most twenty questions**, including the first. It does not certify compliance.

## Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/it`. The URL selects the language; `/` redirects according to the browser language. Language remains fixed during a quiz. Answers and the report are saved only in browser `localStorage` for up to seven days, and **Nuovo quiz** deletes them. No profile is placed in a public URL or stored in an application database.

For development without a key, explicitly set `QUIZ_DEMO_MODE=true`. The demo asks sample questions and returns an explicitly simulated, non-legal result. Demo mode is disabled in production and defaults to `false`. For live AI, set `OPENROUTER_API_KEY` and optionally `OPENROUTER_MODEL` (default `google/gemini-2.5-flash`). The server uses OpenRouter Chat Completions with JSON Schema and `provider.require_parameters: true`; endpoint support can change and must be checked when changing the model. A missing or failing provider displays an error and retry without deleting answers.

## Configuration

| Variable | Purpose |
| --- | --- |
| `OPENROUTER_API_KEY` | Server-only OpenRouter credential; never use `NEXT_PUBLIC_` for this value. |
| `OPENROUTER_MODEL` | Model ID, default `google/gemini-2.5-flash`. |
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical, sitemap and robots; production default is `https://www.ppwrhelp.eu`. |
| `QUIZ_DEMO_MODE` | `true` only for local development without a key. |

For Coolify, build with `npm run build` and start with `npm run start`. Do not expose the OpenRouter key to the browser. Request bodies are capped at 64 KB, answer history at twenty questions, and provider calls at two attempts per step. **There is no distributed traffic or cost limit yet.** Configure external abuse protection and a provider spending cap before inviting public traffic. Redis is deliberately not part of this version.

## Sources and coverage

The server corpus in `src/quiz/sources.ts` contains selected short quotations and separate editorial context summaries from [Regulation (EU) 2025/40](https://eur-lex.europa.eu/eli/reg/2025/40/oj), the [Commission's 2026 guidance](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC03084), and [Commission PPWR resources](https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en). Each entry has an ID, official URL, jurisdiction, retrieval date, optional actual review date, and article/context. The report only resolves provided source IDs; a citation does not verify an AI interpretation. Coverage is selective and EU-level. National obligations and unresolved facts must be verified separately. Do not treat the result as legal advice or a compliance certificate.

The current production page-view script remains. Quiz event names are prepared, but their adapter is disabled until the script's custom-event API is verified. No answers or business profile are sent to analytics.

The 24 new interface translations are MVP drafts and have not received a human language review. AI-generated legal wording also requires editorial review before a public launch; the source links alone do not validate its interpretation.

## Verification

```bash
npm run test
npm run typecheck
npm run build
```

Check the quiz at `/it` and `/en`, including keyboard selection, back, preliminary result, print and mobile width. A real OpenRouter end-to-end test requires a key; the automated suite mocks provider responses.
