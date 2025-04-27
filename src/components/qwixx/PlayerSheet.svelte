<script lang="ts">
  import { onMount } from 'svelte';
  import { persisted } from 'svelte-persisted-store';

  import type { ColorConfig, GameState } from '../../lib/qwixx/types.ts';
  import { t } from '../../utils/i18n.ts';
  import { stack, getPoints } from '../../lib/qwixx/game.ts';
  import { COLORS } from '../../lib/qwixx/constants.ts';
  import NumbersInput from './NumbersInput.svelte';
  import PointsTable from './PointsTable.svelte';
  import PenaltiesInput from './PenaltiesInput.svelte';
  import ScoreEquation from './ScoreEquation.svelte';
  import Undo from './Undo.svelte';
  import Redo from './Redo.svelte';

  const initialState: GameState = {
    red: [],
    yellow: [],
    green: [],
    blue: [],
    penalties: 0,
  };

  const game = stack(persisted('qwixx-state', initialState));
  const { undo, redo, canUndo, canRedo } = game;

  function reset() {
    game.set(initialState);
  }

  function toggleNumber(color: ColorConfig, number: number) {
    const { key } = color;
    game.update((state) => {
      const numbers = state[key];
      if (numbers.includes(number)) {
        return {
          ...state,
          [key]: numbers.filter((n) => n !== number),
        };
      }
      return {
        ...state,
        [key]: [...numbers, number],
      };
    });
  }

  function togglePenalty(penalty: number) {
    game.update((state) => {
      return {
        ...state,
        penalties: penalty === state.penalties ? penalty - 1 : penalty,
      };
    });
  }

  const points = getPoints(game);

  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'z') {
        event.preventDefault();
        undo();
      }
      if (event.metaKey && event.key === 'y') {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<header>
  <div class="brand">
    <a href="/" aria-label="All games" class="logo">🎲</a>
    <h1>Qwixx™</h1>
  </div>
  <div class="controls">
    <button
      onclick={undo}
      disabled={!$canUndo}
      class="button"
      title={t.qwixx.undo}
      aria-label={t.qwixx.undo}
    >
      <Undo />
    </button>
    <button
      onclick={redo}
      disabled={!$canRedo}
      class="button"
      title={t.qwixx.redo}
      aria-label={t.qwixx.redo}
    >
      <Redo />
    </button>
    <button onclick={reset} disabled={$points.total === 0} class="button">
      {t.qwixx.reset}
    </button>
  </div>
</header>

<section>
  <h2>{t.qwixx.numbers}</h2>

  <div class="numbers">
    {#each COLORS as color (color.key)}
      <NumbersInput {color} numbers={$game[color.key]} {toggleNumber} />
    {/each}
  </div>
</section>

<div class="points-penalties">
  <PenaltiesInput penalties={$game.penalties} {togglePenalty} />
  <PointsTable />
</div>

<div class="score">
  <ScoreEquation points={$points} />
</div>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--layout-gutter);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-family-display);
    font-size: 2.25rem;
    line-height: var(--line-height-heading);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h1 {
    font-size: inherit;
  }

  .logo {
    text-decoration: none;
    line-height: 1;
    transition: transform var(--transition-micro);
    border-radius: 4px;
  }

  .logo:hover,
  .logo:focus-visible {
    transform: scale(1.1);
  }

  .logo:focus-visible {
    outline: 2px solid var(--color-fg-subtle);
    outline-offset: 3px;
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .points-penalties {
    display: flex;
    flex-wrap: wrap;
    gap: var(--layout-gutter);
    margin-top: var(--layout-gutter);
    margin-bottom: var(--layout-gutter);
  }

  .score {
    margin-bottom: var(--layout-gutter);
  }
</style>
