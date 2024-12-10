import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Reporting Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it('Betting Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['betting-history']).click()
        cy.get(locators.report.filter['date-picker']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 100})
        cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.report.filter['parent-operator']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['preloader']).should('be.visible')
        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table
                for (const key in table) {
                    cy.get(locators.report.table[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.profile.activity['preloader']).should('be.visible')
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up'])
            .should('be.visible')
            .contains('OGAPIIntegration')
            .contains('Your Betting Transaction History export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()

    })

    // it('Transfer Transaction', () => {
    //     const operator = Cypress.env('operator')

    //     cy.visit('/')
    //     cy.get(locators.report['report']).click()
    //     cy.get(locators.report['container']).should('be.visible')
    //     cy.get(locators.report['transfer-history']).click()
    //     cy.get(locators.report.filter['date-picker']).click()
    //     cy.get(locators.report.filter['date-modal']).should('be.visible')
    //     cy.get(locators.report.filter['last-month']).click()
    //     cy.get(locators.report.filter['operator']).type(operator, {delay: 100})
        
    // })
})