<script lang="ts">
  import type { Player, Score } from '../types';
  import { game, page } from '../stores';
  import { createId } from '../utils/id';
  import { createArray } from '../utils/array';
  import { MAX_PLAYERS, MIN_PLAYERS, NUMBER_OF_CARDS } from '../constants';
  import Layout from './Layout.svelte';

  let players: Player[] = createArray(MIN_PLAYERS).map(() => ({
    id: createId(),
    name: '',
  }));
  let rounds = NUMBER_OF_CARDS / players.length;

  $: enoughPlayers = players.every((player) => Boolean(player.name));

  function addPlayer() {
    players = players.concat({ id: createId(), name: '' });
    rounds = NUMBER_OF_CARDS / players.length;

    // Focus the new input once it has been rendered on the next tick
    requestAnimationFrame(() => {
      const playerInputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="player-names"]',
      );
      playerInputs[playerInputs.length - 1]?.focus();
    });
  }

  function removePlayer(id: Player['id']) {
    players = players.filter((player) => player.id !== id);
    rounds = NUMBER_OF_CARDS / players.length;
  }

  function createGame() {
    const id = createId();
    const timestamp = new Date().toISOString();
    const scores = createArray(rounds).map(() =>
      players.map(() => [] as Score),
    );
    game.set({
      id,
      timestamp,
      players,
      scores,
      rounds,
      round: 0,
      phase: 'dealing',
    });
    page.set('game');
  }
</script>

<Layout title="New game">
  <form on:submit={createGame}>
    <section>
      <h2>Players</h2>
      <p>
        Add {MIN_PLAYERS} to {MAX_PLAYERS} players in the order they are sitting.
      </p>
      {#each players as player, index (player.id)}
        <div class="field">
          <label for="player-name-{player.id}">Player {index + 1}</label>
          <input
            bind:value={player.name}
            id="player-name={player.id}"
            name="player-names"
            type="string"
            required
          />
          {#if index >= MIN_PLAYERS}
            <button
              class="button"
              type="button"
              aria-label="Remove"
              on:click={() => removePlayer(player.id)}
            >
              ✕
            </button>
          {/if}
        </div>
      {/each}
      {#if players.length < MAX_PLAYERS}
        <button class="button" type="button" on:click={addPlayer}>
          Add player
        </button>
      {/if}
    </section>
    <section>
      <h2 id="rounds-label">Rounds</h2>
      <p id="rounds-description">
        A deck has {NUMBER_OF_CARDS} cards, so with {players.length} players you
        can play up to {NUMBER_OF_CARDS / players.length} rounds.
      </p>
      <input
        bind:value={rounds}
        id="rounds"
        name="rounds"
        type="number"
        aria-labelledby="rounds-label"
        aria-describedby="rounds-description"
        min="1"
        max={NUMBER_OF_CARDS / players.length}
        required
      />
    </section>
    <div class="footer">
      <button class="button primary" type="submit" disabled={!enoughPlayers}>
        Start game
      </button>
    </div>
    <!-- {#if !enoughPlayers}
      <p>Please add at least 3 players.</p>
    {/if} -->
  </form>
</Layout>

<style>
  section {
    margin-bottom: var(--layout-gutter);
  }

  p {
    margin-bottom: 0.75rem;
  }

  .field {
    margin-bottom: 0.5rem;
  }

  label {
    display: block;
    font-size: smaller;
  }

  input {
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid var(--color-fg-subtle);
  }

  input:focus,
  input:active {
    border: 1px solid var(--color-fg-default);
  }
</style>
