import locators from "../support/locators"
import { times } from 'lodash'

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

        cy.wait(1000)
   
        const id = [
            locators.multimodule['17row1'],
            locators.multimodule['17row2'],
            locators.multimodule['17row3'],
            locators.multimodule['17row4'],
            locators.multimodule['17row5']
        ]

        id.forEach((op) => {
            cy.get(op)
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    const trim = text.trim()
                    const isNumber = !Number.isNaN(+trim)
                    expect(isNumber, 'id should be a number').to.eq(true)            
                    cy.wait(100)
                })
        })
            
            
    })
    
})