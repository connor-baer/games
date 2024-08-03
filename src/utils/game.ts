import { shiftArray } from 'src/utils/array';

import type { Game, Player, Score } from '../types';
import { POINTS_CORRECT, POINTS_PER_TRICK } from '../constants';

import { isNumber } from './type';

export function calculateScoreDelta(score: Score) {
  const [bid, tricks] = score;

  if (!isNumber(bid) || !isNumber(tricks)) {
    // This should never happen.
    throw new Error('Missing bid or tricks');
  }

  if (bid === tricks) {
    return POINTS_CORRECT + tricks * POINTS_PER_TRICK;
  }

  return -1 * Math.abs(tricks - bid) * POINTS_PER_TRICK;
}

export function sortPlayersForRound(game: Game): Player[] {
  return shiftArray(game.players, game.round + 1);
}

export function getPlayerIndex(game: Game, playerId: Player['id']): number {
  return game.players.findIndex((player) => player.id === playerId);
}

export function sortGamesByTimestamp(a: Game, b: Game) {
  return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
}
