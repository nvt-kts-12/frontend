describe('User reserving ticket', function () {

    let numberOfReservations

    beforeEach(() => {
        cy.SignInUser()

        cy.get('#profile-button').should('be.visible').click()
        cy.url().should('include', '/profile')

        cy.get('#username').contains('user').should('be.visible')
        cy.wait(2000)
        cy.get('#ticketsTable').should('be.visible').then(($ticketTable) => {
            numberOfReservations = $ticketTable.find('tr').length
        })

    })

    it('should reserve grandstand ticket for event Odbojka', function () {

        expect(numberOfReservations).to.equal(1)

        cy.get('[aria-label="Home"]').should('be.visible').click()
        cy.url().should('include', '/')

        cy.scrollTo('bottom')
        cy.get('.event').eq(1).should('be.visible').within(($odbojkaEvent) => {
            cy.get('#moreInfoBtn').should('be.visible').click()
        })


        cy.url().should('include', '/event/2')
        cy.get('#event-name').contains('Odbojka Vojvodina - Proleter Zrenjanin').should('be.visible')

        cy.scrollTo('bottom')
        cy.get('#continueBtn').should('be.visible').click()
        cy.url().should('include', '/event-day/4')

        cy.get('[x="94"]').click()
        cy.get('#mat-dialog-title-0').contains('Sector GRANDSTAND 4').should('be.visible')

        cy.get('#seatId0').should('not.be.disabled').click()
        cy.get('#seatId1').should('not.be.disabled').click()

        cy.get('#chosenSeatsTable').find('tr').should('have.length', 2)

        cy.get('#sector-popup-div').scrollTo('bottom')
        cy.get('#pickBtn').should('be.visible').click()

        cy.scrollTo('bottom')
        cy.get('.grandstand-tickets-table').find('tr').should('have.length', 3)

        // extract to function work about clicking reserve
        cy.get('.reserve-button').should('be.visible').click()

        cy.get('.mat-dialog-title').contains('Confirm reservation').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()

        cy.get('#profile-button').should('be.visible').click()
        cy.wait(2000)
        cy.get('#username').contains('user').should('be.visible')
        // cy.url().should('include', '/profile')

        cy.get('#ticketsTable').find('tr').should('have.length', 3)
    })

    it('should be unable to pick reserved seat', function () {
        expect(numberOfReservations).to.equal(3)

        cy.get('[aria-label="Home"]').should('be.visible').click()
        cy.url().should('include', '/')

        cy.scrollTo('bottom')
        cy.get('.event').eq(1).should('be.visible').within(($odbojkaEvent) => {
            cy.get('#moreInfoBtn').should('be.visible').click()
        })


        cy.url().should('include', '/event/2')
        cy.get('#event-name').contains('Odbojka Vojvodina - Proleter Zrenjanin').should('be.visible')

        cy.scrollTo('bottom')
        cy.get('#continueBtn').should('be.visible').click()
        cy.url().should('include', '/event-day/4')

        cy.get('[x="94"]').click()
        cy.get('#mat-dialog-title-0').contains('Sector GRANDSTAND 4').should('be.visible')

        cy.get('#seatId0').should('be.disabled')
        cy.get('#seatId1').should('be.disabled')
    })

    it('should cancel reservation for seat on Odbojka event', function () {
        cy.get('#ticketsTable').should('be.visible').then(($ticketTable) => {
            numberOfReservations = $ticketTable.find('tr').length
        })
        expect(numberOfReservations).to.equal(3)

        cy.get('.cancel-reservation-button').contains('Cancel').first().click()

        cy.get('.mat-dialog-title').contains('Cancel reservation').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()

        cy.get('.mat-snack-bar-container', { timeout: 5000 }).contains('Reservation successfully canceled!').should('be.visible')

        cy.reload()
        cy.get('#reservations').contains('Reservations:').should('be.visible')
        cy.get('#ticketsTable').find('tr').should('have.length', 2)
    })

    it('should reserve parter ticket for Exit event', function () {
        expect(numberOfReservations).to.equal(2)

        cy.get('[aria-label="Home"]').should('be.visible').click()
        cy.url().should('include', '/')

        cy.get('#moreInfoBtn').first().click()
        cy.url().should('include', '/event/1')
        cy.get('#event-name').contains('EXIT 2.0').should('be.visible')

        cy.get(':nth-child(3) > :nth-child(1) > #eventDayCard > #continueBtn').should('be.visible').click()
        cy.url().should('include', '/event-day/3')

        cy.get('[x="12"]').should('be.visible').click()

        cy.get('.mat-dialog-title').contains('Sector PARTER 1').should('be.visible')
        cy.get('#parterInput').should('be.visible').type('1')
        cy.get('#pickBtn').should('be.visible').click()

        // extract to function work about clicking reserve
        cy.scrollTo('bottom')
        cy.get('.parter-tickets-table').find('tr').should('have.length', 2)

        cy.get('.reserve-button').should('be.visible').click()

        cy.get('.mat-dialog-title').contains('Confirm reservation').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()

        cy.wait(2000)
        cy.get('#profile-button').should('be.visible').click()
        cy.url().should('include', '/profile')

        cy.get('#ticketsTable').find('tr').should('have.length', 3)

    })

    /**
     *  UNABLE to browse through paypal site
     */

    it('should buy reserved ticket for Odbojka', function () {
        expect(numberOfReservations).to.equal(3)

        cy.get('#ticketsTable').find('tr').eq(1).within(($row) => {
            cy.get('#buy-reservation-button').click()
        })
        cy.get('.mat-dialog-title').contains('Confirm reservation').should('be.visible')
        cy.get('#popupOkButton').should('be.visible').click()


        cy.get('#headerText').contains('Pay with PayPal').should('be.visible')
        cy.url().should('include', 'https://www.sandbox.paypal.com/cgi-bin')

        cy.get('.proceed').within(($form) => {
            cy.get('input[name="login_email"]').clear().type('sb-arjxx785590@personal.example.com')
            cy.get('input[name="login_password"]').type('0202998742015')


            // cy.get('#btnLogin').then(($button) => {
            //     if ($button.is(':visible')) {
            //         cy.get('input[name="login_password"]').type('0202998742015')
            //     } else {
            //         cy.get('#btnNext').should('be.visible').click()
            //         cy.get('input[name="login_password"]').type('0202998742015')
            //     }
            // })
            
            cy.root().submit()
        })

        cy.url().should('include', '/webapps/hermes')
        cy.get('.MerchantLogo_text_2mWpM').contains("John Doe's Test Store").should('be.visible')

        cy.get('[data-testid="submit-button-initial"]').should('be.visible').click()

        cy.url().should('include', '/pay-pal')
    })

})