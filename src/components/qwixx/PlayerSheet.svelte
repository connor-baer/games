<script lang="ts">
  import { writable } from 'svelte/store';

  import { Direction } from '../../lib/qwixx/types.ts';
  import { createColorConfig } from '../../lib/qwixx/game.ts';
  import NumbersInput from './NumbersInput.svelte';
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
  <div class="numbers">
    {#each colors as config (config.label)}
      <NumbersInput {config} />
    {/each}
  </div>

  <div class="penalties">
    <PenaltiesInput {penalties} />
  </div>

  <ScoreEquation {colors} {penalties} />
</div>

<style>
  .container {
    --columns: 4;
    --padding: 12px;
    --number-gap: 0.5rem;
    --number-size: clamp(
      3rem,
      calc(
        (100vw - (var(--columns) - 1) * var(--number-gap) - 2 * var(--padding)) /
          var(--columns)
      ),
      5rem
    );

    max-width: calc(
      6 * var(--number-size) + 5 * var(--number-gap) + 2 * var(--padding)
    );
    padding: var(--padding);
    margin: 0 auto;
  }

  @media (min-width: 360px) {
    .container {
      --columns: 6;
      --padding: 16px;
    }
  }

  @media (min-width: 720px) {
    .container {
      --columns: 12;
      --padding: 24px;
      --number-gap: 0.5rem;

      max-width: calc(
        12 * var(--number-size) + 11 * var(--number-gap) + 2 * var(--padding)
      );
    }
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .penalties {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
