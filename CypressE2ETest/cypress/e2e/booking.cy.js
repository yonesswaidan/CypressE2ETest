describe('Booking system tests', () => {
    it('viser bookingsiden korrekt', () => {
        cy.visit('http://localhost:5299/bookinglist');  // Ny port!
        cy.contains('Mine Bookinger');
    });
});
