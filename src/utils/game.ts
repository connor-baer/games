import { POINTS_CORRECT, POINTS_PER_TRICK } from '../constants';

import { isNumber } from './type';

export function calculateScoreDelta(
  score: { bid: number | null; tricks: number | null } | null | undefined,
) {
  if (!score || !isNumber(score.bid) || !isNumber(score.tricks)) {
    return null;
  }

  if (score.bid === score.tricks) {
    return POINTS_CORRECT + score.tricks * POINTS_PER_TRICK;
  }

  return -1 * Math.abs(score.tricks - score.bid) * POINTS_PER_TRICK;
}
