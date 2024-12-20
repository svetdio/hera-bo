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
    viewportHeight: 1080
    // testIsolation: false
  },
  env: {
    username: 'superadmin',
    password: 'admin',
    operator: 'QATest6'
    // operator: 'testerQA12'
  }
});