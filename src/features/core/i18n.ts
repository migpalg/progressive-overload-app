import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";

const options: HttpBackendOptions = {
  loadPath: "/locales/{{lng}}.json",
};

i18n.use(initReactI18next).use(HttpApi).init({
  lng: "en",
  backend: options,
});
