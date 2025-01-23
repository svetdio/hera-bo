import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    //Vendor Summary submodule
        it('Betting Transaction', () => {
            const operator = Cypress.env('operator')
        
    //User should be able to access the Betting Transaction History (Accessibility)
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['betting-history']).click()
        cy.log(`Verify Betting Transaction History using (Module), PASSED`)
        
        cy.get(locators.report.filter['transaction-date'])
                    .should('be.visible')
                    .click()
                cy.get(locators.report.filter['date-modal']).should('be.visible')
                cy.get(locators.report.filter['prevMonth']).click().click().click()
                cy.get(locators.report.filter['octdateStart']).contains('1').click()
                cy.get(locators.report.filter['octdateEnd']).contains('31').click()
        
                cy.get(locators.report.filter['apply']).click()
        
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
        
                cy.get(locators.multimodule['rows']).then($rows => {
                    if ($rows.length > 1) {
                        cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    } else {
                        cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                    }
                })
                cy.log(`Validate the "Transaction Date/Time" field by (Three months ago or more), PASSED`)
    })
    
    
})