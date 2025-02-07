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

        const gameType = ['All', 'Chess Game', 'Live Game', 'Lottery Game', 'Other', 'Slot Game', 'Sports Game']
        const column22 = '#tableBody > tr:first-child > td:nth-child(22)'
        const trimmed = ['chess', 'lott', 'live g','SPo', 'o']

        cy.reportRequiredFields()

        trimmed.forEach((fuzzyGameType) => {
            cy.get(locators.multimodule['form-input9']).type(fuzzyGameType, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .contains(new RegExp (`${fuzzyGameType}`, 'i'))
                    .click()
            })
            cy.search()

            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column22).should('exist').then(($column22) => {
                        const types = $column22.text().trim()
                        const isMatching = trimmed.some(fuzzy => types.toLowerCase().includes(fuzzy.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.wait(500)
            })
        })

        



            
            

            
            
    })
    
})