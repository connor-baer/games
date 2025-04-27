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
  import type { Player, Score } from '../../lib/wizard/stores';

  interface Props {
    name: 'bids' | 'tricks';
    round?: number;
    player: Player;
    score: Pick<Score, 'bid' | 'tricks'>;
  }

  const { name, round = 0, player, score = $bindable() }: Props = $props();

  const delta = $derived(calculateScoreDelta(score));

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
      score[key] = isNumber(score[key]) ? Math.min(max, score[key] + 1) : 0;
    }
    if (isArrowDown(event) || isArrowLeft(event)) {
      event.preventDefault();
      score[key] = isNumber(score[key]) ? Math.max(min, score[key] - 1) : 0;
    }
    // Allow typing of the value, including numbers with multiple digits
    if (isNumber(Number.parseInt(event.key))) {
      clearTimeout(timeoutId);
      const number = Number.parseInt(`${previousKeys}${event.key}`);
      if (number >= min && number <= max) {
        score[key] = number;
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
    score[key] = Number.parseInt(
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
  bind:value={score[key]}
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
  aria-valuenow={score[key]}
  onkeydown={handleKeyDown}
>
  {#each createArray(round + 1) as _, option}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="option"
      data-value={option}
      data-active={option === score[key]}
      data-predicted={option === score.bid}
      onclick={handleSelect}
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

  .slider {
    display: inline-block;
    border-radius: 99999px;
  }

  .slider:focus-visible {
    outline: 2px solid var(--color-fg-subtle);
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
