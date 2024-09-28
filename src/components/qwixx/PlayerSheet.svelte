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
    createColorConfig('Green', [140, 90, 35], Direction.DESCENDING),
    createColorConfig('Blue', [215, 100, 50], Direction.DESCENDING),
  ];
  const penalties = writable(0);
</script>

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

<div class="score">
  <ScoreEquation {colors} {penalties} />
</div>

<style>
  .numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .points-penalties {
    display: flex;
    flex-wrap: wrap;
    gap: var(--layout-gutter);
    margin-top: var(--layout-gutter);
    margin-bottom: var(--layout-gutter);
  }

  .score {
    margin-bottom: var(--layout-gutter);
  }
</style>
