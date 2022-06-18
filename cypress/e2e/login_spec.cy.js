describe('Login', () => {
    it('fails', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('#formUserName').click().type("u")
      cy.get('#formBasicPassword').click().type("p")
      cy.get('form > .btn').click()
      cy.contains('The Password or Username is incorrect. Please try again.').should('be.visible');
      cy.get('#formUserName').click().type("sername")
      cy.get('#formBasicPassword').click().type("p")
      cy.get('form > .btn').click()
      cy.contains('The Password or Username is incorrect. Please try again.').should('be.visible');
      cy.get('#formUserName').click().type("eee")
      cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh")
      cy.get('form > .btn').click()
      cy.contains('The Password or Username is incorrect. Please try again.').should('be.visible');
      cy.contains('CLICK HERE').should('have.attr', 'href', '/signup')
    })
  
    it('passes', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('.navbar').should('be.visible')
      cy.get('#formUserName').click().type("username")
      cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh")
      cy.get('form > .btn').click()
      cy.url().should('eq', 'http://localhost:3000/');
    })
  })
