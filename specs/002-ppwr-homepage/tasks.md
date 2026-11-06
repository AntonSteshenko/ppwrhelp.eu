---
description: "Dependency-ordered implementation tasks for the PPWR simple homepage"
---

# Tasks: PPWR Simple Homepage

**Input**: Design documents from `specs/002-ppwr-homepage/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/home-page.md](contracts/home-page.md)

**Organization**: Tasks are grouped by the three prioritized user stories. Verification is included because the project constitution and [quickstart.md](quickstart.md) require it; no separate test suite is requested.

## Phase 1: Setup

**Purpose**: Establish the shared source facts for the new page without changing routing or dependencies.

- [X] T001 Create `src/content/home.ts` with the language-neutral `LegalSource` (`regulation-2025-40`, Official Journal EUR-Lex URL, publication date `2025-01-22`, Article 1 reference); include Article 71 only if the homepage states an application date, and define the three `ContentAreaPreview` kinds with availability `upcoming`.

---

## Phase 2: Foundational

**Purpose**: Make complete localized content and review state explicit before any story is rendered.

- [X] T002 [P] Extend `src/i18n/messages.ts` with a typed `HomeTranslation` for each existing locale: `seoTitle`, `seoDescription`, `hero`, `overview`, `start`, `upcoming`, `sources`, and `languageLabel`; require search text to contain the PPWR topic and match visible content.
- [X] T003 [P] Create `src/content/home-review.json` with exactly one `HomeReview` per supported locale; set `translationStatus` and `legalStatus` to `draft` initially, use only `draft` or `reviewed`, and require ISO `translationReviewedAt` or `legalReviewedAt` dates only when the corresponding status is `reviewed`.
- [X] T004 Add `scripts/check-home-content.mjs` to report missing or extra locale review records, invalid statuses or dates, and every locale not yet `reviewed` for both translation and legal content; exit nonzero until all 24 are ready.
- [X] T005 Add `npm run contentcheck` in `package.json` to run `npm run typecheck` for missing typed translation fields and then `scripts/check-home-content.mjs` for the editorial release gate.

**Checkpoint**: Shared source, translation shape, and release gate are ready. The gate is expected to fail while review records remain `draft`.

---

## Phase 3: User Story 1 - Understand the PPWR quickly (Priority: P1) 🎯 MVP

**Goal**: A visitor can understand the regulation and the site's purpose quickly, then follow a working next step without encountering a false promise about future areas.

**Independent Test**: Open `/{locale}`, read the hero and overview, follow `#ppwr-overview` or the official-source action, and identify quiz, library, and news as upcoming.

- [X] T006 [US1] Write the reviewed-meaning Italian and English homepage copy in `src/i18n/messages.ts`: a localized “PPWR, explained simply” hero, short introduction, Article 1-level overview, where-to-start path, and three upcoming previews without live destination labels.
- [X] T007 [P] [US1] Complete the same `HomeTranslation` fields for the other 22 supported locales in `src/i18n/messages.ts`, preserving the Italian/English editorial meaning and keeping every upcoming preview explicitly forthcoming.
- [X] T008 [P] [US1] Replace the centered placeholder styling in `src/app/globals.css` with the agreed editorial layout: light orange/brown palette, strong hero hierarchy, scannable sections, readable contrast, visible focus, and a 320 px layout that tolerates long translations.
- [X] T009 [US1] Build the homepage structure in `src/app/[lang]/page.tsx` per `contracts/home-page.md`: header and language selector, one H1, `#ppwr-overview`, where-to-start content, three unlinked upcoming previews, and working in-page/official-source actions; keep decorative shapes hidden from assistive technology.

**Checkpoint**: The orientation journey works independently in a local preview. It is not a public release until source, localization, and review gates pass.

---

## Phase 4: User Story 2 - Verify legal information (Priority: P2)

**Goal**: A reader can identify the legal source, the cited provision, and the date of the site's review while recognizing the site's prose as a summary.

**Independent Test**: From any language page, reach the EUR-Lex act in at most two actions and inspect the source identity, publication date, Article 1 attribution, review date, and summary disclaimer.

- [X] T010 [US2] Recheck the current EUR-Lex act and any applicable amendments or guidance before publication; update claim-to-provision mapping, source identity, and dates in `src/content/home.ts` so no obligation, date, scope, or exception claim lacks a primary-source reference.
- [X] T011 [US2] After T010, review the 24 localized legal summaries against the confirmed primary source and record legal-review dates in `src/content/home-review.json` only for versions actually reviewed; keep unresolved locales as `draft` with `reviewNotes`.
- [X] T012 [US2] Add the `#official-sources` section to `src/app/[lang]/page.tsx` with the EUR-Lex title and link, 22 January 2025 source publication date, Article 1 attribution, locale legal-review date, and a localized explanation that the site's prose is a summary rather than individualized legal advice.

**Checkpoint**: Source provenance is visible and the legal-review status is truthful for every locale.

---

## Phase 5: User Story 3 - Find the page in the right language (Priority: P3)

**Goal**: All 24 equivalent homepages have faithful content and descriptive, crawlable localized metadata.

**Independent Test**: Inspect the 24 URLs and generated page metadata, switch languages, and check canonical/alternate links plus `/sitemap.xml`.

- [X] T013 [P] [US3] Replace placeholder-derived metadata in `src/app/[lang]/layout.tsx` with each locale's dedicated `seoTitle` and `seoDescription`, while preserving `<html lang>`, self canonical, all 24 language alternatives, and `x-default`.
- [X] T014 [P] [US3] Edit `src/i18n/messages.ts` so all 24 SEO titles and descriptions describe the visible PPWR overview in their own language, avoid keyword repetition, and do not advertise unpublished quiz, library, or news pages as live.
- [X] T015 [US3] Review every localized visible label and SEO field for meaning and completeness, then update `translationStatus` and ISO `translationReviewedAt` in `src/content/home-review.json` only for versions actually reviewed; keep gaps as `draft` with `reviewNotes`.
- [X] T016 [US3] Verify the locale redirect and all 24 sitemap/alternate entries in `src/proxy.ts`, `src/app/sitemap.ts`, and `src/app/[lang]/layout.tsx`; correct any regression in those files and record observed results in `specs/002-ppwr-homepage/quickstart.md`.

**Checkpoint**: The language and search journey is complete, with review gaps still visible rather than presented as approved.

---

## Phase 6: Polish and Cross-Cutting Verification

- [X] T017 Run `npm run contentcheck`, `npm run typecheck`, and `npm run build`; resolve failures and record the result or remaining editorial blockers in `specs/002-ppwr-homepage/quickstart.md`.
- [ ] T018 Verify the user journeys in `specs/002-ppwr-homepage/quickstart.md` on `/it`, `/en`, and a long-text locale, including 320 px layout, keyboard focus, source navigation, upcoming-area labels, and root/unsupported-locale behavior; record any tool or browser limits there.
- [X] T019 Inspect all 24 generated pages for localized visible copy, title, description, document language, canonical and 24 alternates, plus all 24 sitemap URLs; record the audit and publication-readiness decision in `specs/002-ppwr-homepage/quickstart.md`.
- [X] T020 Render the requested deferred statistics script with website ID `ab06f477-01a5-4c03-a6f9-4b818db10262` only in production from `src/app/[lang]/layout.tsx`; verify its presence in production-generated HTML and absence in development rendering, recording the result in `specs/002-ppwr-homepage/quickstart.md`.

## Dependencies & Execution Order

```text
T001 → {T002, T003} → T004 → T005 → US1 → US2 and US3 → {T017, T018, T019}
```

- Phase 1 precedes the shared content shape and review manifest. Phase 2 blocks all user-story work.
- US1 supplies the visible page. US2 and US3 each build on US1 but can be verified as separate reader journeys; US2 and US3 may be worked on in parallel after US1 when files do not conflict.
- Within US1, T007 and T008 can proceed together after T006 establishes the editorial meaning; T009 integrates them. Within US2, source recheck T010 precedes legal review T011 and source rendering T012. Within US3, T013 and T014 can proceed together before T015 and T016.
- A public release requires all three stories, 24 complete translations, and `reviewed` translation and legal states for all 24 locales. A source or substantive copy change returns affected review records to `draft` before T017 passes again.

## Parallel Execution Examples

- **US1**: Translate the remaining locales in `src/i18n/messages.ts` (T007) while implementing the CSS layout in `src/app/globals.css` (T008), after the base copy is fixed.
- **US2**: No safe file-level parallel pair: the 24-language legal review (T011) relies on the confirmed source mapping (T010), and rendering (T012) relies on both.
- **US3**: Update metadata rendering in `src/app/[lang]/layout.tsx` (T013) while editing localized SEO copy in `src/i18n/messages.ts` (T014).

## Implementation Strategy

Complete setup and the release gate first. Build and inspect the US1 orientation page as the first local MVP; add provenance through US2 and discoverability through US3. Finish with the quickstart audit and release only if `contentcheck`, typecheck, build, and the 24-locale review all pass. No intermediate story is a publishable multilingual homepage.
