# Research: PPWR Simple Homepage

## Primary legal source and claim boundary

**Decision**: Base legal identity and any scope statement on
[Regulation (EU) 2025/40, Official Journal version](https://eur-lex.europa.eu/eli/reg/2025/40/oj),
published 22 January 2025. Article 1 supports a short description of the topics
covered; Article 71 supports the general application date, with an express
exception. Prefer high-level wording and omit a date from the hero unless its
qualification is also shown. Show the source date and the site's review date.

**Rationale**: This is the primary legal text and is available in all 24 official
EU languages. The homepage is an orientation page, so detailed obligation claims
would require more source mapping and context than the feature provides.

**Alternatives considered**: The [Commission's packaging-waste overview](https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en)
is useful for context but is not a substitute for the act when stating legal
obligations. The [Commission guidance published in June 2026](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC03084)
can inform later detailed guides but is not needed for this high-level homepage.

## Editorial content and review

**Decision**: Use one language-neutral source catalog and a typed translation
record for each locale. Record translation and legal review states per locale in
a checked-in manifest, and require all 24 to be complete and reviewed before the
redesigned page is published as complete. Separate the site's explanatory prose
from the labeled official-source block.

**Rationale**: The current page has one small translation object per locale; a
structured expansion fits a single static page. Explicit review state makes
missing work visible and avoids silently treating generated translations as
approved legal content.

**Alternatives considered**: A CMS or database adds editorial infrastructure
before the project has a broader content corpus. Repeating source URLs and dates
inside 24 translations risks inconsistent legal references.

## Rendering and discoverability

**Decision**: Preserve `[lang]` static generation, `dynamicParams = false`, and
the root language redirect. Extend localized metadata with dedicated title and
description fields. Keep self canonicals, all 24 language alternates, and sitemap
entries. Use semantic HTML for the visible content; do not add FAQ structured data
when the page has no FAQ.

**Rationale**: The existing architecture already provides stable pages and
machine-readable metadata without client-side loading. Next.js documents
[static params](https://nextjs.org/docs/app/api-reference/functions/generate-static-params),
[metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata),
[localized routing](https://nextjs.org/docs/app/guides/internationalization), and
[sitemap language alternates](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

**Alternatives considered**: Client-side localization would make initial content
and metadata less reliable for crawlers. New routes are unnecessary for a
single-page orientation flow.

## Visual direction

**Decision**: Build a clear editorial layout with a strong hero, short text
blocks, in-page links, a light orange/brown palette, and simple
decorative shapes implemented without a page-critical image request. Keep the
language selector easy to locate and use on narrow screens.

**Rationale**: This supports the user-selected approachable editorial style and
keeps the core explanation fast to load and scan in 24 languages.

**Alternatives considered**: A photo-led landing page adds asset and localization
work without improving the main reading task. An institutional visual style was
not selected by the user.
