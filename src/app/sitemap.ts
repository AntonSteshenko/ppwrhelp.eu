import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppwrhelp.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map(({ code }) => ({
    url: `${siteUrl}/${code}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map(({ code: alternateCode }) => [
          alternateCode,
          `${siteUrl}/${alternateCode}`,
        ]),
      ),
    },
  }));
}
