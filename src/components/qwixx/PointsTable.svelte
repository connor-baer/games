<script lang="ts">
  import { POINTS } from '../../lib/qwixx/constants';

  const [, ...tmp] = POINTS;
</script>

<section>
  <h2>Points</h2>
  <table>
    <tr>
      {#each tmp as _, index}
        <td>{index + 1}x</td>
      {/each}
    </tr>
    <tr>
      {#each tmp as points}
        <td>{points}</td>
      {/each}
    </tr>
  </table>
</section>

<style>
  table {
    text-align: center;
    border-spacing: 4px 0;
    margin-left: -4px;
  }

  td {
    width: calc(var(--column-size) * 0.5);
    height: calc(var(--column-size) * 0.5);
    border: 2px solid var(--color-mg-default);
    line-height: 1;
    letter-spacing: -0.66px;
  }

  tr:first-child td {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-width: 1px;
  }

  tr:last-child td {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-width: 1px;
  }
</style>
