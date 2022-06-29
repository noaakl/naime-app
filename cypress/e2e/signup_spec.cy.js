describe('Signup', () => {
    it('fails', () => {
      cy.visit('http://localhost:3000/signUp');
      cy.get('#formUserName').click().type("u")
      cy.get('#formFirstName').click().type("u")
      cy.get('#formLastName').click().type("u")
      cy.get('#formEmail').click().type("u")
      cy.get('#formBasicPassword').click().type("u")
      cy.get('#formConfirmationPassword').click().type("s")
      cy.get('form > .btn').click()
      cy.contains('User name must contain at least 2 characters').should('be.visible');
      cy.contains('First name must contain at least 2 characters').should('be.visible');
      cy.contains('Last name must contain at least 2 characters').should('be.visible');
      cy.contains('Please enter a valid E-Mail Address, e.g user@naime.com').should('be.visible');
      cy.contains('Password must contain at least 6 characters').should('be.visible');
      cy.contains("Confirmation Password does't match the password. Please try again").should('be.visible');
      cy.get('#formUserName').click().type("sername")
      cy.get('form > .btn').click()
      cy.contains("User Name already exist. Please try again").should('be.visible');
    })
  
    it('passes', () => {
      cy.visit('http://localhost:3000/signUp');
      cy.get('.navbar').should('be.visible')
      cy.get('#formUserName').click().type("username1")
      cy.get('#formFirstName').click().type("firstname")
      cy.get('#formLastName').click().type("lastname")
      cy.get('#formEmail').click().type("username@gmail.com")
      cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh")
      cy.get('#formConfirmationPassword').click().type("21hdj3u22614iuoh")
      cy.get('form > .btn').click()
      cy.contains('User username1 successfully registered').should('be.visible');
      cy.get('.modal-footer > .btn').click()
      cy.url().should('include', '/login');
    })
  })