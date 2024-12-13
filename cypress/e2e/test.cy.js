import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Reporting Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })
    
        it('Promo Report', () => {

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['promo-report']).click()

        //Promo Report Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Promo Report')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Promo Date')
            .should('contain.text', 'Player ID ')
            .should('contain.text', 'Promo Name ')
            .should('contain.text', 'Transaction ID ')
            .should('contain.text', 'Minimum Amount ')
            .should('contain.text', 'Maximum Amount ')
            .should('contain.text', 'Currency')

        //Promo Report
        cy.get(locators.report.filter['date-picker']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()

        cy.get(locators.report.filter['search']).click()
        // cy.get(locators.profile.activity['preloader']).should('be.visible')
        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table3
                for (const key in table) {
                    cy.get(locators.report.table3[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        // cy.get(locators.profile.activity['preloader']).should('be.visible')
                        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table3[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Promo Name')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Winners')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Total Win Amount')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total Claimed Amount')

        cy.get(locators.profile.activity['summaryRows']).then((summaryRows) => {
            const count = summaryRows.length;
            if (count >= 1) {
                const table = locators.report.summaryTable.dataTable2
                for (const key in table) {
                    cy.get(locators.report.summaryTable.dataTable2[key]).then(element => {
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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Promo Report export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })
})