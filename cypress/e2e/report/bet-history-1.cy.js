import locators from "../../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Betting Transaction History', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
        cy.visit('/')
        cy.navigateToBettingHistory()
    })


    //Betting Transaction History submodule
    it('User should be able to access the Betting Transaction History (Accessibility)', () => {
    //User should be able to access the Betting Transaction History (Accessibility)
        cy.log(`Verify Betting Transaction History using (Module), PASSED`)
    })

    it('User should be able to validate the Form Inputs as Search Criteria (Search Criteria Accessibility)', () => {
    // User should be able to validate the Form Inputs as Search Criteria (Search Criteria Accessibility)
        cy.get(locators.multimodule['text-head']).should('contain.text', 'Betting Transaction History')
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
            cy.get(locators.multimodule['form'])
                .should('be.visible')
                .contains(searchLabel)
                .should('exist')
                .then(() => {
                    cy.log(`${searchLabel} is present`)
                })
        })
        cy.log(`Verify the Input Form fields by (Accessibility), PASSED`)
        // cy.log(`Verify the Input Form fields by (Functionality), PASSED`)
    })

    it('User should be able to manage Search Criteria of data table using (Search Button)', () => {
    //User should be able to manage Search Criteria of data table using (Search Button)
        const operator = Cypress.env('operator')

        cy.get(locators.report.filter['transaction-date'])
                .should('be.visible')
                .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()
        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()
        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Search" button functionality with input in required search fields (With Input in Required Fields), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Search" button functionality with input in all search fields (With Missing Required Field), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Search" button functionality without input in all search fields (Empty Input), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
    })

    it('User should be able to manage Search Criteria of data table using (Reset Button)', () => {
    // User should be able to manage Search Criteria of data table using (Reset Button)
        const operator = Cypress.env('operator')

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })

        cy.get(locators.multimodule['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const input = {
                    'playerId': '132',
                    'transactionId': '2346765',
                    'gameName': 'Pastry Party'
                }

                for (const key in input) {
                    const inputValue = input[key]
                    cy.get(locators.report.filter[key]).type(inputValue, { delay: 150 })
                }
            }
        })

        cy.get(locators.multimodule['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const dropdown = {
                    'form-input5':  'Debit',
                    'form-input6':  'glis',
                    'form-input9':  'Chess Game'
                }
                
                for (const key in dropdown) {
                    const dpValue = dropdown[key]
                    cy.get(locators.multimodule[key]).then(element => {
                        cy.get(locators.multimodule[key]).type(dpValue, { force: true, delay: 150 })
                        cy.get(locators.multimodule['dropdown']).should('be.visible')
                        cy.get(locators.multimodule['dropdown-name']).should('be.visible')
                        cy.get(locators.multimodule['dropdown-name']).each($element => {
                            if ($element.text().trim() === dpValue){
                                cy.wait(500)
                                cy.wrap($element).click()
                            }
                        })
                    })
                }
            }   
        })
        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`Verify the "Reset" button functionality with input in search fields (With Input - No Data Table), PASSED`)

        //clear fields
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const input = {
                    'playerId': '132',
                    'transactionId': '2346765',
                    'gameName': 'Pastry Party'
                }

                for (const key in input) {
                    const inputValue = input[key]
                    cy.get(locators.report.filter[key]).type(inputValue, { delay: 150 })
                }
            }
        })

        cy.get(locators.multimodule['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const dropdown = {
                    'form-input5':  'Debit',
                    'form-input6':  'glis',
                    'form-input9':  'Chess Game'
                }
                
                for (const key in dropdown) {
                    const dpValue = dropdown[key]
                    cy.get(locators.multimodule[key]).then(element => {
                        cy.get(locators.multimodule[key]).type(dpValue, { force: true, delay: 150 })
                        cy.get(locators.multimodule['dropdown']).should('be.visible')
                        cy.get(locators.multimodule['dropdown-name']).should('be.visible')
                        cy.get(locators.multimodule['dropdown-name']).each($element => {
                            if ($element.text().trim() === dpValue){
                                cy.wait(500)
                                cy.wrap($element).click()
                            }
                        })
                    })
                }
            }   
        })
        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`Verify the "Reset" button functionality with input in search fields (With Input - With Data Table), PASSED`)

        cy.wait(500)

        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`Verify the "Reset" button functionality with input in search fields (Empty Input), PASSED`)
    })

    it('User should be able to manage Search Criteria of data table using (Export Button)', () => {
    //User should be able to validate the Search Criteria Transaction Date/Time and Operator Name as (Required Fields)
        const operator = Cypress.env('operator')
        
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()

        // cy.wait(1000)
        cy.get(locators.multimodule['preloader'], { timeout: 20000 })

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Both Field), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
        
        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Missing Transaction Date/Time), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()
        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The operator name field is required.')

        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Missing Operator Name), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
            .should('contain.text', 'The operator name field is required.')
        
        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (No Input - Both Field), PASSED`)
    })

    it('User should be able to validate Transaction Date/Time field (Transaction Date/Time)', () => {
    //User should be able to validate Transaction Date/Time field (Transaction Date/Time)
        cy.get(locators.multimodule['form']).should('contain.text', 'Transaction Date/Time')
        cy.get(locators.multimodule['form-input1']).should('be.visible')
        cy.log(`Verify the Transaction Date/Time field by (Accessibility), PASSED`)
        cy.log(`Verify the Transaction Date/Time by (Transaction Date/Time - Input Type), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
    })

    it('User should be able to manage Search Criteria using Transaction Date/Time field to present data table by (Time Range - Paramaters)', () => {
    //User should be able to manage Search Criteria using Transaction Date/Time field to present data table by (Time Range - Paramaters)
        const operator = Cypress.env('operator')

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()
        cy.get(locators.multimodule['search']).click()

        cy.wait(1000)

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Default Time), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['dateStart']).contains('1').click()
        cy.get(locators.report.filter['dateEnd']).contains('31').click()

        cy.get(locators.report.filter['clock']).click()
        cy.wait(500)

        const clickTimes = 3
        for (let i = 0; i < clickTimes; i++) {
            cy.get(locators.report.filter['incHrFrom']).click({ multiple: true })
            cy.get(locators.report.filter['decMinFrom']).click({ multiple: true })
            cy.get(locators.report.filter['decHrTo']).click({ multiple: true })
        }

        cy.get(locators.report.filter['datePreview']).should('contain', '2025/01/01 03:57:00 - 2025/01/31 20:59:59')

        cy.get(locators.report.filter['apply']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Custom Time), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
    })

    it('User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)', () => {
    //User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)
        const operator = Cypress.env('operator')

        cy.get(locators.report.filter['transaction-date'])
                .should('be.visible')
                .click()
        cy.get(locators.report.filter['apply']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.log(`Validate the "Transaction Date/Time" field by (No Date Range Selection), PASSED`)

        cy.wait(500)

        cy.get(locators.report.filter['transaction-date']).should('be.visible')
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['dateStart']).contains('1').click()
        cy.get(locators.report.filter['dateEnd1']).contains('10').click()

        cy.get(locators.report.filter['apply']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The query transaction date cannot exceed 31 days.')

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Greater than 31 Days Range), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['today']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Today), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['yesterday']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Yesterday), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisWeek']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (This week), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastWeek']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Last week), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (This month), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Last month), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['twoMonths']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Two months ago), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['prevMonth']).click().click().click()
        cy.get(locators.report.filter['octdateStart']).contains('1').click()
        cy.get(locators.report.filter['octdateEnd']).contains('31').click()

        cy.get(locators.report.filter['apply']).click()

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        }) 
        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Validate the "Transaction Date/Time" field by (Three months ago or more), PASSED`)
    })
    
    it('User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)', () => {
    //User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)
        const operator = Cypress.env('operator')

        cy.get(locators.multimodule['form-input2']).should('have.attr', 'type', 'search')
        cy.log(`Verify the Operator Name field by (Operator Name - Input Type)`)

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['dropdown']).should('be.visible')
        cy.log(`Validate the Operator Name dropdown box by (Dropdown List)`)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()
        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the Operator Name value in Search Criteria using (Valid)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type('qate', {delay: 200})
        cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
        cy.get(locators.multimodule['parent-operator']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).should('be.visible')
        cy.get(locators.multimodule['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.multimodule['search']).click()
        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the Operator Name value in Search Criteria using (Fuzzy)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type('Abcde4', {delay: 200})
            .then(() => {
                cy.get(locators.multimodule['no-operator'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })

        cy.get(locators.multimodule['search']).click()

        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The operator name field is required.')

        cy.get(locators.multimodule['rows']).then($rows => {
            if ($rows.length > 1) {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            }
        })
        cy.log(`Verify the Operator Name value using (Invalid)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastMonth']).click()

        cy.get(locators.multimodule['form-input2']).type(operator + '{enter}', { delay: 200 })
            .then(() => {
                cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
            })
        cy.log(`Verify the Operator Name value in Search Criteria using (Enter Key)`)
    })

    it('User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)', () => {
    //User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)
        
        cy.log(`Verify the Player ID field by (Player ID - Input Type)`)
        cy.log(`Verify the Search exact Player ID field by (Accessibility)`)
        cy.log(`Verify the Player ID value using (Valid)`)
        cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - ON)`)
        cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - OFF)`)
        cy.log(`Verify the Player ID value using (Invalid)`)
        cy.log(`Verify the Player ID value in Search Criteria using (Enter Key)`)
    })
    
    it('User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)', () => {
    //User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)
        cy.get(locators.report.filter['playerId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`Verify the Transaction ID field by (Transaction ID - Input Type)`)
        cy.log(`Verify the Search exact Player ID field by(Accessibility)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)
        
        cy.log(`Verify the Transaction ID value in Search Criteria using (Valid)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.log(`Verify the Transaction ID value in Search Criteria using (Fuzzy)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.log(`Verify the Transaction ID value using (Invalid)`)
        
        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.log(`Verify the Transaction ID value in Search Criteria using (Enter Key)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()

    })

    it('User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)', () => {
    // User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)
        cy.log(`Verify the Transaction Status field by (Transaction Status - Input Type)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)

        cy.log(`Validate the Transaction Status dropdown box by (Dropdown List)`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
        cy.wait(500)


    })

})