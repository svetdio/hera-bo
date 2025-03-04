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

    it('User should be able to see the content of the table in activity logs using (Date Created)', () => {
        //navigate to Activity Logs

        const orderFullName = 'th:nth-child(4) > button'
        const fullName = [
            locators.multimodule['4row1'],
            locators.multimodule['4row2'],
            locators.multimodule['4row3'],
            locators.multimodule['4row4'],
            locators.multimodule['4row5']
        ]

        cy.get(locators.multimodule['dataTable-rows'])
            .contains('Operator / Vendor Name')
            .should('be.visible')
    
        cy.wait(1000)
    
    
        cy.get(orderFullName).click().click()
        cy.wait(1000)
        
        cy.wrap([]).as('names2')

        fullName.forEach(locator => {
            cy.get(locator).invoke('text').then(text => {
                cy.get('@names2').then(values => {
                    values.push(text.trim())
                    cy.wrap(values).as('names2')
                })
            })
        })

        cy.get('@names2').then(values => {
            // const sortedValues = [...values].sort((a, b) => b.localeCompare(a))
            const sortedValues = [...values].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))
            expect(values, 'descending order').to.deep.equal(sortedValues) // Compare original vs sorted
        })















        
    })
    
})