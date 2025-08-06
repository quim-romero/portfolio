export default {
  metaTitle: "Privacy Policy — Quim Romero",
  metaDescription:
    "Information about how we process your personal data when you contact or request a quote.",
  heading: "Privacy Policy",

  intro:
    "This page explains how {NAME} processes your personal data when you use the contact and services forms on this website.",

  controller: {
    title: "Controller",
    labelName: "Name",
    labelId: "ID",
    labelAddress: "Address",
    labelEmail: "Email",
  },

  dataWeProcess: {
    title: "Data we process",
    intro: "We collect and process the data you provide through the forms:",
    bullets: [
      "Identification & contact: name and email.",
      "Project information: message/goal, selected package (if any), timeline, approximate budget band, currency, price_view, price_eur, budget_label, budget_eur_min, budget_eur_max, source page and timestamp.",
      "Optional fields: company/brand, website/URL, phone, reference links.",
      "Consent: acceptance of this Privacy Policy.",
    ],
    techNote:
      "For technical and security reasons, our hosting and service providers may log usage data (e.g., IP address, browser headers and essential cookies). If analytics are used, they are only loaded after consent.",
    seeCookies: "See the Cookies Policy",
  },

  purposes: {
    title: "Purposes",
    bullets: [
      "Handle and reply to your contact or quote request.",
      "Prepare proposals and maintain pre-contractual communications.",
      "Improve service quality and site security (technical logs, anti-spam measures).",
      "Usage statistics (only if you consent to cookies).",
    ],
  },

  legalBasis: {
    title: "Legal basis",
    bullets: [
      "Consent (GDPR art. 6.1.a) to process your request and contact you.",
      "Pre-contractual measures (GDPR art. 6.1.b) when you ask for a quote.",
    ],
  },

  retention: {
    title: "Retention",
    text: "We keep your data for up to 24 months after the last interaction or until you withdraw consent, unless a different legal obligation applies.",
  },

  recipients: {
    title: "Recipients & processors",
    intro: "We use service providers acting as processors:",
    bullets: [
      "EmailJS: sending and handling form emails.",
      "Hosting provider (e.g., Vercel/Netlify): site hosting and delivery.",
      "Analytics (if enabled and consented): usage measurement (e.g., Google Analytics).",
    ],
    transfers:
      "Some providers may be located outside the EEA. In such cases, appropriate safeguards (e.g., Standard Contractual Clauses) are applied in accordance with the GDPR.",
  },

  rights: {
    title: "Your rights",
    text: "You can exercise your rights of access, rectification, erasure, objection, restriction and portability by contacting {EMAIL}. If you disagree, you may lodge a complaint with your data protection authority.",
  },

  security: {
    title: "Security",
    text: "We implement reasonable technical and organisational measures to protect your data. No automated decisions or profiling are carried out.",
  },

  children: {
    title: "Children",
    text: "This site is not directed to children under 14. If you believe a child has provided data, please contact us so we can delete it.",
  },

  updates: {
    title: "Updates",
    text: "We may update this policy to reflect legal or operational changes. The current version will always be available at this URL.",
  },
} as const;
