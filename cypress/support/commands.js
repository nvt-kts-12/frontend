Cypress.Commands.add("SignInUser", () => {
    cy.visit("/")
    cy.get("#loginButton").contains("Login").should('be.visible').click()

    cy.url().should('include', '/login')

    cy.get('form').within(($form) => {
        cy.get('input').first().type('user')
        cy.get('input').last().type('User123!')
        cy.root().submit()
    })
    cy.contains('Upcoming events', { timeout: 50000 }).should('be.visible')
})

Cypress.Commands.add("SignInAdmin", () => {
    cy.visit("/")
    cy.get("#loginButton").contains("Login").should('be.visible').click()

    cy.url().should('include', '/login')

    cy.get('form').within(($form) => {
        cy.get('input').first().type('admin')
        cy.get('input').last().type('Admin021!')
        cy.root().submit()
    })
    cy.url().should('include', '/admin')
    cy.get('.mat-figure', { timeout: 50000 }).contains('Create an event').should('be.visible')
})

Cypress.Commands.add("FindMonth", () => {
    
    cy.get('.mat-calendar-body-label').then(($month) => {
        if ($month.text().includes('DEC')) {
            cy.get('.mat-calendar-body-cell-content').then(($dayBtn) => {
                if($dayBtn.is(':visible')){
                    cy.get('.mat-calendar-body-cell-content').contains('28').click()
                }
            })
        } else {
            cy.get('.mat-calendar-next-button').click()
        }

    })
})