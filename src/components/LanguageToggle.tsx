import { useLanguage } from '../hooks/LanguageProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const toggle = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <button onClick={toggle} className="absolute top-4 right-4 text-sm px-3 py-2 bg-brand text-white rounded">
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
