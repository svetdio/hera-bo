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
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date/Time')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Player ID')
            .should('contain.text', 'Transaction ID')
            .should('contain.text', 'Transaction Status')
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Game Name')
            .should('contain.text', 'Round Number')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Game ID ')
        

        //Betting Transaction
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
        cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.report.filter['parent-operator']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.report.filter['search']).click()
        // cy.get(locators.profile.activity['preloader']).should('be.visible')
        // cy.log('Preloader is visible, waiting for it to disappear.')
        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')

        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table1
                for (const key in table) {
                    cy.get(locators.report.table1[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table1[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Player Count')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Ban')
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

        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })

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
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
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
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
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
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
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
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
        cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.report.filter['parent-operator']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.report.filter['search']).click()

        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table2
                for (const key in table) {
                    cy.get(locators.report.table2[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get('#tableBody').then(($tableBody) => {
                            if ($tableBody.find(locators.profile.activity['preloader']).length > 0) {
                                cy.get(locators.profile.activity['preloader']).should('be.visible')
                                cy.log('Preloader is visible, waiting for it to disappear.')
                                cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                                    
                            }
                            else {
                                cy.log('Preloader does not exist, proceeding to the next step.');
                            }
                        })
                        cy.get(locators.report.table2[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Transaction Type')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
            .click()

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
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
            .should('contain.text', 'Player ID')
            .should('contain.text', 'Promo Name')
            .should('contain.text', 'Transaction ID')
            .should('contain.text', 'Minimum Amount')
            .should('contain.text', 'Maximum Amount')
            .should('contain.text', 'Ban')

        //Promo Report
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table3
                for (const key in table) {
                    cy.get(locators.report.table3[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
            
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table3[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Promo Name')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Winners')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
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
            .should('contain.text', 'Game ID')
            .should('contain.text', 'Game Name')
            .should('contain.text', 'Game Code')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Ban')

        //Game Report
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table4
                for (const key in table) {
                    cy.get(locators.report.table4[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table4[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
    
        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    //Operator Summary (Daily) submodule
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
            .should('contain.text', 'Ban')
            .should('contain.text', 'Game Type')
            .should('contain.text', 'Game ID')
            .should('contain.text', 'Game Name')
            .should('contain.text', 'Game Code')
            .should('contain.text', 'Vendor Name')

        //Operator Summary
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
            cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
            cy.get(locators.report.filter['parent-operator']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).each($element => {
                if ($element.text() === operator){
                    cy.wrap($element).click()
                }
            })
        cy.get(locators.report.filter['search']).click()
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
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        // cy.get(locators.report.filter['reset'])
        cy.get('.btn.btn-danger')
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    //Operator Summary (Monthly) submodule
    it('Operator Summary (Monthly)', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['opSum-monthly']).click()

        //Operator Summary Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Operator Summary (Monthly)')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Ban')
            .should('contain.text', 'Game Type')

        //Operator Summary
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
            cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
            cy.get(locators.report.filter['parent-operator']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).should('be.visible')
            cy.get(locators.report.filter['operator-name']).each($element => {
                if ($element.text() === operator){
                    cy.wrap($element).click()
                }
            })
        cy.get(locators.report.filter['search']).click()
   
        //Summary Table
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Ban')
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

        // cy.get(locators.report.filter['reset'])
        cy.get('.btn.btn-danger')
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    //Vendor Summary submodule
    it('Vendor Summary', () => {
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['vendor-summary']).click()

        //Betting Transaction Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Vendor Summary')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date')
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Ban')
            .should('contain.text', 'Game ID ')
            .should('contain.text', 'Game Name ')
            .should('contain.text', 'Game Code ')
            .should('contain.text', 'Game Type')
        

        //Betting Transaction
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table5
                for (const key in table) {
                    cy.get(locators.report.table5[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table5[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Ban')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Total Bet Amount')
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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Vendor Summary export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()

        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    //Player Summary submodule
    it('Player Summary', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['player-summary']).click()

        //Betting Transaction Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Player Summary')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Transaction Date')
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Player ID')
            .should('contain.text', 'Game ID')
            .should('contain.text', 'Game Name')
            .should('contain.text', 'Game Code')
            .should('contain.text', 'Game Type')
        

        //Betting Transaction
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['operator']).type(operator, {delay: 200})
        cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.report.filter['parent-operator']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).should('be.visible')
        cy.get(locators.report.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.report.filter['search']).click()
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.report.table6
                for (const key in table) {
                    cy.get(locators.report.table6[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150 })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.table6[key]).contains(element.text())
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Total Transaction Count')
        cy.get(locators.report.summaryTable['2ndcol']).should('be.visible').should('contain.text', 'Total Player Count')
        cy.get(locators.report.summaryTable['3rdcol']).should('be.visible').should('contain.text', 'Ban')
        cy.get(locators.report.summaryTable['4thcol']).should('be.visible').should('contain.text', 'Total Betting Amount')
        cy.get(locators.report.summaryTable['5thcol']).should('be.visible').should('contain.text', 'Total Payout Amount')
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
        cy.get(locators.report.filter['pop-up-body']).contains('Your Player Summary export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()

        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    //Sports Betting Transaction submodule
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
        cy.get(locators.report.filter['operator1']).type(operator, {delay: 200})
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
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
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
        cy.get(locators.report.summaryTable['1stcol']).should('be.visible').should('contain.text', 'Ban')
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
        
        cy.get(locators.report.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })
})