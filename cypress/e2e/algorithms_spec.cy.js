describe('Algorithms', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/AlgorithmsInfo');
        cy.get('.navbar').should('be.visible');
        cy.contains('SpokenName2Vec').should('be.visible');
        cy.contains('GRAFT').should('be.visible');
        cy.get("[data-cy=SpokenName2Vec-article]").should('have.attr', 'href', 'https://doi.org/10.1016/j.knosys.2021.107229');
        cy.get("[data-cy=GRAFT-article]").should('have.attr', 'href', 'https://doi.org/10.1109/TKDE.2021.3096670');
    })
  })