<script lang="ts">
  import { onMount } from "svelte";
  import { derived, writable } from "svelte/store";

  import { createId } from "../../utils/id";
  import { isNumber } from "../../utils/type";
  import { t } from "../../utils/i18n";
  import {
    getCurrentGame,
    getCurrentPlayers,
    getScores,
  } from "../../lib/wizard/stores";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import ScoreInput from "./ScoreInput.svelte";
  import Placeholder from "./Placeholder.svelte";

  const { title, description } = t.wizard.tricks;

  const game = getCurrentGame();
  const players = getCurrentPlayers($game);
  const scores = getScores();

  onMount(() => {
    if (!$game) {
      window.location.assign("/wizard/new");
    }
  });

  const inputs = writable(
    $players.map((player) => {
      const score = $scores.find(
        (score) =>
          score.gameId === $game?.id &&
          score.round === $game?.round &&
          score.playerId === player.id,
      ) || { bid: undefined, tricks: undefined };
      return { player, score };
    }),
  );

  const total = derived(inputs, ($store) =>
    $store.reduce((acc, { score }) => acc + (score.tricks || 0), 0),
  );
  const valid = derived(
    [game, inputs, total],
    ([$game, $inputs, $total]) =>
      $inputs.every(({ score }) => isNumber(score.tricks)) &&
      $total === $game?.round,
  );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!$game) {
      throw new Error("No active game");
    }
    scores.insert(
      $inputs.map(({ score, player }) => ({
        id: createId(),
        gameId: $game.id,
        round: $game.round,
        playerId: player.id,
        bid: score.bid,
        tricks: score.tricks,
      })),
    );
    game.update((prev) => {
      if (!prev) {
        throw new Error("No active game");
      }
      return { ...prev, round: prev.round + 1 };
    });
    window.location.assign("/wizard/dealer");
  }
</script>

<Header {title} {description} showScores />

<form onsubmit={handleSubmit}>
  <ol class="inputs">
    {#each $inputs as field, index (field.player.id)}
      <li>
        <ScoreInput
          name="tricks"
          round={$game?.round}
          player={$inputs[index]!.player}
          bind:score={$inputs[index]!.score}
        />
      </li>
    {/each}
  </ol>

  <Footer>
    <div class="total">
      <strong>{t.wizard.total}:</strong>
      {$total}/<Placeholder value={$game?.round} placeholder={0} />
    </div>
    <div class="buttons">
      <button class="button primary" type="submit" disabled={!$valid}>
        {t.wizard.tricks.action}
      </button>
      <a
        class="button"
        aria-label={t.wizard.back}
        title={t.wizard.back}
        href="/wizard/bids"
      >
        ←
      </a>
    </div>
  </Footer>
</form>

<style>
  .inputs {
    max-width: var(--layout-max-width-prose);
    margin-inline: auto;
    padding-inline: var(--layout-frame);
    padding-bottom: 90px;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: row-reverse;
  }
</style>
