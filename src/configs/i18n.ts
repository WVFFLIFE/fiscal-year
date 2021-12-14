import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// dictionaries
import EN from 'locales/en.json';
import FI from 'locales/fi.json';

if (process.env.NODE_ENV === 'development') {
  (window as any).setLanguage = (lang: string) => i18n.changeLanguage(lang);
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN,
    },
    fi: {
      translation: FI,
    },
  },
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
