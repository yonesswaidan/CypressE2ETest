const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5299', 
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 
        setupNodeEvents(on, config) {
        },
    },
});
