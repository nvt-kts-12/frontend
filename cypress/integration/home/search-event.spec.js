describe('Search-event', function () {

    beforeEach(() => {
        cy.log('Ensure page is loaded')
        cy.visit('/')
        cy.get('.events-container').then(($header) => {
            const tekst = $header.text()
            expect(tekst).to.include('Upcoming events')
        })
    })

    it('Find event Tezina Lanaca', function () {
        cy.get('input[type="text"]').type('Tez')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 1)
            cy.get('.event').contains('Tezina lanaca 3').should('be.visible')
        })

    })

    it('Find all Entertainment events', function () {
        cy.get('#filter').children().contains('Entertainment').click()

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 3)
            cy.get('.event').contains('Exit 2.0', { matchCase: false }).should('be.visible')
            cy.get('.event').contains('Juzni vetar 2', { matchCase: false }).should('be.visible')
            cy.get('.event').contains('Tezina lanaca 3', { matchCase: false }).should('be.visible')

            cy.get('.event-card').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('ENTERTAINMENT')
            })
        })
    })

    it('Find event by date', function () {
        cy.get('#filter-date-form').within(($form) => {
            cy.get('button[type="button"]').click()

        })
        cy.get('.mat-calendar-period-button').should('be.visible')

        cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).each((num, i, array) => {
            cy.FindMonth()
        })
        cy.get('#filter-date-input').then(($input) => {
            const pickedDate = $input.val()
            expect(pickedDate).to.equal('28/12/2020')
        })

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 1)
            cy.get('.event').contains('Balet Labudovo jezero').should('be.visible')
            cy.get('.event-date').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('28/12/2020')
            })
        })
    })

    it('Find event on Petrovaradinska tvrdjava', function () {
        cy.get('.mat-select').first().click()
        cy.get('.mat-option-text').contains('Petrovaradinska tvrdjava').click()

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 1)
            cy.get('.event').contains('EXIT').should('be.visible')
            cy.get('.event-date').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('Petrovaradinska tvrdjava')
            })
        })
    })

    it('Combined search', function() {
        cy.get('input[type="text"]').type('ni')

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 2)
            cy.get('.event').contains('Odbojka Vojvodina - Proleter Zrenjanin').should('be.visible')
            cy.get('.event').contains('Juzni vetar 2').should('be.visible')
        })

        cy.get('#filter').children().contains('Sport').click()

        cy.get('#event-list').within(($eventList) => {
            cy.get('.event').should('have.length', 1)
            cy.get('.event').contains('Odbojka Vojvodina - Proleter Zrenjanin').should('be.visible')
            cy.get('.event-card').then(($eventDate) => {
                const eventDateText = $eventDate.text()
                expect(eventDateText).to.include('SPORT')
            })
        })
    })
})