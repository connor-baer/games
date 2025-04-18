<script lang="ts">
  import { onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import { createId } from '../../utils/id';
  import { isNumber } from '../../utils/type';
  import {
    getCurrentGame,
    getCurrentPlayers,
    getScores,
  } from '../../lib/wizard/stores';

  import ScoreInput from './ScoreInput.svelte';
  import Placeholder from './Placeholder.svelte';

  const game = getCurrentGame();
  const players = getCurrentPlayers($game);
  const scores = getScores();

  onMount(() => {
    if (!$game) {
      window.location.assign('/wizard/new');
    }
  });

  const inputs = writable(
    $players.map((player) => {
      const score = $scores.find(
        (score) =>
          score.gameId === $game?.id &&
          score.round === $game?.round &&
          score.playerId === player.id,
      ) || { bid: undefined, tricks: undefined };
      return { player, score };
    }),
  );

  const total = derived(inputs, ($store) =>
    $store.reduce((acc, { score }) => acc + (score.tricks || 0), 0),
  );
  const valid = derived(
    [game, inputs, total],
    ([$game, $inputs, $total]) =>
      $inputs.every(({ score }) => isNumber(score.tricks)) &&
      $total === $game?.round,
  );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!$game) {
      throw new Error('No active game');
    }
    scores.insert(
      $inputs.map(({ score, player }) => ({
        id: createId(),
        gameId: $game.id,
        round: $game.round,
        playerId: player.id,
        bid: score.bid,
        tricks: score.tricks,
      })),
    );
    game.update((prev) => {
      if (!prev) {
        throw new Error('No active game');
      }
      return { ...prev, round: prev.round + 1 };
    });
    window.location.assign('/wizard/dealer');
  }
</script>

<form onsubmit={handleSubmit}>
  <ol>
    {#each $inputs as field, index (field.player.id)}
      <li>
        <ScoreInput
          name="tricks"
          round={$game?.round}
          player={$inputs[index]!.player}
          bind:score={$inputs[index]!.score}
        />
      </li>
    {/each}
  </ol>

  <div class="footer">
    <div class="total">
      <strong>Total:</strong>
      {$total}/<Placeholder value={$game?.round} placeholder={0} />
    </div>
    <div class="buttons">
      <button class="button primary" type="submit" disabled={!$valid}>
        Save tricks
      </button>
      <a class="button" aria-label="Back" href="/wizard/bids"> ← </a>
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
