import { and, db, eq, Game, Player, PlayerInGame, Scores } from 'astro:db';

import { NUMBER_OF_CARDS } from './constants';
import { createArray } from './utils/array';
import { calculateScoreDelta } from './utils/game';

type GameId = (typeof Game.$inferSelect)['id'];

export function getGames() {
  return db.select().from(Game).orderBy(Game.endedAt);
}

export function getGame(gameId: GameId) {
  return db.select().from(Game).where(eq(Game.id, gameId)).get();
}

export async function getPlayers(gameId: GameId) {
  const players = await db
    .select()
    .from(PlayerInGame)
    .where(eq(PlayerInGame.gameId, gameId))
    .orderBy(PlayerInGame.position)
    .innerJoin(Player, eq(PlayerInGame.playerId, Player.id));
  return players.map((player) => ({
    id: player.Player.id,
    name: player.Player.name,
    position: player.PlayerInGame.position,
  }));
}

export async function getScores(gameId: GameId, round?: number) {
  return db
    .select()
    .from(Scores)
    .where(
      round
        ? and(eq(Scores.gameId, gameId), eq(Scores.round, round))
        : eq(Scores.gameId, gameId),
    )
    .orderBy(Scores.round);
}

export async function getScoreCard(
  gameId: GameId,
  players: Awaited<ReturnType<typeof getPlayers>>,
) {
  const scores = await getScores(gameId);

  const maxRounds = NUMBER_OF_CARDS / players.length;
  const runningTotals: Record<string, number> = {};

  const rounds = createArray(maxRounds).map((_, index) => {
    const round = index + 1;
    return players.map((player) => {
      const score = scores.find(
        (s) => s.round === round && s.playerId === player.id,
      );

      if (!score) {
        return null;
      }

      const delta = calculateScoreDelta(score);
      const total = (runningTotals[player.id] || 0) + delta;

      runningTotals[player.id] = total;

      return { ...score, delta, total };
    });
  });

  return rounds;
}
