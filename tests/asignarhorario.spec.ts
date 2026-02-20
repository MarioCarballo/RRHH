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
  const crearhoraad = page.getByRole('button',{name:'Asignación de horarios a empleados'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();

  // buscamos dentro de la tabla el texto del nombre del horario
  await page.locator('tr', { hasText: 'PRUEBA1' }).locator('.mdi-account-plus-outline').click();
  //esperamos que carge
  await page.waitForTimeout(500);


  //APARTADO PARA AGREGAR EMPLEADOS

  //seleccionamos la unidad organizativa
  const campoDias = page.locator('.v-input').filter({ hasText: 'Unidades organizativas' }).first();
  await campoDias.locator('.v-select__selections').click({ force: true });
  await page.getByText('DIRECCIONES REGIONALES DE SALUD', { exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByRole('heading', { name: 'ADMINISTRATIVO' }).click();

  // Buscamos dentro de la tabla el texto del nombre del empleado o numero de documento
  // y agregamos al empleado con el icono
  await page.locator('tr', { hasText: '06496089-8' }).locator('.mdi-account-plus-outline').click();
  //esperamos que carge
  await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.waitForTimeout(500);

  //damos clic en volver
  await page.getByRole('button', { name: 'Volver' }).click();
  await page.waitForTimeout(500);

  // buscamos dentro de la tabla el texto del nombre del horario
  await page.locator('tr', { hasText: 'PRUEBA1' }).locator('.mdi-account-plus-outline').click();
  //esperamos que carge
  await page.waitForTimeout(500);

/*
  //APARTADO PARA REMOVER EMPLEADOS

  //para buascar el nombre del empleado asignado
  const buscarAbajo = page.getByRole('textbox', { name: 'Buscar' }).nth(1);
  await buscarAbajo.fill('06496089-8');

  //para remover la asignacion
  await page.locator('.mdi-account-minus-outline').click();
  //esperamos que carge
  await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.waitForTimeout(500);
*/
  
});



