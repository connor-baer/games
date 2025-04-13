<script lang="ts">
  import type { Points } from '../../lib/qwixx/types';
  import { COLORS } from '../../lib/qwixx/constants';

  interface Props {
    points: Points;
  }

  const { points }: Props = $props();
</script>

<section>
  <h2>Totals</h2>
  <div class="container">
    {#each COLORS as color, index (color.key)}
      <label style={color.style} class="color">
        <span class="hide-visually">{color.name}</span>
        <input type="number" value={points[color.key]} readonly />
      </label>
      {#if index + 1 !== COLORS.length}
        <span class="sign">+</span>
      {/if}
    {/each}

    <span class="sign">-</span>

    <label class="penalties">
      <span class="hide-visually">Penalties</span>
      <input type="number" value={Math.abs(points.penalties)} readonly />
    </label>

    <span class="sign">=</span>

    <label class="total">
      <span class="hide-visually">Total</span>
      <input type="number" value={points.total} readonly />
    </label>
  </div>
</section>

<style>
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    text-align: center;
  }

  .sign {
    font-size: 1.5rem;
    width: 1rem;
    flex-shrink: 0;
  }

  .color,
  .penalties {
    width: 3rem;
    flex-grow: 1;
  }

  .total {
    width: 3rem;
    flex-grow: 3;
  }

  input {
    width: 100%;
    height: calc(var(--column-size) * 0.75);
    padding: 0 12px;
    border-width: 2px;
    border-style: solid;
    border-radius: 8px;
    font-size: 1.5rem;
    text-align: center;
  }

  input:focus {
    border-width: 3px;
    outline: none;
  }

  .color input {
    border-color: hsl(var(--hue) var(--saturation) var(--lightness));
  }

  .penalties input {
    border-color: var(--color-fg-subtle);
  }

  .total input {
    border-color: var(--color-fg-default);
  }
</style>
