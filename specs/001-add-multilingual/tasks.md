# Tasks: Multilingual Foundation

**Input**: Design documents from `specs/001-add-multilingual/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/home-page.md`

**Organization**: Tasks are grouped by user story and then verified together.

## Phase 1: Setup

- [x] T001 Verify existing ignore rules for Next.js and environment files in `.gitignore`.

## Phase 2: Foundational

- [x] T002 Define all 24 supported codes and native names in `src/i18n/locales.ts`.
- [x] T003 Define complete localized home copy and metadata in `src/i18n/messages.ts`.

## Phase 3: User Story 1 - Read in a chosen language (P1)

**Independent Test**: Open several `/{locale}` pages and check visible copy and document language.

- [x] T004 [US1] Move the root document layout to `src/app/[lang]/layout.tsx` and validate route locales.
- [x] T005 [US1] Replace the starter page with the localized home page in `src/app/[lang]/page.tsx`.
- [x] T006 [US1] Reject unsupported locale routes through `dynamicParams` in `src/app/[lang]/layout.tsx`.

## Phase 4: User Story 2 - Change language (P2)

**Independent Test**: Navigate from `/it` to `/fr` using the selector and verify content changes.

- [x] T007 [US2] Add accessible language links to `src/app/[lang]/page.tsx`.
- [x] T008 [US2] Redirect locale-free requests based on browser preference in `src/proxy.ts`.
- [x] T009 [US2] Update responsive and focus styles in `src/app/globals.css`.

## Phase 5: User Story 3 - Discover translations (P3)

**Independent Test**: Inspect title, summary, canonical, and language alternates for `/it` and `/en`.

- [x] T010 [US3] Generate localized metadata and all 24 alternates in `src/app/[lang]/layout.tsx` and `src/app/sitemap.ts`.

## Phase 6: Polish and Verification

- [x] T011 Verify route and metadata checks from `specs/001-add-multilingual/quickstart.md` and record browser availability.
- [x] T012 Run `npm run typecheck`, `npm run build`, and `git diff --check`.

## Dependencies & Execution Order

Setup precedes foundation. Foundation precedes US1. US1 precedes US2 and US3 because
both use the localized page. Verification follows all stories. T002 and T003 can be
prepared independently, as can T008 and T009 after US1.

## Implementation Strategy

The first usable increment is US1: 24 readable language pages. US2 adds navigation
and browser-language routing. US3 completes discoverability. All three are required
for the feature to be complete.
