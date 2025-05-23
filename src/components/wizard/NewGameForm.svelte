<script lang="ts">
  import { MAX_PLAYERS, MIN_PLAYERS } from '../../lib/wizard/constants';
  import {
    getCurrentGame,
    getGames,
    getPlayers,
    getPlayersInGame,
  } from '../../lib/wizard/stores';
  import { createArray } from '../../utils/array';
  import { createId, createHumanId } from '../../utils/id';
  import { createTimestamp } from '../../utils/date';
  import { t } from '../../utils/i18n';

  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  const newPlayers = $state(
    createArray(MAX_PLAYERS).map(() => ({ id: createId(), name: '' })),
  );

  const curentGame = getCurrentGame();
  const games = getGames();
  const players = getPlayers();
  const playersInGame = getPlayersInGame();

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const game = {
      id: createHumanId(),
      round: 1,
      startedAt: createTimestamp(),
    };

    curentGame.set(game);
    games.insert(game);
    const validPlayers = newPlayers.filter((player) => Boolean(player.name));
    players.insert(validPlayers);
    playersInGame.insert(
      validPlayers.map((player, index) => ({
        id: `${game.id}-${player.id}`,
        gameId: game.id,
        playerId: player.id,
        position: index,
      })),
    );
    window.location.assign('/wizard/dealer');
  }
</script>

<Header title={t.wizard.new.players} description={t.wizard.new.instructions} />

<form onsubmit={onSubmit}>
  <div class="inputs">
    {#each newPlayers as player, index (player.id)}
      <div class="field">
        <label for={`player-name-${player.id}`}>
          {t.wizard.new.player}
          {index + 1}
        </label>
        <input
          id={`player-name-${player.id}`}
          name="playerNames"
          type="text"
          required={index < MIN_PLAYERS}
          class="input"
          bind:value={player.name}
        />
      </div>
    {/each}
  </div>
  <Footer>
    <button class="button primary" type="submit">{t.wizard.new.start}</button>
  </Footer>
</form>

<style>
  .inputs {
    max-width: var(--layout-max-width-prose);
    margin-inline: auto;
    padding-inline: var(--layout-frame);
  }

  .field {
    margin-bottom: 12px;
  }

  label {
    display: block;
    font-size: smaller;
    margin-bottom: 2px;
  }

  input {
    max-width: 40ch;
  }
</style>
