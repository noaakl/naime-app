describe('About', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/about');
        cy.get('.navbar').should('be.visible')
        cy.contains('About Our Website').should('be.visible')
        cy.contains('Who Are We?').should('be.visible')
        cy.contains('Top 5 Searches').should('be.visible')
        cy.contains('More Information About the algorithms').should('be.visible')
        cy.contains('"Search Name" Final Project').should('be.visible')
        cy.contains('About Our Website').should('be.visible')
        cy.get('.card-img').should('be.visible')
        cy.get(':nth-child(1) > span > a').click()
        cy.url().should('include', '/search');
    })
  })