describe('Admin editing event', function() {
    
    beforeEach(() => {
        cy.SignInAdmin()

        cy.get('.mat-figure', { timeout: 50000 }).contains('Edit an event').should('be.visible').click()
        cy.url().should('include', '/edit-events')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').contains('EXIT 2.0').should('be.visible')
        })
        cy.get('#editBtn').first().click()

        cy.url().should('include', '/edit-event/1')
    })
    
    
    it('should edit EXIT event', function() {

        /* Change description of an event and save it*/
        cy.get('#edit-event-description-input').clear().type('Postponed due to coronavirus.')
        cy.get('#save-event-changes').should('be.visible').click()
        cy.get('.mat-snack-bar-container', { timeout: 5000 }).contains('You have successfully edited the event.').should('be.visible')

        /* Logout to ensure that changed description is now visible from non-registered user point of view. */
        cy.get('.mat-button').contains('Logout').click()
        cy.contains('Upcoming events', { timeout: 50000 }).should('be.visible')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').contains('EXIT 2.0').should('be.visible')
        })
        cy.get('#moreInfoBtn').first().click()
        cy.get('#event-description').contains('Postponed due to coronavirus.').should('be.visible')

    })

    it('should edit EXIT event day date', function() {
        /* Open date picker for event day */
        cy.get('.edit-event-day-form').first().within(($firstDayForm) => {
            cy.get('#edit-event-day-date').within(($form) => {
                cy.get('button[type="button"]').click()
            })
            
        })

        /* Choose fourth day of the month */
        cy.get('.mat-calendar-content').within(($calenderContent) => {
            cy.get('.mat-calendar-body-cell-content').contains('4').click()
        })

        /* Ensure correct date is picked and save changes */
        cy.get('.edit-event-day-form').first().within(($firstDayForm) => {
            cy.get('#mat-input-10').then(($input) => {
                const pickedDate = $input.val()
                expect(pickedDate).to.equal('04/12/2020')
            })
            cy.get('#event-day-save-changes').click()
            
        })
        cy.get('.mat-snack-bar-container', { timeout: 5000 }).contains('You have successfully edited the event day').should('be.visible')
    
        /* Logout to ensure changed date is visible from non-registered user point of view.  */
        cy.get('.mat-button').contains('Logout').click()
        cy.contains('Upcoming events', { timeout: 50000 }).should('be.visible')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').contains('EXIT 2.0').should('be.visible')
            cy.get('.event-date').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('04/12/2020')
            })
        })
    })

    it('should remove event day from sale', function() {

        /* Change FIRST event day state to NOT_IN_SALE */
        cy.get('.edit-event-day-form').first().within(($firstDayForm) => {
            cy.get('#edit-event-day-state').click()
        })
        cy.get('.mat-option-text').contains('NOT_IN_SALE').should('be.visible').click()
        
        /* Check if correct state is picked and save changes */
        cy.get('.edit-event-day-form').first().within(($firstDayForm) => {
            cy.get('.mat-select-value-text').then(($select) => {
                const currentState = $select.text()
                expect(currentState).to.equal('NOT_IN_SALE')
            })
            cy.get('#event-day-save-changes').click()
        })
        cy.get('.mat-snack-bar-container', { timeout: 5000 }).contains('You have successfully edited the event day').should('be.visible')
    





        /* Logout and login as user to ensure changed state is effective and user can not buy ticket for that day */
        cy.get('.mat-button').contains('Logout').click()
        cy.contains('Upcoming events', { timeout: 50000 }).should('be.visible')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').contains('EXIT 2.0').should('be.visible')
            cy.get('.event-date').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('04/12/2020')
            })
        })
        cy.SignInUser()
        cy.get('#moreInfoBtn').first().click()
        cy.url().should('include', '/event/1')

        cy.get('.continue-button').first().click()

        cy.url().should('include', '/event/1/event-day/1')
        cy.get('#sectorRect').first().click()

        cy.get('#mat-dialog-title-0').contains('PARTER').should('be.visible')
        cy.get('#parterInput').type('1')
        cy.get('#pickBtn').should('be.visible').click()

        cy.get('.reserve-button').should('not.be.visible')
        cy.get('.buy-button').should('not.be.visible')
    })


})