import type { Score } from '../types';
import {
  NUMBER_OF_CARDS,
  POINTS_CORRECT,
  POINTS_PER_TRICK,
} from '../constants';

import { isNumber } from './type';

export function calculateScoreDelta(score: Score | null | undefined) {
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
