import exp from "constants"
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
        cy.navigateToActivityLogs()
    })

    it('TEst', () => {
        const orderUname = 'th:nth-child(5) > button'
        const uname = [
            locators.multimodule['5row1'],
            locators.multimodule['5row2'],
            locators.multimodule['5row3'],
            locators.multimodule['5row4'],
            locators.multimodule['5row5']
        ]

        //navigate to Activity Logs
        cy.get(locators.multimodule['dataTable-rows'])
            .contains('Username')
            .should('be.visible')
    
        cy.wait(1000)
    
        cy.get(orderUname).click()
        cy.wait(1000)
        
        cy.wrap([]).as('names1')

        uname.forEach(locator => {
            cy.get(locator).invoke('text').then(text => {
                cy.get('@names1').then(values => {
                    values.push(text.trim())
                    cy.wrap(values).as('names1')
                })
            })
        })

        cy.get('@names1').then(values => {
            const sortedValues = [...values].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            expect(values, 'ascending order').to.deep.equal(sortedValues)
        })















        
    })
    
})