# PPWR Desk Constitution

## Core Principles

### I. Normative Accuracy and Traceability

Every statement about PPWR obligations, dates, scope, or exceptions MUST identify a primary
institutional or legal source and its relevant version or publication date. Content MUST
distinguish the text of the law from interpretation and MUST show when it was last reviewed.
Quiz answers and news MUST link to the underlying source. This makes legal information
verifiable and easier to update when the regulatory context changes.

### II. Multilingual Coverage

The site MUST be designed for all European languages included in the project's language
scope, rather than treating one language as the permanent source of truth. The language
scope and rollout order MUST be defined in a feature specification before publication.
Navigation, primary content, quiz flows, metadata, and accessibility labels MUST use the
selected locale. Each localized legal statement MUST preserve the meaning and source of
the reviewed original. Missing translations MUST be visible in the content workflow and
MUST NOT be presented as complete. This prevents a multilingual interface from masking
gaps or altered legal meaning.

### III. Search and Machine Discoverability

Public content MUST have stable, crawlable URLs, a descriptive title and summary, and
metadata in the page language. Related translations MUST be connected with language
alternates. Structured data MUST represent only information visible on the page and
supported by its source. Pages MUST use semantic headings and clear links so both people
and automated systems can understand the content and its provenance.

### IV. Accessibility and Usability

Core journeys, including reading the library and news and completing the quiz, MUST work
with keyboard navigation and assistive technology. Forms MUST expose labels, errors,
and results in the selected language. Layouts MUST remain usable on mobile screens and
with longer translated text. Accessibility is required for equal access across languages
and devices.

### V. Verified, Maintainable Changes

Each feature MUST have a Spec Kit specification, plan, and actionable tasks before
implementation. Changes MUST stay within the approved scope and use the existing
Next.js, App Router, and TypeScript stack unless a plan documents a justified change.
Verification MUST cover the behavior being changed, including affected locales, legal
references, metadata, and accessibility where relevant. This keeps the site reliable
as content and language coverage grow.

## Project Constraints

The product is a site dedicated to the EU Packaging and Packaging Waste Regulation
(PPWR). Its planned areas are a quiz, a resource and legal reference library, and news.
The site is multilingual across all European languages; the exact language inventory
and release sequence belong in a feature specification. Public legal content MUST not
imply individualized legal advice or certainty beyond the cited source. Editorial data
MUST separate language neutral facts, source references, and localized presentation.

## Development Workflow and Quality Gates

Start feature work with `$speckit-specify`, then use the relevant Spec Kit planning,
task, and implementation steps. Specifications MUST state the audience, languages,
source requirements, and acceptance criteria for the feature. Plans MUST account for
content updates and localization. Before a change is considered complete, run the
project's type check and build, then verify the affected user journey and its localized
metadata or content as applicable. Record any verification limit in the handoff.

## Governance

This constitution governs project level decisions. A feature specification may add
stricter requirements but MUST NOT contradict these principles. Amendments MUST be
made in this file with a reason and an impact review of affected specifications and
implementation. Use semantic versioning: MAJOR for incompatible principle changes,
MINOR for new or materially expanded rules, and PATCH for clarifications. Every review
of a feature or amendment MUST check compliance with the relevant principles. Runtime
agent instructions may live in a root `AGENTS.md`, but they MUST defer to this
constitution on project policy.

**Version**: 1.0.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06
