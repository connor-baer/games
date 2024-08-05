import { db, Game, Player, PlayerInGame, Scores } from 'astro:db';

import { createId } from '../src/utils/id';

const games = [
  { id: 'KVMG' },
  // TODO: Add complete game data
  { id: 'MFFR', endedAt: new Date() },
];

const players = [
  { id: createId(), name: 'Connor' },
  { id: createId(), name: 'Ena' },
  { id: createId(), name: 'Iris' },
  { id: createId(), name: 'Jillian' },
  { id: createId(), name: 'Mat' },
];

const playersInGame = players.slice(0, 3).map((player, index) => ({
  gameId: games[0]?.id as string,
  playerId: player.id,
  position: index,
}));

const scores = [
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 0,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 0,
    bid: 0,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 0,
    bid: 1,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 1,
    bid: 1,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 1,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 1,
    bid: 1,
    tricks: 1,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[0]?.id as string,
    round: 2,
    bid: 0,
    tricks: 0,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[1]?.id as string,
    round: 2,
    bid: 2,
    tricks: 2,
  },
  {
    gameId: games[0]?.id as string,
    playerId: players[2]?.id as string,
    round: 2,
    bid: 1,
    tricks: 1,
  },
];

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Player).values(players);
  await db.insert(Game).values(games);
  await db.insert(PlayerInGame).values(playersInGame);
  await db.insert(Scores).values(scores);
}
