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
  const menuGestion = page.getByText('Institución / Establecimiento');
  await menuGestion.waitFor({ state: 'visible', timeout: 15000 });
  await menuGestion.click();

  //una vez identificado damos clic y luego a la opcion que buscamos
  await page.getByRole('button', { name: 'Institución / Establecimiento' }).click();
  await page.getByText('Configuración de establecimiento').click();
  await page.waitForURL('**/configuracion-establecimiento', { timeout: 90000 });

  // dentro ya del menu en la opcion deseada
  const crearhoraad = page.getByRole('button',{name:'Asuetos o días festivos'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();

  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre del evento*' }).click();
  await page.getByRole('textbox', { name: 'Nombre del evento*' }).fill('Día de la madre');

  // damos doble clic para abrir el calendario y seleccionar la fecha
  await page.getByRole('button', { name: 'Fecha de inicio*' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Fecha de inicio*' }).click();
  await page.waitForTimeout(500);

  const calendario = page.locator('.v-date-picker-table');
  //await calendario.waitFor({ state: 'visible' });
  for (let i = 0; i < 3; i++) {
  await page.locator('.mdi-chevron-right:visible').click();
  await page.waitForTimeout(300); // Pausa de 0.3 segundos entre cada clic para que la animación termine
}
  await page.waitForTimeout(500);
  const fecha = page.locator('.v-date-picker-table');
  await fecha.getByText('10', { exact: true }).click();
  await page.waitForTimeout(500);

  // damos doble clic para abrir el calendario y seleccionar la segunda fecha
  await page.getByRole('button', { name: 'Fecha de fin*' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Fecha de fin*' }).click();
  await page.waitForTimeout(500);

  const calendario2 = page.locator('.v-date-picker-table');
  //await calendario2.waitFor({ state: 'visible' });
  for (let i = 0; i < 3; i++) {
  await page.locator('.mdi-chevron-right:visible').click();
  await page.waitForTimeout(300); // Pausa de 0.3 segundos entre cada clic para que la animación termine
}
  await page.waitForTimeout(500);
  const fecha2 = page.locator('.v-date-picker-table:visible');
  await fecha2.getByText('10', { exact: true }).click();
  await page.waitForTimeout(500);


  // es para agregar la descripcion
  await page.getByRole('textbox', { name: 'Descripción*' }).click();
  await page.getByRole('textbox', { name: 'Descripción*' }).fill('Asueto por el día de la madre');
  await page.waitForTimeout(500);

  //seleccionamos a quines aplica
  const tipohorario = page.locator('.v-input').filter({ hasText: 'Aplica a*' }).first();
  await tipohorario.locator('.v-select__selections').click({ force: true });
  await page.getByText('ADMINISTRATIVO', { exact: true }).click();
  await page.waitForTimeout(600);
  await tipohorario.locator('.v-select__selections').click({ force: true });
  await page.getByText('ROTATIVO', { exact: true }).click();
  await page.waitForTimeout(600);

  // Da clic en el título de la ventana para quitar el foco y cerrar los menús desplegables
  await page.getByText('Nuevo asueto o día festivo').click();
  //await page.getByRole('heading', { name: 'Nuevo asueto o día festivo' }).click();
  await page.waitForTimeout(500);

//Seleccionamos las unidades organizativas a las que aplica el asueto
  const unidades = page.locator('.v-input').filter({ hasText: 'Unidades' }).first();
  await unidades.locator('.v-select__selections').click({ force: true });
  await page.getByText('DESPACHO MINISTERIAL', { exact: true }).click();
  await page.waitForTimeout(900);
  await unidades.locator('.v-select__selections').click({ force: true });
  await page.getByText('UNIDAD FINANCIERA INSTITUCIONAL', { exact: true }).click();
  await page.waitForTimeout(900);

  // Da clic en el título de la ventana para quitar el foco y cerrar los menús desplegables
  await page.getByText('Nuevo asueto o día festivo').click();
  //await page.getByRole('heading', { name: 'Nuevo asueto o día festivo' }).click();
  await page.waitForTimeout(500);

  //damos clic en cancelar
  //await page.getByRole('button', { name: 'Cancelar' }).click();
  //await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('dialog').getByRole('button', { name: 'Agregar', exact: true }).click();
  await page.waitForTimeout(500);

  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });

});



