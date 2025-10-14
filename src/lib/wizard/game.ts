import { isNumber } from '../../utils/type';

import { NUMBER_OF_CARDS, POINTS_CORRECT, POINTS_PER_TRICK } from './constants';
import type { Score } from './stores';

export function calculateScoreDelta(
  score: Pick<Score, 'bid' | 'tricks'> | null | undefined,
) {
  if (!score || !isNumber(score.bid) || !isNumber(score.tricks)) {
    return null;
  }

  if (score.bid === score.tricks) {
    return POINTS_CORRECT + score.tricks * POINTS_PER_TRICK;
  }

  return -1 * Math.abs(score.tricks - score.bid) * POINTS_PER_TRICK;
}

export function getMaxRounds(numberOfPlayers: number) {
  return NUMBER_OF_CARDS / numberOfPlayers;
}
