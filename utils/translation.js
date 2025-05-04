export const LANGUAGES = {
    EN: 'en',
    IT: 'it',
  };

let currentLanguage = LANGUAGES.IT;

export function setLanguage(lang) {
    if (!Object.values(LANGUAGES).includes(lang)) {
      console.warn(`Unsupported language: ${lang}. Falling back to English.`);
      currentLanguage = LANGUAGES.EN;
    } else {
      currentLanguage = lang;
    }
}

const translations = {
    model: {
      hero: {
        en: "hero",
        it: "eroe"
      },
      henchman: {
        en: "henchman",
        it: "soldato"
      }
    },
    rarity: {
      found: {
        en: "Found!",
        it: "Trovato!"
      },
      notFound: {
        en: "Couldn't find it...",
        it: "Niente da fare..." 
      },
      howRare: {
        en: "How rare is the item you are trying to find?",
        it: "Quanto è raro l'oggetto che stai cercando?"
      }
    },
    advancement: {
      strength: {
        en: "+1 Strenght.",
        it: "+1 Forza."
      },
      attack: {
        en: "+1 Attack.",
        it: "+1 Attacco."
      },
      initiative: {
        en: "+1 Initiative.",
        it: "+1 Iniziativa."
      },
      leadership: {
        en: "+1 Leadership.",
        it: "+1 Volontà."
      },
      wound: {
        en: "+1 Wound.",
        it: "+1 Ferita.",
      },
      toughness: {
        en: "+1 Toughness.",
        it: "+1 Robustezza."
      },
      wsOrBs: {
        en: "Choose either +1 WS or +1 BS.",
        it: "Scelgli +1 AC o +1 AB."
      },
      skillOrSpell: {
        en: "New Skill or Random Spell.",
        it: "Nuova Abilità o Incantesimo Casuale."
      },
      ladsgt: {
        en: "The lad\'s got talent. One model in the group becomes a Hero. If you already have the maximum number of Heroes, roll again. The new Hero remains the same Henchman type (e.g., a Ghoul stays as a Ghoul) and starts with the same experience the Henchman had, with all his characteristic increases intact. You may choose two skill lists available to Heroes in your warband. These are the skill types your new Hero can choose from when he gains new skills. He can immediately make one roll on the Heroes Advance table. The remaining members of the Henchmen group, if any, roll again for the advance that they have earned, re-rolling any results of 10-12.",
        it: "Il ragazzo ha talento. Un modello del gruppo diventa un Eroe. Se possiedi già il numero massimo di Eroi, tira di nuovo. Il nuovo eroe rimane dello stesso tipo di Soldato (es. un Ghoul rimane un Ghoul) e comincia con la stessa esperienza che aveva da Soldato, con tutti i suoi avanzamenti di caratteristica intatti. Puoi scegliere due liste di abilità disponibili agli Eroi della tua banda. Queste sono i tipi di abilità che il nuovo Eroe puà scegliere quando ottiene una nuova abilità- Può immediatamente tirare una volta sulla tabella degli Avanzamenti degli Eroi. I membri rimanenti del gruppo di Soldati, se ce ne sono, possono tirare di nuovo per il loro avanzamento, ritirando i risultati da 10-12."
      }
  },
}

  /**
 * Translation helper: returns the string for the given key in the current language.
 * @param {string} key - translation key
 * @returns {string} translated string or the key if missing
 */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  
  export function t(key) {
    const entry = getNestedValue(translations, key);
    if (!entry) {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }
    return entry[currentLanguage] || entry[LANGUAGES.EN] || key;
  }
  