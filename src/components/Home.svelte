<script lang="ts">
  import { formatDate } from '../utils/date';
  import type { Game } from '../types';
  import { game, games, page } from '../stores';
  import { MAX_PLAYERS, MIN_PLAYERS } from '../constants';
  import Layout from './Layout.svelte';

  function startNewGame() {
    if ($game) {
      games.save($game);
    }
    page.set('new-game');
  }

  function loadGame(id: Game['id']) {
    if ($game) {
      games.save($game);
    }
    game.set($games.find((g) => g.id === id) as Game);
    page.set('game');
  }

  $: pastGames = $game ? $games.filter((game) => game.id !== $game.id) : $games;
</script>

<Layout>
  <h2>About</h2>
  <p>
    <a href="https://en.wikipedia.org/wiki/Wizard_(card_game)" target="_blank">
      Wizard
    </a>
    is a trick-taking card game for {MIN_PLAYERS} to {MAX_PLAYERS} players designed
    by Ken Fisher of Toronto, Ontario in 1984.
  </p>
  <p>
    The objective of the game is to bid correctly on the number of tricks that a
    player will take in the subsequent round of play. Points are awarded for a
    correct bid and subtracted for an incorrect bid. The player with most points
    after all rounds have been played is the winner.
  </p>
  <p>
    This digital scorekeeper mimics the traditional scorecards, adding
    validation and automatic point calculation.
  </p>
  <div class="buttons">
    <button class="button" class:primary={!$game} on:click={startNewGame}>
      New game
    </button>
  </div>

  {#if $game || $games.length > 0}
    <h2 class="games-title">Games</h2>
    <ul class="games">
      {#if $game}
        <li class="game">
          <div>
            <h4>{$game.players.map((p) => p.name).join(', ')}</h4>
            {formatDate(new Date($game.timestamp), 'medium')}
          </div>
          <button class="button primary" on:click={() => page.set('game')}>
            Resume
          </button>
        </li>
      {/if}
      {#each pastGames as game (game.id)}
        <li class="game">
          <div>
            <h4>{game.players.map((p) => p.name).join(', ')}</h4>
            {formatDate(new Date(game.timestamp), 'medium')}
          </div>
          <button class="button" on:click={() => loadGame(game.id)}>
            View
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</Layout>

<style>
  h2,
  p {
    margin-bottom: 0.75rem;
  }

  a {
    font-family: var(--font-family-display);
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .games-title {
    margin-top: 3rem;
  }

  .games {
    list-style: none;
    margin-top: 1rem;
    padding: 0;
  }

  .game {
    padding: 1rem;
    border: 1px solid var(--color-mg-default);
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .game + .game {
    margin-top: 0.5rem;
  }
</style>
