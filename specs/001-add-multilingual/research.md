# Research: Multilingual Foundation

## Locale routing

**Decision**: Use the Next.js 16 App Router `[lang]` segment with its root layout
inside the segment. Redirect locale-free requests in `proxy.ts`.

**Rationale**: The [Next.js internationalization guide](https://nextjs.org/docs/app/guides/internationalization)
documents this route and root-layout pattern, including browser language selection.

**Alternatives considered**: Client-side locale state would not provide stable
language URLs or server-rendered page language.

## Rendering and metadata

**Decision**: Generate all supported locale paths at build time and return localized
metadata with canonical and language alternates.

**Rationale**: The Next.js documentation for
[static params](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
and [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
supports these mechanisms. Translation data is local and small.

**Alternatives considered**: Per-request rendering adds no value for fixed home copy.

## Translation ownership

**Decision**: Keep complete, typed translations in source for this first page.

**Rationale**: All 24 versions are available at build time and can be checked for
missing fields. Future editorial legal content needs a separate source and review
workflow under its own feature specification.

**Alternatives considered**: A CMS is premature for one introductory page.
