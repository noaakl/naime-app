describe('Logout', () => {
    it('stay logged in', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('.navbar').should('be.visible')
      cy.get('#formUserName').click().type("username")
      cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh")
      cy.get('form > .btn').click()
      cy.get('#navbarScrollingDropdown').click()
      cy.get('.dropdown-item').click()
      cy.contains('Are you sure you want to log out?').should('be.visible');
      cy.get("[data-cy=no]").click();
      cy.contains('Hello username').should('be.visible');
    })
  
    it('logout', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('#formUserName').click().type("username")
      cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh")
      cy.get('form > .btn').click()
      cy.get('#navbarScrollingDropdown').click()
      cy.get('.dropdown-item').click()
      cy.contains('Are you sure you want to log out?').should('be.visible');
      cy.get("[data-cy=yes]").click();
      cy.contains('Sign Up').should('be.visible');
      cy.contains('Log In').should('be.visible');
    })
  })