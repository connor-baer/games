import { defineDb, defineTable, column, NOW } from 'astro:db';

const League = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ optional: true }),
  },
});

const Game = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    leagueId: column.text({
      references: () => League.columns.id,
      optional: true,
    }),
    startedAt: column.date({ default: NOW }),
    endedAt: column.date({ optional: true }),
  },
});

const Player = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});

const PlayerInGame = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    gameId: column.text({ references: () => Game.columns.id }),
    playerId: column.text({ references: () => Player.columns.id }),
    position: column.number(),
  },
});

const Scores = defineTable({
  columns: {
    gameId: column.text({ references: () => Game.columns.id }),
    playerId: column.text({ references: () => Player.columns.id }),
    round: column.number(),
    bid: column.number({ optional: true }),
    tricks: column.number({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    League,
    Game,
    Player,
    PlayerInGame,
    Scores,
  },
});
