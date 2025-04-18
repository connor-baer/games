<script lang="ts">
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';

  import {
    getCurrentGame,
    getCurrentPlayers,
    getScores,
  } from '../../lib/wizard/stores';
  import { NUMBER_OF_CARDS } from '../../lib/wizard/constants';
  import { createArray } from '../../utils/array';
  import { calculateScoreDelta } from '../../lib/wizard/game';
  import { isNumber } from '../../utils/type';

  const game = getCurrentGame();
  const players = getCurrentPlayers($game);
  const scores = getScores();

  onMount(() => {
    if (!$game) {
      window.location.assign('/wizard/new');
    }
  });

  const scoreCard = derived(
    [game, players, scores],
    ([$game, $players, $scores]) => {
      const maxRounds = NUMBER_OF_CARDS / ($players.length || 3);
      const runningTotals: Record<string, number> = {};

      return createArray(maxRounds).map((_, index) => {
        const round = index + 1;
        return $players.map((player) => {
          const score = $scores.find(
            (s) =>
              s.gameId === $game.id &&
              s.playerId === player.id &&
              s.round === round,
          );

          if (!score) {
            return null;
          }

          const delta = calculateScoreDelta(score);
          const total = delta ? (runningTotals[player.id] || 0) + delta : null;

          if (isNumber(total)) {
            runningTotals[player.id] = total;
          }

          return { ...score, delta, total };
        });
      });
    },
  );
</script>

<table style={`--player-count: ${$players.length}`}>
  <thead>
    <tr>
      {#each $players as player (player.id)}
        <th colspan="2">{player.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $scoreCard as round}
      <tr>
        {#each round as score}
          <td rowspan="2">{score?.total ?? ''}</td>
          <td>{score?.bid ?? ''}</td>
        {/each}
      </tr>
      <tr>
        {#each round as score}
          <td class={score?.bid === score?.tricks ? 'success' : 'danger'}>
            {score?.tricks ?? ''}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    position: relative;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: var(--layout-gutter);
  }

  thead {
    position: sticky;
    top: 0;
    background-color: var(--color-bg-default);
  }

  thead th {
    min-width: 4rem;
    width: calc(100vw / var(--player-count));
    font-family: var(--font-family-display);
  }

  td {
    padding: 0;
  }

  td:not([rowspan]) {
    font-size: 0.85rem;
    line-height: 1;
    height: 1rem;
    width: 1.5rem;
  }

  .success {
    color: var(--color-fg-success);
  }

  .danger {
    color: var(--color-fg-danger);
  }

  th,
  td {
    border: 1px solid var(--color-mg-default);
  }
</style>
