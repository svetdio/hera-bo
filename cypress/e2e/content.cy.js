import locators from "../support/locators"

describe('Content Management Test', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it('Operator', () => {
        // const operator = Cypress.env('type')

        cy.visit('/')

        cy.get(locators.content['content']).click()
        cy.get(locators.content['operator']).click()
        cy.get(locators.content['operator-name']).type('testerQA12')
        cy.get(locators.content['search']).click()
    
    })

    it('Add Operator', () => {
        cy.visit('/')

        cy.get(locators.content['content']).click()
        cy.get(locators.content['operator']).click()
        cy.get(locators.content['add-operator']).click()
        cy.get(locators.content.add_operator['operator-name']).type('testing')
        // cy.get(locators.content.add_operator['parent-operator']).type('testerQA12')
    })

    it('Vendor', () => {
        cy.visit('/')

        cy.get(locators.content['content']).click()
        cy.get(locators.content['vendor']).click()
        cy.get(locators.content['vendor-name']).type('CG')
        cy.get(locators.content['search']).click()
    })
})