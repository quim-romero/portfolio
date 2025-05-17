import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../layout/Layout";
import { t } from "../i18n/translations";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useEffect, useState } from "react";
import { sendEmail } from "../utils/sendEmail";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const pageTitle =
    lang === "es"
      ? "Contacto | Colaboremos en tu proyecto frontend – Quim Romero"
      : "Contact | Let’s build something great – Quim Romero";

  const pageDescription =
    lang === "es"
      ? "¿Tienes una idea, producto o startup? Contáctame para trabajar juntos en interfaces modernas con React, Tailwind y animación."
      : "Got a project or idea? Reach out and let’s collaborate on modern interfaces with React, Tailwind, and motion UI.";

  const schema = yup.object({
    name: yup.string().required(t("contact", "form.nameRequired", lang)),
    email: yup
      .string()
      .email(t("contact", "form.invalidEmail", lang))
      .required(t("contact", "form.emailRequired", lang)),
    message: yup.string().required(t("contact", "form.messageRequired", lang)),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (import.meta.env.VITE_DISABLE_EMAILJS === "true") {
      setSendError(false);
      setTimeout(() => {
        reset();
      }, 300);
      return;
    }

    try {
      setSendError(false);
      await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError(true);
    }
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://quimromero.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://quimromero.com/contact" />
      </Helmet>

      <main id="main" role="main" aria-label="Contact form section">
        <section className="relative py-24 px-6 max-w-2xl mx-auto bg-light dark:bg-dark text-text-base dark:text-text-light transition-colors duration-300 overflow-hidden">
          <LanguageTransition>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header>
                <h1 className="text-4xl font-bold mb-8">
                  {t("contact", "heading", lang)}
                </h1>
              </header>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("contact", "form.name", lang)}
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("contact", "form.email", lang)}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("contact", "form.message", lang)}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand text-white dark:text-gray-950 px-6 py-2 rounded-md font-semibold transition hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">
                      {t("contact", "form.sending", lang)}
                    </span>
                  ) : (
                    t("contact", "form.submit", lang)
                  )}
                </button>

                {/* Success */}
                {isSubmitSuccessful && !sendError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    role="status"
                    data-testid="contact-success"
                    className="text-green-500 font-medium mt-4"
                  >
                    {t("contact", "form.success", lang)}
                  </motion.p>
                )}

                {/* Error */}
                {sendError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    role="alert"
                    className="text-red-500 font-medium mt-4"
                  >
                    {t("contact", "form.error", lang) ||
                      "Something went wrong. Please try again."}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </LanguageTransition>

          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-0 pointer-events-none bg-light dark:bg-dark"
            />
          </AnimatePresence>
        </section>
      </main>
    </Layout>
  );
}
