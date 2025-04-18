<script lang="ts">
  import { getCurrentGame, getDealer } from '../../lib/wizard/stores';
  import { pluralize } from '../../utils/format';

  import Header from './Header.svelte';
  import Placeholder from './Placeholder.svelte';

  const game = getCurrentGame();
  const dealer = getDealer($game);
</script>

<Header title="Dealer" />

<p>
  <Placeholder value={$dealer?.name} placeholder="Name" />
  deals <Placeholder value={$game?.round} placeholder="0" />
  {pluralize({ singular: 'card', plural: 'cards' }, $game?.round)}.
</p>

<div class="footer">
  <a href="/wizard/bids" class="button primary">Start bidding</a>
</div>

<style>
  .footer {
    margin-top: 1rem;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
