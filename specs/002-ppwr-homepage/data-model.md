# Data Model: PPWR Simple Homepage

## LegalSource

- `id`: stable key, initially `regulation-2025-40`.
- `title`: official identity of the source, rendered with a localized label where
  needed.
- `url`: canonical EUR-Lex Official Journal link.
- `publishedAt`: source publication date, initially `2025-01-22`.
- `references`: cited provisions for factual blocks, initially Article 1; add
  Article 71 only if the page mentions application dates.

Validation: normative claims reference a `LegalSource` and a relevant provision.
The source title, URL, and publication date are not translated as independent
legal facts.

## HomeTranslation

- `locale`: one-to-one key from the existing 24-language locale catalog.
- `seoTitle`, `seoDescription`: distinct localized search-result text containing
  the PPWR topic and matching visible content.
- `hero`: eyebrow, main heading, short introduction, and two action labels.
- `overview`: section heading and concise legal-topic summary.
- `start`: section heading, explanation, and labels for in-page and official links.
- `upcoming`: section heading plus quiz, library, and news preview text, each
  explicitly marked as forthcoming.
- `sources`: section heading, source-link label, publication/review labels, and
  plain-language summary/disclaimer label.
- `languageLabel`: accessible selector label.

Validation: every locale has every field, one main heading, equivalent meaning,
no link label that implies an unavailable destination, and no unexplained legal
claim. Long translations must fit the responsive page.

## HomeReview

- `locale`: one-to-one key with `HomeTranslation`.
- `translationStatus`: `draft` or `reviewed`.
- `legalStatus`: `draft` or `reviewed`.
- `translationReviewedAt`, `legalReviewedAt`: ISO dates, required only when the
  corresponding status is `reviewed`.
- `reviewNotes`: optional explanation of remaining gaps.

State transition: each status starts as `draft` and changes to `reviewed` only
after the corresponding review. Any substantive copy or source change returns the
affected status to `draft`. Publication readiness requires both statuses to be
`reviewed` for all 24 locales; the visible legal review date comes from the
locale's review record.

## ContentAreaPreview

- `kind`: `quiz`, `library`, or `news`.
- `availability`: `upcoming` for this feature.
- `localizedTitle`, `localizedSummary`: visible preview copy from each
  `HomeTranslation`.

Validation: `upcoming` previews have no destination link to an unpublished area.

## Relationships

Each supported locale has one `HomeTranslation` and one `HomeReview`. All
translations share the same `LegalSource` identity and three upcoming content
area kinds. The overview's legal-topic summary references Article 1 of the source.
