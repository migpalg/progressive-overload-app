import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";

const backendOptions: HttpBackendOptions = {
  loadPath: "/locales/{{lng}}.json",
};

i18n
  // Initialize i18next plugins and confiugurations
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
    cleanCode: true,
    load: "languageOnly",
    lowerCaseLng: true,
    backend: backendOptions,
  });
