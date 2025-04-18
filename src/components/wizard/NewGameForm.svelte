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
    players.insert(newPlayers.filter((player) => Boolean(player.name)));
    playersInGame.insert(
      $players.map((player, index) => ({
        id: `${game.id}-${player.id}`,
        gameId: game.id,
        playerId: player.id,
        position: index,
      })),
    );
    window.location.assign('/wizard/dealer');
  }
</script>

<form onsubmit={onSubmit}>
  {#each newPlayers as player, index (player.id)}
    <div class="field">
      <label for={`player-name-${player.id}`}>Player {index + 1}</label>
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
  <div class="footer">
    <button class="button primary" type="submit">Start game</button>
  </div>
</form>

<style>
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

  .footer {
    margin-top: 1rem;
  }
</style>
