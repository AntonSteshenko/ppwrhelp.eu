// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Quiz from "@/app/[lang]/quiz";
import { firstQuestion } from "@/quiz/copy";

beforeEach(() => { localStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("supports multiple choices, exclusive unknown, and returning to edit", async () => {
  render(<Quiz locale="it" initialQuestion={firstQuestion("it")} />);
  fireEvent.click(screen.getByLabelText("Servizi"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  expect(screen.getByRole("option", { name: "Italia" })).toBeTruthy();
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "it" } });
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  await screen.findByText("Quali attività svolge la tua azienda con imballaggi o prodotti imballati?");
  fireEvent.click(screen.getByLabelText("Produce imballaggi"));
  fireEvent.click(screen.getByLabelText("Vende o distribuisce"));
  expect((screen.getByLabelText("Produce imballaggi") as HTMLInputElement).checked).toBe(true);
  fireEvent.click(screen.getByLabelText("Non so"));
  expect((screen.getByLabelText("Produce imballaggi") as HTMLInputElement).checked).toBe(false);
  expect((screen.getByLabelText("Non so") as HTMLInputElement).checked).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Indietro" }));
  await waitFor(() => expect(screen.getByText("In quale Paese ha sede la tua azienda?")).toBeTruthy());
  expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("it");
  fireEvent.click(screen.getByRole("button", { name: "Indietro" }));
  await waitFor(() => expect(screen.getByText("In quale settore opera la tua azienda?")).toBeTruthy());
  expect((screen.getByLabelText("Servizi") as HTMLInputElement).checked).toBe(true);
});

it("discards an obsolete AI response after going back", async () => {
  let finish: ((value: unknown) => void) | undefined;
  vi.stubGlobal("fetch", vi.fn().mockImplementation(() => new Promise((resolve) => { finish = resolve; })));
  render(<Quiz locale="it" initialQuestion={firstQuestion("it")} />);
  fireEvent.click(screen.getByLabelText("Servizi"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "it" } });
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.click(screen.getByLabelText("Utilizza imballaggi nella propria attività"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  await screen.findByText("Caricamento…");
  fireEvent.click(screen.getByRole("button", { name: "Indietro" }));
  finish?.({ ok: true, json: async () => ({ kind: "question", question: firstQuestion("it"), assessment: null, demo: false }) });
  await waitFor(() => expect(screen.getByText("Quali attività svolge la tua azienda con imballaggi o prodotti imballati?")).toBeTruthy());
  expect(screen.queryByText("Caricamento…")).toBeNull();
  expect((screen.getByLabelText("Utilizza imballaggi nella propria attività") as HTMLInputElement).checked).toBe(true);
});

it("cancels the quiz, clears saved answers, and ignores a pending AI response", async () => {
  let finish: ((value: unknown) => void) | undefined;
  vi.stubGlobal("fetch", vi.fn().mockImplementation(() => new Promise((resolve) => { finish = resolve; })));
  render(<Quiz locale="it" initialQuestion={firstQuestion("it")} />);
  fireEvent.click(screen.getByLabelText("Servizi"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "it" } });
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.click(screen.getByLabelText("Utilizza imballaggi nella propria attività"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  await screen.findByText("Caricamento…");
  fireEvent.click(screen.getByRole("button", { name: "Annulla quiz" }));
  finish?.({ ok: true, json: async () => ({ kind: "question", question: firstQuestion("it"), assessment: null, demo: false }) });
  await waitFor(() => expect(screen.getByText("In quale settore opera la tua azienda?")).toBeTruthy());
  expect(screen.getByText("Domande completate: 0 / 20")).toBeTruthy();
  expect(localStorage.getItem("ppwr-quiz-v2-it")).toBeNull();
  expect(screen.queryByText("Caricamento…")).toBeNull();
});

it("offers a preliminary result when a later AI question fails", async () => {
  const role = {
    id: "packaging_role", factKey: "packaging_role", title: "Quale ruolo ha l’azienda?", explanation: "",
    selectionMode: "single", options: [
      { id: "buyer", label: "Acquista imballaggi", value: { code: "buyer", min: null, max: null, unit: null }, exclusive: false },
      { id: "unknown", label: "Non so", value: { code: "unknown", min: null, max: null, unit: null }, exclusive: true },
    ],
  };
  const provider = vi.fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ kind: "question", question: role, assessment: null, demo: false }) })
    .mockResolvedValueOnce({ ok: false, json: async () => ({ error: "AI unavailable" }) })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ kind: "assessment", question: null, demo: false,
      assessment: { profile: "Profilo preliminare", scope: "UE", actions: [], possibleExemptions: [], missingInformation: [], supplierDocuments: [] }, sources: [] }) });
  vi.stubGlobal("fetch", provider);
  render(<Quiz locale="it" initialQuestion={firstQuestion("it")} />);
  fireEvent.click(screen.getByLabelText("Servizi"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "it" } });
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  fireEvent.click(screen.getByLabelText("Utilizza imballaggi nella propria attività"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  await screen.findByText("Quale ruolo ha l’azienda?");
  fireEvent.click(screen.getByLabelText("Acquista imballaggi"));
  fireEvent.click(screen.getByRole("button", { name: "Continua" }));
  await screen.findByText("Impossibile caricare la domanda. Riprova.");
  fireEvent.click(screen.getByRole("button", { name: "Risultato preliminare" }));
  await screen.findByText("Profilo preliminare");
  expect(provider).toHaveBeenCalledTimes(3);
});
