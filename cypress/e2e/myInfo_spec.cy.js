describe('My Info', () => {
  
    it('passes', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('.navbar').should('be.visible')
        cy.get('#formUserName').click().type("username");
        cy.get('#formBasicPassword').click().type("21hdj3u22614iuoh");
        cy.get('form > .btn').click();
        cy.contains('My Info').click();
        cy.contains('FL').should('be.visible');
        cy.contains('User Name: username').should('be.visible');
        cy.contains('Full Name: firstname lastname').should('be.visible');
        cy.contains('Email: username@gmail.com').should('be.visible');
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(1) > :nth-child(1)').invoke('text').should('contain', 'Amy')
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(1) > :nth-child(2)').invoke('text').should('contain', 'Aime')
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(2) > :nth-child(1)').invoke('text').should('contain', 'James')
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(2) > :nth-child(2)').invoke('text').should('contain', 'Jaems')
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(3) > :nth-child(1)').invoke('text').should('contain', 'Thomas')
        cy.get(':nth-child(2) > .shadow-sm > .card-body > .table > tbody > :nth-child(3) > :nth-child(2)').invoke('text').should('contain', 'Thomass')
        cy.get(':nth-child(3) > .shadow-sm > .card-body > .table > tbody > :nth-child(1) > :nth-child(1)').invoke('text').should('contain', 'James')
        cy.get(':nth-child(3) > .shadow-sm > .card-body > .table > tbody > :nth-child(1) > :nth-child(2)').invoke('text').should('contain', 'Amos')
        cy.get(':nth-child(3) > .shadow-sm > .card-body > .table > tbody > :nth-child(2) > :nth-child(1)').invoke('text').should('contain', 'Thomas')
        cy.get(':nth-child(3) > .shadow-sm > .card-body > .table > tbody > :nth-child(2) > :nth-child(2)').invoke('text').should('contain', 'Damas')
        cy.get('.card-body > :nth-child(2) > a').click();
        cy.url().should('include', '/search');
    })
  })