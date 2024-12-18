import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })
    
    it('Operator Summary (Daily)', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['opSum-daily']).click()

        //Operator Summary Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Operator Summary (Daily)')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Currency')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Game ID ')
            .should('contain.text', 'Game Name ')
            .should('contain.text', 'Game Code ')
            .should('contain.text', 'Vendor Name')

        //Operator Summary
        cy.get(locators.report.filter['date-picker']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 100})
            cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
            cy.get(locators.report.filter['parent-operator']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).each($element => {
                if ($element.text() === operator){
                    cy.wrap($element).click()
                }
            })
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['preloader']).should('be.visible')
        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                // Hard-coded values for Game ID, Game Name, and Game Code
                const gameValues = {
                    gameId: '2',
                    gameName: 'SPEED BACCARAT',
                    gameCode: 'C1',
                }
        
                // Loop through the keys and perform the actions dynamically
                for (const key in gameValues) {
                    const value = gameValues[key]
                    cy.get(locators.report.filter[key]).type(value)
                    cy.wait(500);
                    cy.get(locators.report.filter['search']).click()
                    cy.get(locators.report.filter[key]).clear()
                }
            }
        })

        //Summary Table
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Total Betting Amount')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Total Payout Amount')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total GGR Amount')
        cy.get(locators.report.summaryTable['6thcol']).should('be.visible').should('contain.text', 'Total Turnover Amount')
        cy.get(locators.report.summaryTable['7thcol']).should('be.visible').should('contain.text', 'Total House Edge')
    

        cy.get(locators.profile.activity['summaryRows']).then((summaryRows) => {
            const count = summaryRows.length;
            if (count >= 1) {
                const table = locators.report.summaryTable.dataTable1
                for (const key in table) {
                    cy.get(locators.report.summaryTable.dataTable1[key]).then(element => {
                        const content = element.text()
                        expect(content).to.not.be.empty
                    })
                }
            }   
        })

        //Export Table
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Operator Summary export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })
})