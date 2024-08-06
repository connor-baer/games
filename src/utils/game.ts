import type { Scores } from 'astro:db';

import { POINTS_CORRECT, POINTS_PER_TRICK } from '../constants';

import { isNumber } from './type';

// TODO: Make it work with incomplete score
export function calculateScoreDelta(score: typeof Scores.$inferSelect) {
  const { bid, tricks } = score;

  if (!isNumber(bid) || !isNumber(tricks)) {
    // This should never happen.
    throw new Error('Missing bid or tricks');
  }

  if (bid === tricks) {
    return POINTS_CORRECT + tricks * POINTS_PER_TRICK;
  }

  return -1 * Math.abs(tricks - bid) * POINTS_PER_TRICK;
}
