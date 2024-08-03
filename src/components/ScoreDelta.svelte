<script lang="ts">
  import type { Score } from '../types';
  import { isNumber } from '../utils/type';
  import { calculateScoreDelta } from '../utils/game';

  export let score: Score;

  $: delta = isNumber(score[1]) && calculateScoreDelta(score);
</script>

{#if delta}
  <div
    class:positive={delta > 0}
    class:negative={delta < 0}
    role="status"
    aria-live="polite"
  >
    {delta}
  </div>
{/if}

<style>
  .positive {
    color: green;
  }

  .positive::before {
    content: '+';
  }

  .negative {
    color: red;
  }
</style>
