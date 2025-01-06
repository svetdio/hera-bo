import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
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
                const count = rows.length;
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
    
})