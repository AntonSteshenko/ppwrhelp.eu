import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/locales";
import { quizCopy } from "@/quiz/copy";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ppwrhelp.eu";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map(({ code }) => ({ lang: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const translation = quizCopy(lang);
  const path = `/${lang}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${translation.headline} | ppwrhelp.eu`,
    description: translation.intro,
    openGraph: {
      type: "website", url: path, siteName: "ppwrhelp.eu",
      title: translation.headline, description: translation.intro, locale: lang,
    },
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(locales.map(({ code }) => [code, `/${code}`])),
        "x-default": "/",
      },
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://stat.rdas.site/script.js"
            data-website-id="ab06f477-01a5-4c03-a6f9-4b818db10262"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
