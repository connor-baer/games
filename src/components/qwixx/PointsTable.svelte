<script lang="ts">
  import { t } from '../../utils/i18n';
  import { POINTS } from '../../lib/qwixx/constants';

  const [, ...points] = POINTS;
</script>

<section>
  <h2>{t.qwixx.points}</h2>
  <table>
    <thead>
      <tr>
        {#each points as _, index}
          <td>{index + 1}x</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      <tr>
        {#each points as value}
          <td>{value}</td>
        {/each}
      </tr>
    </tbody>
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

  thead td {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-width: 1px;
  }

  tbody td {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-width: 1px;
  }
</style>
