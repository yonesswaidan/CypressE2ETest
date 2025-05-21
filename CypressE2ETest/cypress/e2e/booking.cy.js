// cypress/e2e/booking.cy.js

Cypress.Commands.add('loginViaWindow', (username, password) => {
    cy.window({ timeout: 10000 }).should('have.property', 'setLoginFields')
    cy.window().then(win => win.setLoginFields(username, password))
    cy.get('#loginBtn').should('be.visible')
})

Cypress.Commands.add('fillBookingForm', (start, end, guests) => {
    cy.window({ timeout: 10000 }).should('have.property', 'setBookingFields')
    cy.window().then(win => win.setBookingFields(start, end, guests))
    cy.get('#bookingBtn').should('be.visible')
})

describe('Booking Flow - Blazor Webapp', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.loginViaWindow('testuser', 'password123')
        cy.wait(1000)
        cy.contains('Log ind').click()
        cy.url({ timeout: 10000 }).should('include', '/booking')
    })

    it('Opretter booking med faste datoer og antal gæster', () => {
        const startDate = '2025-05-20'
        const endDate = '2025-05-22'
        const guests = '2'

        cy.fillBookingForm(startDate, endDate, guests)
        cy.contains('Opret Booking').click()
        cy.contains('Booking oprettet!', { timeout: 10000 }).should('be.visible')
    })

    it('Viser valideringsfejl ved ugyldigt antal gæster', () => {
        cy.get('#guests').clear().type('0')
        cy.contains('Opret Booking').click()
        cy.contains('Antal gæster skal være et tal mellem 1 og 100.').should('be.visible')
    })

    it('Viser valideringsfejl ved slutdato før startdato', () => {
        const today = new Date()
        const tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        cy.get('#startDate').clear().type(tomorrow.toISOString().split('T')[0])
        cy.get('#endDate').clear().type(today.toISOString().split('T')[0])
        cy.get('#guests').clear().type('2')

        cy.contains('Opret Booking').click()
        cy.contains('Slutdato må ikke være før startdato.').should('be.visible')
    })

    it('Redirecter til login hvis bruger ikke er logget ind', () => {
        cy.clearCookies()
        cy.visit('/booking')
        cy.contains('Ukendt bruger').should('be.visible')
        cy.contains('Gå til login').click()
        cy.url({ timeout: 10000 }).should('include', '/')
    })
})
