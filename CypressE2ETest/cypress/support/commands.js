Cypress.Commands.add('fillLoginForm', (username, password) => {
    cy.window({ timeout: 10000 }).should('have.property', 'setLoginFields')
    cy.window().then(win => {
        win.setLoginFields(username, password)
    })
    cy.get('#loginBtn').should('be.visible')
})

Cypress.Commands.add('clickGoToRegister', () => {
    cy.window().should('have.property', 'clickGoToRegister')
    cy.window().then(win => {
        win.clickGoToRegister()
    })
})

Cypress.Commands.add('login', (username, password) => {
    cy.fillLoginForm(username, password)
    cy.get('#loginBtn').click()
})

Cypress.Commands.add('fillRegisterForm', (username, password) => {
    cy.window({ timeout: 10000 }).should('have.property', 'setRegisterFields')
    cy.window().then(win => {
        win.setRegisterFields(username, password)
    })
    cy.get('#registerBtn').should('be.visible')
})

Cypress.Commands.add('clickGoToLogin', () => {
    cy.window().should('have.property', 'clickGoToLogin')
    cy.window().then(win => {
        win.clickGoToLogin()
    })
})

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
