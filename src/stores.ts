import { derived, writable } from 'svelte/store';

import { isNumber } from './utils/type';
import type { Game, Page, Player, Score } from './types';
import { calculateScoreDelta } from './utils/game';

function persisted<T>(
  key: string,
  defaultValue: T,
  // TODO: Implement storage listener when store has subscribers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: { listen: boolean },
) {
  const prefixedKey = `wizard_${key}`;
  const storedValue =
    typeof localStorage !== 'undefined' && localStorage.getItem(prefixedKey);
  const initialValue = storedValue
    ? (JSON.parse(storedValue) as T)
    : defaultValue;

  const store = writable(initialValue);

  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  });

  return store;
}

export const page = persisted<Page>('page', 'home', { listen: false });

export const games = (() => {
  const store = persisted<Game[]>('games', []);

  const save = ($game: Game) => {
    store.update((prevGames) => [
      ...prevGames.filter((prevGame) => prevGame.id !== $game.id),
      $game,
    ]);
  };

  return { ...store, save };
})();

export const game = (() => {
  const store = persisted<Game | null>('game', null);

  const previous = () => {
    store.update((prevGame) => {
      if (!prevGame) {
        throw new Error('No active game');
      }

      switch (prevGame.phase) {
        case 'dealing':
          return { ...prevGame, round: prevGame.round - 1, phase: 'counting' };
        case 'bidding':
          return { ...prevGame, phase: 'dealing' };
        case 'counting':
          return { ...prevGame, phase: 'bidding' };
        default:
          throw new Error('Invalid phase');
      }
    });
  };

  const next = () => {
    store.update((prevGame) => {
      if (!prevGame) {
        throw new Error('No active game');
      }

      switch (prevGame.phase) {
        case 'dealing':
          return { ...prevGame, phase: 'bidding' };
        case 'bidding':
          return { ...prevGame, phase: 'counting' };
        case 'counting':
          return { ...prevGame, round: prevGame.round + 1, phase: 'dealing' };
        default:
          throw new Error('Invalid phase');
      }
    });
  };

  return { ...store, previous, next };
})();

export const dealer = derived(game, ($game) => {
  if (!$game) {
    return null;
  }
  const index = $game.round % $game.players.length;
  return $game.players[index] as Player;
});

export const points = derived(game, ($game) => {
  if (!$game) {
    return null;
  }

  return $game.players.map((_, index) => {
    let playerPoints = 0;

    return $game.scores.map((score) => {
      const [bid, tricks] = score[index] as Score;
      if (isNumber(bid) && isNumber(tricks)) {
        const delta = calculateScoreDelta([bid, tricks]);
        playerPoints += delta;
        return playerPoints;
      }
      return null;
    });
  });
});
