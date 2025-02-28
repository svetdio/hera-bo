// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require("cypress");

// Optional: Require Cypress Terminal Reporter
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = defineConfig({
  projectId: 'tfe91x',
  e2e: {
    baseUrl: 'https://hera.pwqr820.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // setupNodeEvents(on, config) {
    //   // Add Cypress Terminal Reporter for advanced logging
    //   installLogsPrinter(on);

    //   // Custom Node Event: Log test start and end to a file
    //   on('test:before:run', (details) => {
    //     const logFilePath = 'cypress/logs/test-log.csv';
    //     const startLog = `Test started: ${details.title}\n`;
    //     require('fs').appendFileSync(logFilePath, startLog);
    //   });

    //   on('test:after:run', (details) => {
    //     const logFilePath = 'cypress/logs/test-log.csv';
    //     const result = details.state === 'passed' ? 'PASSED' : 'FAILED';
    //     const endLog = `Test completed: ${details.title} - ${result}\n`;
    //     require('fs').appendFileSync(logFilePath, endLog);
    //   });
    // },
  },
  env: {
    username: 'testersvet',
    password: '1234567',
    operator: 'testerQA12',
    vendor: 'og'
    // operator: 'testerQA12'
  },
});