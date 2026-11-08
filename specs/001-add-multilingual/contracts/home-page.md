# Home Page Contract

## Routes

- `/`: redirects to a supported language based on `Accept-Language`, falling back
  to `/en`.
- `/{locale}`: returns a translated home page when `locale` is supported.
- Unsupported locale: returns a missing-page response.

## Rendered page

- `<html lang>` equals the route locale.
- Visible introductory copy and language selector correspond to the route locale.
- The selector links to all 24 equivalent home pages using native language names.
- Metadata includes localized title and description, self canonical URL, and all 24
  language alternatives. The root URL is the default language alternative.
- `/sitemap.xml` lists the 24 canonical language home page URLs. Language
  alternatives remain in each page's metadata.
