import reviewRecords from "./home-review.json";
import type { Locale } from "@/i18n/locales";

export const legalSource = {
  id: "regulation-2025-40",
  title: "Regulation (EU) 2025/40",
  url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj",
  publishedAt: "2025-01-22",
  citation: "OJ L, 2025/40, 22.1.2025",
  overviewArticle: "Article 1",
} as const;

export const upcomingAreas = ["quiz", "library", "news"] as const;

export type UpcomingArea = (typeof upcomingAreas)[number];

export type HomeReview = {
  translationStatus: "draft" | "reviewed";
  legalStatus: "draft" | "reviewed";
  translationReviewedAt?: string;
  legalReviewedAt?: string;
  reviewNotes?: string;
};

export const homeReviews = reviewRecords as Record<Locale, HomeReview>;
