// Game

import { Direction, type ColorConfig } from './types';

export const RED = {
  key: 'red',
  name: 'Red',
  style: '--hue: 350; --saturation: 100%; --lightness: 45%;',
  direction: Direction.ASCENDING,
} satisfies ColorConfig;

export const YELLOW = {
  key: 'yellow',
  name: 'Yellow',
  style: '--hue: 40; --saturation: 100%; --lightness: 55%;',
  direction: Direction.ASCENDING,
} satisfies ColorConfig;

export const GREEN = {
  key: 'green',
  name: 'Green',
  style: '--hue: 140; --saturation: 90%; --lightness: 35%;',
  direction: Direction.DESCENDING,
} satisfies ColorConfig;

export const BLUE = {
  key: 'blue',
  name: 'Blue',
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
