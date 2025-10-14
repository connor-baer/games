<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  import { fly } from 'svelte/transition';

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(serviceWorker) {
      // Periodically check for service worker updates
      if (serviceWorker) {
        setInterval(
          () => {
            serviceWorker.update();
          },
          24 * 60 * 60 * 1000, // 1 day
        );
      }
    },
    onRegisterError(error) {
      // biome-ignore lint/suspicious/noConsole: Exception for debugging
      console.error('Service Worker registration error', error);
    },
  });

  function update() {
    updateServiceWorker(true);
  }

  function closeOffline() {
    offlineReady.set(false);
  }

  function closeRefresh() {
    needRefresh.set(false);
  }
</script>

<div class="toasts" aria-live="polite" aria-atomic="false" role="status">
  {#if $offlineReady}
    <div class="toast" transition:fly={{ y: 200 }}>
      <p class="message">Ready to use offline</p>
      <button class="button" on:click={closeOffline}>Okay</button>
    </div>
  {/if}
  {#if $needRefresh}
    <div class="toast" transition:fly={{ y: 200 }}>
      <p class="message">App update available</p>
      <button class="button primary" on:click={update}>Reload</button>
      <button class="button" on:click={closeRefresh}>Later</button>
    </div>
  {/if}
</div>

<style>
  .toasts {
    position: fixed;
    right: 50%;
    bottom: 0;
    transform: translateX(50%);
    z-index: 1;
    margin: var(--layout-gutter);
    width: 100%;
    max-width: var(--layout-max-width-prose);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--layout-gutter);
  }

  .toast {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 2px solid var(--color-fg-success);
    border-radius: 12px;
    text-align: left;
    background-color: var(--color-bg-elevated);
  }

  .message {
    font-family: var(--font-family-ui);
    font-weight: var(--font-weight-ui);
    margin-right: 8px;
  }
</style>
