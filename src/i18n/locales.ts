export const locales = [
  { code: "bg", nativeName: "Български" },
  { code: "hr", nativeName: "Hrvatski" },
  { code: "cs", nativeName: "Čeština" },
  { code: "da", nativeName: "Dansk" },
  { code: "nl", nativeName: "Nederlands" },
  { code: "en", nativeName: "English" },
  { code: "et", nativeName: "Eesti" },
  { code: "fi", nativeName: "Suomi" },
  { code: "fr", nativeName: "Français" },
  { code: "de", nativeName: "Deutsch" },
  { code: "el", nativeName: "Ελληνικά" },
  { code: "hu", nativeName: "Magyar" },
  { code: "ga", nativeName: "Gaeilge" },
  { code: "it", nativeName: "Italiano" },
  { code: "lv", nativeName: "Latviešu" },
  { code: "lt", nativeName: "Lietuvių" },
  { code: "mt", nativeName: "Malti" },
  { code: "pl", nativeName: "Polski" },
  { code: "pt", nativeName: "Português" },
  { code: "ro", nativeName: "Română" },
  { code: "sk", nativeName: "Slovenčina" },
  { code: "sl", nativeName: "Slovenščina" },
  { code: "es", nativeName: "Español" },
  { code: "sv", nativeName: "Svenska" },
] as const;

export type Locale = (typeof locales)[number]["code"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.some(({ code }) => code === value);
}

export function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, quality] = part.trim().split(";q=");
      const q = quality === undefined ? 1 : Number(quality);
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0, index };
    })
    .filter(({ q }) => q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { tag } of preferences) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}
