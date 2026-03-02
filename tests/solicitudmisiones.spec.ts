import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('https://rrhh.egob.sv/');
  await page.locator('div:nth-child(3) > .rounded-xxl.v-card > .v-card__text > .v-image > .v-responsive__content > .d-flex.align-end').click();
  await page.locator('#card').getByRole('button').click();
  await page.getByRole('textbox', { name: 'número de documento' }).click();
  await page.getByRole('textbox', { name: 'número de documento' }).fill('058720612');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('Admin123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/dashboard', { timeout: 90000 });

  // Abrir menú (hamburguesa)
  await page.locator('.v-app-bar__nav-icon').click();
  
  // Esperar a que la barra lateral carege y identifique que se encuentre lo que buscamos
  const menuGestion = page.getByText('Portal del empleado');
  await menuGestion.waitFor({ state: 'visible', timeout: 15000 });
  await menuGestion.click();

  //una vez identificado damos clic y luego a la opcion que buscamos
  await page.getByRole('button', { name: 'Portal del empleado' }).click();
  await page.getByText('Gestión de licencias permisos y misiones').click();
  await page.waitForURL('**/solicitud-licencias-permisos', { timeout: 90000 });
  await page.waitForTimeout(500);

  //Tap de permiso
  await page.getByRole('tab', { name: 'Misiones oficiales' }).click();
  await page.waitForTimeout(500);

  //Solicitamos la licencia
  await page.getByRole('button', { name: 'Solicitar' }).click();
  await page.waitForTimeout(500);


//Fecha
await page.getByRole('button', { name: 'Fecha*' }).first().click();
  await page.waitForTimeout(500);
  const fecha = page.locator('.v-date-picker-table');
  await fecha.getByText('1', { exact: true }).click();
  await page.waitForTimeout(500);

  //Forzamos a cerrar el campo de hora
  await page.getByText('Agregar evento').click();
  await page.waitForTimeout(500);


//Seleccionamos la hora
  await page.getByRole('textbox', { name: 'Hora de salida sede' }).first().click({ force: true });
  await page.waitForTimeout(500);
  await page.getByText('08', { exact: true }).first().click();
  await page.waitForTimeout(300);
  await page.getByText('00', { exact: true }).first().click();
  await page.waitForTimeout(300);
  await page.getByText('AM', { exact: true }).first().click();
  await page.waitForTimeout(500);


  //Forzamos a cerrar el campo de hora
  await page.locator('.time-picker-overlay').click();
  await page.waitForTimeout(500);
  

//Seleccionamos la hora
  await page.getByRole('textbox', { name: 'Hora de regreso sede' }).click({ force: true });
  await page.waitForTimeout(500);
  await page.getByText('04', { exact: true }).last().click();
  await page.waitForTimeout(300);
  await page.getByText('00', { exact: true }).last().click();
  await page.waitForTimeout(300);
  await page.getByText('PM', { exact: true }).last().click();
  await page.waitForTimeout(500);

  //Forzamos a cerrar el campo de hora
  await page.locator('.time-picker-overlay').click();
  await page.waitForTimeout(500);


//seleccionamos lugar visitado
  const unidad = page.locator('.v-input').filter({ hasText: 'Lugar visitado*' }).first();
  await unidad.locator('.v-select__selections').click({ force: true });
  await page.getByText('ESTABLECIMIENTO 1', { exact: true }).click();
  await page.waitForTimeout(600);


// damos clic al chek
  await page.getByRole('checkbox', { name: 'Todo el día' }).first().click({ force: true });
  await page.waitForTimeout(500);


  // es para agregar la descripcion
  await page.getByRole('textbox', { name: 'Motivo de la misión*' }).click();
  await page.getByRole('textbox', { name: 'Motivo de la misión*' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra diam et est ultricies fringilla. Sed dapibus commodo sem at cursus. Praesent tincidunt in est eu convallis. Praesent a cursus justo.');
  await page.waitForTimeout(500);

//Boton de guardar
  //await page.getByRole('button', { name: 'Solicitar' }).last().click();
  //await page.waitForTimeout(500);



  //Boton de cancelar
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.waitForTimeout(500);


  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  //await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });

  
});



