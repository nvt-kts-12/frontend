describe('Register', function() {
    it('should register new user', function() {
        cy.visit("/")
        cy.get('#registerButton').should('be.visible').click()

        cy.url().should('include', '/register')

        cy.get('#usernameInput').type('test')
        cy.get('#passwordInput').type('Test123!')
        cy.get('#firstNameInput').type('Test')
        cy.get('#lastNameInput').type('Test')
        cy.get('#emailInput').type('test@gmail.com')

        cy.get('#regSubmit').contains('Register').should('be.visible').click()
        cy.get('.events-container').then(($header) => {
            const tekst = $header.text()
            expect(tekst).to.include('Upcoming events')
        })
    })

    it('should not be able to register new user because of missing input', function() {
        cy.visit("/")
        cy.get('#registerButton').should('be.visible').click()

        cy.url().should('include', '/register')

        cy.get('#passwordInput').type('Test123!')
        cy.get('#firstNameInput').type('Test')
        cy.get('#lastNameInput').type('Test')
        cy.get('#emailInput').type('test@gmail.com')

        cy.get('.mat-button').should('be.disabled')
    })

    it('should not be able to register new user because of already existent username', function() {
        cy.visit("/")
        cy.get('#registerButton').should('be.visible').click()

        cy.url().should('include', '/register')

        cy.get('#usernameInput').type('test')
        cy.get('#passwordInput').type('Test123!')
        cy.get('#firstNameInput').type('a')
        cy.get('#lastNameInput').type('a')
        cy.get('#emailInput').type('a@gmail.com')

        cy.get('.mat-button').contains('Register').should('be.visible').click()
        cy.get('.snackbar-error', { timeout: 50000 }).contains('Username already exist').should('be.visible')
    })
})