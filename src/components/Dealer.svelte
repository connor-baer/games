<script lang="ts">
  import type { GameStore } from '../types';
  import { dealer } from '../stores';
  import { pluralize } from '../utils/format';

  export let game: GameStore;
</script>

{#if $dealer}
  <h2>Dealer</h2>
  <p>
    {$dealer.name} deals {$game.round + 1}
    {pluralize({ singular: 'card', plural: 'cards' }, $game.round + 1)}.
  </p>
  <div class="footer">
    <button class="button primary" on:click={() => game.next()}
      >Start bidding</button
    >
    {#if $game.round > 0}
      <button class="button" on:click={() => game.previous()} aria-label="Back"
        >←</button
      >
    {/if}
  </div>
{/if}

<style>
  p {
    margin-bottom: var(--layout-gutter);
  }

  .footer {
    justify-content: flex-start;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
