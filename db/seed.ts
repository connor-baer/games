import { db, Game, Player, PlayerInGame, Scores } from 'astro:db';

import { createId } from '../src/utils/id';

const games = [
  { id: 'KVMGQ' },
  // TODO: Add complete game data
  { id: 'MFFRA', endedAt: new Date() },
];

const players = [
  { id: createId(), name: 'Apple' },
  { id: createId(), name: 'Banana' },
  { id: createId(), name: 'Cherry' },
  { id: createId(), name: 'Dragonfruit' },
  { id: createId(), name: 'Elderflower' },
];

const playersInGame = players
  .slice(0, 3)
  .map((player, index) => ({
    gameId: games[0]?.id as string,
    playerId: player.id,
    position: index,
  }))
  .map((playerInGame) => ({
    ...playerInGame,
    id: `${playerInGame.gameId}-${playerInGame.playerId}`,
  }));

const scores = [
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 1,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 1,
    bid: 0,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 1,
    bid: 1,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 2,
    bid: 1,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 2,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 2,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 3,
    bid: 0,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 3,
    bid: 2,
    tricks: 2,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 3,
    bid: 1,
    tricks: 1,
  },
].map((score) => ({
  id: `${score.gameId}-${score.playerId}-${score.round}`,
  ...score,
}));

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Player).values(players);
  await db.insert(Game).values(games);
  await db.insert(PlayerInGame).values(playersInGame);
  await db.insert(Scores).values(scores);
}
