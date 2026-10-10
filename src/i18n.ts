import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./locales";

export type Language = keyof typeof resources;
export type MessageKey = keyof typeof resources.en.translation;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  interpolation: {
    escapeValue: false,
  },
});

export const localeFor = (language: string): string =>
  language.startsWith("fr") ? "fr-CA" : "en-CA";

export default i18n;
