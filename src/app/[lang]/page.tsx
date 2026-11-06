import { notFound } from "next/navigation";
import { homeReviews, legalSource, upcomingAreas } from "@/content/home";
import { isLocale, locales } from "@/i18n/locales";
import { messages } from "@/i18n/messages";

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = messages[lang];
  const review = homeReviews[lang];

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href={`/${lang}`} aria-label="ppwrhelp.eu">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>ppwrhelp.eu</span>
        </a>

        <details className="language-picker">
          <summary>{copy.languageLabel}<span aria-hidden="true">⌄</span></summary>
          <nav aria-label={copy.languageLabel}>
            <ul>
              {locales.map(({ code, nativeName }) => (
                <li key={code}>
                  <a href={`/${code}`} hrefLang={code} lang={code} aria-current={code === lang ? "page" : undefined}>
                    {nativeName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> EU 2025/40 · PPWR</p>
          <h1 id="page-title">{copy.hero.headline}</h1>
          <p className="hero-intro">{copy.hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ppwr-overview">{copy.overview.heading}<span aria-hidden="true">↗</span></a>
            <a className="button button-text" href={legalSource.url}>{copy.sources.heading}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit art-orbit-one" />
          <div className="art-orbit art-orbit-two" />
          <div className="art-card art-card-back" />
          <div className="art-card art-card-front">
            <span className="art-label">PPWR</span>
            <span className="art-rule" />
            <span className="art-number">2025<span>/</span>40</span>
            <span className="art-footer">EU · 2025/40</span>
          </div>
        </div>
      </section>

      <section className="content-section overview-section" id="ppwr-overview" aria-labelledby="overview-title">
        <div className="section-index">01 / PPWR</div>
        <div className="section-content">
          <h2 id="overview-title">{copy.overview.heading}</h2>
          <p className="section-lead">{copy.overview.text}</p>
          <p className="source-inline"><a href={legalSource.url}>{legalSource.title}, Art. 1 <span aria-hidden="true">↗</span></a></p>
        </div>
      </section>

      <section className="content-section start-section" aria-labelledby="start-title">
        <div className="section-index">02 /</div>
        <div className="section-content">
          <h2 id="start-title">{copy.start.heading}</h2>
          <p>{copy.start.text}</p>
          <div className="pathways">
            <a href="#ppwr-overview"><span>01</span><strong>{copy.overview.heading}</strong><span aria-hidden="true">↗</span></a>
            <a href="#official-sources"><span>02</span><strong>{copy.sources.heading}</strong><span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="upcoming-section" aria-labelledby="upcoming-title">
        <div className="upcoming-heading">
          <span className="section-index">03 /</span>
          <h2 id="upcoming-title">{copy.upcoming.heading}</h2>
        </div>
        <div className="upcoming-grid">
          {upcomingAreas.map((area, index) => (
            <article className="upcoming-card" key={area}>
              <span className="card-number">0{index + 1}</span>
              <h3>{copy.upcoming[area].title}</h3>
              <p>{copy.upcoming[area].summary}</p>
              <span className="coming-badge">{copy.upcoming.heading}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sources-section" id="official-sources" aria-labelledby="sources-title">
        <div className="source-intro">
          <span className="section-index">04 /</span>
          <h2 id="sources-title">{copy.sources.heading}</h2>
          <p>{copy.sources.disclaimer}</p>
        </div>
        <div className="source-panel">
          <span className="source-type">EUR-LEX / EU</span>
          <a href={legalSource.url}>{legalSource.title}<span aria-hidden="true">↗</span></a>
          <p>{legalSource.citation} · Art. 1</p>
          {review.legalReviewedAt && (
            <p className="review-date">{copy.sources.reviewedLabel}: <time dateTime={review.legalReviewedAt}>{review.legalReviewedAt}</time></p>
          )}
        </div>
      </section>

      <footer className="site-footer"><span>ppwrhelp.eu</span><span>PPWR · EU 2025/40</span></footer>
    </main>
  );
}
