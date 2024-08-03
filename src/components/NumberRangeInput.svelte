<script lang="ts">
  import { isNumber } from '../utils/type';
  import {
    isArrowDown,
    isArrowLeft,
    isArrowRight,
    isArrowUp,
  } from '../utils/keyboard';
  import { createArray } from '../utils/array';

  export let labelId: string;
  export let id: string;
  export let value: number;
  export let defaultValue: number | undefined = undefined;
  export let min: number = 0;
  export let max: number;

  let timeoutId: ReturnType<typeof setTimeout>;
  let previousKeys = '';

  function handleKeyDown(event: KeyboardEvent) {
    if (isArrowUp(event) || isArrowRight(event)) {
      event.preventDefault();
      value =
        typeof value !== 'undefined'
          ? Math.min(max, value + 1)
          : defaultValue || 0;
    }
    if (isArrowDown(event) || isArrowLeft(event)) {
      event.preventDefault();
      value =
        typeof value !== 'undefined'
          ? Math.max(min, value - 1)
          : defaultValue || 0;
    }
    // Allow typing of the value, including numbers with multiple digits
    if (isNumber(parseInt(event.key))) {
      clearTimeout(timeoutId);
      const number = parseInt(`${previousKeys}${event.key}`);
      if (number >= min && number <= max) {
        value = number;
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
    // @ts-expect-error
    value = parseInt(event.currentTarget.dataset.value);
  }
</script>

<div
  {id}
  class="input"
  role="slider"
  aria-labelledby={labelId}
  tabindex="0"
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  on:keydown={handleKeyDown}
>
  {#each createArray(max + 1) as _, option}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="option"
      data-value={option}
      data-active={option === value}
      data-current={option === defaultValue}
      on:click={handleSelect}
    >
      {option}
    </div>
  {/each}
</div>

<style>
  .input {
    display: inline-block;
    border-radius: 1rem;
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
    border: 1px solid transparent;
    margin: 0.25rem;
    cursor: pointer;
  }

  .option:hover {
    border: 1px solid var(--color-fg-subtle);
  }

  .option[data-current='true'] {
    border: 1px solid var(--color-fg-primary);
  }

  .option[data-active='true'] {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-fg-primary);
    color: var(--color-fg-primary);
  }
</style>
