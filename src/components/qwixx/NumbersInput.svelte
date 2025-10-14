<script lang="ts">
  import { createArray } from '../../utils/array';
  import { t } from '../../utils/i18n';
  import { Direction, type ColorConfig } from '../../lib/qwixx/types';
  import { NUMBERS } from '../../lib/qwixx/constants';
  import { isColorLocked } from '../../lib/qwixx/game';

  import Lock from './Lock.svelte';
  import LockOpen from './LockOpen.svelte';

  interface Props {
    color: ColorConfig;
    numbers: number[];
    toggleNumber: (color: ColorConfig, number: number) => void;
  }

  const { color, numbers, toggleNumber }: Props = $props();

  const { key, direction, style } = color;

  const numberRange = createArray(NUMBERS).map((_, index) => {
    switch (direction) {
      case Direction.ASCENDING:
        return index + 2;
      case Direction.DESCENDING:
        return NUMBERS + 1 - index;
      default:
        throw new Error('Unreachable code')
    }
  });
  const lastNumber = numberRange[numberRange.length - 1] as number;

  const min = $derived(Math.min(...numbers));
  const max = $derived(Math.max(...numbers));
  const length = $derived(numbers.length);

  const isLocked = isColorLocked(numbers, color);

  const isDisabled = $derived((number: number) => {
    switch (direction) {
      case Direction.ASCENDING:
        return number === 12 ? length < 5 : number < max;
      case Direction.DESCENDING:
        return number === 2 ? length < 5 : number > min;
    }
  });

  const onClick = $derived(
    (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      const { value, ariaDisabled } = event.currentTarget;
      if (ariaDisabled === 'true') {
        event.preventDefault();
        return;
      }
      const number = Number.parseInt(value, 10);
      toggleNumber(color, number);
    },
  );
</script>

<fieldset {style} class:locked={isLocked}>
  <legend class="hide-visually">{t.qwixx.colors[key]}</legend>
  {#each numberRange as number}
    <input
      id={`${key}-${number}`}
      type="checkbox"
      name={key}
      checked={numbers.includes(number)}
      aria-disabled={isDisabled(number)}
      value={number}
      onclick={onClick}
      class="hide-visually"
    />
    <label for={`${key}-${number}`}>{number}</label>
  {/each}
  <input
    id={`${key}-lock`}
    type="checkbox"
    name={key}
    checked={numbers.includes(lastNumber)}
    aria-disabled={isDisabled(lastNumber)}
    value={lastNumber}
    onclick={onClick}
    class="hide-visually lock"
  />
  <label for={`${key}-lock`}>
    <Lock class="icon-lock" />
    <LockOpen class="icon-lock-open" />
  </label>
</fieldset>

<style>
  fieldset {
    border: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gutter);
    padding: 0;
  }

  label {
    display: inline-grid;
    place-content: center;
    width: var(--column-size);
    height: var(--column-size);
    border-radius: 8px;
    border: 3px solid hsl(var(--hue) var(--saturation) var(--lightness));
    font-family: var(--font-family-display);
    font-size: 1.5rem;
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

  @media (prefers-color-scheme: dark) {
    label {
      color: hsl(var(--hue) var(--saturation) calc(var(--lightness) + 15%));
    }
  }

  input[aria-disabled='true'] + label {
    cursor: not-allowed;
  }

  input:checked + label {
    color: var(--color-fg-primary);
    background-color: hsl(var(--hue) var(--saturation) var(--lightness));
    font-weight: var(--font-weight-ui-bold);
  }

  input:focus-visible + label {
    outline: 2px solid hsl(var(--hue) var(--saturation) var(--lightness));
    outline-offset: 3px;
  }

  .locked label {
    opacity: 0.5;
  }

  input[aria-disabled='true']:not(:checked) + label {
    opacity: 0.5;
  }

  input:nth-last-of-type(-n + 2)[aria-disabled='true'] + label {
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
