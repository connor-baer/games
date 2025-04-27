<script lang="ts">
  import { sortByDate } from '../../utils/date';
  import { getCurrentGame, getGames } from '../../lib/wizard/stores';
  import GameCard from './GameCard.svelte';

  const currentGame = getCurrentGame();
  const games = getGames();
  const sortedGames = sortByDate($games, (game) => game.startedAt);
</script>

<h2>Past Games</h2>

<ul>
  {#each $games as game (game.id)}
    <li>
      <GameCard {game} {currentGame} />
    </li>
  {/each}
</ul>

<style>
  h2 {
    margin-top: var(--layout-gutter);
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding-block: 24px;
    margin: 0;
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid var(--color-mg-default);
  }
</style>
