describe('Login', function () {
    it('Sign in', function () {
        cy.SignInUser()
    })

    it('Bad username', function () {
        cy.visit("/")
        cy.get("#loginButton").contains("Login").should('be.visible').click()

        cy.url().should('include', '/login')

        cy.get('form').within(($form) => {
            cy.get('input').first().type('badUsername')
            cy.get('input').last().type('User123!')
            cy.root().submit()
        })
        cy.get('.snackbar-error', { timeout: 50000 }).contains('Bad credentials').should('be.visible')
    })

    it('Bad password', function () {
        cy.visit("/")
        cy.get("#loginButton").contains("Login").should('be.visible').click()

        cy.url().should('include', '/login')

        cy.get('form').within(($form) => {
            cy.get('input').first().type('user')
            cy.get('input').last().type('badPassword')
            cy.root().submit()
        })
        cy.get('.snackbar-error', { timeout: 50000 }).contains('Bad credentials').should('be.visible')
    })
})