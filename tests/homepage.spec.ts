import { expect, test } from '@playwright/test';

test('list available games', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Games/);

  await expect(page.getByRole('link', { name: 'Qwixx' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Wizard' })).toBeVisible();
});
