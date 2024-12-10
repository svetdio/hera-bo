import locators from '../support/locators.js'

const username = Cypress.env('username')
const password = Cypress.env('password')

Cypress.Commands.add('login', (user=username, pass=password) => {
    cy.session([user, pass], () => {
        cy.visit('/')
        cy.get(locators.login['container']).should('be.visible')
        cy.get(locators.login['user']).type(user)
        cy.get(locators.login['password']).type(pass)
        cy.get(locators.login['submit']).click()
        cy.get(locators.home['welcome']).should('include.text', `Welcome,${user}!`)
    })
})

Cypress.Commands.add('failing', (message) => {
    throw new Error(message);
  });
