import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('https://rrhh.egob.sv/');
  await page.locator('div:nth-child(3) > .rounded-xxl.v-card > .v-card__text > .v-image > .v-responsive__content > .d-flex.align-end').click();
  await page.locator('#card').getByRole('button').click();
  await page.getByRole('textbox', { name: 'número de documento' }).click();
  await page.getByRole('textbox', { name: 'número de documento' }).fill('058720612');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'contraseña' }).fill('A');
  await page.getByRole('textbox', { name: 'contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'contraseña' }).fill('Admin123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.goto('https://rrhh.egob.sv/dashboard', { timeout: 90000 }); // 60 segundos
});