import React, { useEffect, useState } from "react";
import type { Currency } from "../../services/pricing";
import {
  initEmail,
  sendEmailForm,
  isBot,
  stampHiddenFields,
} from "../../services/email";
import {
  trackFormSubmitError,
  trackFormSubmitSuccess,
} from "../../services/analytics";

type Lang = "es" | "en";

type Props = {
  lang: Lang;
  currency: Currency;
  labels: {
    title: string;
    name: string;
    email: string;
    goal: string;
    budget: string;
    budgetOptions: string[];
    submit: string;
    success: string;
  };
  hiddenDefaults?: Record<string, string>;
  className?: string;
  onSuccess?: () => void;
  onError?: (message?: string) => void;
};

export default function ServicesForm({
  lang,
  currency,
  labels,
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (isBot(formEl)) return;

    stampHiddenFields(formEl, {
      lang,
      currency,
      timestamp: new Date().toISOString(),
      ...hiddenDefaults,
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
        noValidate
        className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

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
            {labels.budgetOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

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
