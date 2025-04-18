<script lang="ts">
  type Props = {
    title: string;
    description?: string;
  };

  const { title, description }: Props = $props();
</script>

<div>
  <h1>{title}</h1>
  {#if description}
    <p>{description}</p>
  {/if}
</div>

<style>
  div {
    margin-bottom: var(--layout-gutter);
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
