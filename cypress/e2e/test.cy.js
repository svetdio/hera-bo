import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it('Sports Betting Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['sports-betting']).click()

        //Promo Report Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Sports Betting Transaction')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date/Time')
            .should('contain.text', 'Credit Date/Time')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Player ID')
            .should('contain.text', 'Transaction ID')
            .should('contain.text', 'Transaction Type')
            .should('contain.text', 'Sports Item')
            .should('contain.text', 'Billing Status')
            .should('contain.text', 'Overall Game Status')
            .should('contain.text', 'Vendor Name')

        //Promo Report
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator1']).type(operator, {delay: 100})
        cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.report.filter['parent-operator']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.report.filter['credit-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.report.filter['dpClear']).eq(1).click()

        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table7
                for (const key in table) {
                    cy.get(locators.report.table7[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text())
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table7[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Betting Amount')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Total Payout Amount')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Total Win-Lose Amount')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total Turnover Amount')

        cy.get(locators.profile.activity['summaryRows']).then((summaryRows) => {
            const count = summaryRows.length;
            if (count >= 1) {
                const table = locators.report.summaryTable.dataTable3
                for (const key in table) {
                    cy.get(locators.report.summaryTable.dataTable3[key]).then(element => {
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
            cy.get(locators.report.filter['pop-up-body']).contains('Your Sports Betting Transaction export is currently in progress. You will be notified once it is complete.')
            cy.get(locators.report.filter['bell']).click()
            cy.get(locators.report.filter['notif']).click()
    cy.then(() => {
        cy.log('All tests passed successfully!');
    })
    })
})