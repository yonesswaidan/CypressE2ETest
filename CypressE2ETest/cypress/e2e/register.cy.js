describe('Register Flow - Blazor Webapp', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('Opretter konto med gyldige oplysninger', () => {
        cy.fixture('users').then(users => {
            cy.fillRegisterForm(users.valid.username, users.valid.password)
        })
        cy.get('#registerBtn').click()
        cy.get('p', { timeout: 10000 }).should('contain.text', 'Kontoen blev oprettet!')
    })

    it('Viser valideringsfejl ved tomme felter', () => {
        cy.get('#registerBtn').click()
        cy.get('#reg-username + .validation-message', { timeout: 5000 }).should('contain.text', 'Brugernavn er påkrævet')
        cy.get('#reg-password + .validation-message', { timeout: 5000 }).should('contain.text', 'Adgangskode er påkrævet')
    })

    it('Viser fejl ved allerede eksisterende brugernavn', () => {
        cy.fixture('users').then(users => {
            cy.fillRegisterForm(users.existing.username, users.existing.password)
        })
        cy.get('#registerBtn').click()
        cy.get('p', { timeout: 10000 }).should('contain.text', 'Registrering fejlede')
    })

    it('Navigerer tilbage til login', () => {
        cy.clickGoToLogin()
        cy.url({ timeout: 10000 }).should('include', '/')
    })
})
