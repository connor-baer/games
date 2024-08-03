<script lang="ts">
  import { page } from '../stores';
  import Home from './Home.svelte';
  import Scores from './Scores.svelte';
  import NewGame from './NewGame.svelte';
  import Game from './Game.svelte';
</script>

{#if $page === 'home'}
  <Home />
{:else if $page === 'scores'}
  <Scores />
{:else if $page === 'new-game'}
  <NewGame />
{:else if $page === 'game'}
  <Game />
{/if}
