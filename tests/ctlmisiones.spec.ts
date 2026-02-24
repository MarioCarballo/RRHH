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
  const crearhoraad = page.getByRole('button',{name:'Catálogo de establecimientos de misiones oficiales al interior'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();


  //PARA CREAR LOS EVENTOS


  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

  // Agregar código
  await page.getByRole('textbox', { name: 'Código*' }).click();
  await page.getByRole('textbox', { name: 'Código*' }).fill('COD13');
  await page.waitForTimeout(500);


//seleccionamos el departamento
  const departamento = page.locator('.v-input').filter({ hasText: 'Departamento*' }).first();
  await departamento.locator('.v-select__selections').click({ force: true });
  await page.getByText('SANTA ANA', { exact: true }).click();
  await page.waitForTimeout(500);

  //seleccionamos el municipio
  const municipio = page.locator('.v-input').filter({ hasText: 'Municipio*' }).first();
  await municipio.locator('.v-select__selections').click({ force: true });
  await page.getByText('METAPÁN', { exact: true }).click();
  await page.waitForTimeout(500);

  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Establecimiento*' }).click();
  await page.getByRole('textbox', { name: 'Establecimiento*' }).fill('ESTABLECIMIENTO 13');
  await page.waitForTimeout(500);

  //damos clic en cancelar
 // await page.getByRole('button', { name: 'Cancelar' }).click();
  //await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('button', { name: 'Agregar' }).nth(1).click();
  await page.waitForTimeout(500);
  //await page.getByRole('button', { name: 'Agregar' }).nth(2).click();
  //await page.waitForTimeout(500);

  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });



});



