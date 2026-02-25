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
  await page.getByText('Establecer marcador').click();
  await page.waitForURL('**/establecer-marcador-establecimiento', { timeout: 90000 });

  //permisos de geolocalización
  await page.context().grantPermissions(['geolocation'], { origin: 'https://unidad-rrhh.egob.sv' });
  await page.waitForTimeout(1000);

   //Damos clic en el mapa para establecer el marcador
  await page.locator('.leaflet-container').click();
  await page.waitForTimeout(1000);


  //seleccionamos la unidad organizativa
  await page.getByRole('textbox', { name: 'Unidad Organizativa*' }).click({ force: true });
  await page.getByText('UNIDAD FINANCIERA INSTITUCIONAL', { exact: true }).click();
  await page.waitForTimeout(1000);
  
  // ID del dispositivo
  await page.getByRole('textbox', { name: 'ID Dispositivo*' }).click();
  await page.getByRole('textbox', { name: 'ID Dispositivo*' }).fill('7fea8ddefe7b7d52');
  await page.waitForTimeout(500);

    // Rango del dispositivo
  await page.getByRole('spinbutton', { name: 'Rango (m)*' }).click({ force: true });
  await page.getByRole('spinbutton', { name: 'Rango (m)*' }).fill('900');
  await page.waitForTimeout(500);


  //damos clic en cancelar
  //await page.getByRole('button', { name: 'Cancelar' }).click();
  //await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.waitForTimeout(500);

  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });



});



