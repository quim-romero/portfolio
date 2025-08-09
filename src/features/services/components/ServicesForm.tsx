import React, { useEffect, useMemo, useState } from "react";
import type { Currency } from "../../services/pricing";
import { formatPrice } from "../../services/pricing";
import {
  initEmail,
  sendEmailForm,
  isBot,
  stampHiddenFields,
} from "../../../lib/email";
import {
  trackFormSubmitError,
  trackFormSubmitSuccess,
} from "../../services/analytics";

type Lang = "es" | "en";

type Props = {
  lang: Lang;
  currency: Currency;
  rates: Record<Currency, number>;
  labels: {
    title: string;
    name: string;
    email: string;
    goal: string;
    budget: string;
    submit: string;
    success: string;
  };
  budgetBandsEUR?: number[];
  hiddenDefaults?: Record<string, string>;
  className?: string;
  onSuccess?: () => void;
  onError?: (message?: string) => void;
};

export default function ServicesForm({
  lang,
  currency,
  rates,
  labels,
  budgetBandsEUR,
  hiddenDefaults = {},
  className = "",
  onSuccess,
  onError,
}: Props) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    initEmail();
  }, []);

  const bands = useMemo(() => {
    const def = [1000, 3000, 6000, 10000];
    return Array.isArray(budgetBandsEUR) && budgetBandsEUR.length === 4
      ? budgetBandsEUR
      : def;
  }, [budgetBandsEUR]);

  const budgetOptions = useMemo(() => {
    const label = (v: number) => formatPrice(v, currency, lang, rates);
    return [
      {
        value: "lt_0_1000",
        label: `< ${label(bands[0])}`,
        eur_min: 0,
        eur_max: bands[0],
      },
      {
        value: "bt_1000_3000",
        label: `${label(bands[0])} – ${label(bands[1])}`,
        eur_min: bands[0],
        eur_max: bands[1],
      },
      {
        value: "bt_3000_6000",
        label: `${label(bands[1])} – ${label(bands[2])}`,
        eur_min: bands[1],
        eur_max: bands[2],
      },
      {
        value: "bt_6000_10000",
        label: `${label(bands[2])} – ${label(bands[3])}`,
        eur_min: bands[2],
        eur_max: bands[3],
      },
      {
        value: "gt_10000",
        label: `> ${label(bands[3])}`,
        eur_min: bands[3],
        eur_max: -1,
      },
    ];
  }, [bands, currency, lang, rates]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (isBot(formEl)) return;

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    const budgetSel =
      formEl.querySelector<HTMLSelectElement>('select[name="budget"]')?.value ||
      "";
    const selected = budgetOptions.find((o) => o.value === budgetSel);

    const PROTECT_KEYS = new Set(["package", "price_eur", "price_view"]);
    const safeDefaults = Object.fromEntries(
      Object.entries(hiddenDefaults).filter(
        ([k, v]) =>
          !PROTECT_KEYS.has(k) && typeof v === "string" && v.trim().length > 0
      )
    );

    const idInput = formEl.querySelector<HTMLInputElement>(
      'input[name="submission_id"]'
    );
    const submissionId =
      idInput?.value ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? (crypto.randomUUID as () => string)()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);

    stampHiddenFields(formEl, {
      ...safeDefaults,
      lang,
      currency,
      timestamp: new Date().toISOString(),
      budget_label: selected?.label || "",
      budget_eur_min:
        typeof selected?.eur_min === "number" ? String(selected.eur_min) : "",
      budget_eur_max:
        typeof selected?.eur_max === "number" ? String(selected.eur_max) : "",
      submission_id: submissionId,
      title: "Services",
      page:
        formEl.querySelector<HTMLInputElement>('input[name="page"]')?.value ??
        "/services",
    });

    try {
      setSending(true);
      await sendEmailForm("services", formEl);
      setSent(true);
      formEl.reset();
      trackFormSubmitSuccess(lang);
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.message || "send_failed";
      trackFormSubmitError(lang, msg);
      onError?.(msg);
      alert(
        lang === "es"
          ? "Error al enviar. Inténtalo de nuevo."
          : "Send failed. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-form" className={className}>
      <h2
        id="contact-form"
        className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
      >
        {labels.title}
      </h2>

      <form
        id="services-form"
        onSubmit={onSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <input type="hidden" name="submission_id" defaultValue="" />
        <input type="hidden" name="lang" defaultValue={lang} />
        <input type="hidden" name="currency" defaultValue={currency} />
        <input type="hidden" name="page" defaultValue="/services" />
        <input
          type="hidden"
          name="package"
          defaultValue={hiddenDefaults.package || ""}
        />
        <input
          type="hidden"
          name="price_eur"
          defaultValue={hiddenDefaults.price_eur || ""}
        />
        <input
          type="hidden"
          name="price_view"
          defaultValue={hiddenDefaults.price_view || ""}
        />
        <input type="hidden" name="timestamp" defaultValue="" />
        <input type="hidden" name="title" defaultValue="Services" />
        <input type="hidden" name="budget_label" defaultValue="" />
        <input type="hidden" name="budget_eur_min" defaultValue="" />
        <input type="hidden" name="budget_eur_max" defaultValue="" />

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label
            htmlFor="goal"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {labels.goal}
          </label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={5}
            className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="budget"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {labels.budget}
          </label>
          <select
            id="budget"
            name="budget"
            required
            className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
            defaultValue=""
          >
            <option value="" disabled hidden>
              —
            </option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="timeline"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {lang === "es" ? "Plazo" : "Timeline"}
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
          >
            <option value="" disabled hidden>
              —
            </option>
            {(lang === "es"
              ? [
                  { value: "flexible", label: "Sin fecha fija / Flexible" },
                  { value: "0_2w", label: "En 0–2 semanas" },
                  { value: "2_4w", label: "En 2–4 semanas" },
                  { value: "1_3m", label: "En 1–3 meses" },
                  {
                    value: "specific",
                    label: "Fecha concreta (indícala en detalles)",
                  },
                ]
              : [
                  { value: "flexible", label: "No fixed date / Flexible" },
                  { value: "0_2w", label: "Within 0–2 weeks" },
                  { value: "2_4w", label: "Within 2–4 weeks" },
                  { value: "1_3m", label: "Within 1–3 months" },
                  {
                    value: "specific",
                    label: "Specific date (mention in details)",
                  },
                ]
            ).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex items-start gap-2">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-700"
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            {lang === "es" ? (
              <>
                Acepto la{" "}
                <a href="/privacy" className="underline">
                  Política de Privacidad
                </a>
                .
              </>
            ) : (
              <>
                I agree to the{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </>
            )}
          </label>
        </div>

        <details className="md:col-span-2 mt-2 rounded-xl border border-gray-200 dark:border-gray-800">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
            {lang === "es"
              ? "Más detalles (opcional)"
              : "More details (optional)"}
          </summary>
          <div className="p-4 grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="website_url"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {lang === "es" ? "Web / URL" : "Website / URL"}
              </label>
              <input
                id="website_url"
                name="website_url"
                type="url"
                placeholder="https://…"
                pattern="https?://.*"
                className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label
                htmlFor="references"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {lang === "es" ? "Referencias / Enlaces" : "References / Links"}
              </label>
              <textarea
                id="references"
                name="references"
                rows={3}
                placeholder={
                  lang === "es"
                    ? "Pega enlaces de referencia…"
                    : "Paste reference links…"
                }
                className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </details>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center rounded-md px-5 py-3 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {sending ? "…" : labels.submit}
          </button>
          <span
            role="status"
            aria-live="polite"
            className="ml-4 text-sm text-green-600 dark:text-green-400"
          >
            {sent ? labels.success : ""}
          </span>
        </div>
      </form>
    </section>
  );
}
