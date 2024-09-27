<script lang="ts">
  import { Direction, type ColorConfig } from '../../lib/qwixx/types';
  import { createArray } from '../../utils/array';
  import { NUMBERS } from '../../lib/qwixx/constants';
  import Lock from './Lock.svelte';
  import LockOpen from './LockOpen.svelte';

  export let config: ColorConfig;

  const { label, direction, numbers, toggleNumber, isLocked, style } = config;

  const numberRange = createArray(NUMBERS).map((_, index) => {
    switch (direction) {
      case Direction.ASCENDING:
        return index + 2;
      case Direction.DESCENDING:
        return NUMBERS + 1 - index;
    }
  });

  $: min = Math.min(...$numbers);
  $: max = Math.max(...$numbers);
  $: length = $numbers.length;

  $: isDisabled = (number: number) => {
    if ($isLocked) {
      return true;
    }
    switch (direction) {
      case Direction.ASCENDING:
        return number === 12 ? length < 5 : number < max;
      case Direction.DESCENDING:
        return number === 2 ? length < 5 : number > min;
    }
  };

  function onInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const { value } = event.currentTarget;
    const number = Number.parseInt(value, 10);
    toggleNumber(number);
  }
</script>

<fieldset {style} class:locked={$isLocked}>
  <legend class="hide-visually">{label}</legend>
  {#each numberRange as number}
    <input
      id={`${label}-${number}`}
      type="checkbox"
      name={label}
      checked={$numbers.includes(number)}
      disabled={isDisabled(number)}
      value={number}
      on:input={onInput}
      class="hide-visually"
    />
    <label for={`${label}-${number}`}>{number}</label>
  {/each}
  <input
    id={`${label}-lock`}
    type="checkbox"
    name={label}
    bind:checked={$isLocked}
    disabled={length < 5}
    class="hide-visually lock"
  />
  <label for={`${label}-lock`}>
    <Lock class="icon-lock" />
    <LockOpen class="icon-lock-open" />
  </label>
</fieldset>

<style>
  fieldset {
    border: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--number-gap);
    padding: 0;
  }

  label {
    display: inline-grid;
    place-content: center;
    width: var(--number-size);
    height: var(--number-size);
    border-radius: 8px;
    border: 3px solid hsl(var(--hue) var(--saturation) var(--lightness));
    font-size: 1.5rem;
    font-weight: var(--font-weight-ui-bold);
    text-align: center;
    color: hsl(var(--hue) var(--saturation) calc(var(--lightness) - 15%));
    background-color: hsl(
      var(--hue) calc(var(--saturation) - 10%) calc(var(--lightness) + 15%) /
        0.2
    );
    transition:
      color var(--transition-micro),
      background-color var(--transition-micro),
      opacity var(--transition-micro);
    cursor: pointer;
  }

  input:disabled + label {
    cursor: not-allowed;
  }

  input:checked + label {
    color: var(--color-fg-primary);
    background-color: hsl(var(--hue) var(--saturation) var(--lightness));
    font-weight: var(--font-weight-ui-bold);
  }

  .locked label {
    opacity: 0.5;
  }

  input:nth-last-of-type(-n + 2):disabled + label {
    opacity: 0.5;
  }

  input.lock + label {
    border-radius: 100%;
  }

  input.lock:checked + label :global(.icon-lock-open) {
    display: none;
  }
  input.lock:not(:checked) + label :global(.icon-lock) {
    display: none;
  }
</style>
