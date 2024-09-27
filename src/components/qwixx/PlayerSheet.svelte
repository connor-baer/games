<script lang="ts">
  import { writable } from 'svelte/store';

  import { Direction } from '../../lib/qwixx/types.ts';
  import { createColorConfig } from '../../lib/qwixx/game.ts';
  import NumbersInput from './NumbersInput.svelte';
  import PointsTable from './PointsTable.svelte';
  import PenaltiesInput from './PenaltiesInput.svelte';
  import ScoreEquation from './ScoreEquation.svelte';

  const colors = [
    createColorConfig('Red', [350, 100, 45], Direction.ASCENDING),
    createColorConfig('Yellow', [40, 100, 55], Direction.ASCENDING),
    createColorConfig('Green', [140, 100, 35], Direction.DESCENDING),
    createColorConfig('Blue', [215, 100, 45], Direction.DESCENDING),
  ];
  const penalties = writable(0);
</script>

<div class="container">
  <section>
    <h2>Numbers</h2>

    <div class="numbers">
      {#each colors as config (config.label)}
        <NumbersInput {config} />
      {/each}
    </div>
  </section>

  <div class="points-penalties">
    <PenaltiesInput {penalties} />
    <PointsTable />
  </div>

  <ScoreEquation {colors} {penalties} />
</div>

<style>
  .container {
    --columns: 4;
    --gutters: calc(var(--columns) - 1);
    --frame: 12px;
    --gutter: 0.5rem;
    --total-frame: calc(
      2 * var(--frame) + env(safe-area-inset-left) + env(safe-area-inset-right)
    );
    --total-gutters: var(--gutters) * var(--gutter);
    --column-size: clamp(
      3rem,
      calc(
        (100vw - var(--total-gutters) - var(--total-frame)) / var(--columns)
      ),
      4rem
    );

    max-width: calc(
      var(--columns) * var(--column-size) + var(--gutters) * var(--gutter) +
        var(--total-frame)
    );
    padding-top: calc(var(--frame) + env(safe-area-inset-top));
    padding-left: calc(var(--frame) + env(safe-area-inset-left));
    padding-bottom: calc(var(--frame) + env(safe-area-inset-bottom));
    padding-right: calc(var(--frame) + env(safe-area-inset-right));
    margin: 0 auto;
  }

  @media (min-width: 360px) {
    .container {
      --columns: 6;
      --frame: 16px;
    }
  }

  @media (min-width: 720px) {
    .container {
      --columns: 12;
      --frame: 24px;
      --gutter: 0.5rem;
    }
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .points-penalties {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>
