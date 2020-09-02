describe('Admin adding new event', function () {
    it('Create new event', function () {
        cy.SignInAdmin()
        cy.get('.mat-figure').contains('Create an event').should('be.visible').click()

        cy.url().should('include', '/create-event')

        cy.get('#event_name_input').type('Finale univerzitetske lige')
        cy.get('#event_description_input').type('Utakmica između ekipa FTN-a i PMF-a.')
        cy.get('.mat-select-placeholder').click()
        cy.get('.mat-option').contains('SPORT').click()

        cy.get('#choose_date_form').within(($form) => {
            cy.get('button[type="button"]').click()
        })

        cy.get('.mat-calendar-period-button').should('be.visible')

        cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).each((num, i, array) => {
            cy.FindMonth()
        })
        cy.get('.mat-card').contains('2020-12-28').should('be.visible')
        cy.get('#next_button').should('be.visible').click()

        cy.url().should('include', '/create-event-days')
        
        cy.get('#choose_date_form').within(($form) => {
            cy.get('button[type="button"]').click()
        })
        cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).each((num, i, array) => {
            cy.FindMonth()
        })

        cy.get('.select_input').click()
        cy.get('.mat-option').contains('Spens').should('be.visible').click()

        cy.get('app-choose-sectors').should('be.visible')
        cy.get('[x="4"]').should('be.visible').click()
        cy.get('[x="94"]').should('be.visible').click()
        cy.get('[x="423"]').should('be.visible').click()
        cy.get('[y="219"]').should('be.visible').click()

        cy.get('#mat-input-11').type('40')
        cy.get('#mat-input-10').type('100')

        
        cy.get('#mat-input-13').type('40')
        cy.get('#mat-input-12').type('200')
        cy.get('#mat-checkbox-2').click()
        
        cy.get('#mat-input-15').type('40')
        cy.get('#mat-input-14').type('200')

        
        cy.get('#mat-input-17').type('40')
        cy.get('#mat-input-16').type('100')

        cy.get('#finish-button').should('be.visible').click()
        cy.get('#snackbar').contains('you have successfully created the event!').should('be.visible')
    })
})