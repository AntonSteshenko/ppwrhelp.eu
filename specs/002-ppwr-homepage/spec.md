# Feature Specification: PPWR Simple Homepage

**Feature Branch**: `main`

**Created**: 2026-11-06

**Status**: Ready

**Input**: Create the first designed, PPWR-focused SEO homepage for ppwrhelp.eu. The
central idea is “PPWR semplice”: help visitors understand the PPWR quickly and find
their way to reliable, more detailed information. The user confirmed a mixed public
and professional audience, a concise overview with pathways, simultaneous coverage
of all 24 supported EU languages, and a clear editorial visual style.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the PPWR quickly (Priority: P1)

A visitor with no prior knowledge, or a professional seeking a quick refresher, can
open the homepage and understand what the PPWR is, why the site exists, and where to
start, without reading a long legal guide.

**Why this priority**: Fast, trustworthy orientation is the site's central promise.

**Independent Test**: Open a localized homepage and ask a visitor to identify the
regulation, the purpose of this site, and the next useful action using only the
visible introductory content.

**Acceptance Scenarios**:

1. **Given** a visitor opens a supported language homepage, **When** they read the
   introduction and short overview, **Then** they can identify the PPWR as the EU
   regulation on packaging and packaging waste and understand that this page offers
   a concise explanation rather than exhaustive legal guidance.
2. **Given** a visitor wants more detail, **When** they follow a primary page action,
   **Then** they reach a relevant section on the same page or the official regulation.
3. **Given** a visitor reads the homepage, **When** they inspect the proposed quiz,
   library, and news areas, **Then** they can distinguish planned areas from content
   that is already available.

---

### User Story 2 - Verify legal information (Priority: P2)

A visitor can tell which statements summarize the law, open the primary legal source,
and see when the site's explanation was last checked.

**Why this priority**: The page must earn trust without presenting an interpretation
as the legal text or suggesting individual legal advice.

**Independent Test**: Inspect every claim about the regulation's identity, scope,
requirements, or dates and follow its cited source from the homepage.

**Acceptance Scenarios**:

1. **Given** a normative or time-specific PPWR statement is visible, **When** a
   visitor checks its attribution, **Then** a link to the relevant primary source,
   source version or publication date, and the site's review date are available.
2. **Given** a visitor opens the official-source area, **When** they follow its legal
   link, **Then** they reach Regulation (EU) 2025/40 on EUR-Lex.
3. **Given** the site uses plain-language interpretation, **When** a visitor compares
   it with the source area, **Then** the summary is clearly identified as a summary
   and does not claim to be individualized legal advice.

---

### User Story 3 - Find the page in the right language (Priority: P3)

A visitor or search system can discover the homepage in the visitor's language and
recognize its corresponding translations.

**Why this priority**: The first content-rich page must preserve the multilingual
foundation and make the PPWR topic clear in search results.

**Independent Test**: Visit all 24 supported homepages and inspect visible copy,
language selection, titles, summaries, canonical addresses, language alternatives,
and the sitemap.

**Acceptance Scenarios**:

1. **Given** a supported language page, **When** it loads, **Then** the main content,
   navigation labels, source labels, document language, title, and description use
   that language and preserve the same reviewed meaning.
2. **Given** a visitor changes language, **When** they select another supported
   language, **Then** the equivalent homepage opens with the selected language
   identified.
3. **Given** a search system reads a homepage, **When** it inspects the page's title,
   description, canonical address, and language alternatives, **Then** it can identify
   the PPWR topic and all 24 published language versions.

### Edge Cases

- A translation or legal review is incomplete: that version must not be presented
  as complete new homepage content; the gap remains visible in the content workflow.
- A translated heading or language name is long: content and language selection
  remain usable at a 320 px viewport without horizontal scrolling.
- A planned content area has no published destination: it is described as upcoming
  and is not offered as a working page link.
- A cited external source is temporarily unavailable: its visible title, identity,
  and publication/version information still let the visitor identify it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each of the 24 supported language homepages MUST replace the current
  placeholder with a complete, equivalent editorial homepage in that language.
- **FR-002**: The homepage MUST lead with the plain-language positioning “PPWR,
  explained simply” in faithful localized form and identify the PPWR as Regulation
  (EU) 2025/40 on packaging and packaging waste. It MUST present itself as a quick
  starting point, without claiming to cover every obligation or individual case.
- **FR-003**: The homepage MUST provide a short introduction, a concise “PPWR in
  brief” explanation, a “where to start” path, a clearly marked preview of the
  future quiz, resource library, and news, and an official-sources area.
- **FR-004**: All primary calls to action MUST lead to a section that exists on the
  current page or to a named official source. Unpublished site areas MUST NOT be
  presented as available destinations.
- **FR-005**: Every claim about legal obligations, dates, scope, or exceptions MUST
  identify a relevant primary institutional or legal source and its publication or
  version date. The page MUST show when its legal content was last reviewed and
  distinguish source text from the site's explanation.
- **FR-006**: The official-sources area MUST link to Regulation (EU) 2025/40 on
  EUR-Lex. Secondary institutional context MAY link to the European Commission's
  packaging-waste pages but MUST NOT replace the legal source for normative claims.
- **FR-007**: Each language page MUST provide a descriptive, PPWR-focused title and
  summary in its own language, a canonical address, alternatives for all 24
  published versions, and inclusion in the sitemap. The visible language selector
  MUST continue to reach every version.
- **FR-008**: The page MUST use clear heading order and semantic sections, readable
  contrast, visible keyboard focus, and a layout usable at 320 px and with longer
  translations. Any machine-readable description MUST agree with visible content.
- **FR-009**: The visual presentation MUST be editorial, clear, and approachable for
  both the general public and professionals, using a light orange and brown palette,
  scannable sections, and a distinct hierarchy between the quick explanation, next
  steps, and sources.
- **FR-010**: All 24 language versions MUST have complete, meaning-preserving
  translations and legal-content review before the redesigned homepage is published
  as complete in that language. Missing translation or review status MUST be visible
  in the editorial workflow.
- **FR-011**: The requested site statistics script MUST load on the published
  production site and MUST NOT load while the site runs in development mode.

### Key Entities

- **Homepage edition**: A published language version with its introductory copy,
  section labels, SEO summary, and content review status.
- **Source reference**: The identity, link, publication or version date, and related
  homepage claims for a primary legal or institutional source.
- **Content area preview**: The name and availability status of a planned quiz,
  resource library, or news area.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reader can identify what the PPWR is, the site's purpose, and one
  useful next step within 60 seconds of opening any supported homepage.
- **SC-002**: A reader can reach the official regulation from every language
  homepage in no more than two actions.
- **SC-003**: All 24 published homepages have complete localized content, a
  descriptive title and summary, the correct document language, a canonical
  address, and alternatives for all 24 versions.
- **SC-004**: Every visible normative or time-specific claim has an identifiable
  primary source and review date; no planned content area is presented as live.
- **SC-005**: All primary content and the language selector remain readable and
  keyboard operable at a 320 px viewport without horizontal scrolling.

## Assumptions

- This feature is an orienting homepage, not a detailed guide to PPWR obligations.
  Detailed guides, the quiz, library, and news will be specified separately before
  publication.
- The existing 24 official EU languages and their localized homepage addresses
  remain the release inventory. The redesigned content launches across all 24
  versions together after translation and legal review.
- Regulation (EU) 2025/40 as published in the Official Journal on 22 January 2025
  is the baseline primary legal source; later applicable amendments or official
  guidance must be checked during content review before publication.
- Editorial tone is plain and welcoming while preserving the distinction between
  a short explanation and the authoritative legal text.
