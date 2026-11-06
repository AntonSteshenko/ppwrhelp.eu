# Implementation Plan: PPWR Simple Homepage

**Branch**: `main` | **Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-ppwr-homepage/spec.md`

## Summary

Replace the 24-language placeholder with a static, editorial homepage that gives a
quick, source-backed introduction to Regulation (EU) 2025/40. Keep the existing
locale routes, language selector, canonical URLs, and sitemap. Store legal source
facts separately from localized presentation, add dedicated SEO text, and make
translation and legal review visible before simultaneous publication.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16

**Primary Dependencies**: Existing Next.js App Router; no new runtime packages

**Storage**: Checked-in source facts, translations, and review manifest; no database

**Testing**: `npm run typecheck`, `npm run build`, content-readiness validation,
generated-HTML/route inspection, and a 320 px keyboard/visual check

**Target Platform**: Web browsers, assistive technology, and search crawlers

**Project Type**: Multilingual public website

**Performance Goals**: Pre-render all 24 pages; no client-side translation request
or new page-critical external asset

**Constraints**: Keep the existing URL and locale contract; do not publish
unreviewed copy as complete; link normative claims to dated primary sources; keep
upcoming areas visibly unavailable

**Scale/Scope**: One redesigned homepage in each of 24 supported languages; no new
quiz, library, news, CMS, or detailed obligation guide

## Constitution Check

- Normative accuracy: legal identity and any scope/date statements map to the
  Official Journal act, with publication and review dates; interpretation is
  labeled as a summary. PASS.
- Multilingual coverage: the same content structure and SEO fields are required
  for all 24 locales; review status is recorded per locale before release. PASS.
- Discoverability: existing crawlable localized routes, self canonicals,
  alternatives, and sitemap remain; metadata becomes content-specific. PASS.
- Accessibility: semantic sections, keyboard links, contrast, and 320 px layout
  are included in the page contract and validation guide. PASS.
- Workflow: this specification and plan precede tasks and implementation. PASS.

The Phase 1 design below preserves all five gates; no constitution exception is
required. Publication remains gated on completed translation and legal review.

## Project Structure

### Documentation (this feature)

```text
specs/002-ppwr-homepage/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/home-page.md
├── checklists/requirements.md
└── tasks.md                 # created by $speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx        # localized metadata and document language
│   │   └── page.tsx          # editorial homepage
│   ├── globals.css           # responsive visual system
│   └── sitemap.ts            # existing 24-locale sitemap
├── content/
│   ├── home.ts               # source identity, URLs, dates, section/source mapping
│   └── home-review.json      # translation/legal review state by locale
└── i18n/
    ├── locales.ts            # existing locale inventory
    └── messages.ts           # complete localized homepage and SEO copy
scripts/
└── check-home-content.mjs    # completeness and publication-readiness check
```

**Structure Decision**: Reuse the static locale architecture. Keep language-neutral
legal facts and source references in `src/content/home.ts`; localized prose and
labels stay in the typed translation catalog. A checked-in review manifest makes
unreviewed versions explicit, and a content check gates publication without
adding a CMS or runtime service. The existing root redirect and route pattern do
not change. Add `npm run contentcheck` to run the TypeScript completeness check
and validate the review manifest; missing translation fields fail type checking,
while the manifest check reports unreviewed locales and missing review dates.
Render the requested statistics script in the locale root layout only when
`NODE_ENV` is `production`; retain its `defer` attribute and website ID exactly.

## Complexity Tracking

No constitution violations.
