import { expect, test } from '@playwright/test';

const PLAYERS = ['Anna', 'Bob', 'Claire', 'Dylan'] as const;

test('play a game', async ({ page }) => {
  await page.goto('/wizard');

  await expect(page).toHaveTitle(/Wizard/);
  await expect(
    page.getByRole('heading', { name: 'Wizard Scorekeeper' }),
  ).toBeVisible();

  // New game
  await page.getByRole('link', { name: 'New game' }).click();

  await expect(page).toHaveTitle(/New game/);
  await expect(page.getByRole('heading', { name: 'Players' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Player 1' }).fill(PLAYERS[0]);
  await page.getByRole('textbox', { name: 'Player 2' }).fill(PLAYERS[1]);
  await page.getByRole('textbox', { name: 'Player 3' }).fill(PLAYERS[2]);
  await page.getByRole('textbox', { name: 'Player 4' }).fill(PLAYERS[3]);
  await page.getByRole('button', { name: 'Start game' }).click();

  // Dealer
  await expect(page).toHaveTitle(/Dealer/);
  await expect(page.getByRole('heading', { name: 'Dealer' })).toBeVisible();
  await expect(page.getByText(`${PLAYERS[0]} deals 1 card.`)).toBeVisible();

  await page.getByRole('link', { name: 'Start bidding' }).click();

  // Bids
  await expect(page).toHaveTitle(/Bids/);
  await expect(page.getByRole('heading', { name: 'Bids' })).toBeVisible();

  await page.getByRole('slider', { name: PLAYERS[1] }).press('1');
  await page.getByRole('slider', { name: PLAYERS[2] }).press('0');
  await page.getByRole('slider', { name: PLAYERS[3] }).press('ArrowLeft');
  await page
    .getByRole('listitem')
    .filter({ hasText: PLAYERS[0] })
    .getByText('0')
    .click();

  await expect(page.getByText('Total: 1/1')).toBeVisible();

  await page.getByRole('button', { name: 'Save bids' }).click();

  // // Tricks
  await expect(page).toHaveTitle(/Tricks/);
  await expect(page.getByRole('heading', { name: 'Tricks' })).toBeVisible();

  await page.getByRole('slider', { name: PLAYERS[1] }).press('1');
  await page.getByRole('slider', { name: PLAYERS[2] }).press('0');
  await page.getByRole('slider', { name: PLAYERS[3] }).press('ArrowLeft');
  await page
    .getByRole('listitem')
    .filter({ hasText: PLAYERS[0] })
    .getByText('0')
    .click();

  await expect(page.getByText('Total: 1/1')).toBeVisible();

  await page.getByRole('button', { name: 'Save tricks' }).click();

  // Dealer
  await expect(page).toHaveTitle(/Dealer/);
  await expect(page.getByRole('heading', { name: 'Dealer' })).toBeVisible();
  await expect(page.getByText(`${PLAYERS[1]} deals 2 cards.`)).toBeVisible();

  // // Scores
  await page.getByRole('button', { name: 'Scores' }).click();
  await expect(page.getByRole('heading', { name: 'Scores' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});
