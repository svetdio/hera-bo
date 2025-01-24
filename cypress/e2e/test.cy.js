import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
        
        cy.visit('/')
        cy.navigateToBettingHistory()
    })

    //Vendor Summary submodule
    it('Betting Transaction', () => {

        cy.reportRequiredFields()
        cy.get(locators.report.filter['transactionId']).type('362781979', {delay: 200})
        cy.search()   
        cy.wait(1000)
        cy.get(locators.multimodule['rows']).then($rows => {
                if ($rows.length >= 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                }
            })



            
            

            
            
    })
    
    
})