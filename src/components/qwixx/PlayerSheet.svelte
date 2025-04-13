<script lang="ts">
  import { persisted } from 'svelte-persisted-store';

  import { Direction } from '../../lib/qwixx/types.ts';
  import { createColorConfig } from '../../lib/qwixx/game.svelte.ts';
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
    for (const color of colors) {
      color.reset();
    }
  }
</script>

<header>
  <div class="brand">
    <a href="/" aria-label="All games" class="logo">🎲</a>
    <h1>Qwixx™</h1>
  </div>
  <button onclick={reset} class="button">Reset</button>
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

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-family-display);
    font-size: 2.25rem;
    line-height: var(--line-height-heading);
  }

  h1 {
    font-size: inherit;
  }

  .logo {
    text-decoration: none;
    line-height: 1;
    transition: transform var(--transition-micro);
    border-radius: 4px;
  }

  .logo:hover,
  .logo:focus {
    transform: scale(1.1);
  }

  .logo:focus-visible {
    outline: 2px solid var(--color-fg-subtle);
    outline-offset: 3px;
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
