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
        cy.get(locators.multimodule['dataTable-rows'])
            .contains('Date Created')
            .should('be.visible')
    
        cy.wait(1000)
    
        cy.get(locators.multimodule['2row1'])
            .should('not.be.empty')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)
            })
        cy.log(`**BOA-ACT-014, PASSED**`)
    
        const orderDate = 'th:nth-child(2) > button'
        const dates = [
            locators.multimodule['2row1'],
            locators.multimodule['2row2'],
            locators.multimodule['2row3'],
            locators.multimodule['2row4'],
            locators.multimodule['2row5']
        ]

        //ascending
        cy.get(orderDate).click()
        cy.wait(1000)
    
        cy.wrap([]).as('dateList1') // Store extracted dates

        // Extract text from each date element
        dates.forEach(date => {
            cy.get(date)
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    const trimmedText = text.trim()
                    const dateObj = new Date(trimmedText.replace(/\//g, '-')) // Convert to Date object
        
                    cy.get('@dateList1').then(dateList1 => {
                        dateList1.push(dateObj) // Store converted date
                        cy.wrap(dateList1).as('dateList') // Update stored dates
                    })
                })
        })
    
        cy.get('@dateList1').then(dateList1 => {
            const isAscending = dateList1.every((date, index, arr) => 
                index === 0 || arr[index - 1] <= date
            )
            expect(isAscending, 'Dates should be in ascending order').to.be.true
        })
        cy.log(`**BOA-ACT-015, PASSED**`)

        //descending
        cy.get(orderDate).click()
        cy.wait(1000)

        cy.wrap([]).as('dateList2')

        dates.forEach(date => {
            cy.get(date)
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    const trimmedText = text.trim()
                    const dateObj = new Date(trimmedText.replace(/\//g, '-'))
        
                    cy.get('@dateList2').then(dateList2 => {
                        dateList2.push(dateObj)
                        cy.wrap(dateList2).as('dateList2')
                    })
                })
        })

        cy.get('@dateList2').then(dateList2 => {
            const isDescending = dateList2.every((date, index, arr) => 
                index === 0 || arr[index - 1] > date // Ensuring strict descending order
            )
            expect(isDescending, 'Dates should be in descending order').to.be.true
        })
        cy.log(`**BOA-ACT-016, PASSED**`)
    })
    
})