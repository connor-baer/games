<script lang="ts">
  import type { GameStore, Score } from '../types';
  import { isNumber } from '../utils/type';
  import NumberRangeInput from './NumberRangeInput.svelte';
  import { getPlayerIndex, sortPlayersForRound } from '../utils/game';

  export let game: GameStore;

  $: total = ($game.scores[$game.round] as Score[]).reduce(
    (allBids, [bid = 0]) => allBids + bid,
    0,
  );

  $: allBids = $game.scores[$game.round]?.every(([bid]) => isNumber(bid));
</script>

<h2>Bids</h2>

<p>Each player predicts how many tricks they will take this round.</p>

<ol>
  {#each sortPlayersForRound($game) as player (player.id)}
    <li>
      <h3 id="label-{player.id}">
        {player.name}
        {#if player.name === 'Mat'}🎯{/if}
      </h3>
      <NumberRangeInput
        id={player.id}
        labelId="label-{player.id}"
        max={$game.round + 1}
        bind:value={$game.scores[$game.round][
          getPlayerIndex($game, player.id)
        ][0]}
      />
    </li>
  {/each}
</ol>

<div class="footer">
  <div>
    <strong>Total:</strong>
    {total}/{$game.round + 1}
  </div>
  <div class="buttons">
    <button
      class="button primary"
      on:click={() => game.next()}
      disabled={!allBids}>Save bids</button
    >
    <button class="button" on:click={() => game.previous()} aria-label="Back">
      ←</button
    >
  </div>
</div>

<style>
  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
