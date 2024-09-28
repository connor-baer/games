import type { Readable, Writable } from 'svelte/store';

export enum Direction {
  ASCENDING,
  DESCENDING,
}

export type HSLColor = [number, number, number, number?];

export type ColorConfig = {
  label: string;
  direction: Direction;
  numbers: Writable<number[]>;
  toggleNumber: (number: number) => void;
  points: Readable<number>;
  isLocked: Writable<boolean>;
  style: string;
  reset: () => void;
};
