import { defineAction, z } from 'astro:actions';
import { db, Game, Player, PlayerInGame } from 'astro:db';
import { MAX_PLAYERS, MIN_PLAYERS } from 'src/constants';
import { createHumanId } from 'src/utils/id';

export const server = {
  newGame: defineAction({
    accept: 'form',
    input: z.object({
      playerIds: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
      playerNames: z.array(z.string()).min(MIN_PLAYERS).max(MAX_PLAYERS),
    }),
    handler: async ({ playerIds, playerNames }) => {
      const players = playerIds
        .map((id, index) => ({ id, name: playerNames[index] as string }))
        .filter((player) => Boolean(player.name));

      const game = { id: createHumanId() };
      const playersInGame = players.map((player, index) => ({
        gameId: game.id,
        playerId: player.id,
        position: index,
      }));

      // TODO: Handle id clashes
      await db.insert(Game).values(game);
      await db.insert(Player).values(players);
      await db.insert(PlayerInGame).values(playersInGame);

      return { gameId: game.id };
    },
  }),
};
