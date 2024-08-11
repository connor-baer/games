import { defineAction, z } from 'astro:actions';
import {
  db,
  eq,
  Game,
  League,
  Player,
  PlayerInGame,
  Scores,
  sql,
} from 'astro:db';
import { inDaysFromNow } from 'src/utils/date';

import { LEAGUE_COOKIE, MAX_PLAYERS, MIN_PLAYERS } from '../constants';
import { getMaxRounds } from '../utils/game';
import { createHumanId } from '../utils/id';

export const server = {
  newGame: defineAction({
    accept: 'form',
    input: z.object({
      playerIds: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
      playerNames: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
    }),
    handler: async ({ playerIds, playerNames }, context) => {
      let leagueId: string;
      if (context.cookies.has(LEAGUE_COOKIE)) {
        leagueId = context.cookies.get(LEAGUE_COOKIE)!.value;
      } else {
        leagueId = createHumanId();
        await db.insert(League).values({ id: leagueId });
      }

      context.cookies.set(LEAGUE_COOKIE, leagueId, {
        path: '/',
        sameSite: 'strict',
        expires: inDaysFromNow(90),
      });

      const players = playerIds
        .map((id, index) => ({ id, name: playerNames[index] as string }))
        .filter((player) => Boolean(player.name));

      const game = { id: createHumanId(), leagueId };
      const playersInGame = players.map((player, index) => ({
        id: `${game.id}-${player.id}`,
        gameId: game.id,
        playerId: player.id,
        position: index,
      }));

      await db.batch([
        db.insert(Game).values(game),
        db.insert(Player).values(players),
        db.insert(PlayerInGame).values(playersInGame),
      ]);

      return { gameId: game.id };
    },
  }),
  updateBids: defineAction({
    accept: 'form',
    input: z.object({
      gameId: z.string(),
      round: z.coerce.number(),
      playerIds: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
      bids: z
        .array(z.string().min(1).pipe(z.coerce.number()))
        .min(MIN_PLAYERS)
        .max(MAX_PLAYERS),
    }),
    handler: async ({ gameId, round, playerIds, bids }) => {
      const scores = playerIds.map((playerId, index) => ({
        id: `${gameId}-${playerId}-${round}`,
        gameId,
        round,
        playerId,
        bid: bids[index],
      }));

      await db
        .insert(Scores)
        .values(scores)
        .onConflictDoUpdate({
          target: Scores.id,
          set: { bid: sql.raw(`excluded.${Scores.bid.name}`) },
        });
    },
  }),
  updateTricks: defineAction({
    accept: 'form',
    input: z.object({
      gameId: z.string(),
      round: z.coerce.number(),
      playerIds: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
      tricks: z
        .array(z.string().min(1).pipe(z.coerce.number()))
        .min(MIN_PLAYERS)
        .max(MAX_PLAYERS),
    }),
    handler: async ({ gameId, round, playerIds, tricks }) => {
      await Promise.all(
        playerIds.map((playerId, index) =>
          db
            .update(Scores)
            .set({ tricks: tricks[index] })
            .where(eq(Scores.id, `${gameId}-${playerId}-${round}`)),
        ),
      );
      const maxRounds = getMaxRounds(playerIds.length);

      if (round === maxRounds) {
        await db
          .update(Game)
          .set({ endedAt: new Date() })
          .where(eq(Game.id, gameId));
      }
    },
  }),
  endGame: defineAction({
    accept: 'form',
    input: z.object({
      gameId: z.string(),
    }),
    handler: async ({ gameId }) => {
      await db
        .update(Game)
        .set({ endedAt: new Date() })
        .where(eq(Game.id, gameId));
    },
  }),
};
