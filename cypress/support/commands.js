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