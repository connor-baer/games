<script lang="ts">
  import { persisted } from 'svelte-persisted-store';

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
  const penalties = persisted('qwixx-penalties', 0);

  function reset() {
    penalties.reset();
    colors.forEach((color) => {
      color.reset();
    });
  }
</script>

<header>
  <h1><span aria-hidden>🎲</span> Qwixx</h1>
  <button on:click={reset} class="button">Reset</button>
</header>

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
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--layout-gutter);
  }

  h1 {
    font-family: var(--font-family-display);
    font-size: 2rem;
  }

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
