# Quickstart: Multilingual Validation

1. Run `npm run typecheck` and `npm run build`.
2. Start the app with `npm run start`.
3. Open `/en`, `/it`, `/fr`, and another supported locale. Check translated content,
   the selector, `<html lang>`, title, description, canonical, and 24 alternates.
4. Visit `/` with `Accept-Language: it-IT,it;q=0.9` and expect `/it`.
5. Visit `/` with an unsupported browser language and expect `/en`.
6. Visit an unsupported language route and expect a missing page.
7. Inspect `/sitemap.xml` and confirm all 24 language URLs are present.
8. At a 320 px viewport, use the selector by keyboard and verify the layout remains
   readable.

## Verification on 2026-11-06

- Type check and production build passed; all 24 localized home pages were generated.
- Generated HTML checks passed for document language, title, canonical URL, and 24
  language alternatives plus the default alternative on every page.
- HTTP checks passed for `/it` and `/en` (200), unsupported `/xx` (404), root
  language redirects, and `/sitemap.xml` (200 with 24 entries).
- The 320 px visual and keyboard check remains unverified because no browser was
  available in this session. The CSS uses a responsive grid and visible focus style.
