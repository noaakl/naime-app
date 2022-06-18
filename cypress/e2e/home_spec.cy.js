describe('Home', () => {
  it('guest search', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.navbar').should('be.visible')
    cy.get('.App_form_control__vYEIq').type("james{enter}");
    cy.contains('Suggested Synonyms for the Name James').should('be.visible');
    cy.url().should('include', '/search/james');
    cy.contains('CLICK HERE').should('have.attr', 'href', '/signup')
    cy.contains('Behind The Name').should('have.attr', 'href', 'https://www.behindthename.com/name/James')
    cy.get("#sort-dropdown-basic").click();
    cy.get("[data-cy=user-rank]").click();
    cy.get("#sort-dropdown-basic").click();
    cy.get("[data-cy=default-A-Z]").click();
    cy.get('#SpokenName2Vec > .card-body > :nth-child(2) > .row > .App_resultcol__FABO0 > .App_result__eNtnc').should('have.text', 'Jaems')
    cy.get("#filter-algorithm-dropdown-basic").click();
    cy.get('.form-check > #SpokenName2Vec').click();
    cy.get("#filter-algorithm-dropdown-basic").click();
    cy.contains('SpokenName2Vec').should('not.be.visible');
    cy.get('.frf-trigger-button').click()
    cy.contains('Send Feedback')
  })

  // it('user search', () => {
  //   cy.visit('http://localhost:3000/');
  //   cy.get('.App_form_control__vYEIq').type("james{enter}");
  //   cy.contains('Suggested Synonyms for the Name James').should('be.visible');
  //   cy.url().should('include', '/search/james');
  //   cy.contains('CLICK HERE').should('have.attr', 'href', '/signup')
  //   cy.contains('Behind The Name').should('have.attr', 'href', 'https://www.behindthename.com/name/James')
  //   cy.get("#sort-dropdown-basic").click();
  //   cy.get("[data-cy=user-rank").click();
  //   cy.get("#sort-dropdown-basic").click();
  //   cy.get("[data-cy=default-A-Z").click();
  //   cy.get('#SpokenName2Vec > .card-body > :nth-child(2) > .row > .App_resultcol__FABO0 > .App_result__eNtnc').should('have.text', 'Jaems')
  //   cy.get("#filter-algorithm-dropdown-basic").click();
  //   cy.get('.form-check > #SpokenName2Vec').click();
  //   cy.get("#filter-algorithm-dropdown-basic").click();
  //   cy.contains('SpokenName2Vec').should('not.be.visible');
  //   cy.get('.frf-trigger-button').click()
  //   cy.contains('Send Feedback')
  // })
})