import { useLanguage } from "../hooks/LanguageProvider";
import { t, tArray } from "../i18n/translations";
import { motion, AnimatePresence } from "framer-motion";

type StackModalProps = {
  onClose: () => void;
};

export default function StackModal({ onClose }: StackModalProps) {
  const { lang } = useLanguage();
  const sections = tArray<{ title: string; items: string[] }>(
    "footer",
    "stack.sections",
    lang
  );

  const githubLabel =
    lang === "es" ? "Ver código en GitHub →" : "View source on GitHub →";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stack-modal-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-2xl w-full bg-white dark:bg-gray-900 text-left p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh] text-sm text-gray-800 dark:text-gray-200 font-mono space-y-4 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-red-400 text-lg font-bold"
            aria-label={t("footer", "stack.close", lang)}
          >
            ×
          </button>

          <h2 id="stack-modal-title" className="text-xl font-semibold mb-2">
            {t("footer", "stack.title", lang)}
          </h2>

          {sections.map((section, index) => (
            <div key={index}>
              <strong className="block mb-1">{section.title}</strong>
              <ul className="list-disc ml-5 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            <a
              href="https://github.com/quim-romero/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark transition"
            >
              {githubLabel}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
