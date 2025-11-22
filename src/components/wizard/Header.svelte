<script lang="ts">
  import type { Snippet } from "svelte";

  import { LOGO } from "../../lib/wizard/constants";
  import { getCurrentGame } from "../../lib/wizard/stores";
  import { t } from "../../utils/i18n";
  import Dialog from "../Dialog.svelte";

  import ScoreTable from "./ScoreTable.svelte";

  type Props = {
    title: string;
    description?: string;
    children?: Snippet;
    showScores?: boolean;
  };

  const { title, description, children, showScores = false }: Props = $props();

  const game = getCurrentGame();

  let dialog = $state<HTMLDialogElement>();
</script>

<header>
  <div class="brand">
    <a href="/" aria-label="All games" class="logo">{LOGO}</a>
    <h2>Wizard</h2>
  </div>
  {#if $game && showScores}
    <button onclick={() => dialog?.showModal()} class="button">
      {t.wizard.scores}
    </button>
    <Dialog bind:dialog title={t.wizard.scores}>
      <ScoreTable />
    </Dialog>
  {/if}
</header>

<div class="hero">
  <h1>{title}</h1>
  {#if description}
    <p>{description}</p>
  {:else if children}
    {@render children()}
  {/if}
</div>

<style>
  header {
    max-width: var(--layout-max-width-prose);
    margin-inline: auto;
    padding: var(--layout-gutter) var(--layout-frame);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-family-display);
    font-size: 2rem;
    line-height: var(--line-height-heading);
  }

  .logo {
    line-height: 1;
    transition: transform var(--transition-micro);
    text-decoration: none;
    border-radius: 4px;
  }

  .logo:hover,
  .logo:focus-visible {
    transform: scale(1.1);
  }

  h2 {
    font-size: 1.33rem;
  }

  .hero {
    max-width: var(--layout-max-width-prose);
    margin: var(--layout-gutter) auto;
    padding-inline: var(--layout-frame);
  }

  h1 {
    font-size: 2.25rem;
    line-height: var(--line-height-heading);
    margin-bottom: 4px;
  }

  p {
    font-size: var(--font-size-prose);
    line-height: var(--line-height-prose);
  }
</style>
