describe('Bookingliste Flow - Blazor Webapp', () => {
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

        cy.contains('liste', { matchCase: false }).click();
        cy.url().should('include', '/bookinglist');
    });

    it('Viser eksisterende booking i bookinglisten', () => {
        cy.contains('28-05-2025').should('be.visible');
        cy.contains('30-05-2025').should('be.visible');
        cy.contains('2').should('be.visible');
    });
});
