<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="footer">
  {@render children()}
</div>

<style>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-bg-default);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-inline: var(--layout-frame);
    padding-top: var(--layout-gutter);
    padding-bottom: calc(var(--layout-gutter) + env(safe-area-inset-bottom));
    max-width: var(--layout-max-width-prose);
    margin-inline: auto;
    width: 100%;
  }

  @media (min-width: 600px) {
    .footer {
      position: sticky;
    }
  }

  .footer::before {
    content: '';
    display: block;
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 100%;
    background: linear-gradient(transparent, var(--color-bg-default));
  }
</style>
