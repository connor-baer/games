<script lang="ts">
  type Props = {
    value: string | number | null | undefined;
    placeholder: string | number;
  };

  const { value, placeholder }: Props = $props();
</script>

{#if value}
  {value}
{:else}
  <span aria-busy="true">{placeholder}</span>
{/if}

<style>
  span {
    display: inline-block;
    height: 1em;
    vertical-align: -0.4em;
    color: transparent;
    background-color: var(--color-bg-subtle);
    border-radius: 4px;
  }
</style>
