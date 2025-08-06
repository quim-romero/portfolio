import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { motion } from "framer-motion";
import { t, tArray } from "../i18n/translations";

const OWNER_NAME = "Quim Romero";
const OWNER_EMAIL = "quim@quimromero.com";

const canonical = "/privacy";

function subVars(input: string): string {
  return input
    .replaceAll("{NAME}", OWNER_NAME)
    .replaceAll("{EMAIL}", OWNER_EMAIL);
}

export default function Privacy() {
  const { lang } = useLanguage();
  const metaTitle = t("privacy", "metaTitle", lang);
  const metaDescription = t("privacy", "metaDescription", lang);
  const heading = t("privacy", "heading", lang);

  const ctrlTitle = t("privacy", "controller.title", lang);
  const labelName = t("privacy", "controller.labelName", lang);
  const labelEmail = t("privacy", "controller.labelEmail", lang);

  const intro = subVars(t("privacy", "intro", lang));

  const dwpTitle = t("privacy", "dataWeProcess.title", lang);
  const dwpIntro = t("privacy", "dataWeProcess.intro", lang);
  const dwpBullets = tArray<string>(
    "privacy",
    "dataWeProcess.bullets",
    lang
  ).map(subVars);
  {/*const dwpTech = t("privacy", "dataWeProcess.techNote", lang);
  const dwpSeeCookies = t("privacy", "dataWeProcess.seeCookies", lang);*/}

  const purposesTitle = t("privacy", "purposes.title", lang);
  const purposesBullets = tArray<string>("privacy", "purposes.bullets", lang);

  const lbTitle = t("privacy", "legalBasis.title", lang);
  const lbBullets = tArray<string>("privacy", "legalBasis.bullets", lang);

  const retTitle = t("privacy", "retention.title", lang);
  const retText = t("privacy", "retention.text", lang);

  const recTitle = t("privacy", "recipients.title", lang);
  const recIntro = t("privacy", "recipients.intro", lang);
  const recBullets = tArray<string>("privacy", "recipients.bullets", lang);
  const recTransfers = t("privacy", "recipients.transfers", lang);

  const rightsTitle = t("privacy", "rights.title", lang);
  const rightsText = subVars(t("privacy", "rights.text", lang));

  const secTitle = t("privacy", "security.title", lang);
  const secText = t("privacy", "security.text", lang);

  const chTitle = t("privacy", "children.title", lang);
  const chText = t("privacy", "children.text", lang);

  const updTitle = t("privacy", "updates.title", lang);
  const updText = t("privacy", "updates.text", lang);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://quimromero.com${canonical}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://quimromero.com${canonical}`}
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main id="main" role="main" aria-label={heading}>
        <section className="relative py-24 px-6 max-w-3xl mx-auto">
          <LanguageTransition>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              <h1>{heading}</h1>
              <p>{intro}</p>

              <h2>{ctrlTitle}</h2>
              <ul>
                <li>
                  <strong>{labelName}:</strong> {OWNER_NAME}
                </li>
                <li>
                  <strong>{labelEmail}:</strong>{" "}
                  <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
                </li>
              </ul>

              <h2>{dwpTitle}</h2>
              <p>{dwpIntro}</p>
              <ul>
                {dwpBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {/*<p>
                {dwpTech}{" "}
                <a href="/cookies" className="underline">
                  {dwpSeeCookies}
                </a>
                .
              </p>*/}

              <h2>{purposesTitle}</h2>
              <ul>
                {purposesBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <h2>{lbTitle}</h2>
              <ul>
                {lbBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <h2>{retTitle}</h2>
              <p>{retText}</p>

              <h2>{recTitle}</h2>
              <p>{recIntro}</p>
              <ul>
                {recBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <p>{recTransfers}</p>

              <h2>{rightsTitle}</h2>
              <p>{rightsText}</p>

              <h2>{secTitle}</h2>
              <p>{secText}</p>

              <h2>{chTitle}</h2>
              <p>{chText}</p>

              <h2>{updTitle}</h2>
              <p>{updText}</p>
            </motion.article>
          </LanguageTransition>
        </section>
      </main>
    </Layout>
  );
}
