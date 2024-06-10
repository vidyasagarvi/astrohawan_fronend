// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './i18n/en.json';
import hi from './i18n/hi.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      hi: {
        translation: hi,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
