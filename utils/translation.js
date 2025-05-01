export const LANGUAGES = {
    EN: 'en',
    IT: 'it',
  };

let currentLanguage = LANGUAGES.EN;

export function setLanguage(lang) {
    if (!Object.values(LANGUAGES).includes(lang)) {
      console.warn(`Unsupported language: ${lang}. Falling back to English.`);
      currentLanguage = LANGUAGES.EN;
    } else {
      currentLanguage = lang;
    }
}

const translations = {
    greeting: {
      en: 'Hello',
      it: 'Ciao',
    },
    farewell: {
      en: 'Goodbye',
      it: 'Arrivederci',
    },
    test: {
      en: 'This is a test command',
      it: 'Questo è un comando di prova',
    },
    // Add more keys as needed
  };

  /**
 * Translation helper: returns the string for the given key in the current language.
 * @param {string} key - translation key
 * @returns {string} translated string or the key if missing
 */
export function t(key) {
    const entry = translations[key];
    if (!entry) {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }
    return entry[currentLanguage] || entry[LANGUAGES.EN] || key;
}