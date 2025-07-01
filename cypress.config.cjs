const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config.env.locale = process.env.LOCALE || "en";
      return config;
    },
  },
});
