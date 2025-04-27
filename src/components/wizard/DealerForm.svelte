<script lang="ts">
  import { getCurrentGame, getDealer } from '../../lib/wizard/stores';
  import { pluralize } from '../../utils/format';

  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Placeholder from './Placeholder.svelte';

  const game = getCurrentGame();
  const dealer = getDealer($game);

  function goBack() {
    game.update((prev) => {
      if (!prev) {
        throw new Error('No active game');
      }
      return { ...prev, round: prev.round - 1 };
    });
    window.location.assign('/wizard/tricks');
  }
</script>

<Header title="Dealer" showScores>
  <Placeholder value={$dealer?.name} placeholder="Name" />
  deals <Placeholder value={$game?.round} placeholder="0" />
  {pluralize({ singular: 'card', plural: 'cards' }, $game?.round)}.
</Header>

<Footer>
  <div class="buttons">
    <a href="/wizard/bids" class="button primary">Start bidding</a>
    {#if $game && $game.round > 1}
      <button class="button" aria-label="Back" onclick={goBack}>←</button>
    {/if}
  </div>
</Footer>

<style>
  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: row-reverse;
    margin-left: auto;
  }
</style>
