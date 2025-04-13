<script lang="ts">
  import type { ColorConfig } from '../../lib/qwixx/types';

  interface Props {
    label: ColorConfig['label'];
    points: ColorConfig['points'];
    style: ColorConfig['style'];
  }

  const { label, points, style }: Props = $props();
</script>

<div {style} class="wrapper">
  <label for={`${label}-score`} class="hide-visually">
    {label}
  </label>
  <input id={`${label}-score`} type="number" value={$points} readonly />
</div>

<style>
  .wrapper {
    width: 3rem;
    flex-grow: 1;
  }

  input {
    border: 2px solid hsl(var(--hue) var(--saturation) var(--lightness));
    border-radius: 8px;
    font-size: 1.5rem;
    padding: 0 12px;
    width: 100%;
    text-align: center;
    height: calc(var(--column-size) * 0.75);
    min-width: 0;
  }

  input:focus {
    border-width: 3px;
    outline: none;
  }
</style>
