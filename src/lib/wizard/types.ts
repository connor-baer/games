// TODO: Delete
import type { Game, Scores } from 'astro:db';

export type GameId = (typeof Game.$inferSelect)['id'];
export type Round = number;
export type Score = typeof Scores.$inferSelect;
