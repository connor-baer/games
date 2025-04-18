<script lang="ts">
  import { isNumber } from '../../utils/type';
  import {
    isArrowDown,
    isArrowLeft,
    isArrowRight,
    isArrowUp,
  } from '../../utils/keyboard';
  import { createArray } from '../../utils/array';
  import { calculateScoreDelta } from '../../lib/wizard/game';
  import type { Score } from '../../lib/wizard/types';

  export let name: 'bids' | 'tricks';
  export let round: number;
  export let player: {
    id: string;
    name: string;
    score: Score;
  };

  $: delta = calculateScoreDelta(player.score);

  let timeoutId: ReturnType<typeof setTimeout>;
  let previousKeys = '';

  const min = 0;
  const max = round;
  const labelId = `label-${player.id}`;
  const keys = { bids: 'bid', tricks: 'tricks' } as const;
  const key = keys[name];

  function handleKeyDown(event: KeyboardEvent) {
    if (isArrowUp(event) || isArrowRight(event)) {
      event.preventDefault();
      player.score[key] = isNumber(player.score[key])
        ? Math.min(max, player.score[key] + 1)
        : 0;
    }
    if (isArrowDown(event) || isArrowLeft(event)) {
      event.preventDefault();
      player.score[key] = isNumber(player.score[key])
        ? Math.max(min, player.score[key] - 1)
        : 0;
    }
    // Allow typing of the value, including numbers with multiple digits
    if (isNumber(Number.parseInt(event.key))) {
      clearTimeout(timeoutId);
      const number = Number.parseInt(`${previousKeys}${event.key}`);
      if (number >= min && number <= max) {
        player.score[key] = number;
        previousKeys += event.key;
      }
      timeoutId = setTimeout(() => {
        previousKeys = '';
      }, 500);
    } else {
      previousKeys = '';
    }
  }

  function handleSelect(event: MouseEvent) {
    player.score[key] = Number.parseInt(
      (event.currentTarget as HTMLDivElement).dataset.value as string,
    );
  }
</script>

<div class="header">
  <h3 id={labelId}>
    {player.name}
    {#if player.name === 'Mat'}🎯{/if}
  </h3>
  {#if name === 'tricks' && delta}
    <span
      class="delta"
      class:positive={delta > 0}
      class:negative={delta < 0}
      role="status"
      aria-live="polite"
    >
      {delta}
    </span>
  {/if}
</div>
<input type="hidden" name="playerIds" value={player.id} />
<input
  class="input"
  type="number"
  {name}
  bind:value={player.score[key]}
  aria-labelledby={labelId}
  {min}
  {max}
  step="1"
/>
<div
  class="slider"
  role="slider"
  aria-labelledby={labelId}
  tabindex="0"
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={player.score[key]}
  on:keydown={handleKeyDown}
>
  {#each createArray(round + 1) as _, option}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="option"
      data-value={option}
      data-active={option === player.score[key]}
      data-predicted={option === player.score.bid}
      on:click={handleSelect}
    >
      {option}
    </div>
  {/each}
</div>

<style>
  .header {
    display: flex;
    gap: 1ch;
    align-items: baseline;
  }

  :global(.no-js) .delta {
    display: none;
  }

  .positive {
    color: var(--color-fg-success);
  }

  .positive::before {
    content: '+';
  }

  .negative {
    color: var(--color-fg-danger);
  }

  .input {
    display: none;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid var(--color-fg-subtle);
    width: 100%;
    max-width: 10ch;
  }

  .input:focus,
  .input:active {
    border: 1px solid var(--color-fg-default);
  }

  :global(.no-js) .input {
    display: block;
  }

  .slider {
    display: inline-block;
    border-radius: 1rem;
  }

  :global(.no-js) .slider {
    display: none;
  }

  .option {
    display: inline-grid;
    place-content: center;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    border-radius: 100%;
    color: var(--color-fg-default);
    background-color: var(--color-bg-subtle);
    border: 2px solid transparent;
    margin: 0.25rem;
    cursor: pointer;
  }

  .option:hover {
    border: 2px solid var(--color-fg-subtle);
  }

  .option[data-predicted='true'] {
    border: 2px solid var(--color-bg-primary);
  }

  .option[data-active='true'] {
    background-color: var(--color-bg-primary);
    border: 2px solid var(--color-fg-primary);
    color: var(--color-fg-primary);
    font-weight: var(--font-weight-ui-bold);
  }
</style>
