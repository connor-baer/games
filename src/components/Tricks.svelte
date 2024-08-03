<script lang="ts">
  import type { GameStore, Score } from '../types';
  import { isNumber } from '../utils/type';
  import { page } from '../stores';
  import { getPlayerIndex, sortPlayersForRound } from '../utils/game';
  import NumberRangeInput from './NumberRangeInput.svelte';
  import ScoreDelta from './ScoreDelta.svelte';

  export let game: GameStore;

  $: total = ($game.scores[$game.round] as Score[]).reduce(
    (allTricks, [, tricks = 0]) => allTricks + tricks,
    0,
  );

  $: allTricks = $game.scores[$game.round]?.every((score) =>
    isNumber(score[1]),
  );

  $: valid = allTricks && total === $game.round + 1;
</script>

<h2>Tricks</h2>

<p>Count how many tricks each player managed to take.</p>

<ol>
  {#each sortPlayersForRound($game) as player (player.id)}
    <li>
      <div class="header">
        <h3 id="label-{player.id}">
          {player.name}
          {#if player.name === 'Mat'}🎯{/if}
        </h3>
        <ScoreDelta
          score={$game.scores[$game.round][getPlayerIndex($game, player.id)]}
        />
      </div>

      <NumberRangeInput
        id={player.id}
        labelId="label-{player.id}"
        max={$game.round + 1}
        defaultValue={$game.scores[$game.round][
          getPlayerIndex($game, player.id)
        ][0]}
        bind:value={$game.scores[$game.round][
          getPlayerIndex($game, player.id)
        ][1]}
      />
    </li>
  {/each}
</ol>

<div class="footer">
  <div><strong>Total:</strong> {total}/{$game.round + 1}</div>
  <div class="buttons">
    {#if $game.round + 1 < $game.rounds}
      <button
        class="button primary"
        on:click={() => game.next()}
        disabled={!valid}>Next round</button
      >
    {:else}
      <button
        class="button primary"
        on:click={() => page.set('scores')}
        disabled={!valid}
      >
        Final scores
      </button>
    {/if}
    <button
      type="button"
      class="button"
      on:click={() => game.previous()}
      aria-label="Back"
    >
      ←
    </button>
  </div>
</div>

<style>
  .header {
    display: flex;
    gap: 1ch;
    align-items: baseline;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
