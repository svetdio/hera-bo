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

            cy.visit('/')
            cy.navigateToBettingHistory()

            cy.reportRequiredFields()
            cy.get(locators.report.filter['playerId']).type('123457', {delay: 200})
            cy.get(locators.multimodule['search']).click()
            .then(() => {
                if ()
            })
            
    })
    
    
})