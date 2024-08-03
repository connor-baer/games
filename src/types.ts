import type { Writable } from 'svelte/store';

export type Page = 'home' | 'new-game' | 'game' | 'scores';
export type Phase = 'dealing' | 'bidding' | 'counting';

// TODO: Save finished games to a separate store

export type Game = {
  id: string;
  /**
   * Formatted as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`)
   */
  timestamp: string;
  players: Player[];
  scores: Score[][];
  rounds: number;
  /**
   * Zero-indexed
   */
  round: number;
  phase: Phase;
};

export type GameStore = Writable<Game> & {
  previous: () => void;
  next: () => void;
};

export type Player = {
  id: string;
  name: string;
};

type Bid = number;
type Tricks = number;
type Points = number;

export type Score = [Bid?, Tricks?, Points?];
