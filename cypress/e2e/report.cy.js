import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Report Module Test', () => {
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

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Betting Transaction History')
        const searchForm = [
            'Transaction Date/Time',
            'Operator Name',
            'Player ID',
            'Transaction ID',
            'Transaction Status',
            'Vendor Name',
            'Game Name',
            'Round Number',
            'Game Type',
            'Game ID'
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')
        
        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date/Time',
            'Credit Date/Time',
            'Operator Name',
            'Player ID',
            'Currency',
            'Betting Amount',
            'Payout Amount',
            'Win-Lose Amount',
            'Turnover Amount',
            'Round Number',
            'Shoe Hand',
            'Betting Area',
            'Game Result',
            'Transaction Status',
            'Operator ID',
            'Wallet Type',
            'Game ID',
            'Game Code',
            'Game Name',
            'Game Type',
            'Vendor Name',
            'Rollback Date/Time',
            'Cancel Date/Time',
            'Resettle Date/Time',
            'IP',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Operator Name Name
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable1
                for (const key in table) {
                    cy.get(locators.report.inputTable1[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable1[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable1
                for (const key in table) {
                    cy.get(locators.report.comboxTable1[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable1[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Total Transaction Count',
            'Total Player Count',
            'Currency',
            'Total Transaction Amount',
            'Total Payout',
            'Total Win-Lose Amount',
            'Total Turnover Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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

        //Reset Button Validation
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the first span contains "Debit"
                    cy.wrap($spans.eq(0))
                        .should('be.visible')
                        .and('contain.text', 'Debit');
                    cy.log('Validated the first span element with text "Debit".')
                    
                    // Validate the next three spans contain "All"
                    for (let i = 1; i <= 3; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`)
                    }
                })
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')

    })

    //Transfer Transaction History submodule
    it('Transfer Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['transfer-history']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Transfer Transaction History')
        const searchForm = [
            'Transaction Date/Time',
            'Operator Name',
            'Transaction ID ',
            'Transaction Type',
            'Player ID ',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date/Time',
            'Transaction ID',
            'Operator ID',
            'Operator Name',
            'Player ID',
            'Transaction Type',
            'Currency',
            'Transfer Amount',
            'After Balance',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Operator Name Name
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable2
                for (const key in table) {
                    cy.get(locators.report.inputTable2[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.profile.activity['preloader']).should('be.visible')
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.report.inputTable2[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable2
                for (const key in table) {
                    cy.get(locators.report.comboxTable2[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable2[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
       
        const summaryTable = [
            'Total Transaction Count',
            'Currency',
            'Total Transfer Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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
        
        //Reset Button Validation
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`)
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.log('All tests passed successfully!')
    })

    //Player Cash Flow Records submodule
    it('Player Cash Flow Records', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['player-cashflow']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Player Cash Flow Records')
        const searchForm = [
            'Transaction Date/Time',
            'Operator Name',
            'Transaction ID ',
            'Player ID ',
            'Transaction Type',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date/Time',
            'Transaction ID',
            'Operator ID',
            'Operator Name',
            'Player ID',
            'Transaction Type',
            'Currency',
            'Before Balance',
            'Transaction Amount',
            'After Balance',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Operator Name
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable2
                for (const key in table) {
                    cy.get(locators.report.inputTable2[key]).then(element => {
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
                        cy.get(locators.report.inputTable2[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable3
                for (const key in table) {
                    cy.get(locators.report.comboxTable3[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable3[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
       
        const summaryTable = [
            'Transaction Type',
            'Currency',
            'Total Transaction Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')
        
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
        
        //Reset Button Validation
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    })

    //Promo Report submodule
    it('Promo Report', () => {
    
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['promo-report']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Promo Report')
        const searchForm = [
            'Promo Date',
            'Player ID',
            'Promo Name',
            'Transaction ID',
            'Minimum Amount',
            'Maximum Amount',
            'Currency',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Promo Date',
            'Promo Name',
            'Batch Name',
            'Operator Name',
            'Player ID',
            'Transaction ID',
            'Date Won',
            'Claim Status',
            'Date Claimed',
            'Currency',
            'Win Amount',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Operator Name
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable3
                for (const key in table) {
                    cy.get(locators.report.inputTable3[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
            
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable3[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable4
                for (const key in table) {
                    cy.get(locators.report.comboxTable4[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable4[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Promo Name',
            'Total Winners',
            'Currency',
            'Total Win Amount',
            'Total Claimed Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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

        //Reset Button Validation
        cy.get(locators.report.filter['export']).click()
        cy.get(locators.report.filter['pop-up']).should('be.visible')
        cy.get(locators.report.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.report.filter['pop-up-body']).contains('Your Promo Report export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.report.filter['bell']).click()
        cy.get(locators.report.filter['notif']).click()
        
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the first span contains "Debit"
                    cy.wrap($spans.eq(0))
                        .should('be.visible')
                        .and('contain.text', 'Promo');
                    cy.log('Validated the first span element with text "Promo".');
                  
                    // Validate the next three spans contain "All"
                    for (let i = 1; i == 1; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`)
                    }
                })
                  
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    })

    //Game Report submodule
    it('Game Report', () => {
        const vendor = Cypress.env('vendor')
    
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['game-report']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Game Report')
        const searchForm = [    
        'Transaction Date',
            'Vendor Name',
            'Game ID',
            'Game Name',
            'Game Code',
            'Game Type',
            'Currency',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date',
            'Game Type',
            'Game ID',
            'Game Code',
            'Game Name',
            'Currency',
            'Bet Amount',
            'Payout Amount',
            'GGR Amount',
            'Bet Transaction',
            'Average Bet',
            'Player Count',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()

        //Vendor Name
        cy.get(locators.content.filter['form-input2']).type(vendor, {delay: 100, force: true })
            cy.get(locators.content.filter['vendor-dropdown']).should('be.visible')
            cy.get(locators.content.filter['vendor-name']).should('be.visible')
            cy.get(locators.content.filter['vendor-name']).each($element => {
                if ($element.text() === vendor){
                    cy.wrap($element).click()
                }
            })
        cy.get(locators.content.filter['search']).click()

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable4
                for (const key in table) {
                    cy.get(locators.report.inputTable4[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.wait(500)
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable4[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable5
                for (const key in table) {
                    cy.get(locators.report.comboxTable5[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable5[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Currency',
            'Game ID',
            'Game Code',
            'Game Name',
            'Total Bet Amount',
            'Total Payout Amount',
            'Total GGR Amount',
            'Total Bet Transaction',
            'Total Average Bet',
            'Total Player Count'
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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
        
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 2; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
    
        cy.log('All tests passed successfully!')
    })

    //Operator Summary (Daily) submodule
    it('Operator Summary (Daily)', () => {
        const operator = Cypress.env('operator')
        const vendor = Cypress.env('vendor')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['opSum-daily']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Operator Summary (Daily)')
        const searchForm = [
            'Transaction Date',
            'Operator Name',
            'Currency',
            'Game Type',
            'Game ID',
            'Game Name',
            'Game Code',
            'Vendor Name',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date',
            'Transaction Count',
            'Operator ID',
            'Operator Name',
            'Sub-Operator Name',
            'Game Type',
            'Currency',
            'Betting Amount',
            'Payout Amount',
            'GGR Amount',
            'Turnover Amount',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()

        //Operator Name
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
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
                    cy.get(locators.report.filter[key]).type(value, { delay: 150 })
                    cy.wait(500);
                    cy.get(locators.report.filter['search']).click()
                    cy.get(locators.report.filter[key]).clear()
                }
            }
        })

        //Vendor Name
        cy.get(locators.content.filter['form-input8']).type(vendor, {delay: 100, force: true })
            cy.get(locators.content.filter['vendor-dropdown']).should('be.visible')
            cy.get(locators.content.filter['vendor-name']).should('be.visible')
            cy.get(locators.content.filter['vendor-name']).each($element => {
                if ($element.text() === vendor){
                    cy.wrap($element).click()
                }
            })
        cy.get(locators.content.filter['search']).click()

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable6
                for (const key in table) {
                    cy.get(locators.report.comboxTable6[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable6[key]).contains(element.text())
                        cy.wait(500)
                    })
                }
            }
        })

        //Summary Table
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        
        const summaryTable = [
            'Total Transaction Count',
            'Total Player Count',
            'Currency',
            'Total Betting Amount',
            'Total Payout Amount',
            'Total GGR Amount',
            'Total Turnover Amount',
            'Total House Edge',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')    

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
        cy.get('.btn.btn-danger').click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 1; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.log('All tests passed successfully!')
    })

    //Operator Name Summary (Monthly) submodule
    it('Operator Summary (Monthly)', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['opSum-monthly']).click()

       //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Operator Summary (Monthly)')
        const searchForm = [    
            'Transaction Date',
            'Operator Name',
            'Currency',
            'Game Type',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date',
            'Game Type',
            'Transaction Count',
            'Operator ID',
            'Operator Name',
            'Sub-Operator Name',
            'Currency',
            'Betting Amount',
            'Payout Amount',
            'GGR Amount',
            'Turnover Amount',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()

        //Operator Name
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
   
        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable7
                for (const key in table) {
                    cy.get(locators.report.comboxTable7[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable7[key]).contains(element.text())
                        cy.wait(500)
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Total Transaction Count',
            'Currency',
            'Total Betting Amount',
            'Total Payout Amount',
            'Total GGR Amount',
            'Total Turnover Amount',
            'Total House Edge',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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
        cy.get('.btn.btn-danger').click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 1; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    })

    //Vendor Summary submodule
    it('Vendor Summary', () => {
        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['vendor-summary']).click()

        //Search Form Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Vendor Summary')
        const searchForm = [   
            'Transaction Date',
            'Vendor Name',
            'Currency',
            'Game ID ',
            'Game Name ',
            'Game Code ',
            'Game Type',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date',
            'Vendor ID',
            'Vendor Name',
            'Game Type',
            'Game ID',
            'Game Name',
            'Game Code',
            'Transaction Count',
            'Currency',
            'Bet Amount',
            'Payout Amount',
            'GGR Amount',
            'Turnover Amount',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()
        cy.get(locators.report.filter['search']).click()

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable5
                for (const key in table) {
                    cy.get(locators.report.inputTable5[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable5[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable8
                for (const key in table) {
                    cy.get(locators.report.comboxTable8[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable8[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Total Transaction Count',
            'Currency',
            'Total Bet Amount',
            'Total Payout Amount',
            'Total GGR Amount',
            'Total Turnover Amount',
            'Total House Edge',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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

        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 2; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
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
        const searchForm = [  
            'Transaction Date',
            'Operator Name',
            'Player ID',
            'Game ID',
            'Game Name',
            'Game Code',
            'Game Type',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date',
            'Operator ID',
            'Operator Name',
            'Sub-Operator Name',
            'Player ID',
            'Game ID',
            'Game Type',
            'Game Name',
            'Game Code',
            'Transaction Count',
            'Currency',
            'Betting Amount',
            'Payout Amount',
            'Win-Lose Amount',
            'Turnover Amount',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()

        //Operator Name
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable6
                for (const key in table) {
                    cy.get(locators.report.inputTable6[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150 })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable6[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable9
                for (const key in table) {
                    cy.get(locators.report.comboxTable9[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable9[key]).contains(element.text())
                    })
                }
            }   
        })

        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()

        const summaryTable = [
            'Total Transaction Count',
            'Total Player Count',
            'Currency',
            'Total Betting Amount',
            'Total Payout Amount',
            'Total Win-Lose Amount',
            'Total Turnover Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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

        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })
        
        cy.log('All tests passed successfully!')
    })

    //Sports Betting Transaction submodule
    it('Sports Betting Transaction', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')
        cy.get(locators.report['sports-betting']).click()

        //Sports Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Sports Betting Transaction')
        const searchForm = [   
            'Transaction Date/Time',
            'Credit Date/Time',
            'Operator Name',
            'Player ID',
            'Transaction ID',
            'Transaction Type',
            'Sports Item',
            'Billing Status',
            'Overall Game Status',
            'Vendor Name',
        ]
        searchForm.forEach((searchLabel) => {
            cy.get(locators.report.filter['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log('All search form names have been validated')

        //Data Table Column Name Text Validation
        const dataTable = [
            '#',
            'Transaction Date/Time',
            'Credit Date/Time',
            'Operator Name',
            'Player ID',
            'Transaction ID',
            'Transaction Type',
            'Currency',
            'Betting Amount',
            'Payout Amount',
            'Win-Lose Amount',
            'Turnover Amount',
            'Billing Status',
            'Overall Game Status',
            'Match Info',
            'Operator ID',
            'Vendor Name',
            'Cancel Date/Time',
            'Resettle Date/Time',
        ]
        dataTable.forEach((dataLabel) => {
            cy.get(locators.profile.activity['dataTable-rows'])
                .should('be.visible')
                .contains(dataLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${dataLabel} is present`)
                })
        })
        cy.log('All data table column names have been validated')

        //Transaction Date
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['last-month']).click()

        //Operator Name
        cy.get(locators.report.filter['form-input3']).type(operator, {delay: 200})
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

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.inputTable7
                for (const key in table) {
                    cy.get(locators.report.inputTable7[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { delay: 150})
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.inputTable7[key]).contains(element.text())
                        cy.get(locators.report.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.report.comboxTable10
                for (const key in table) {
                    cy.get(locators.report.comboxTable10[key]).then(element => {
                        cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 150 })
                        cy.get(locators.report.filter['dropdown']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.report.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.report.filter['search']).click()
                        cy.get(locators.report.comboxTable10[key]).contains(element.text())
                    })
                }
            }   
        })


        //Summary Table
        cy.get(locators.report['text-head']).should('contain.text', 'Summary')
        cy.get(locators.report.filter['summary-accordion'])
            .contains('-').click()
            .contains('+').click()
        
        const summaryTable = [
            'Currency',
            'Total Betting Amount',
            'Total Payout Amount',
            'Total Win-Lose Amount',
            'Total Turnover Amount',
        ]
        summaryTable.forEach((summaryLabel) => {
            cy.get(locators.profile.activity['summaryTable'])
                .should('be.visible')
                .contains(summaryLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${summaryLabel} is present`)
                })
        })
        cy.log('All summary table column names have been validated')

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
        
        cy.get(locators.report.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 3; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    })
})