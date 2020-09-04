describe('Admin adding new location scheme', function () {
    it('should create new location scheme', function () {
        cy.SignInAdmin()
        cy.get('.mat-figure').contains('Add a new location').should('be.visible').click()

        cy.url().should('include', '/create-location-scheme')

        cy.get('.location-form').should('be.visible').within(($locInfoForm) => {
            cy.get('input').first().type('VTB Ice Palace')
            cy.get('input').last().type('Avtozavodskaya st 23A, Moscow')
        })

        cy.get('.drawing_area').trigger('mousedown', 10, 10)
        cy.get('.drawing_area').trigger('mousemove', { clientX: 100, clientY: 100 })
        cy.get('.drawing_area').trigger('mouseup', 100, 100)
    })
})