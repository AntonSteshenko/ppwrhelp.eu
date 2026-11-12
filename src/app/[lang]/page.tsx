import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/locales";
import { firstQuestion, quizCopy } from "@/quiz/copy";
import Quiz from "./quiz";

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = quizCopy(lang);
  return (
    <main className="quiz-shell">
      <header className="quiz-header">
        <a className="brand" href={`/${lang}`} aria-label="ppwrhelp.eu">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>ppwrhelp.eu</span>
        </a>
        <span className="header-label">PPWR · EU 2025/40</span>
      </header>
      <section className="quiz-intro" aria-labelledby="page-title">
        <p className="eyebrow">PPWR · EU 2025/40</p>
        <h1 id="page-title">{copy.headline}</h1>
        <p>{copy.intro}</p>
      </section>
      <Quiz locale={lang} initialQuestion={firstQuestion(lang)}
        demoMode={process.env.QUIZ_DEMO_MODE === "true" && process.env.NODE_ENV !== "production"} />
      <footer className="quiz-footer"><span>ppwrhelp.eu</span><a href="https://eur-lex.europa.eu/eli/reg/2025/40/oj">Regulation (EU) 2025/40 ↗</a></footer>
    </main>
  );
}
