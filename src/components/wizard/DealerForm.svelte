<script lang="ts">
  import { onMount } from 'svelte';

  import { getCurrentGame, getDealer } from '../../lib/wizard/stores';
  import { pluralize } from '../../utils/format';
  import { t } from '../../utils/i18n';

  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Placeholder from './Placeholder.svelte';

  const { title, description } = t.wizard.dealer;

  const game = getCurrentGame();
  const dealer = getDealer($game);

  onMount(() => {
    if (!$game) {
      window.location.assign('/wizard/new');
    }
  });

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

<Header {title} showScores>
  <Placeholder value={$dealer?.name} placeholder="Name" />
  {t.wizard.dealer.deals}
  <Placeholder value={$game?.round} placeholder="0" />
  {pluralize(
    { singular: t.wizard.dealer.card, plural: t.wizard.dealer.cards },
    $game?.round || 0,
  )}.
</Header>

<Footer>
  <div class="buttons">
    <a href="/wizard/bids" class="button primary">{t.wizard.dealer.action}</a>
    {#if $game && $game.round > 1}
      <button
        class="button"
        aria-label={t.wizard.back}
        title={t.wizard.back}
        onclick={goBack}
      >
        ←
      </button>
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
