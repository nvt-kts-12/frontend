describe('Admin editing location scheme', function() {
    it('should edit Spens scheme adress', function() {
        cy.SignInAdmin()
        
        cy.get('.mat-figure', { timeout: 50000 }).contains('Edit a location').should('be.visible').click()
        cy.url().should('include', '/location-schemes-list')

        cy.get('.scheme').contains('Spens').should('be.visible').click()
        cy.get('#edit-location-scheme-name').clear().type('Hala Spensa')
        cy.get('#edit-location-scheme-address').clear().type('Sutjeska 3, Novi Sad')

        cy.get('#save-location-scheme-changes').should('be.visible').click()

        cy.get('.mat-snack-bar-container', { timeout: 50000 }).contains('Your changes have been saved').should('be.visible')
        
        cy.go(-1)

        cy.url().should('include', '/location-schemes-list')
        cy.get('.scheme').contains('Hala Spensa').should('be.visible')
        cy.get('.scheme').contains('Sutjeska 3, Novi Sad').should('be.visible')
    })


    it('should not be able to delete Spens scheme because it is already being used', function() {
        cy.SignInAdmin()

        cy.get('.mat-figure', { timeout: 50000 }).contains('Edit a location').should('be.visible').click()
        cy.url().should('include', '/location-schemes-list')

        cy.get('.scheme').contains('Spens').should('be.visible').click()
        cy.get('#delete-button').should('be.visible').click()
        
        cy.get('#mat-dialog-title-0').contains('Confirm').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()

        cy.get('.mat-snack-bar-container', { timeout: 50000 }).contains('Location scheme with id 2 can not be deleted because one of its sectors is used in some event.').should('be.visible')
    })

    it('should delete Nisavski kej scheme', function() {
        cy.SignInAdmin()

        cy.get('.mat-figure', { timeout: 50000 }).contains('Edit a location').should('be.visible').click()
        cy.url().should('include', '/location-schemes-list')

        cy.get('.scheme').contains('Niški amfiteatar').should('be.visible').click()
        cy.get('#delete-button').should('be.visible').click()

        cy.get('#mat-dialog-title-0').contains('Confirm').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()

        cy.get('.mat-snack-bar-container', { timeout: 50000 }).contains('You have successfully deleted the location scheme').should('be.visible')
    
    })
})