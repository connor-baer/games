export enum Direction {
  ASCENDING = 0,
  DESCENDING = 1,
}

export type Color = 'red' | 'yellow' | 'green' | 'blue';

export type ColorConfig = {
  key: Color;
  style: string;
  direction: Direction;
};

export type GameState = {
  red: number[];
  yellow: number[];
  green: number[];
  blue: number[];
  penalties: number;
};

export type Points = {
  red: number;
  yellow: number;
  green: number;
  blue: number;
  penalties: number;
  total: number;
};
