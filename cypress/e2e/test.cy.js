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

        const rounds = [
            locators.multimodule['12row1'],
            locators.multimodule['12row2'],
            locators.multimodule['12row3'],
            locators.multimodule['12row4'],
            locators.multimodule['12row5']
        ]

        rounds.forEach((round) => {
            cy.get(round)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    expect(trim, `${trim}`).to.not.be.empty
                    cy.wait(100)
                })
        })

        const shoes = [
            locators.multimodule['13row1'],
            locators.multimodule['13row2'],
            locators.multimodule['13row3'],
            locators.multimodule['13row4'],
            locators.multimodule['13row5']
        ]

        shoes.forEach((sh) => {
            cy.get(sh)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const shoe = /^\d{2}-\d{1,2}$/.test(trim)
                    const empty = '--'

                    if (trim === empty) {
                        expect(trim, `${trim} shoe hand is empty`).to.equal(empty)
                    }
                    else {
                        expect(shoe, `${trim} shoe hand has data`).to.be.true
                    }
                    cy.wait(100)
                })
        })
            
            
    })
    
})