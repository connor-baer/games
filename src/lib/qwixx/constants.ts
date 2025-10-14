// Game

import { type ColorConfig, Direction } from './types';

export const RED = {
  key: 'red',
  style: '--hue: 350; --saturation: 100%; --lightness: 45%;',
  direction: Direction.ASCENDING,
} satisfies ColorConfig;

export const YELLOW = {
  key: 'yellow',
  style: '--hue: 40; --saturation: 100%; --lightness: 55%;',
  direction: Direction.ASCENDING,
} satisfies ColorConfig;

export const GREEN = {
  key: 'green',
  style: '--hue: 140; --saturation: 90%; --lightness: 35%;',
  direction: Direction.DESCENDING,
} satisfies ColorConfig;

export const BLUE = {
  key: 'blue',
  style: '--hue: 215; --saturation: 100%; --lightness: 50%;',
  direction: Direction.DESCENDING,
} satisfies ColorConfig;

export const COLORS = [RED, YELLOW, GREEN, BLUE];

/**
 * Maps the amount of crossed-off numbers (index) to the respective score (value).
 */
export const POINTS = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
export const NUMBERS = 11;
export const PENALTIES = 4;
export const PENALTY_POINTS = -5;
