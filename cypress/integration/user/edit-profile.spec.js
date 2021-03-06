const { createYield } = require("typescript")

describe('User editing profile information', function() {
    it('Edit user information', function() {
        cy.SignInUser()


        cy.get('#profile-button').should('be.visible').click()
        cy.url().should('include', '/profile')

        cy.get('#editProfileButton').should('be.visible').click()
        cy.url().should('include', '/edit-profile')

        cy.get('#firstNameInput').clear().type('Blagoje')
        cy.get('#lastNameInput').clear().type('Jovović')
        cy.get('#emailInput').clear().type('jovovic@gmail.com')
    
        cy.get('#updateButton').should('be.visible').click()

        cy.get('.mat-snack-bar-container', { timeout: 5000 }).contains('You have successfully updated your profile').should('be.visible')
        cy.get('#firstName').contains('Blagoje').should('be.visible')
        cy.get('#lastName').contains('Jovović').should('be.visible')
        cy.get('#email').contains('jovovic@gmail.com').should('be.visible')

    })
})