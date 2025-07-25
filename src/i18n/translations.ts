import en_header from "./en/header";
import en_home from "./en/home";
import en_about from "./en/about";
import en_contact from "./en/contact";
import en_projects from "./en/projects";
import en_projectDetails from "./en/projectDetails";
import en_notFound from "./en/notFound";
import en_footer from "./en/footer";
import en_blogMeta from "./en/blogMeta";
import en_article from "./en/article";

import es_header from "./es/header";
import es_home from "./es/home";
import es_about from "./es/about";
import es_contact from "./es/contact";
import es_projects from "./es/projects";
import es_projectDetails from "./es/projectDetails";
import es_notFound from "./es/notFound";
import es_footer from "./es/footer";
import es_blogMeta from "./es/blogMeta";
import es_article from "./es/article";

export const translations = {
  en: {
    header: en_header,
    home: en_home,
    about: en_about,
    contact: en_contact,
    projects: en_projects,
    projectDetails: en_projectDetails,
    notFound: en_notFound,
    footer: en_footer,
    blogMeta: en_blogMeta,
    article: en_article,
  },
  es: {
    header: es_header,
    home: es_home,
    about: es_about,
    contact: es_contact,
    projects: es_projects,
    projectDetails: es_projectDetails,
    notFound: es_notFound,
    footer: es_footer,
    blogMeta: es_blogMeta,
    article: es_article,
  },
} as const;

export type Language = keyof typeof translations;
export type Section = keyof (typeof translations)["en"];

/**
 * Returns a translated string by section and key path, falling back to English if missing.
 */
export function t(section: Section, keyPath: string, lang: Language): string {
  const result = resolve(section, keyPath, lang);
  return typeof result === "string" || typeof result === "number"
    ? String(result)
    : `${section}.${keyPath}`;
}

/**
 * Returns a translated array.
 */
export function tArray<T = string>(
  section: Section,
  keyPath: string,
  lang: Language
): T[] {
  const result = resolve(section, keyPath, lang);
  return Array.isArray(result) ? (result as T[]) : [];
}

/**
 * Checks whether a translation key exists.
 */
export function tExists(
  section: Section,
  keyPath: string,
  lang: Language
): boolean {
  return resolve(section, keyPath, lang) !== undefined;
}

/**
 * Looks up a translation key in the specified language, with fallback to English.
 */
function resolve(section: Section, keyPath: string, lang: Language): unknown {
  const keys = keyPath.split(".");

  // Try in selected language
  let value: unknown = translations[lang]?.[section];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      value = undefined;
      break;
    }
  }

  if (value !== undefined) return value;

  // Fallback to English
  value = translations.en?.[section];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return value;
}
