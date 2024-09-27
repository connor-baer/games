<script lang="ts">
  import { derived, type Readable } from 'svelte/store';

  import type { ColorConfig } from '../../lib/qwixx/types';
  import { PENALTY_POINTS } from '../../lib/qwixx/constants';

  import Score from './Score.svelte';

  export let colors: ColorConfig[];
  export let penalties: Readable<number>;

  const colorPoints = derived(
    colors.map((color) => color.points),
    (s) => s.reduce((acc, points) => acc + points, 0),
  );
  const penaltyPoints = derived(penalties, (p) => p * PENALTY_POINTS);
</script>

<div class="wrapper">
  {#each colors as config, index (config.label)}
    <Score label={config.label} points={config.points} style={config.style} />
    {#if index + 1 !== colors.length}
      <span class="sign">+</span>
    {/if}
  {/each}

  <span class="sign">-</span>

  <div>
    <label for="penalties" class="hide-visually">Penalties</label>
    <input id="penalties" type="number" value={$penaltyPoints} readonly />
  </div>

  <span class="sign">=</span>

  <div>
    <label for="total" class="hide-visually">Total</label>
    <input
      id="total"
      type="number"
      value={$colorPoints - $penaltyPoints}
      readonly
    />
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 2fr;
    gap: 0.5rem;
    text-align: center;
  }

  .sign {
    font-size: 1.5rem;
  }

  input {
    width: 100%;
    height: calc(var(--number-size) * 0.75);
    padding: 0 12px;
    border-width: 2px;
    border-style: solid;
    border-radius: 8px;
    font-size: 1.5rem;
    text-align: center;
  }

  input#penalties {
    border-color: var(--color-mg-default);
  }

  input#total {
    border-color: var(--color-fg-default);
  }
</style>
