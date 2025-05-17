import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { t } from '../i18n/translations';
import { useLanguage } from '../hooks/LanguageProvider';
import LanguageTransition from '../components/LanguageTransition';
import { useDarkMode } from '../hooks/DarkModeContext';

export default function NotFound() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? 'dark' : 'light');
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/'), 8000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  const pageTitle =
    lang === 'es' ? 'Página no encontrada – Quim Romero' : 'Page not found – Quim Romero';

  const pageDescription =
    lang === 'es'
      ? 'Esta página no existe o ha sido movida. Serás redirigido a la página principal.'
      : 'This page does not exist or has been moved. You’ll be redirected to the homepage.';

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main
        id="main"
        role="main"
        aria-label="404 – Page Not Found"
        className={`h-screen w-full flex items-center justify-center px-6 text-center font-mono transition-colors duration-300 ${
          theme === 'dark' ? 'bg-dark text-text-light' : 'bg-light text-text-base'
        }`}
      >
        <LanguageTransition>
          <div className="max-w-xl">
            <motion.div
              className="text-sm text-muted mb-2 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {t('notFound', 'title', lang)}
            </motion.div>

            {/* Glitch Title with accessibility */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold glitch mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              aria-label={t('notFound', 'glitchTitle', lang)}
              aria-describedby="subtitle"
            >
              <span aria-hidden="true">{t('notFound', 'glitchTitle', lang)}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              id="subtitle"
              className="text-lg md:text-xl opacity-90 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('notFound', 'glitchSubtitle', lang)}
            </motion.p>

            {/* Hint */}
            <motion.p
              className="text-sm text-muted dark:text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t('notFound', 'hint', lang)}
            </motion.p>

            {/* Back Home */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-block bg-brand text-black dark:text-white font-semibold px-6 py-3 rounded-md hover:brightness-110 transition"
                aria-label={t('notFound', 'backHome', lang)}
              >
                {t('notFound', 'backHome', lang)}
              </Link>
            </motion.div>
          </div>
        </LanguageTransition>

        {/* Glitch styles */}
        <style>{`
          .glitch {
            position: relative;
          }
          .glitch::before,
          .glitch::after {
            content: '${t('notFound', 'glitchTitle', lang)}';
            position: absolute;
            left: 0;
            width: 100%;
          }
          .glitch::before {
            color: #f0f;
            animation: glitchTop 1s infinite;
          }
          .glitch::after {
            color: #0ff;
            animation: glitchBottom 1s infinite;
          }
          @keyframes glitchTop {
            0% { top: -1px; left: 1px; }
            20% { top: -2px; left: -2px; }
            40% { top: 1px; left: 2px; }
            60% { top: 0; left: 0; }
            80% { top: 2px; left: -1px; }
            100% { top: -1px; left: 1px; }
          }
          @keyframes glitchBottom {
            0% { top: 1px; left: -1px; }
            20% { top: 2px; left: 2px; }
            40% { top: -1px; left: -2px; }
            60% { top: 0; left: 0; }
            80% { top: -2px; left: 1px; }
            100% { top: 1px; left: -1px; }
          }
        `}</style>
      </main>
    </>
  );
}
