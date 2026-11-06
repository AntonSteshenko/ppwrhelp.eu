# Implementation Plan: Multilingual Foundation

**Branch**: `main` | **Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-add-multilingual/spec.md`

## Summary

Create 24 locale-specific home pages with a reusable locale catalog and translation
dictionary. Use a language segment in each URL, a root redirect based on browser
language, localized document language and metadata, and accessible language links.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16

**Primary Dependencies**: Existing Next.js App Router; no new runtime packages

**Storage**: Checked-in translation data; no database

**Testing**: `npm run typecheck`, `npm run build`, and route/HTML smoke checks

**Target Platform**: Web browsers and search crawlers

**Project Type**: Next.js web application

**Performance Goals**: Static generation of all 24 translated home pages

**Constraints**: Shared layout and dictionary must not require client-side translation
loading; avoid presenting future content sections as published

**Scale/Scope**: 24 locales, one translated home page per locale

## Constitution Check

- Normative accuracy: introductory copy contains no specific legal obligations;
  future legal claims remain subject to source requirements. PASS.
- Multilingual coverage: all 24 confirmed locales have complete home translations,
  document language, and metadata. PASS.
- Discoverability: canonical and language alternates are generated for each page. PASS.
- Accessibility: native language names, semantic links, keyboard use, and responsive
  layout are in scope. PASS.
- Workflow: this specification, plan, tasks, and build verification precede delivery. PASS.

The same gates apply after design; no exceptions are required.

## Project Structure

### Documentation (this feature)

```text
specs/001-add-multilingual/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/home-page.md
├── checklists/requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── globals.css
│   └── sitemap.ts
├── i18n/
│   ├── locales.ts
│   └── messages.ts
└── proxy.ts
```

**Structure Decision**: Put the root layout under `[lang]` so the `<html lang>` value
comes from the route. Keep supported locales and translations in shared modules for
future content areas. Proxy handles only locale-free requests and leaves localized
pages to the App Router.

## Complexity Tracking

No constitution violations.
