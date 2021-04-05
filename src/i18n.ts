import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Chaining from 'i18next-chained-backend';
import Backend from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-backend';
import config from 'src/config/i18nConfig';

export const cachedLanguageKey: string = 'i18n_language';

i18n
  .use(Chaining)
  .use(initReactI18next)
  .init({
    backend: {
      backendOptions: config.i18n.backendOptions,
      backends: [
        Cache,
        Backend,
      ],
    },
    debug: true,
    lng: config.i18n.lng,
    ns: config.i18n.ns,
    defaultNS: config.i18n.fallbackNS,
    fallbackLng: config.i18n.fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    const cachedLang = localStorage.getItem(cachedLanguageKey);
    const defaultLang = i18n.language || config.i18n.fallbackLng;

    if (cachedLang) localStorage.setItem(cachedLanguageKey, defaultLang);
  });

i18n.on('languageChanged', (lang: string) => {
  localStorage.setItem(cachedLanguageKey, lang);
});
