import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/locales";
import { messages } from "@/i18n/messages";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppwrdesk.eu";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map(({ code }) => ({ lang: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const translation = messages[lang];
  const path = `/${lang}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `PPWR Desk | ${translation.headline}`,
    description: `${translation.intro} ${translation.comingSoon}`,
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
      <body>{children}</body>
    </html>
  );
}
