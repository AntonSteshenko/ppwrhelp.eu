# Agent instructions for PPWR Desk

Read this file before changing the repository. The project constitution at
`.specify/memory/constitution.md` governs project policy and takes precedence over
these operational instructions. The initial product brief is in `README.md`.

## Project

PPWR Desk is a multilingual site about the EU Packaging and Packaging Waste
Regulation (PPWR), with a quiz, a resource library, and news. The intended language
coverage is the 24 official EU languages, as defined in
`specs/001-add-multilingual/spec.md`. Define the rollout of future content areas
in their feature specifications before publication.
The application uses Next.js App Router and TypeScript.

## Workflow

1. Read the constitution and the relevant feature artifacts before starting work.
2. For a new feature, follow Spec Kit: specify, plan, tasks, then implement. Use the
   matching skills in `.agents/skills/`. Keep decisions and acceptance criteria in
   the feature artifacts rather than in this file.
3. Keep legal claims traceable to primary sources with version or publication date.
   Distinguish source text from interpretation and keep localization faithful to the
   reviewed meaning.
4. For public pages, account for localized URLs, metadata, language alternates,
   semantic structure, accessibility, and machine readable content in the feature
   specification and implementation.
5. Before reporting implementation complete, run `npm run typecheck` and
   `npm run build`. Verify the affected user journey and report any verification
   limits. Documentation only changes need a diff and formatting check.

## Repository conventions

- Application code: `src/app/`.
- Project policy: `.specify/memory/constitution.md`.
- Feature specifications and plans: Spec Kit artifacts under `specs/`.
- Keep this file short and operational. Amend the constitution for new project
  principles; update the relevant feature artifact for product decisions.
