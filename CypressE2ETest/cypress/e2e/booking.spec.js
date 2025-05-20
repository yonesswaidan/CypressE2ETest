describe('Booking system tests', () => {
    it('viser bookingsiden korrekt', () => {
        cy.visit('http://localhost:5000/bookinglist');  // Tilpas URL til din app
        cy.contains('Mine Bookinger');
    });
});
