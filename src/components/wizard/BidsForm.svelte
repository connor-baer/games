<script lang="ts">
  import { actions } from 'astro:actions';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  import { isNumber } from '../../utils/type';
  import type { Score } from '../../lib/wizard/types';

  import ScoreInput from './ScoreInput.svelte';

  interface Props {
    gameId: string;
    round: number;
    players: { id: string; name: string }[];
    scores: Score[] | null;
  }

  const { gameId, round, players, scores }: Props = $props();

  let mounted = $state(false);

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

  const total = $derived(
    $store?.reduce((acc, { score }) => acc + (score.bid || 0), 0),
  );
  const valid = $derived(
    !mounted || $store.every(({ score }) => isNumber(score.bid)),
  );
</script>

<form method="POST" action={actions.updateBids}>
  <input type="hidden" name="gameId" value={gameId} />
  <input type="hidden" name="round" value={round} />
  <ol>
    {#each $store as player, index (player.id)}
      <li>
        <ScoreInput name="bids" {round} bind:player={$store[index]} />
      </li>
    {/each}
  </ol>

  <div class="footer">
    <div class="total"><strong>Total:</strong> {total}/{round}</div>
    <div class="buttons">
      <button class="button primary" type="submit" disabled={!valid}>
        Save bids
      </button>
      <a
        class="button"
        aria-label="Back"
        href={`/wizard/${gameId}/round/${round}/dealer`}
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
