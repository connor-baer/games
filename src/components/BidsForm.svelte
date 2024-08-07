<script lang="ts">
  import { actions } from 'astro:actions';
  import { writable } from 'svelte/store';

  import { isNumber } from '../utils/type';
  import type { Score } from '../types';

  import ScoreInput from './ScoreInput.svelte';

  export let gameId: string;
  export let round: number;
  export let players: { id: string; name: string }[];
  export let scores: Score[] | null;

  const store = writable(
    players.map((player) => {
      const score = scores?.find((score) => score.playerId === player.id) || {
        bid: null,
        tricks: null,
      };
      return { ...player, score };
    }),
  );

  $: total = $store?.reduce((acc, { score }) => acc + (score?.bid || 0), 0);
  $: valid = $store.every(({ score }) => isNumber(score?.bid));
</script>

<form method="POST" action={actions.updateBids}>
  <input type="hidden" name="gameId" value={gameId} />
  <input type="hidden" name="round" value={round} />
  <ol>
    {#each $store as player (player.id)}
      <li>
        <ScoreInput name="bids" {round} bind:player />
      </li>
    {/each}
  </ol>

  <div class="footer">
    <div><strong>Total:</strong> {total}/{round}</div>
    <div class="buttons">
      <button class="button primary" type="submit" disabled={!valid}>
        Save bids
      </button>
      <a
        class="button"
        aria-label="Back"
        href={`/game/${gameId}/round/${round}/dealer`}
      >
        ←
      </a>
    </div>
  </div>
</form>

<style>
  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
