const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ucwbm2',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
