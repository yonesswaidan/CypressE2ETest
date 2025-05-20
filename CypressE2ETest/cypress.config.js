const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '37yfow',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
