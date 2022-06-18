describe('Feedback', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/');
      cy.get('.frf-trigger-button').click()
      cy.contains('Send Feedback')
    })
  })