const cachedLanguage = localStorage.getItem('i18n_language') || 'ru';

export default {
  i18n: {
    lng: cachedLanguage,
    fallbackLng: cachedLanguage,
    fallbackNS: 'common',
    ns: [
      'common',
    ],
    backendOptions: [
      {
        prefix: 'i18next_res_',
        store: window.localStorage,
      },
      {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    ],
  },
};
