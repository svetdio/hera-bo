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

        const bets = [
            locators.multimodule['8row1'],
            locators.multimodule['8row2'],
            locators.multimodule['8row3'],
            locators.multimodule['8row4'],
            locators.multimodule['8row5']
        ]

        bets.forEach((bet) => {
            cy.get(bet)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const betAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(betAmount, 'betting amount is in currency format')
                    cy.wait(100)
                })
        })

        const pays = [
            locators.multimodule['9row1'],
            locators.multimodule['9row2'],
            locators.multimodule['9row3'],
            locators.multimodule['9row4'],
            locators.multimodule['9row5']
        ]

        pays.forEach((pay) => {
            cy.get(pay)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const payoutAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(payoutAmount, 'payout amount is in currency format')
                    cy.wait(100)
                })
        })

        const wls = [
            locators.multimodule['10row1'],
            locators.multimodule['10row2'],
            locators.multimodule['10row3'],
            locators.multimodule['10row4'],
            locators.multimodule['10row5']
        ]

        wls.forEach((winlose) => {
            cy.get(winlose)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const wlAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(wlAmount, 'win-lose amount is in currency format')
                    cy.wait(100)
                })
        })

        const turnovers = [
            locators.multimodule['11row1'],
            locators.multimodule['11row2'],
            locators.multimodule['11row3'],
            locators.multimodule['11row4'],
            locators.multimodule['11row5']
        ]

        turnovers.forEach((turnover) => {
            cy.get(turnover)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const turnoverAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(turnoverAmount, 'turnover amount is in currency format')
                    cy.wait(100)
                })
        })
            
            
    })
    
})