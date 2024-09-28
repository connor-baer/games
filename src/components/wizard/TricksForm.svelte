<script lang="ts">
  import { actions } from 'astro:actions';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  import { isNumber } from '../../utils/type';
  import type { Score } from '../../lib/wizard/types';

  import ScoreInput from './ScoreInput.svelte';

  export let gameId: string;
  export let round: number;
  export let players: { id: string; name: string }[];
  export let scores: Score[] | null;

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  const store = writable(
    players.map((player) => {
      const score = scores?.find((score) => score.playerId === player.id) || {
        bid: null,
        tricks: null,
      };
      return { ...player, score };
    }),
  );

  $: total = $store?.reduce((acc, { score }) => acc + (score.tricks || 0), 0);
  $: allTricks = $store.every(({ score }) => isNumber(score.tricks));
  $: valid = !mounted || (allTricks && total === round);
</script>

<form method="POST" action={actions.updateTricks}>
  <input type="hidden" name="gameId" value={gameId} />
  <input type="hidden" name="round" value={round} />
  <ol>
    {#each $store as player (player.id)}
      <li>
        <ScoreInput name="tricks" {round} bind:player />
      </li>
    {/each}
  </ol>

  <div class="footer">
    <div class="total"><strong>Total:</strong> {total}/{round}</div>
    <div class="buttons">
      <button class="button primary" type="submit" disabled={!valid}>
        Save tricks
      </button>
      <a
        class="button"
        aria-label="Back"
        href={`/wizard/${gameId}/round/${round}/bids`}
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

  :global(.no-js) .total {
    display: none;
  }
</style>
