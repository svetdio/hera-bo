import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Reporting Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it('Betting Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['betting-history']).click()

        //Betting Transaction Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Betting Transaction History')
        // cy.get(locators.report.filter['bet-box']).should('be.visible')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Operator Name')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Player ID ')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Transaction ID ')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Transaction Status')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Vendor Name')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Game Name ')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Round Number ')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Game Type')
        cy.get(locators.report.filter['bet-form']).should('contain.text', 'Game ID ')
        

        //Betting Transaction
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
                const table = locators.report.table1
                for (const key in table) {
                    cy.get(locators.report.table1[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay: 10})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.profile.activity['preloader']).should('be.visible')
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table1[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Player Count')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Total Transaction Amount')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total Payout')
        cy.get(locators.report.summaryTable['6thcol']).should('be.visible').should('contain.text', 'Total Win-Lose Amount')
        cy.get(locators.report.summaryTable['7thcol']).should('be.visible').should('contain.text', 'Total Turnover Amount')

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

        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Betting Transaction History export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()

    })

    it('Transfer Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['transfer-history']).click()
        cy.get(locators.report['text-head']).should('contain.text', 'Transfer Transaction History')
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
                const table = locators.report.table2
                for (const key in table) {
                    cy.get(locators.report.table2[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.profile.activity['preloader']).should('be.visible')
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table2[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Transfer Transaction History export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })

    it('Player Cash Flow Records', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['player-cashflow']).click()
        cy.get(locators.report['text-head']).should('contain.text', 'Player Cash Flow Records')
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
                const table = locators.report.table2
                for (const key in table) {
                    cy.get(locators.report.table2[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.profile.activity['preloader']).should('be.visible')
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table2[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Player Cash Flow Records export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })
})