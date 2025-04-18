import { LANGUAGE } from 'astro:env/client';

export const t =
  LANGUAGE === 'en'
    ? {
        qwixx: {
          disclaimer:
            'Not affiliated with Gamewright®. Qwixx™ and all other trademarks are property of their respective owners.',
        },
      }
    : {
        qwixx: {
          disclaimer:
            'Keine Verbindung zu Gamewright®. Qwixx™ und alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.',
        },
      };
