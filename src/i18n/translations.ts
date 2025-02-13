import en from './en/home';
import es from './es/home';

export const translations = {
  en: { home: en },
  es: { home: es },
} as const;

export type Language = keyof typeof translations;
export type Section = keyof (typeof translations)['en'];

export function t(section: Section, key: string, lang: Language): string {
  const result = translations[lang]?.[section]?.[key];
  return result || translations.en?.[section]?.[key] || `${section}.${key}`;
}
