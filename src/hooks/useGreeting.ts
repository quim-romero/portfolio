import { useEffect, useState } from "react";
import { t } from "../i18n/translations";
import { useLanguage } from "./LanguageProvider";

export function useGreeting() {
  const { lang } = useLanguage();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12)
      setGreeting(t("home", "greeting.morning", lang));
    else if (hour >= 12 && hour < 18)
      setGreeting(t("home", "greeting.afternoon", lang));
    else setGreeting(t("home", "greeting.evening", lang));
  }, [lang]);

  return greeting;
}
