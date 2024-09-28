import { derived, writable } from 'svelte/store';

import { Direction, type ColorConfig, type HSLColor } from './types';
import { POINTS } from './constants';

export function createColorConfig(
  label: string,
  color: HSLColor,
  direction: Direction,
): ColorConfig {
  const numbers = writable<number[]>([]);
  const points = derived(numbers, (n) => {
    let crosses = n.length;

    // eslint-disable-next-line default-case
    switch (direction) {
      case Direction.ASCENDING:
        if (n.includes(12)) {
          crosses += 1;
        }
        break;
      case Direction.DESCENDING:
        if (n.includes(2)) {
          crosses += 1;
        }
    }

    return POINTS[crosses] || 0;
  });
  const isLocked = writable(false);

  const [hue, saturation, lightness] = color;
  const style = `--hue: ${hue}; --saturation: ${saturation}%; --lightness: ${lightness}%;`;

  const toggleNumber = (number: number) => {
    numbers.update((prev) => {
      // Push
      if (!prev.includes(number)) {
        // eslint-disable-next-line default-case
        switch (direction) {
          case Direction.ASCENDING:
            if (number <= Math.max(...prev)) {
              throw new Error('Can only push a larger number');
            }
            if (number === 12) {
              isLocked.set(true);
            }
            break;
          case Direction.DESCENDING:
            if (number >= Math.min(...prev)) {
              throw new Error('Can only push a smaller number');
            }
            if (number === 2) {
              isLocked.set(true);
            }
        }

        return [...prev, number];
      }

      // Pop
      // eslint-disable-next-line default-case
      switch (direction) {
        case Direction.ASCENDING:
          if (number !== Math.max(...prev)) {
            throw new Error('Can only pop the largest number');
          }
          if (number === 12) {
            isLocked.set(false);
          }
          break;
        case Direction.DESCENDING:
          if (number !== Math.min(...prev)) {
            throw new Error('Can only pop the smallest number');
          }
          if (number === 2) {
            isLocked.set(false);
          }
      }

      return prev.filter((n) => n !== number);
    });
  };

  return {
    label,
    direction,
    numbers,
    toggleNumber,
    points,
    isLocked,
    style,
  };
}
