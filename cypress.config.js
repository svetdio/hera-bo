// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://hera.pwqr820.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // testIsolation: false
  },
  env: {
    username: 'superqa',
    password: '4dmin',
    operator: 'QATest6',
    vendor: 'CG'
    // operator: 'testerQA12'
  },
})