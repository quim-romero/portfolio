import en from "./en/home";
import contactEn from "./en/contact";

import es from "./es/home";
import contactEs from "./es/contact";

export const translations = {
  en: { home: en, contact: contactEn },
  es: { home: es, contact: contactEs },
} as const;

export type Language = keyof typeof translations;
export type Section = keyof (typeof translations)["en"];

export function t(section: Section, key: string, lang: Language): string {
  const result = translations[lang]?.[section]?.[key];
  return result || translations.en?.[section]?.[key] || `${section}.${key}`;
}
