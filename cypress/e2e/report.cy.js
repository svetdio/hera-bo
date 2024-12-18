import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Reporting Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    //Betting Transaction History submodule
    it('Betting Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['betting-history']).click()

        //Betting Transaction Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Betting Transaction History')
        // cy.get(locators.report.filter['bet-box']).should('be.visible')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date/Time')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Player ID ')
            .should('contain.text', 'Transaction ID ')
            .should('contain.text', 'Transaction Status')
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Game Name ')
            .should('contain.text', 'Round Number ')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Game ID ')
        

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

        //Export Table
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Betting Transaction History export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()

    })

    //Transfer Transaction History submodule
    it('Transfer Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['transfer-history']).click()

        //Transfer Transaction Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Transfer Transaction History')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date/Time')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Transaction ID ')
            .should('contain.text', 'Transaction Type')
            .should('contain.text', 'Player ID ')

        //Transfer Transaction
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

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Total Transfer Amount')

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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Transfer Transaction History export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })

    //Player Cash Flow Records submodule
    it('Player Cash Flow Records', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['player-cashflow']).click()

        //Player Cash Flow Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Player Cash Flow Records')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date/Time')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Transaction ID ')
            .should('contain.text', 'Player ID ')
            .should('contain.text', 'Transaction Type')

        //Player Cash Flow
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

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Transaction Type')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Total Transaction Amount')
        
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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Player Cash Flow Records export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })

    //Promo Report submodule
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
        cy.wait(1000)
        cy.get(locators.report.filter['search']).click()
        cy.contains('-').click()
        // cy.get(locators.profile.activity['preloader']).should('be.visible')
        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table3
                for (const key in table) {
                    cy.get(locators.report.table3[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(1000)
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

    //Game Report submodule
    it('Game Report', () => {
    
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['game-report']).click()

        //Game Report Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Game Report')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date')
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Game ID ')
            .should('contain.text', 'Game Name ')
            .should('contain.text', 'Game Code ')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Currency')

        //Game Report
        cy.get(locators.report.filter['date-picker']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['preloader']).should('be.visible')
        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table4
                for (const key in table) {
                    cy.get(locators.report.table4[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), {delay:100})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        // cy.get(locators.profile.activity['preloader']).should('be.visible')
                        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.table4[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Currency')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Game ID')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Game Code')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Game Name')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total Bet Amount')
        cy.get(locators.report.summaryTable['6thcol']).should('be.visible').should('contain.text', 'Total Payout Amount')
        cy.get(locators.report.summaryTable['7thcol']).should('be.visible').should('contain.text', 'Total GGR Amount')

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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Game Report export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
    })

    //Operator Summary (Daily) submodule
    //Operator Summary (Monthly) submodule
    //Vendor Summary submodule
    //Player Summary submodule
    //Sports Betting Transaction submodule
})