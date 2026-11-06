import { readFileSync } from "node:fs";

const localeSource = readFileSync(new URL("../src/i18n/locales.ts", import.meta.url), "utf8");
const expectedLocales = [...localeSource.matchAll(/\{ code: "([a-z]{2})", nativeName:/g)]
  .map((match) => match[1]);
const reviews = JSON.parse(readFileSync(new URL("../src/content/home-review.json", import.meta.url), "utf8"));
const errors = [];

if (expectedLocales.length !== 24 || new Set(expectedLocales).size !== 24) {
  errors.push("The locale catalog must contain 24 unique language codes.");
}

for (const locale of expectedLocales) {
  const record = reviews[locale];
  if (!record) {
    errors.push(`${locale}: missing review record`);
    continue;
  }

  for (const field of ["translation", "legal"]) {
    const status = record[`${field}Status`];
    const date = record[`${field}ReviewedAt`];
    if (status !== "draft" && status !== "reviewed") {
      errors.push(`${locale}: invalid ${field}Status`);
    }
    if (status !== "reviewed") {
      errors.push(`${locale}: ${field} review is not complete`);
    }
    if (status === "reviewed" && !/^\d{4}-\d{2}-\d{2}$/.test(date ?? "")) {
      errors.push(`${locale}: missing or invalid ${field}ReviewedAt`);
    }
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))) {
      errors.push(`${locale}: invalid ${field}ReviewedAt`);
    }
  }
}

for (const locale of Object.keys(reviews)) {
  if (!expectedLocales.includes(locale)) errors.push(`${locale}: extra review record`);
}

if (errors.length) {
  console.error(`Homepage content is not ready (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Homepage content ready: 24 translated and legally reviewed locales.");
}
