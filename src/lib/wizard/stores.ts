import { persisted } from 'svelte-persisted-store';
import { derived } from 'svelte/store';

import { shiftArray } from '../../utils/array';

function db<Value>(name: string, initialValues: Value[] = []) {
  const store = persisted(name, initialValues);

  const insert = (value: Value | Value[]) => {
    store.update((prev) => prev.concat(value));
  };

  return { subscribe: store.subscribe, insert };
}

type Game = {
  id: string;
  round: number;
  startedAt: string;
  endedAt?: string;
};

type CurrentGame = Game | null;

export function getCurrentGame() {
  return persisted<CurrentGame>('wizard-current-game', null);
}

export function getGames() {
  return db<Game>('wizard-games');
}

export type Player = {
  id: string;
  name: string;
};

export function getPlayers() {
  return db<Player>('wizard-players');
}

export type PlayerInGame = {
  id: string;
  gameId: string;
  playerId: string;
  position: number;
};

export function getPlayersInGame() {
  return db<PlayerInGame>('wizard-players-in-game');
}

type Score = {
  id: string;
  gameId: string;
  playerId: string;
  round: number;
  bid?: number;
  tricks?: number;
};

export function getScores() {
  return db<Score>('wizard-scores');
}

export function getCurrentPlayers(game: CurrentGame) {
  const players = getPlayers();
  const playersInGame = getPlayersInGame();
  return derived([players, playersInGame], ([$players, $playersInGame]) => {
    if (!game) {
      return [] as Player[];
    }
    const activePlayers = $playersInGame
      .filter((p) => p.gameId === game.id)
      .sort((a, b) => a.position - b.position)
      .map(
        (p) => $players.find((player) => p.playerId === player.id) as Player,
      );
    return shiftArray(activePlayers, game.round);
  });
}

export function getDealer(game: CurrentGame) {
  const players = getCurrentPlayers(game);
  return derived(players, ($players) => $players[$players.length - 1]);
}
