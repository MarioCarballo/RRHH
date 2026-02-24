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
  const crearhoraad = page.getByRole('button',{name:'Permisos'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();


  //PARA CREAR LOS EVENTOS


  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre del permiso*' }).click();
  await page.getByRole('textbox', { name: 'Nombre del permiso*' }).fill('Permiso por trabajo remoto');
  await page.waitForTimeout(500);

// tiempo total
  await page.getByRole('textbox', { name: 'Tiempo total*' }).click();
  await page.getByRole('textbox', { name: 'Tiempo total*' }).fill('48');
  await page.waitForTimeout(500);

  //Solicitudes totales
  const solicitudesTotales = page.getByRole('spinbutton', { name: 'Solicitudes totales' });
  await solicitudesTotales.fill('5');
  await page.waitForTimeout(500);

  // tiempo total de solicitudes
  await page.getByRole('textbox', { name: 'Tiempo por mes*' }).click();
  await page.getByRole('textbox', { name: 'Tiempo por mes*' }).fill('8');
  await page.waitForTimeout(500);

  //Solicitudes por mes cantidad
  const solicitudesmes = page.getByRole('spinbutton', { name: 'Solicitudes por mes' });
  await solicitudesmes.fill('1');
  await page.waitForTimeout(500);

  //clic al switch
  const switchSinSueldo = page.getByRole('switch', { name: 'Sin sueldo' });
  await switchSinSueldo.click({ force: true });
  await page.waitForTimeout(500);

//seleccionamos el genero
  const genero = page.locator('.v-input').filter({ hasText: 'Seleccione genero al que se aplica' }).first();
  await genero.locator('.v-select__selections').click({ force: true });
  await page.getByText('Ambos', { exact: true }).click();
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



