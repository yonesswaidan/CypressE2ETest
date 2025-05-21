describe('Login Flow - Blazor Webapp', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Logger korrekt ind med gyldige oplysninger og omdirigerer', () => {
        cy.fixture('users').then(({ valid }) => {
            cy.login(valid.username, valid.password)
        })
        cy.url({ timeout: 10000 }).should('include', '/booking')
    })

    it('Viser fejlmeddelelse ved ugyldige loginoplysninger', () => {
        cy.fixture('users').then(({ invalid }) => {
            cy.login(invalid.username, invalid.password)
        })
        cy.get('p', { timeout: 5000 }).should('contain.text', 'Forkert brugernavn eller adgangskode.')
    })

    it('Viser valideringsfejl ved tomme felter', () => {
        cy.get('#loginBtn').click()

        cy.get('#username').parent().find('.validation-message', { timeout: 5000 })
            .should('contain.text', 'Brugernavn er påkrævet')

        cy.get('#password').parent().find('.validation-message', { timeout: 5000 })
            .should('contain.text', 'Adgangskode er påkrævet')
    })

    it('Navigerer til registreringssiden', () => {
        cy.clickGoToRegister()
        cy.url({ timeout: 10000 }).should('include', '/register')
    })
})
