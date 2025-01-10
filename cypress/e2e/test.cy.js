import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    //Vendor Summary submodule
        it('Vendor Summary', () => {
            cy.visit('/')
            cy.get(locators.report['report']).click()
            cy.get(locators.report['container']).should('be.visible')
            cy.get(locators.report['vendor-summary']).click()
    
            //Search Form Text Validation
            cy.get(locators.multimodule['text-head']).should('contain.text', 'Vendor Summary')
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
            cy.get(locators.multimodule['rows']).then((rows) => {
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
            cy.get(locators.multimodule['rows']).then((rows) => {
                const count = rows.length
                if (count >= 1) {
                    const table = locators.report.comboxTable8
                    for (const key in table) {
                        cy.get(locators.report.comboxTable8[key]).then(element => {
                            cy.get(locators.report.filter[key]).type(element.text(), { force: true, delay: 180 })
                            cy.get(locators.report.filter['dropdown']).should('be.visible')
                            cy.get(locators.report.filter['dropdown-name']).should('be.visible')
                            cy.get(locators.report.filter['dropdown-name']).each($element => {
                                if ($element.text().trim() === element.text().trim()){
                                    cy.wait(500)
                                    cy.wrap($element).click()
                                }
                            })
                            cy.get(locators.report.filter['search']).click()
                            cy.get(locators.report.comboxTable8[key]).contains(element.text())
                            cy.wait(500)
                        })
                    }
                }   
            })
    
            //Summary Table
            cy.get(locators.multimodule['text-head']).should('contain.text', 'Summary')
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
    
    
})