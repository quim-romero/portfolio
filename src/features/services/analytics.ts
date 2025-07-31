export type Lang = "es" | "en";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const push = (event: string, data: Record<string, unknown> = {}) => {
  try {
    window?.dataLayer?.push({ event, ts: Date.now(), ...data });
  } catch {}
};

export const trackPageView = (lang: Lang, path: string = "/services") =>
  push("services_page_view", { lang, path });

export const trackEmailClick = (lang: Lang) =>
  push("services_email_click", { lang });

export const trackPackageCta = (
  lang: Lang,
  pkgId: string,
  from: "card" | "modal" = "card"
) => push("services_package_cta_click", { lang, package: pkgId, from });

export const trackDetailsOpen = (lang: Lang, pkgId: string, open: boolean) =>
  push("services_details_open", { lang, package: pkgId, open });

export const trackStickyCta = (lang: Lang) =>
  push("services_sticky_cta_click", { lang });

export const trackFormSubmitSuccess = (lang: Lang) =>
  push("services_form_submit_success", { lang });

export const trackFormSubmitError = (lang: Lang, message?: string) =>
  push("services_form_submit_error", { lang, message });
