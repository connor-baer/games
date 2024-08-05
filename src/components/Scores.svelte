<script lang="ts">
  import { createArray } from '../utils/array';
  import { game, points } from '../stores';
</script>

{#if $game && $points}
  <table style="--player-count: {$game.players.length}">
    <thead>
      <tr>
        {#each $game.players as player (player.id)}
          <th colspan="2">
            {player.name}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each createArray($game.rounds) as _, round}
        <tr>
          {#each $game.players as _, index}
            <td rowspan="2">{$points[index]?.[round] ?? ''}</td>
            <td>{$game.scores[round]?.[index]?.[0] ?? ''}</td>
          {/each}
        </tr>
        <tr>
          {#each $game.players as _, index}
            <td>{$game.scores[round]?.[index]?.[1] ?? ''}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table {
    position: relative;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: center;
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

  th,
  td {
    border: 1px solid black;
  }
</style>
