<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLDialogAttributes } from 'svelte/elements';

  type Props = HTMLDialogAttributes & {
    dialog: HTMLDialogElement | undefined;
    title: string;
    children: Snippet;
  };

  let { dialog = $bindable(), title, children, ...rest }: Props = $props();
</script>

<dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  onmousedown={(event) => {
    if (event.target === dialog) {
      dialog?.close();
    }
  }}
  {...rest}
>
  <div class="header">
    <h2 id="dialog-title">{title}</h2>
    <button onclick={() => dialog?.close()} class="button">Close</button>
  </div>
  <div class="content">
    {@render children()}
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    border: none;
    padding: 0;
    background-color: var(--color-bg-elevated);
    /* Firefox does not support animating the backdrop property. As a workaround, we use the box-shadow on the dialog element as a fake backdrop, which gets animated along with the dialog element itself. See https://stackoverflow.com/questions/75313685/animating-dialog-backdrop-in-firefox */
    box-shadow: 0 0 0 100vmax rgb(0 0 0 / 0.1);
  }

  dialog[open]::backdrop {
    background-color: transparent;
  }

  @media (max-width: 599px) {
    dialog {
      transition:
        display var(--transition-appear) allow-discrete,
        overlay var(--transition-appear) allow-discrete,
        transform var(--transition-appear);
      width: 100vw;
      max-width: 100vw;
      max-height: 95vh;
      height: 100%;
      top: auto;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
    }

    dialog[open] {
      transform: translateY(0);
    }

    @starting-style {
      dialog[open] {
        transform: translateY(100%);
      }
    }
  }

  @media (min-width: 600px) {
    dialog {
      transition:
        display var(--transition-appear) allow-discrete,
        overlay var(--transition-appear) allow-discrete,
        opacity var(--transition-micro),
        transform var(--transition-appear);
      max-width: 90vw;
      width: var(--layout-max-width);
      border-radius: 16px;
      opacity: 0;
      margin: auto;
    }

    dialog[open] {
      opacity: 1;
      transform: translateY(0);
    }

    @starting-style {
      dialog[open] {
        opacity: 0;
        transform: translateY(5%);
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--layout-gutter);
    padding-bottom: 0;
  }

  .content {
    padding: var(--layout-gutter);
  }
</style>
