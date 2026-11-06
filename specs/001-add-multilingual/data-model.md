# Data Model: Multilingual Foundation

## Locale

- `code`: unique language identifier in the supported 24-language set.
- `nativeName`: human-readable language name used in the selector.
- `htmlLang`: language tag used by the document and metadata.

Validation: a route code must belong to the supported set. Unsupported codes are not
rendered as translated pages.

## HomeTranslation

- `locale`: one-to-one reference to Locale.
- `headline`, `intro`, `comingSoon`, `languageLabel`: visible home copy.
- Page title and metadata summary are derived from the localized home copy.

Validation: each supported Locale has exactly one complete translation object.
Future legal content is outside this model and requires source provenance.
