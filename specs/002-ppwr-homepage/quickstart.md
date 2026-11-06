# Quickstart: PPWR Homepage Validation

## Prerequisites

- Install repository dependencies with `npm install`.
- Ensure `NEXT_PUBLIC_SITE_URL` is unset or equals the intended production origin
  `https://www.ppwrhelp.eu` when checking canonical and sitemap URLs.
- Complete the 24-locale translation and legal review manifest before a release
  check; see [data-model.md](data-model.md).

## Build and content checks

1. Run `npm run contentcheck` and expect all 24 locales to have complete copy and
   `reviewed` translation and legal states. Type checking must identify missing
   localized fields; the manifest check must name unreviewed locales or missing
   review dates and exit nonzero when publication is not ready.
2. Run `npm run typecheck` and `npm run build`; expect 24 generated language pages.
3. Run `npm run start` and inspect `/it`, `/en`, and at least one longer-text
   language page such as `/de` or `/ga`.

## User journeys

1. On each inspected page, identify the PPWR, the site's purpose, and a next step
   within 60 seconds. Follow the overview action to its section and the legal
   action to Regulation (EU) 2025/40 on EUR-Lex in at most two actions.
2. Check that quiz, library, and news are marked as forthcoming and do not link to
   unpublished pages. Check the source title, 22 January 2025 publication date,
   Article 1 attribution, visible locale review date, and summary disclaimer.
3. Inspect all 24 generated pages for localized visible copy, title, description,
   document language, self canonical, and 24 language alternatives. Inspect
   `/sitemap.xml` for the same 24 addresses. Check the root language redirect and
   unsupported-locale missing page.
4. At 320 px, verify no horizontal scrolling, readable text, and usable language
   selection. Navigate every primary action and the language selector by keyboard;
   verify visible focus and meaningful link names.

## Editorial regression checks

- Change a legal summary or source reference in a review branch: the affected
  review status must return to `draft` before the release check passes again.
- Remove a localized field in a review branch: the content check must name the
  locale and missing field.
- Confirm metadata and any machine-readable claims match visible content; no
  preview of an unpublished area may be described as a live destination.

## Verification on 2026-11-06

- `npm run contentcheck`, `npm run typecheck`, and `npm run build` passed. The build
  generated all 24 localized homepages.
- Generated HTML for all 24 pages had the matching document language, PPWR-focused
  title and description, self canonical, 24 language alternates plus `x-default`,
  source link, review date, and no live links to the planned content areas. The
  sitemap listed all 24 URLs.
- HTTP checks returned 200 for `/it`, `/en`, and `/sitemap.xml`, 404 for `/xx`, and
  root redirects to `/it` or `/en` according to browser language.
- The statistics script was absent in development HTML and present exactly once,
  with `defer` and the requested website ID, in each production page.
- Copy and Article 1 summaries were reviewed by Codex against the Official Journal
  text. No independent native-language or legal specialist review was performed.
- A 320 px screenshot was inspected before the light orange/brown palette change.
  Visual and keyboard checks after that change were deferred at the user's request.
- Publication readiness: the automated checks pass; the deferred visual and
  keyboard checks remain the final verification limit.
