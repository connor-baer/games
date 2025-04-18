import { LANGUAGE } from 'astro:env/client';

export const t =
  LANGUAGE === 'en'
    ? {
        qwixx: {
          undo: 'Undo',
          redo: 'Redo',
          reset: 'Reset',
          colors: {
            red: 'Red',
            yellow: 'Yellow',
            green: 'Green',
            blue: 'Blue',
          },
          numbers: 'Numbers',
          penalties: 'Penalties',
          points: 'Points',
          totals: 'Totals',
          total: 'Total',
          disclaimer:
            'Not affiliated with Gamewright®. Qwixx™ and all other trademarks are property of their respective owners.',
        },
      }
    : {
        qwixx: {
          undo: 'Rückgängig',
          redo: 'Wiederholen',
          reset: 'Zurücksetzen',
          colors: {
            red: 'Rot',
            yellow: 'Gelb',
            green: 'Grün',
            blue: 'Blau',
          },
          numbers: 'Zahlen',
          penalties: 'Fehlwürfe',
          points: 'Punkte',
          totals: 'Ergebnis',
          total: 'Gesamtergebnis',
          disclaimer:
            'Keine Verbindung zu Gamewright®. Qwixx™ und alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.',
        },
      };
