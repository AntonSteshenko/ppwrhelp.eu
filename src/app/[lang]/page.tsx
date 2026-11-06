import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/locales";
import { messages } from "@/i18n/messages";

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const translation = messages[lang];

  return (
    <main className="page">
      <section className="card" aria-labelledby="page-title">
        <p className="eyebrow">PPWR DESK · EUROPEAN UNION</p>
        <h1 id="page-title">{translation.headline}</h1>
        <p className="intro">{translation.intro}</p>
        <p className="coming-soon">{translation.comingSoon}</p>

        <nav className="language-nav" aria-label={translation.languageLabel}>
          <h2>{translation.languageLabel}</h2>
          <ul className="language-list">
            {locales.map(({ code, nativeName }) => (
              <li key={code}>
                <a
                  href={`/${code}`}
                  hrefLang={code}
                  lang={code}
                  aria-current={code === lang ? "page" : undefined}
                >
                  {nativeName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
