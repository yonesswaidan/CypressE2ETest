/// <reference types="cypress" />

describe('Booking Flow - Blazor Webapp', () => {
    let users;

    before(() => {
        cy.fixture('users.json').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.loginViaWindow(users.valid.username, users.valid.password);
        cy.wait(1000);
        cy.contains('Log ind').click();
        cy.url({ timeout: 10000 }).should('include', '/booking');
    });

    it('Opretter booking med faste datoer og antal gæster', () => {
        const startDate = '2025-05-28';
        const endDate = '2025-05-30';
        const guests = '2';

        cy.fillBookingForm(startDate, endDate, guests);
        cy.contains('Opret Booking').click();
        cy.contains('Booking oprettet!', { timeout: 10000 }).should('be.visible');
    });

    it('Viser valideringsfejl ved ugyldigt antal gæster', () => {
        cy.get('#guests').clear().type('0');
        cy.contains('Opret Booking').click();
        cy.contains('Antal gæster skal være et tal mellem 1 og 100.').should('be.visible');
    });

    it('Viser valideringsfejl ved slutdato før startdato', () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        cy.get('#startDate').clear().type(tomorrow.toISOString().split('T')[0]);
        cy.get('#endDate').clear().type(today.toISOString().split('T')[0]);
        cy.get('#guests').clear().type('2');

        cy.contains('Opret Booking').click();
        cy.contains('Slutdato må ikke være før startdato.').should('be.visible');
    });

    it('Viser fejl hvis valgte datoer allerede er booket', () => {
        const startDate = '2025-05-28';
        const endDate = '2025-05-30';
        const guests = '2';

        cy.fillBookingForm(startDate, endDate, guests);
        cy.contains('Opret Booking').click();
        cy.contains('De valgte datoer er allerede booket.').should('be.visible');
    });

    it('Redirecter til login hvis bruger ikke er logget ind', () => {
        cy.clearCookies();
        cy.visit('/booking');
        cy.contains('Ukendt bruger').should('be.visible');
        cy.contains('Gå til login').click();
        cy.url({ timeout: 10000 }).should('include', '/');
    });
});
