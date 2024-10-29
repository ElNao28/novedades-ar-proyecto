describe('Login Test', () => {

    it('should login successfully with correct credentials', () => {
      // Visita la página de inicio de sesión
      cy.visit('http://localhost:4200/#/login');
  
      // Selecciona el campo de correo electrónico
      cy.get('input[formControlName="email"]').type('mabelbaam19@gmail.com');
  
      // Selecciona el campo de contraseña dentro de <p-password>
      cy.get('p-password input').type('Mabel123@'); // Selecciona el input dentro de p-password
  
      // Haz clic en el botón de inicio de sesión usando el texto
     // Espera hasta que el botón esté habilitado antes de hacer clic
      cy.contains('button', 'Ingresar').should('not.be.disabled').click();

  
        // Espera a que la redirección ocurra
      cy.location('pathname').should('eq', '/inicio'); // Verifica que la URL haya cambiado a "/inicio"

      cy.contains('Bienvenido').should('be.visible'); // Cambia 'Bienvenido' al texto que confirme el inicio de sesión
   
   
    });
  
  
  });
  