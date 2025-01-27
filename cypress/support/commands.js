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
    throw new Error(message)
})

Cypress.Commands.add('search',() => {
    cy.get(locators.multimodule['search']).click()
})

Cypress.Commands.add('clearFields', () => {
    cy.get(locators.multimodule['reset']).click()
    cy.wait(500)
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
})

Cypress.Commands.add('transactionDateTime', () => {
    cy.get(locators.report.filter['transaction-date'])
        .should('be.visible')
        .click()
    cy.get(locators.report.filter['date-modal']).should('be.visible')
    cy.get(locators.report.filter['lastMonth']).click()
})

Cypress.Commands.add('operatorName', () => {
    const operator = Cypress.env('operator')

    cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
    cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
    cy.get(locators.multimodule['parent-operator']).should('be.visible')
    cy.get(locators.multimodule['operator-name']).should('be.visible')
    cy.get(locators.multimodule['operator-name']).each($element => {
        if ($element.text() === operator){
            cy.wrap($element).click()
        }
    })
})

Cypress.Commands.add('rows', () => {
    cy.wait(1000)
    cy.get(locators.multimodule['table']).then(table => {
        if (table.find(locators.multimodule['noData']).length > 0) {
            cy.contains('No data available', { timeout: 20000 }).should('be.visible')
        } else {
            cy.contains('No data available', { timeout: 20000 }).should('not.exist')
        }
    })
}) 
