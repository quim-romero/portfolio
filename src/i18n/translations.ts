import en_home from './en/home';
import en_about from './en/about';
import en_contact from './en/contact';
import en_projects from './en/projects';
import en_projectDetails from './en/projectDetails';

import es_home from './es/home';
import es_about from './es/about';
import es_contact from './es/contact';
import es_projects from './es/projects';
import es_projectDetails from './es/projectDetails';


export const translations = {
  en: {
    home: en_home,
    about: en_about,
    contact: en_contact,
    projects: en_projects,
    projectDetails: en_projectDetails,

  },
  es: {
    home: es_home,
    about: es_about,
    contact: es_contact,
    projects: es_projects,
    projectDetails: es_projectDetails,
  },
} as const;

export type Language = keyof typeof translations;
export type Section = keyof (typeof translations)['en'];

/**
 * Returns a translated string by section and key path, falling back to English if missing.
 */
export function t(section: Section, keyPath: string, lang: Language): string {
  const result = resolve(section, keyPath, lang);
  return typeof result === 'string' || typeof result === 'number'
    ? String(result)
    : `${section}.${keyPath}`;
}

/**
 * Returns a translated array (e.g. for lists or highlights).
 */
export function tArray<T = string>(section: Section, keyPath: string, lang: Language): T[] {
  const result = resolve(section, keyPath, lang);
  return Array.isArray(result) ? (result as T[]) : [];
}

/**
 * Checks whether a translation key exists.
 */
export function tExists(section: Section, keyPath: string, lang: Language): boolean {
  return resolve(section, keyPath, lang) !== undefined;
}

/**
 * Looks up a translation key in the specified language, with fallback to English.
 */
function resolve(section: Section, keyPath: string, lang: Language): unknown {
  const keys = keyPath.split('.');

  // Try in selected language
  let value: unknown = translations[lang]?.[section];

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
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
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return value;
}
