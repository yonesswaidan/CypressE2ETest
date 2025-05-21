// cypress/e2e/bookinglist.cy.js

describe('Bookingliste Flow - Blazor Webapp', () => {
    beforeEach(() => {
        cy.visit('https://localhost:7299')

        // Login med JS interop helper
        cy.window({ timeout: 10000 }).should('have.property', 'setLoginFields')
        cy.window().then(win => win.setLoginFields('testuser', 'password123'))
        cy.wait(1000)
        cy.contains('Log ind').click()

        // Naviger til bookinglisten via link med tekst 'liste'
        cy.contains('liste', { matchCase: false }).click()
        cy.url().should('include', '/bookinglist')
    })

    it('Viser eksisterende booking i bookinglisten', () => {
        // Verificer at bookingdata vises som tekst
        cy.contains('20-05-2025').should('be.visible')
        cy.contains('22-05-2025').should('be.visible')
        cy.contains('2').should('be.visible')
    })
})
