describe('Register', function() {
    it('Sign up', function() {
        cy.visit("/")
        cy.get('#registerButton').should('be.visible').click()

        cy.url().should('include', '/register')

        cy.get('#usernameInput').type('test')
        cy.get('#passwordInput').type('Test123!')
        cy.get('#firstNameInput').type('Test')
        cy.get('#lastNameInput').type('Test')
        cy.get('#emailInput').type('test@gmail.com')

        cy.get('#regSubmit').contains('Register').should('be.visible').click()
    })
})