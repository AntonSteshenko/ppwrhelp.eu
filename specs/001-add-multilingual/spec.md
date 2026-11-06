# Feature Specification: Multilingual Foundation

**Feature Branch**: `main`
**Created**: 2026-11-06
**Status**: Ready
**Input**: Add multilingual support now; cover the 24 official languages of the European Union.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the site in a chosen language (Priority: P1)

A visitor can open a language-specific home page and see its introductory content and
navigation in that language.

**Why this priority**: The site must be understandable before its later content areas launch.

**Independent Test**: Visit each of the 24 language home pages and inspect the visible
copy and document language.

**Acceptance Scenarios**:

1. **Given** a supported language URL, **When** a visitor opens it, **Then** the page
   displays translated introductory copy and identifies the chosen language.
2. **Given** an unsupported language URL, **When** a visitor opens it, **Then** the site
   does not present it as a supported translation.

---

### User Story 2 - Change language (Priority: P2)

A visitor can choose any of the 24 official EU languages using a visible, accessible
language selector and reach the equivalent home page.

**Why this priority**: Visitors need direct control over the language they read.

**Independent Test**: Change language from a home page and verify the URL, selected
language, and page content update together.

**Acceptance Scenarios**:

1. **Given** a language-specific home page, **When** a visitor selects another language,
   **Then** the equivalent page opens in that language.
2. **Given** the site root, **When** a visitor arrives with a supported browser language,
   **Then** the site takes them to that language; otherwise it uses English.

---

### User Story 3 - Discover translated pages (Priority: P3)

A visitor or search system can identify the canonical page and all available language
versions from each translated page.

**Why this priority**: Discoverability is a core requirement of PPWR Desk.

**Independent Test**: Inspect each language page's title, summary, canonical address,
and language alternatives.

**Acceptance Scenarios**:

1. **Given** a supported language page, **When** its metadata is read, **Then** its
   title and summary match the page language and point to that page as canonical.
2. **Given** any supported language page, **When** its alternatives are read, **Then**
   all 24 language versions are listed.

### Edge Cases

- Browser language includes a region code, such as `fr-CA`: select the matching
  supported base language.
- Browser language has no supported match: use English.
- A path begins with an unsupported language code: show a missing page rather than
  claiming translated content exists.
- A language name is long: the selector remains usable on narrow screens.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST provide a distinct home page URL for each of the 24 official
  EU languages: Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish,
  French, German, Greek, Hungarian, Irish, Italian, Latvian, Lithuanian, Maltese,
  Polish, Portuguese, Romanian, Slovak, Slovenian, Spanish, and Swedish.
- **FR-002**: Each page MUST identify its language and show translated introductory
  copy, including a description of the planned quiz, library, and news areas.
- **FR-003**: Visitors MUST be able to switch among all 24 languages with keyboard
  access and recognizable native language names.
- **FR-004**: The root address MUST choose a supported browser language when possible
  and English otherwise.
- **FR-005**: Unsupported language addresses MUST not show a page labeled as that language.
- **FR-006**: Every translated home page MUST have its own localized title, summary,
  canonical address, and alternatives for all published language versions. All 24
  addresses MUST be listed in a sitemap.
- **FR-007**: The feature MUST establish a translation structure that future quiz,
  library, and news pages can reuse, without claiming those areas are already published.

### Key Entities

- **Locale**: A supported language code and its native display name.
- **Home translation**: Introductory copy and metadata associated with one locale.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 24 language home pages load with distinct URLs and correctly
  identified document languages.
- **SC-002**: A visitor can switch from any language home page to any other in at most
  two interactions.
- **SC-003**: All 24 pages expose a localized title and summary plus 24 language
  alternatives, and all 24 addresses appear in the sitemap.
- **SC-004**: The language selector is keyboard operable and usable at a 320 px viewport.

## Assumptions

- The 24 official EU languages are the complete initial language inventory, as
  confirmed by the user.
- This increment localizes the home page and lays shared foundations; the quiz,
  library, and news features will have their own specifications and translations.
- English is the fallback when browser preferences do not match a supported language.
