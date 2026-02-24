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
  const crearhoraad = page.getByRole('button',{name:'Tipo de inconsistencias'});
  await crearhoraad.waitFor({ state: 'visible' });
  await crearhoraad.click();


  //PARA CREAR LOS EVENTOS


  // es para dar clic al boton agregar
  const btnagregar = page.getByText('Agregar');
  await btnagregar.waitFor({ state: 'visible' });
  await btnagregar.click();

  // es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre*' }).click();
  await page.getByRole('textbox', { name: 'Nombre*' }).fill('Error de marcación 2');
  await page.waitForTimeout(500);

    // es para agregar la descripcion
  await page.getByRole('textbox', { name: 'Descripción*' }).click();
  await page.getByRole('textbox', { name: 'Descripción*' }).fill('Lorem ipsum dolor sit amet, consecteturadipiscingelit. Proin eleifend felis a lectus hendrerit, nec pellentesque diam egestas. Proin molestie justo in gravida porta. Donec nec tortor tellus. Pellentesque purus justo, tincidunt id elementum ut, porttitor et libero. Integer nec mollis urna, viverra blandit dolor.');
  await page.waitForTimeout(500);


  // damos clic para marcar la opcion a usar (radiobutton)
  await page.getByRole('radio', { name: 'Vigencia por tiempo' }).first().click({ force: true });
  await page.waitForTimeout(500);

  //ubicamos la opcion del calendario
  await page.getByRole('button', { name: 'Vigencia por tiempo' }).click();
  await page.waitForTimeout(500);

  //busca el calendario
  const calendario = page.locator('.v-date-picker-table');
  //await calendario.waitFor({ state: 'visible' });
  for (let i = 0; i < 3; i++) {
  await page.locator('.mdi-chevron-right:visible').click();
  await page.waitForTimeout(300); // Pausa de 0.3 segundos entre cada clic para que la animación termine
}
  await page.waitForTimeout(500);
  const fecha = page.locator('.v-date-picker-table');
  await fecha.getByText('1', { exact: true }).click();
  await page.waitForTimeout(500);

// damos clic para marcar la opcion a usar (radiobutton)
  await page.getByRole('radio', { name: 'Vigencia por recurrencia' }).first().click({ force: true });
  await page.waitForTimeout(500);

//ubicamos la opcion del campo a digitar
  await page.getByRole('textbox', { name: 'Vigencia por recurrencia' }).click();
  await page.getByRole('textbox', { name: 'Vigencia por recurrencia' }).fill('2');
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


/*
//PARA EDITAR LOS EVENTOS


  // buscamos dentro de la tabla el texto del nombre del evento
  await page.locator('tr', { hasText: 'ERROR DE MARCACIÓN DOS' }).locator('.mdi-pencil-outline').click();
  //esperamos que carge
  await page.waitForTimeout(700);

// es para agregar el nombre
  await page.getByRole('textbox', { name: 'Nombre*' }).click();
  await page.getByRole('textbox', { name: 'Nombre*' }).fill('Error de marcación 3');
  await page.waitForTimeout(500);

    // es para agregar la descripcion
  await page.getByRole('textbox', { name: 'Descripción*' }).click();
  await page.getByRole('textbox', { name: 'Descripción*' }).fill('Lorem ipsum dolor sit amet, consecteturadipiscingelit. Proin eleifend felis a lectus hendrerit, nec pellentesque diam egestas. Proin molestie justo in gravida porta. Donec nec tortor tellus. Pellentesque purus justo, tincidunt id elementum ut, porttitor et libero. Integer nec mollis urna, viverra blandit dolor.');
  await page.waitForTimeout(500);


  // damos clic para marcar la opcion a usar (radiobutton)
  await page.getByRole('radio', { name: 'Vigencia por tiempo' }).first().click({ force: true });
  await page.waitForTimeout(500);

  //ubicamos la opcion del calendario
  await page.getByRole('button', { name: 'Vigencia por tiempo' }).click();
  await page.waitForTimeout(500);

  //busca el calendario
  const calendario = page.locator('.v-date-picker-table');
  //await calendario.waitFor({ state: 'visible' });
  for (let i = 0; i < 3; i++) {
  await page.locator('.mdi-chevron-right:visible').click();
  await page.waitForTimeout(300); // Pausa de 0.3 segundos entre cada clic para que la animación termine
}
  await page.waitForTimeout(500);
  const fecha = page.locator('.v-date-picker-table');
  await fecha.getByText('1', { exact: true }).click();
  await page.waitForTimeout(500);

// damos clic para marcar la opcion a usar (radiobutton)
  await page.getByRole('radio', { name: 'Vigencia por recurrencia' }).first().click({ force: true });
  await page.waitForTimeout(500);

//ubicamos la opcion del campo a digitar
  await page.getByRole('textbox', { name: 'Vigencia por recurrencia' }).click();
  await page.getByRole('textbox', { name: 'Vigencia por recurrencia' }).fill('2');
  await page.waitForTimeout(500);

  //damos clic en guardar
  await page.getByRole('dialog').getByRole('button', { name: 'Editar', exact: true }).click();
  await page.waitForTimeout(500);

  // Le decimos: "No cierres el navegador hasta que la ventana de diálogo haya DESAPARECIDO".
  // Esto garantiza que el sistema tuvo tiempo de procesar y cerrar la ventana por sí mismo.
  await expect(page.getByRole('dialog')).toBeHidden({ timeout: 10000 });

  //damos clic en cancelar
  //await page.getByRole('button', { name: 'Cancelar' }).click();
  //await page.waitForTimeout(500);

  */

});



