import { expect, test } from '@playwright/test';

type Color = 'Red' | 'Yellow' | 'Green' | 'Blue';
type Value =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'Lock';

test('play a game', async ({ page }) => {
  async function pressNumber(color: Color, value: Value) {
    const group = page.getByRole('group', { name: color });
    await group.locator('label').filter({ hasText: value }).first().click();
  }

  async function expectValue(
    name: Color | 'Penalties' | 'Total',
    value: number,
  ) {
    const input = page.getByRole('spinbutton', { name });
    await expect(input).toHaveValue(value.toString());
  }

  await page.goto('/qwixx');

  await expect(page).toHaveTitle(/Qwixx/);
  await expect(page.getByRole('heading', { name: 'Qwixx' })).toBeVisible();

  await pressNumber('Red', '2');
  await pressNumber('Green', '11');
  await pressNumber('Blue', '12');
  await pressNumber('Blue', '10');
  await pressNumber('Red', '3');
  await pressNumber('Red', '5');
  await pressNumber('Yellow', '3');
  await pressNumber('Red', '6');
  await pressNumber('Red', '8');
  await pressNumber('Blue', '9');
  await pressNumber('Green', '9');
  await pressNumber('Yellow', '5');
  await pressNumber('Yellow', '7');
  await pressNumber('Red', '9');
  await pressNumber('Blue', '8');
  await pressNumber('Blue', '7');
  await pressNumber('Red', '12');
  await pressNumber('Green', '6');
  await page.getByRole('button', { name: 'Undo' }).click();
  await pressNumber('Green', '7');
  await pressNumber('Green', '6');
  await page
    .getByRole('group', { name: 'Penalties' })
    .locator('label')
    .filter({ hasText: '1' })
    .click();
  await pressNumber('Green', '4');
  await pressNumber('Green', 'Lock');

  // Results
  await expectValue('Red', 36);
  await expectValue('Yellow', 6);
  await expectValue('Green', 28);
  await expectValue('Blue', 15);
  await expectValue('Penalties', 5);
  await expectValue('Total', 80);

  // Reset
  await page.getByRole('button', { name: 'Reset' }).click();

  await expectValue('Total', 0);
});
