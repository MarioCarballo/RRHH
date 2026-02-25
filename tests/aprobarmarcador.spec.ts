import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('https://rrhh.egob.sv/');
  await page.locator('div:nth-child(3) > .rounded-xxl.v-card > .v-card__text > .v-image > .v-responsive__content > .d-flex.align-end').click();
  await page.locator('#card').getByRole('button').click();
  await page.getByRole('textbox', { name: 'número de documento' }).click();
  await page.getByRole('textbox', { name: 'número de documento' }).fill('053790793');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('Admin123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/dashboard', { timeout: 90000 });

  // Abrir menú (hamburguesa)
  await page.locator('.v-app-bar__nav-icon').click();
  
  // Esperar a que la barra lateral carege y identifique que se encuentre lo que buscamos
  const menuGestion = page.getByText('Marcadores');
  await menuGestion.waitFor({ state: 'visible', timeout: 15000 });
  await menuGestion.click();

  //una vez identificado damos clic y luego a la opcion que buscamos
  await page.getByRole('button', { name: 'Marcadores' }).click();
  await page.getByText('Solicitud de marcadores').click();
  await page.waitForURL('**/marcadores-institucion', { timeout: 90000 });

  // buscamos dentro de la tabla el texto con el codigo del marcador (ACTIVAR)
  //await page.locator('tr', { hasText: '3200-2026-MC010' }).locator('.material-symbols-outlined', { hasText: 'check_circle' }).click();
  //esperamos que carge
  //await page.waitForTimeout(500);

// buscamos dentro de la tabla el texto con el codigo del marcador (DENEGAR)
  await page.locator('tr', { hasText: '3200-2026-MC010' }).locator('.material-symbols-outlined', { hasText: 'cancel' }).click();
  //esperamos que carge
  await page.waitForTimeout(500);



  //damos clic en guardar
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.waitForTimeout(500);

  //damos clic en cancelar
  //await page.getByRole('button', { name: 'Cancelar' }).click();
  //await page.waitForTimeout(500);

  
});



