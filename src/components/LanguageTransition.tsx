import { useEffect, useState } from 'react';

export default function LanguageTransition({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [lang]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 bg-black/80 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
      {lang === 'en' ? 'Language: English' : 'Idioma: Español'}
    </div>
  );
}
