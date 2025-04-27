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
  <div class="content">
    <div class="header">
      <h2 id="dialog-title">{title}</h2>
      <button onclick={() => dialog?.close()} class="button">Close</button>
    </div>
    {@render children()}
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: none;
    padding: 0;
    background-color: var(--color-bg-elevated);
    /* Firefox does not support animating the backdrop property. As a workaround, we use the box-shadow on the dialog element as a fake backdrop, which gets animated along with the dialog element itself. See https://stackoverflow.com/questions/75313685/animating-dialog-backdrop-in-firefox */
    box-shadow: 0 0 0 100vmax rgb(0 0 0 / 0.05);
  }

  dialog::after {
    position: absolute;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    height: var(--layout-gutter);
    display: block;
    pointer-events: none;
    content: '';
    background: linear-gradient(
      color-mix(in sRGB, var(--color-bg-elevated) 0%, transparent),
      color-mix(in sRGB, var(--color-bg-elevated) 66%, transparent),
      color-mix(in sRGB, var(--color-bg-elevated) 100%, transparent)
    );
    border-radius: inherit;
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
      max-width: min(90vw, var(--layout-max-width));
      border-radius: 16px;
      opacity: 0;
      margin: auto;
      transform: translateY(20%);
    }

    dialog[open] {
      opacity: 1;
      transform: translateY(0);
    }

    @starting-style {
      dialog[open] {
        opacity: 0;
        transform: translateY(20%);
      }
    }
  }

  .content {
    padding: var(--layout-gutter);
    max-height: 95vh;
    overflow-y: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: var(--layout-gutter);
  }
</style>
