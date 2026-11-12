# Adaptive PPWR quiz

## Audience and scope
Businesses seeking an initial orientation on EU PPWR duties. Replace the current homepage with a question-led journey in the 24 existing EU locales. The URL/browser selects language; it cannot change during a quiz. EU-level source coverage only; national rules remain explicitly unverified.

## User stories and acceptance
1. A visitor sees the localized SEO heading and fixed sector question in initial HTML, with no AI call, and can answer it by keyboard or touch.
2. A visitor answers at most twenty closed questions total. The first three questions are fixed: sector, establishment country in a localized EU-country select, and a multiple-choice question about actual activities. AI picks later questions from previous answers when adaptation is needed; multiple activities, unknown values, and threshold-crossing ranges are handled without deriving legal role from sector alone. A preliminary result can be requested once at least four questions have been answered, with missing facts clearly marked.
3. Going back and changing an answer removes all later answers/results. Stale or parallel responses cannot overwrite the current path. Local browser state is versioned and deletable.
4. A report separates applicable duties, possible exemptions, dates, missing data, supplier documents and sources. It never certifies compliance. Unsupported claims, dates and country-specific matters are marked "Da verificare".
5. OpenRouter is server-only. Requests and structured output are validated; timeout, provider failure and invalid JSON show retry without lost answers. A no-key demo is visibly simulated.
6. The 24 localized public URLs retain canonical, hreflang, sitemap and robots. Personal reports are never in public URLs. Analytics receives events only, never answers or profiles.

## Constraints
No accounts, email collection, payments, Redis or automatic deployment. Maximum twenty questions including the fixed first question. No free-text input. Request size and per-path call count are bounded; distributed traffic protection is deferred and must not be claimed. The current production analytics script remains.

## Sources
The server corpus starts with Regulation (EU) 2025/40 (OJ 22 January 2025), Commission guidance (2026), and Commission PPWR resources. Each stored extract has source identity, official URL, jurisdiction, retrieval date, optional actual review date, article/context and text. Legal conclusions must reference server-supplied source IDs and distinguish law from guidance and interpretation.
