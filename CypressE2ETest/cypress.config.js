const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5299', // eller den port du har sat i .NET
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // <-- vigtigt for at finde testfiler
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
