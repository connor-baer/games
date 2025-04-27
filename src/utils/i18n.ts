import { LANGUAGE } from 'astro:env/client';
import { MAX_PLAYERS, MIN_PLAYERS } from 'src/lib/wizard/constants';

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
        wizard: {
          scores: 'Scores',
          close: 'Close',
          back: 'Back',
          total: 'Total',
          about: {
            title: 'Wizard Scorekeeper',
            description:
              'Keep track of the scores in the trick-taking card game Wizard for three to six players',
            p1: `is a trick-taking card game for ${MIN_PLAYERS} to ${MAX_PLAYERS} players designed by Ken Fisher of Toronto, Ontario in 1984.`,
            p2: 'The objective of the game is to bid correctly on the number of tricks that a player will take in the subsequent round of play. Points are awarded for a correct bid and subtracted for an incorrect bid. The player with the most points after all rounds have been played is the winner.',
            p3: 'This digital scorekeeper mimics the traditional scorecards, adding validation and automatic point calculation.',
            new: 'New game',
            past: 'Past games',
            resume: 'Resume',
          },
          new: {
            title: 'New game',
            description:
              'Start a new game of Wizard, the trick-taking card game',
            players: 'Players',
            instructions: `Add ${MIN_PLAYERS} to ${MAX_PLAYERS} players in the order they are sitting. The first player deals first.`,
            player: 'Player',
            start: 'Start game',
          },
          dealer: {
            title: 'Dealer',
            description: 'Players take turns dealing cards.',
            deals: 'deals',
            card: 'card',
            cards: 'cards',
            action: 'Start bidding',
          },
          bids: {
            title: 'Bids',
            description:
              'Each player predicts how many tricks they will take this round.',
            action: 'Save bids',
          },
          tricks: {
            title: 'Tricks',
            description: 'Count how many tricks each player managed to take.',
            action: 'Save tricks',
          },
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
        wizard: {
          scores: 'Punktestand',
          close: 'Schließen',
          back: 'Zurück',
          total: 'Gesamt',
          about: {
            title: 'Wizard Punktezähler',
            description:
              'Verfolgen Sie den Punktestand beim Stichkartenspiel Wizard für drei bis sechs Spieler.',
            p1: `ist ein Stichspiel für ${MIN_PLAYERS} bis ${MAX_PLAYERS} Spieler, das 1984 von Ken Fisher aus Toronto, Ontario, entwickelt wurde.`,
            p2: 'Ziel des Spiels ist es, die Anzahl der Stiche, die man in der jeweiligen Runde machen wird, korrekt vorherzusagen. Für eine korrekte Vorhersage gibt es Punkte, für eine falsche Vorhersage werden Punkte abgezogen. Der Spieler mit den meisten Punkten nach allen Runden gewinnt das Spiel.',
            p3: 'Dieser digitale Punktezähler ahmt die traditionellen Wertungsblöcke nach und bietet zusätzlich eine Überprüfung der Eingaben sowie eine automatische Punkteberechnung.',
            new: 'Neues Spiel',
            past: 'Vergangene Spiele',
            resume: 'Fortsetzen',
          },
          new: {
            title: 'Neues Spiel',
            description:
              'Starte eine neue Partie Wizard, das Stichkartenspiel.',
            players: 'Spieler',
            instructions: `Füge ${MIN_PLAYERS} bis ${MAX_PLAYERS} Spieler hinzu in der Reihenfolge in der sie sitzen. Der erste Spieler teilt zuerst aus.`,
            player: 'Spieler',
            start: 'Spiel beginnen',
          },
          dealer: {
            title: 'Verteiler',
            description: 'Spieler wechseln sich mit dem Verteilen ab.',
            deals: 'verteilt',
            card: 'Karte',
            cards: 'Karten',
            action: 'Weiter',
          },
          bids: {
            title: 'Gebote',
            description:
              'Jeder Spieler sagt voraus, wie viele Stiche er diese Runde machen wird.',
            action: 'Weiter',
          },
          tricks: {
            title: 'Stiche',
            description: 'Zählt, wie viele Stiche jeder Spieler gemacht hat.',
            action: 'Weiter',
          },
        },
      };
