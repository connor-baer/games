<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import Bids from './Bids.svelte';
  import Dealer from './Dealer.svelte';
  import Tricks from './Tricks.svelte';

  import { game, page } from '../stores';

  onMount(() => {
    if (!$game) {
      page.set('home');
    }
  });
</script>

<Layout
  title="Round {$game.round + 1} of {$game.rounds}"
  link={{ label: 'Scores', page: 'scores' }}
>
  {#if $game}
    {#if $game.phase === 'dealing'}
      <Dealer {game} />
    {:else if $game.phase === 'bidding'}
      <Bids {game} />
    {:else if $game.phase === 'counting'}
      <Tricks {game} />
    {/if}
  {/if}
</Layout>
