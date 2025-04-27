<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { formatDate } from '../../utils/date';
  import { join } from '../../utils/format';
  import {
    getCurrentPlayers,
    type Game,
    type CurrentGame,
  } from '../../lib/wizard/stores';
  import { t } from '../../utils/i18n';

  type Props = {
    game: Game;
    currentGame: Writable<CurrentGame>;
  };

  const { game, currentGame }: Props = $props();

  const players = getCurrentPlayers(game, false);
  const playerList = join($players.map((player) => player.name));
  const isCurrent = game.id === $currentGame.id;

  function resumeGame() {
    currentGame.set(game);
    window.location.assign('/wizard/dealer');
  }
</script>

<div class="card">
  <div>
    <h3>{playerList}</h3>
    <time datetime={game.startedAt}>
      {formatDate(new Date(game.startedAt))}
    </time>
  </div>
  <button class="button" class:primary={isCurrent} onclick={resumeGame}>
    {t.wizard.about.resume}
  </button>
</div>

<style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--layout-gutter);
    text-wrap: balance;
  }

  time {
    margin-top: 8px;
  }
</style>
