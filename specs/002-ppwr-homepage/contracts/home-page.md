# Home Page Contract: PPWR Simple Homepage

## Routes and navigation

- `/` continues to redirect to a supported locale, with English fallback.
- `/{locale}` serves the redesigned homepage for each of the 24 existing locales;
  unsupported locales continue to return a missing page.
- The page's primary in-page links target existing `#ppwr-overview` and
  `#official-sources` sections. The legal-source action opens the named EUR-Lex
  regulation. The language selector links to all 24 equivalent homepages.
- Quiz, library, and news previews are visibly marked as upcoming and have no
  destination link in this feature.

## Visible page

1. Header: ppwrhelp.eu identity and accessible language selector.
2. Hero: one localized H1 equivalent to “PPWR, explained simply”, a short
   introduction, and actions to the overview and official source.
3. Overview: a concise explanation of Regulation (EU) 2025/40 and the topics it
   addresses, identified as the site's summary and attributed to Article 1.
4. Where to start: a short path for readers who want the quick overview or the
   authoritative text.
5. Coming next: quiz, resource library, and news, each clearly forthcoming.
6. Official sources: EUR-Lex act title and link, 22 January 2025 publication date,
   applicable cited provision, and the locale's last legal review date. The page
   explains that its prose is a summary and not individualized legal advice.

Heading order and link names must make these sections understandable without
relying on the visual layout. Decorative elements are ignored by assistive
technology. The page remains usable at 320 px and with long translated strings.

## Search and machine-readable output

- `<html lang>` matches the route locale.
- A localized, PPWR-focused title and description describe the visible page.
- Each page has a self canonical and 24 language alternatives; `/` remains the
  `x-default` alternative.
- `/sitemap.xml` lists all 24 addresses and their alternatives.
- Semantic headings and links expose the same facts as the visible page. No FAQ
  structured data is emitted without a visible FAQ.

## Editorial release gate

The content-readiness check reports missing localized fields and unreviewed
translation or legal status. A release of the redesigned homepage proceeds only
when all 24 records pass. A substantive legal-copy edit resets the affected
review state before another release.
