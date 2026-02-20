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

  // 1. Abrir menú (hamburguesa)
  await page.locator('.v-app-bar__nav-icon').click();
  
  // 2. Esperar a que la barra lateral termine de deslizarse
  const menuGestion = page.getByText('Institución / Establecimiento');
  await menuGestion.waitFor({ state: 'visible', timeout: 15000 });
  await menuGestion.click();

  await page.getByRole('button', { name: 'Institución / Establecimiento' }).click();
  await page.getByText('Configuración de establecimiento').click();
  await page.waitForURL('**/configuracion-establecimiento', { timeout: 90000 });

  // dentro ya del menu en la opcion deseada
  const crearhoraad = page.getByRole('button',{name:'Creación de horarios administrativos'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();
  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

// es para dar clic al boton agregar la hora inicio
  await page.getByRole('button', { name: 'Hora entrada' }).click();
  const reloj = page.locator('.v-time-picker-clock__inner');
  await reloj.getByText('9', { exact: true }).click();
  await page.waitForTimeout(500);
  await page.locator('.v-time-picker-title__ampm:visible').getByText('AM').click();
  await reloj.getByText('00', { exact: true }).click();
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // es para dar clic al boton agregar la hora fin
  await page.getByRole('button', { name: 'Hora salida' }).click();
  const reloj2 = page.locator('.v-time-picker-clock__inner:visible');
  await reloj2.getByText('5', { exact: true }).click();
  await page.waitForTimeout(500);
  await page.locator('.v-time-picker-title__ampm:visible').getByText('PM').click();
  await reloj2.getByText('30', { exact: true }).click();
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // seleccionar dias de la semana
  await page.waitForTimeout(500);
  const campoDias = page.locator('.v-input').filter({ hasText: 'Días' });
  await campoDias.locator('.v-select__selections').click({ force: true });
  //await page.locator('.v-select__selections').first().click({ force: true });
  //await page.getByRole('button', { name: 'Días' }).click({ force: true });
  await page.getByText('Lunes', { exact: true }).click();
  await page.getByText('Martes', { exact: true }).click();
 // await page.getByText('Miércoles', { exact: true }).click();
  //await page.getByText('Jueves', { exact: true }).click();
 // await page.getByText('Viernes', { exact: true }).click();
  await page.getByText('Nuevo horario administrativo').click();
  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre del horario' }).click();
  await page.getByRole('textbox', { name: 'Nombre del horario' }).fill('REQ3');

  //es para gurardar el horario
  await page.getByRole('dialog').getByRole('button', { name: 'Agregar' }).click();
  await page.waitForTimeout(500);
  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });

  // es para dar clic al boton cancelar
  // Usamos .getByRole('dialog') para enfocarnos solo en la ventana blanca del formulario
  //await page.getByRole('dialog').getByRole('button', { name: 'Cancelar' }).click();

});



