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

    it('Betting Transaction', () => {

        cy.reportRequiredFields()
        cy.search()

        cy.wait(500)

        cy.get(locators.multimodule['summaryRow3'])
            .then($currency => {
                expect($currency).to.be.visible
            })


            
            

            
            
    })
    
})