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
  const crearhoraad = page.getByRole('button',{name:'Catálogo de tipo de licencias'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();


  //PARA CREAR LOS EVENTOS


  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre de licencia*' }).click();
  await page.getByRole('textbox', { name: 'Nombre de licencia*' }).fill('Licencia por trabajo remoto');
  await page.waitForTimeout(500);

//seleccionamos el genero
  const genero = page.locator('.v-input').filter({ hasText: 'Seleccione genero al que se aplica' }).first();
  await genero.locator('.v-select__selections').click({ force: true });
  await page.getByText('Ambos', { exact: true }).click();
  await page.waitForTimeout(600);

  //seleccionamos la cantidad de horas
  const cantidadhoras = page.locator('.v-input').filter({ hasText: 'Cantidad máxima de horas' }).first();
  await cantidadhoras.locator('.v-select__selections').click({ force: true });
  await page.getByText('Posee cantidad máxima de horas', { exact: true }).click();
  await page.waitForTimeout(600);

  //ingresamos la cantidad de horas
  await page.getByRole('textbox', { name: 'Ingrese cantidad máxima de horas*' }).click();
  await page.getByRole('textbox', { name: 'Ingrese cantidad máxima de horas*' }).fill('48');
  await page.waitForTimeout(500);

  //seleccionamos la vigencia
  const vigencia = page.locator('.v-input').filter({ hasText: 'Tipo de vigencia' }).first();
  await vigencia.locator('.v-select__selections').click({ force: true });
  await page.getByText('Anual', { exact: true }).click();
  await page.waitForTimeout(600);

  //seleccionamos si es con goce de sueldo o sin goce de sueldo
  const gocedesueldo = page.locator('.v-input').filter({ hasText: 'Goce de sueldo' }).first();
  await gocedesueldo.locator('.v-select__selections').click({ force: true });
  await page.getByText('Es con goce de sueldo', { exact: true }).click();
  await page.waitForTimeout(600);

  //seleccionamos si requiere justificación o no
  const justificante = page.locator('.v-input').filter({ hasText: 'Justificante' }).first();
  await justificante.locator('.v-select__selections').click({ force: true });
  await page.getByText('Requiere justificante', { exact: true }).click();
  await page.waitForTimeout(600);

 // Buscamos la clase exacta del área de escritura y la llenamos
  await page.locator('.ql-editor').fill('Aquí va el detalle del procedimiento...');

  //seleccionamos el encargado
  await page.getByRole('textbox', { name: 'Empleado', exact: true }).click();
  const opcionCristian = page.getByText('CRISTIAN BALTAZAR MOLINA SOLIS', { exact: true });
  await opcionCristian.waitFor({ state: 'visible' });
  await opcionCristian.click();
  await page.waitForTimeout(600);

  //seleccionamos si requiere justificación o no
  const unidad = page.locator('.v-input').filter({ hasText: 'Unidad' }).first();
  await unidad.locator('.v-select__selections').click({ force: true });
  await page.getByText('DESPACHO MINISTERIAL', { exact: true }).click();
  await page.waitForTimeout(600);

  //damos clic en agregar personas
  await page.getByRole('button', { name: 'Agregar' }).first().click();
  await page.waitForTimeout(500);
  
  //damos clic en volver
  //await page.getByRole('button', { name: 'Volver' }).click();
  //await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('button', { name: 'Agregar' }).nth(1).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Agregar' }).nth(2).click();
  await page.waitForTimeout(500);

  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });



});



