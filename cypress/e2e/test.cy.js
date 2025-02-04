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

        const gameName = ['Pastry Party', 'speed baccarat', 'three cards']
        const column21 = '#tableBody > tr:first-child > td:nth-child(21)' 
        const trimmed = ['pastry', 'speed', 'thre']


        cy.get(locators.report.filter['gameName'])
                    .should('have.attr', 'type', 'text')
                    .should('be.visible')
                cy.log(`Verify the Game Name field by (Game Name - Input Type), PASSED`)
        
                cy.clearFields()
                cy.reportRequiredFields()
        
                cy.get(locators.report.filter['gameName'])
                    .should('have.attr', 'type', 'text')
                    .should('be.visible')
                cy.log(`Verify the Game Name field by (Game Name - Input Type), PASSED`)
        
                cy.clearFields()
                cy.reportRequiredFields()
        
                gameName.forEach((gameNames) => {
                    cy.get(locators.report.filter['gameName']).type(gameNames, { delay: 200 })
                    cy.search()
        
                    cy.wait(1000)
        
                    cy.get(locators.multimodule['table']).then(table => {
                        if (table.find(locators.multimodule['noData']).length > 0) {
                            cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                        } else {
                            cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                            cy.get(column21).should('exist').then(($column21) => {
                                const games = $column21.text().trim()
                                const isMatching = gameName.some(casing => games.toLowerCase().includes(casing.toLowerCase()))
                                expect(isMatching).to.be.true
                            })
                        }
                    cy.get(locators.report.filter['gameName']).clear()
                    })
                })
                cy.log(`Verify the Game Name value in Search Criteria using (Valid), PASSED`)
        
                cy.clearFields()
                cy.reportRequiredFields()
        
                trimmed.forEach((fuzzyGame) => {
                    cy.get(locators.report.filter['gameName']).type(fuzzyGame, { delay: 200 })
                    cy.search()
        
                    cy.get(locators.multimodule['table']).then(table => {
                        if (table.find(locators.multimodule['noData']).length > 0) {
                            cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                        } else {
                            cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                            cy.get(column21).should('exist').then(($column21) => {
                                const trimgames = $column21.text().trim()
                                const isMatchingtrimmed = trimmed.some(fuzzy => trimgames.toLowerCase().includes(fuzzy.toLowerCase()))
                                expect(isMatchingtrimmed).to.be.true
                            })
                        }
                    cy.get(locators.report.filter['gameName']).clear()
                    })
                })
        
                



            
            

            
            
    })
    
})