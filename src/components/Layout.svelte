<script lang="ts">
  import { LOGO } from '../constants';
  import { page } from '../stores';
  import type { Page } from '../types';

  export let title: string = 'Wizard';
  export let link: { label: string; page: Page } | null = null;
</script>

<header>
  <button aria-label="Wizard" class="logo" on:click={() => page.set('home')}>
    {LOGO}
  </button>
  <span class="title">{title}</span>
  {#if link}
    <button class="link" on:click={() => page.set(link.page)}>
      {link.label}
    </button>
  {/if}
</header>

<main data-pagefind-body>
  <slot />
</main>

<style>
  header {
    position: relative;
    max-width: var(--layout-max-width-prose);
    margin: 0 auto;
    padding: var(--layout-gutter) var(--layout-frame);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    background: none;
    border: none;
    padding: 0.25rem;
  }

  .logo {
    font-size: 2rem;
    line-height: 1;
    transition: transform var(--transition-micro);
  }

  .logo:hover,
  .logo:focus {
    transform: scale(1.1);
  }

  .title {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    font-size: 1.25rem;
    font-family: var(--font-family-display);
  }

  .link {
    color: var(--color-fg-default);
    text-decoration: underline;
    text-underline-position: under;
    text-decoration-thickness: max(0.05em, 1px);
  }

  .link:hover,
  .link:focus {
    text-decoration-thickness: max(0.1em, 2px);
  }

  main {
    max-width: var(--layout-max-width-prose);
    margin: 0 auto;
    padding: var(--layout-gutter) var(--layout-frame);
  }
</style>
