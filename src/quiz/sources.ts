export type Source = {
  id: string;
  title: string;
  url: string;
  jurisdiction: "EU";
  retrievedAt: string;
  reviewedAt?: string;
  kind: "law" | "guidance";
  article: string;
  excerpt: string;
  contextSummary: string;
  verifiedDates: string[];
};

// Reviewed against the cited official documents on 2026-11-11. These selected
// passages are orientation material, not a complete mapping of PPWR duties.
export const sources: Source[] = [
  {
    id: "ppwr-art-1-2", title: "Regulation (EU) 2025/40, Articles 1–2",
    url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj", jurisdiction: "EU",
    retrievedAt: "2026-11-11", reviewedAt: "2026-11-11", kind: "law",
    article: "Articles 1–2", verifiedDates: [],
    excerpt: "This Regulation applies to all packaging, regardless of the material used",
    contextSummary: "Articles 1–2 describe the full packaging life cycle and coverage across industry, retail, offices, services and households.",
  },
  {
    id: "ppwr-art-15", title: "Regulation (EU) 2025/40, Article 15",
    url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj", jurisdiction: "EU",
    retrievedAt: "2026-11-11", reviewedAt: "2026-11-11", kind: "law",
    article: "Article 15(1)–(3)", verifiedDates: [],
    excerpt: "Manufacturers shall only place on the market packaging",
    contextSummary: "Article 15 addresses manufacturer conformity assessment, technical documentation, EU declaration of conformity and document retention. The legal role must be established from actual activities, not sector alone.",
  },
  {
    id: "ppwr-art-24", title: "Regulation (EU) 2025/40, Article 24",
    url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj", jurisdiction: "EU",
    retrievedAt: "2026-11-11", reviewedAt: "2026-11-11", kind: "law",
    article: "Article 24(1)–(2)", verifiedDates: [],
    excerpt: "the maximum empty space ratio",
    contextSummary: "Article 24 concerns operators filling grouped, transport or e-commerce packaging and a 50% maximum empty-space ratio. Its start date is conditional on implementing acts; 1 January 2030 is not an unconditional deadline.",
  },
  {
    id: "commission-guidance-2026", title: "Commission Notice: guidance on Regulation (EU) 2025/40",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC03084",
    jurisdiction: "EU", retrievedAt: "2026-11-11", kind: "guidance",
    article: "Introduction", verifiedDates: [],
    excerpt: "interpret selected provisions of the PPWR",
    contextSummary: "The 2026 Commission guidance aims at uniform application of selected provisions. It is guidance, not the binding regulation.",
  },
  {
    id: "commission-ppwr-overview", title: "European Commission: Packaging waste",
    url: "https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en",
    jurisdiction: "EU", retrievedAt: "2026-11-11", kind: "guidance",
    article: "Objectives and aims", verifiedDates: [],
    excerpt: "cover the entire packaging life cycle",
    contextSummary: "The Commission overview describes the PPWR's aims, from design to waste handling. It is contextual guidance, not the binding text.",
  },
];

export const sourceById = Object.fromEntries(sources.map((source) => [source.id, source])) as Record<string, Source>;
