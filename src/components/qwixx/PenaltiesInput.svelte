<script lang="ts">
  import type { Writable } from 'svelte/store';

  import { createArray } from '../../utils/array';
  import { PENALTIES } from '../../lib/qwixx/constants';

  import Cross from './Cross.svelte';

  export let penalties: Writable<number>;

  const maxPenalties = createArray(PENALTIES).map((_, index) => index + 1);

  function onInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const { value } = event.currentTarget;
    const penalty = Number.parseInt(value, 10);
    penalties.update((prev) => (penalty === prev ? penalty - 1 : penalty));
  }
</script>

<section>
  <h2 id="penalties-heading">Penalities</h2>
  <div role="group" aria-labelledby="penalties-heading">
    {#each maxPenalties as penalty}
      <input
        id={`penalty-${penalty}`}
        type="checkbox"
        name="penalty"
        checked={penalty <= $penalties}
        disabled={penalty < $penalties || penalty > $penalties + 1}
        value={penalty}
        on:input={onInput}
        class="hide-visually"
      />
      <label for={`penalty-${penalty}`}>
        <span class="hide-visually">{penalty}</span>
        <Cross class="icon-cross" />
      </label>
    {/each}
  </div>
</section>

<style>
  div[role='group'] {
    display: flex;
    gap: 0.5rem;
    padding: 0;
  }

  label {
    display: inline-grid;
    place-content: center;
    width: var(--column-size);
    height: var(--column-size);
    border-radius: 8px;
    border: 3px solid var(--color-fg-subtle);
    background: var(--color-bg-subtle);
    font-size: 1.5rem;
    font-weight: var(--font-weight-ui-bold);
    text-align: center;
    transition:
      color var(--transition-micro),
      background-color var(--transition-micro),
      opacity var(--transition-micro);
    cursor: pointer;
    padding: 2px;
  }

  input:disabled + label {
    cursor: not-allowed;
  }

  :global(.icon-cross) {
    opacity: 0;
    transition: opacity var(--transition-micro);
    width: 100%;
  }

  input:checked + label :global(.icon-cross) {
    opacity: 1;
  }
</style>
