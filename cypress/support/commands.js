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
})

Cypress.Commands.add('navigateToBettingHistory', () => {
    cy.get(locators.report['report']).click()
    cy.get(locators.report['container']).should('be.visible')
    cy.get(locators.report['betting-history']).click()
})

Cypress.Commands.add('reportRequiredFields', () => {
    const operator = Cypress.env('operator')
    
    cy.get(locators.report.filter['transaction-date'])
        .should('be.visible')
        .click()
    cy.get(locators.report.filter['date-modal']).should('be.visible')
    cy.get(locators.report.filter['lastMonth']).click()

    cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
    cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
    cy.get(locators.multimodule['parent-operator']).should('be.visible')
    cy.get(locators.multimodule['operator-name']).should('be.visible')
    cy.get(locators.multimodule['operator-name']).each($element => {
        if ($element.text() === operator){
            cy.wrap($element).click()
        }
    })
    cy.get(locators.multimodule['search']).click()
})
