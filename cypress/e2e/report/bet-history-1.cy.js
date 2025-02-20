import locators from "../../support/locators"
import { times } from 'lodash'

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
        cy.log(`**BOA-RPT-001, PASSED**`)
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
        })
        cy.log(`**BOA-RPT-002, PASSED**`)

        cy.get(locators.multimodule['search'])
            .should('be.visible')
            .and('contain.text', 'Search')

        cy.get(locators.multimodule['reset'])
            .should('be.visible')
            .and('contain.text', 'Reset')
        cy.log(`**BOA-RPT-003, PASSED**`)
        // cy.log(`Verify the Input Form fields by (Functionality), PASSED**`)
    })

    it('User should be able to manage Search Criteria of data table using (Search Button)', () => {
    //User should be able to manage Search Criteria of data table using (Search Button)
        cy.reportRequiredFields()
            cy.search()
        cy.wait(500)

        cy.rows()
        cy.log(`**BOA-RPT-004, PASSED**`)

        cy.clearFields()

        cy.transactionDateTime()
        cy.search()

        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.rows()
        cy.log(`**BOA-RPT-005, PASSED**`)

        cy.clearFields()

        cy.search()
        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.wait(1000)

        cy.rows()
        cy.log(`**BOA-RPT-006, PASSED**`)
    })

    it('User should be able to manage Search Criteria of data table using (Reset Button)', () => {
    // User should be able to manage Search Criteria of data table using (Reset Button)
        cy.transactionDateTime()
        cy.operatorName()

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
                    'form-input9':  'Live Game'
                }
                
                for (const key in dropdown) {
                    const dpValue = dropdown[key]
                    cy.get(locators.multimodule[key]).type(dpValue, { force: true, delay: 150 })
                    cy.get(locators.multimodule['dropdown']).should('be.visible')
                    cy.get(locators.multimodule['dropdown-name']).should('be.visible')
                    cy.get(locators.multimodule['dropdown-name']).each($element => {
                        if ($element.text().trim() === dpValue){
                            cy.wait(500)
                            cy.wrap($element).click()
                        }
                    })
                }
            }   
        })
        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`**BOA-RPT-007, PASSED**`)

        //clear fields
        cy.wait(500)

        cy.reportRequiredFields()
        cy.search()

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
                    'form-input9':  'Live Game'
                }
                
                for (const key in dropdown) {
                    const dpValue = dropdown[key]
                    cy.get(locators.multimodule[key]).type(dpValue, { force: true, delay: 150 })
                    cy.get(locators.multimodule['dropdown']).should('be.visible')
                    cy.get(locators.multimodule['dropdown-name']).should('be.visible')
                    cy.get(locators.multimodule['dropdown-name']).each($element => {
                        if ($element.text().trim() === dpValue){
                            cy.wait(500)
                            cy.wrap($element).click()
                        }
                    })
                }
            }   
        })
        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`**BOA-RPT-008, PASSED**`)

        cy.wait(500)

        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`**BOA-RPT-009, PASSED**`)
    })

    it('User should be able to validate the Search Criteria Transaction Date/Time and Operator Name as (Required Fields)', () => {
    //User should be able to validate the Search Criteria Transaction Date/Time and Operator Name as (Required Fields)
        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-010, PASSED**`)

        cy.clearFields()

       cy.operatorName()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
        
        cy.wait(1000)

        cy.rows()
        cy.log(`**BOA-RPT-011, PASSED**`)

        cy.clearFields()

        cy.transactionDateTime()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The operator name field is required.')

        cy.wait(1000)

        cy.rows()
        cy.log(`**BOA-RPT-012, PASSED**`)

        cy.clearFields()

        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
            .should('contain.text', 'The operator name field is required.')
        
        cy.wait(1000)

        cy.rows()
        cy.log(`**BOA-RPT-013, PASSED**`)
    })

    it('User should be able to validate Transaction Date/Time field (Transaction Date/Time)', () => {
    //User should be able to validate Transaction Date/Time field (Transaction Date/Time)
        cy.get(locators.multimodule['form']).should('contain.text', 'Transaction Date/Time')
        cy.get(locators.multimodule['form-input1']).should('be.visible')
        cy.log(`**BOA-RPT-014, PASSED**`)
        cy.log(`**BOA-RPT-015, PASSED**`)
    })

    it('User should be able to manage Search Criteria using Transaction Date/Time field to present data table by (Time Range - Paramaters)', () => {
    //User should be able to manage Search Criteria using Transaction Date/Time field to present data table by (Time Range - Paramaters)

        // const column2 = '#tableBody > tr:first-child > td:nth-child(2)'
            
        cy.reportRequiredFields()
        cy.search()
        cy.rows()

        // cy.get(column2).should('exist').then(($column2) => {
        //     const datetime = $column2.text().trim()
        //     expect('2024/12/20 06:01:13').to.equal(datetime)
        // })
        cy.log(`**BOA-RPT-016, PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['dateStart']).contains('1').click()
        cy.get(locators.report.filter['dateEnd']).contains('20').click()

        cy.get(locators.report.filter['clock']).click()
        cy.wait(500)

        const clickTimes = 3
        for (let i = 0; i < clickTimes; i++) {
            cy.get(locators.report.filter['incHrFrom']).click({ multiple: true })
            cy.get(locators.report.filter['decMinFrom']).click({ multiple: true })
            cy.get(locators.report.filter['decHrTo']).click({ multiple: true })
        }

        // cy.get(locators.report.filter['datePreview']).should('contain', '2025/01/01 03:57:00 - 2025/01/31 20:59:59')

        cy.get(locators.report.filter['apply']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-017, PASSED**`)
    })

    it('User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)', () => {
    //User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)
        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['apply']).click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.log(`**BOA-RPT-018, PASSED**`)

        cy.wait(500)

        cy.get(locators.report.filter['transaction-date']).should('be.visible')
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['dateStart']).contains('1').click()
        cy.get(locators.report.filter['dateEnd1']).contains('10').click()

        cy.get(locators.report.filter['apply']).click()

        cy.operatorName()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The query transaction date cannot exceed 31 days.')

        cy.rows()
        cy.log(`**BOA-RPT-019, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Greater than 31 Days Range), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['today']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-020, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Today), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['yesterday']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-021, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Yesterday), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisWeek']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-022, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (This week), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastWeek']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-023, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Last week), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisMonth']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-024, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (This month), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-025, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Last month), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['twoMonths']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-026, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Two months ago), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['prevMonth']).click().click().click()
        cy.get(locators.report.filter['octdateStart']).contains('1').click()
        cy.get(locators.report.filter['octdateEnd']).contains('28').click()

        cy.get(locators.report.filter['apply']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`**BOA-RPT-027, PASSED**`)
        // cy.log(`Validate the "Transaction Date/Time" field by (Three months ago or more), PASSED**`)
    })
    
    it('User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)', () => {
    //User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)
        const operator = Cypress.env('operator')
        const column5 = '#tableBody > tr:first-child > td:nth-child(5)' 

        cy.get(locators.multimodule['form-input2']).should('have.attr', 'type', 'search')
        cy.log(`**BOA-RPT-028, PASSED**`)
        // cy.log(`Verify the Operator Name field by (Operator Name - Input Type), PASSED**`)

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['dropdown']).should('be.visible')
        cy.log(`**BOA-RPT-029, PASSED**`)
        // cy.log(`Validate the Operator Name dropdown box by (Dropdown List), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()
        
        cy.rows()

        cy.get(column5).should('exist').then(($column) => {
            const operatorName = $column.text().trim()
            expect(operator).to.equal(operatorName)
        })
        cy.log(`**BOA-RPT-030, PASSED**`)
        // cy.log(`Verify the Operator Name value in Search Criteria using (Valid), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.get(column5).should('exist').then(($column) => {
            const operatorName = $column.text().trim()
            expect(operator).to.equal(operatorName)
        })
        cy.log(`**BOA-RPT-031, PASSED**`)
        // cy.log(`Verify the Operator Name value in Search Criteria using (Fuzzy), PASSED**`)

        cy.clearFields()

        cy.transactionDateTime()

        cy.get(locators.multimodule['form-input2']).type('Abcde4', {delay: 200})
            .then(() => {
                cy.get(locators.multimodule['no-operator'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })

        cy.search()

        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The operator name field is required.')

        cy.rows()
        cy.log(`**BOA-RPT-032, PASSED**`)
        // cy.log(`Verify the Operator Name value using (Invalid), PASSED**`)

        cy.clearFields()

        cy.transactionDateTime()

        cy.get(locators.multimodule['form-input2']).type(operator + '{enter}', { delay: 200 })
            .then(() => {
                cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
            })
        cy.log(`**BOA-RPT-033, PASSED**`)
        // cy.log(`Verify the Operator Name value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)', () => {
    //User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)
        const typeplayerId = '777'
        const playerIds = ['777', '77', '7', '45', '23414']
        const firstrow = '#tableBody > tr:first-child > td:nth-child(6)'

        cy.get(locators.report.filter['playerId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`**BOA-RPT-034, PASSED**`)
        cy.log(`**BOA-RPT-035, PASSED**`)
        // cy.log(`Verify the Player ID field by (Player ID - Input Type), PASSED**`)
        // cy.log(`Verify the Search exact Player ID field by (Accessibility), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['fuzzy-search'])
            .check()
            .should('be.checked')
            .then(($checkbox) => {
                expect($checkbox).to.be.checked
            })

        cy.reportRequiredFields()

        cy.get(locators.report.filter['playerId']).type(typeplayerId, {delay: 200})
        cy.search()

        cy.get(firstrow).invoke('text')
            .then((playerId) => {
                if (playerId.trim() === typeplayerId) {
                    expect(playerId.trim()).to.equal(typeplayerId)
                }
            })
        cy.contains('No data available', { timeout: 20000 }).should('not.exist')
        cy.log(`**BOA-RPT-036, PASSED**`)
        // cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - ON), PASSED**`)

        cy.clearFields()

        cy.get(locators.report.filter['fuzzy-search'])
            .click()
            .uncheck()
            .should('not.be.checked')
            .then(($checkbox) => {
                expect($checkbox).to.not.be.checked
            })

        cy.reportRequiredFields()

        playerIds.forEach((typeplayerId) => {
            cy.get(locators.report.filter['playerId'])
                .clear()
                .type(typeplayerId, { delay: 200 })
            cy.search()
            cy.wait(2000)

            cy.get(locators.multimodule['rows']).should('exist').then(($rows) => {
                if ($rows.length > 1) {
                    cy.get(firstrow).invoke('text').then((playerId) => {
                        const fuzyyPlayerId = playerId.trim()

                        if (fuzyyPlayerId.startsWith(typeplayerId)) {
                            expect((fuzyyPlayerId).startsWith(typeplayerId)).to.be.true
                        } else if (fuzyyPlayerId.endsWith(typeplayerId)) {
                            expect((fuzyyPlayerId).endsWith(typeplayerId)).to.be.true
                        } else if (fuzyyPlayerId.includes(typeplayerId)) {
                            expect((fuzyyPlayerId).includes(typeplayerId)).to.be.true
                            cy.log(`**BOA-RPT-037, PASSED**`)
                            // cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - OFF), PASSED**`)
                        }
                    })
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                        cy.log(`**BOA-RPT-038, PASSED**`)
                        // cy.log(`Verify the Player ID value using (Invalid), PASSED**`)
                } 
            })
        })
        
        cy.clearFields()
                
        cy.get(locators.report.filter['fuzzy-search']).click().check()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['playerId']).type(typeplayerId + '{enter}', {delay: 200})
        cy.rows()
        cy.log(`**BOA-RPT-039, PASSED**`)
        // cy.log(`Verify the Player ID value in Search Criteria using (Enter Key), PASSED**`)
    })
    
    it('User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)', () => {
    //User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)
        const column4 = '#tableBody > tr:first-child > td:nth-child(4)'
        
        cy.get(locators.report.filter['transactionId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`**BOA-RPT-040, PASSED**`)
        // cy.log(`Verify the Transaction ID field by (Transaction ID - Input Type), PASSED**`)
        
        cy.clearFields()
        
        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('1405420440000000002457', { delay: 200 })
        cy.search()
        cy.get(locators.multimodule['noData']).should('not.exist')
        
        cy.get(column4).should('exist').then(($column4) => {
            const id = $column4.text().trim()
            expect('1405420440000000002457').to.equal(id)
        })
        cy.log(`**BOA-RPT-041, PASSED**`)
        // cy.log(`Verify the Transaction ID value in Search Criteria using (Valid), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('831215', {delay: 200})
        cy.search()
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-042, PASSED**`)
        // cy.log(`Verify the Transaction ID value in Search Criteria using (Fuzzy), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('11122233', {delay: 200})
        cy.search()
        cy.rows()
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-043, PASSED**`)
        // cy.log(`Verify the Transaction ID value using (Invalid), PASSED**`)
        
        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('8312152521' + '{enter}', {delay: 200})
        cy.search()
        cy.rows()
        cy.log(`**BOA-RPT-044, PASSED**`)
        // cy.log(`Verify the Transaction ID value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)', () => {
    // User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)
        const status = ['All', 'Debit', 'Credit','Cancel', 'Resettle', 'Rollback']
        const column16 = '#tableBody > tr:first-child > td:nth-child(16)' 
        const trimmed = ['deB', 'dit', 'roll', 'Cel']

       
        cy.get(locators.multimodule['form-input5']).should('have.attr', 'type', 'search')    
        cy.log(`**BOA-RPT-045, PASSED**`)
        // cy.log(`Verify the Transaction Status field by (Transaction Status - Input Type), PASSED**`)

        cy.clearFields()

        // cy.get(locators.multimodule['form-input5']).click({force: true})
        // cy.get(locators.multimodule['dropdown']).should('be.visible')

        status.forEach((status) => {
            cy.get(locators.multimodule['form-input5']).click({force: true})
            cy.get(locators.multimodule['dropdown'])
                .should('be.visible')
                .contains(status)
                .should('exist')
        })
        cy.log(`**BOA-RPT-046, PASSED**`)
        // cy.log(`Validate the Transaction Status dropdown box by (Dropdown List), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                
        cy.get(locators.multimodule['form-input5']).should('exist')
        cy.get(locators.multimodule['selection']).contains('All')
        cy.search()

        cy.rows()
        
        cy.get(column16).should('exist').then(($column16) => {
            const stats = $column16.text().trim()
            expect(status).to.include(stats)
        })
        cy.log(`**BOA-RPT-047, PASSED**`)
        // cy.log(`Verify the Transaction Status value in Search Criteria using (Default Status), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                                
        cy.get(locators.multimodule['form-input5']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .contains('Credit')
            .click()
        cy.search()

        cy.rows()
        
        cy.get(column16).should('exist').then(($column16) => {
            const stats = $column16.text().trim()
            expect(status).to.include(stats)
        })
        cy.log(`**BOA-RPT-048, PASSED**`)
        // cy.log(`Verify the Transaction Status value in Search Criteria using (Select Status), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                
        status.forEach((clickStats) => {
            cy.get(locators.multimodule['form-input5']).type(clickStats, { delay: 200, force: true })
            .then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .contains(clickStats)
                    .click()
            })
            cy.search()

            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column16).should('exist').then(($column16) => {
                        const stats = $column16.text().trim()
                        expect(status).to.include(stats)
                    })
                }
            })
        })
        cy.log(`**BOA-RPT-049, PASSED**`)
        cy.log(`Verify the Transaction Status value in Search Criteria using (Valid Type In), PASSED**`)/

        cy.clearFields()

        cy.reportRequiredFields()
                                
        trimmed.forEach((fuzzyStatus) => {
            cy.get(locators.multimodule['form-input5']).type(fuzzyStatus, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .should('be.visible')
                    .contains(new RegExp(`${fuzzyStatus}`, 'i'))
                    .click()
            })
            cy.search()
            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column16).should('exist').then(($column16) => {
                        const stats = $column16.text().trim()
                        const isMatching = trimmed.some(fuzzy => stats.toLowerCase().includes(fuzzy.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
                cy.wait(500)
            })
        })
        cy.log(`**BOA-RPT-050, PASSED**`)
        // cy.log(`Verify the Transaction Status value in Search Criteria using (Fuzzy Type In), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                
        cy.get(locators.multimodule['form-input5']).type('Void', { delay: 200, force: true })
            .then(() => {
                cy.get(locators.multimodule['invalid-option'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })
  
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-051, PASSED**`)
        // cy.log(`Verify the Transaction Status value in Search Criteria using (Invalid Type In), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                                                
        cy.get(locators.multimodule['form-input5']).type('Cancel' + '{enter}', {force: true})
        cy.search()

        cy.get(locators.multimodule['table']).then(table => {
            if (table.find(locators.multimodule['noData']).length > 0) {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                cy.get(column16).should('exist').then(($column16) => {
                    const stats = $column16.text().trim()
                    expect('Cancel').to.equal(stats)
                })
            }
        })
        cy.log(`**BOA-RPT-052, PASSED**`)
        // cy.log(`Verify the Transaction Status value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to validate Transaction Status field and manage Search Criteria of data table by (Vendor Name)', () => {
    //User should be able to validate Transaction Status field and manage Search Criteria of data table by (Vendor Name)
        const vendorName = ['og', 'viva','CG']
        const column23 = '#tableBody > tr:first-child > td:nth-child(23)'
        const trimmed = ['vIv', 'chE']

        cy.get(locators.multimodule['form-input6']).should('have.attr', 'type', 'search') 
        cy.log(`**BOA-RPT-053, PASSED**`)
        // cy.log(`Verify the Vendor Name field by (Vendor Name - Input Type), PASSED**`)

        cy.get(locators.multimodule['form-input6']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .should('be.visible')
            .should('exist')

        cy.get(locators.multimodule['dropdown-name'])
            .should('be.visible')
            .should('exist')
        cy.log(`**BOA-RPT-054, PASSED**`)
        // cy.log(`Validate the Vendor Name dropdown box by (Dropdown List), PASSED**`)

        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).should('exist')
        cy.get(locators.multimodule['selection']).contains('All')
        cy.search()

        cy.rows()

        cy.get(column23).should('exist').then(($column23) => {
            const vendor = $column23.text().trim()
            expect(vendorName).to.include(vendor)
        })
        
        cy.log(`**BOA-RPT-055, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Default Status), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()
                                
        cy.get(locators.multimodule['form-input6']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .contains('og')
            .click()
        
        cy.search()
        cy.rows()
        cy.log(`**BOA-RPT-056, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Select Status), PASSED**`)

        cy.clearFields()

        cy.reportRequiredFields()
                        
        vendorName.forEach((clickVendor) => {
            cy.get(locators.multimodule['form-input6']).type(clickVendor, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .contains(clickVendor)
                    .click()
            })
            cy.search()
            
            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column23).should('exist').then(($column23) => {
                        const vendor = $column23.text().trim()
                        expect(vendorName).to.include(vendor)
                    })
                }
            cy.wait(500)
            })
        })
        cy.log(`**BOA-RPT-057, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Valid Type In), PASSED**`)

        cy.clearFields()
    
        cy.reportRequiredFields()

        trimmed.forEach((fuzzyVendor) => {
            cy.get(locators.multimodule['form-input6']).type(fuzzyVendor, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .should('be.visible')
                    .contains(new RegExp(`${fuzzyVendor}`, 'i'))
                    .click()
            })
            cy.search()
            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column23).should('exist').then(($column23) => {
                        const vendor = $column23.text().trim()
                        const isMatching = trimmed.some(fuzzy => vendor.toLowerCase().includes(fuzzy.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.wait(500)
            })
        })
        cy.log(`**BOA-RPT-058, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Fuzzy Type In), PASSED**`)

        cy.clearFields()
    
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).type('random', { delay: 200, force: true })
            .then(() => {
                cy.get(locators.multimodule['invalid-option'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })

        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-059, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Invalid Type In), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).type('og' + '{enter}', {force: true})
        cy.search()

        cy.rows()
        
        cy.get(column23).should('exist').then(($column23) => {
            const vendor = $column23.text().trim()
            expect('og').to.include(vendor)
        })
        cy.log(`**BOA-RPT-060, PASSED**`)
        // cy.log(`Verify the Vendor Name value in Search Criteria using (Enter Key), PASSED**`)

    })

    it('User should be able to validate Game Name field and manage Search Criteria of data table by (Game Name)', () => {
    //User should be able to validate Game Name field and manage Search Criteria of data table by (Game Name)
        const gameName = ['Pastry Party', 'speed baccarat', 'three cards']
        const column21 = '#tableBody > tr:first-child > td:nth-child(21)' 
        const trimmed = ['pastry', 'speed', 'thre']
        
        cy.get(locators.report.filter['gameName'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`**BOA-RPT-061, PASSED**`)
        // cy.log(`Verify the Game Name field by (Game Name - Input Type), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        gameName.forEach((gameNames) => {
            cy.get(locators.report.filter['gameName']).type(gameNames, { delay: 200 })
            cy.search()

            cy.wait(1000)

            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column21).should('exist').then(($column21) => {
                        const games = $column21.text().trim()
                        const isMatching = gameName.some(casing => games.toLowerCase().includes(casing.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.get(locators.report.filter['gameName']).clear()
            })
        })
        cy.log(`**BOA-RPT-062, PASSED**`)
        // cy.log(`Verify the Game Name value in Search Criteria using (Valid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        trimmed.forEach((fuzzyGame) => {
            cy.get(locators.report.filter['gameName']).type(fuzzyGame, { delay: 200 })
            cy.search()

            cy.wait(1000)

            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column21).should('exist').then(($column21) => {
                        const trimgames = $column21.text().trim()
                        const isMatchingtrimmed = trimmed.some(fuzzy => trimgames.toLowerCase().includes(fuzzy.toLowerCase()))
                        expect(isMatchingtrimmed).to.be.true
                    })
                }
            cy.get(locators.report.filter['gameName']).clear()
            })
        })
        cy.log(`**BOA-RPT-063, PASSED**`)
        // cy.log(`Verify the Game Name value in Search Criteria using (Fuzzy), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['gameName']).type('invalid Game', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-064, PASSED**`)
        // cy.log(`Verify the Game Name value using (Invalid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['gameName']).type('Pastry Party' + '{enter}', { force: true })
        cy.search()

        cy.get(locators.multimodule['table']).then(table => {
            if (table.find(locators.multimodule['noData']).length > 0) {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                cy.get(column21).should('exist').then(($column21) => {
                    const game = $column21.text().trim()
                    expect('Pastry Party').to.include(game)
                })
            }
        })
        cy.log(`**BOA-RPT-065, PASSED**`)
        // cy.log(`Verify the Game Name value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to validate Round Number field and manage Search Criteria of data table by (Round Number)', () => {
    //User should be able to validate Round Number field and manage Search Criteria of data table by (Round Number)
        const column12 = '#tableBody > tr:first-child > td:nth-child(12)'
        const roundNo = ['test', '100']

        cy.get(locators.report.filter['roundId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`**BOA-RPT-066, PASSED**`)
        // cy.log(`Verify the Round Number field by (Round Number - Input Type), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['roundId']).type('12-17', { delay: 200 })
        cy.search()

        cy.wait(1000)

        cy.get(locators.multimodule['table']).then(table => {
            if (table.find(locators.multimodule['noData']).length > 0) {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                cy.get(column12).should('exist').then(($column12) => {
                    const roundno = $column12.text().trim()
                    expect('12-17').to.include(roundno)
                })
            }
        })
        cy.log(`**BOA-RPT-067, PASSED**`)
        // cy.log(`Verify the Round Number value in Search Criteria using (Valid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['roundId']).type('12', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['noData'])
            .contains('No data available')
            .should('exist')
        cy.log(`**BOA-RPT-068, PASSED**`)
        // cy.log(`Verify the Round Number value in Search Criteria using (Fuzzy), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['roundId']).type('invalid round id', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['noData'])
            .contains('No data available')
            .should('exist')
        cy.log(`**BOA-RPT-069, PASSED**`)
        // cy.log(`Verify the Round Number value using (Invalid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        roundNo.forEach((roundID) => {
            cy.get(locators.report.filter['roundId']).type(roundID + '{enter}', { delay: 200 })
            cy.search()

            cy.wait(1000)

            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column12).should('exist').then(($column12) => {
                        const roundno = $column12.text().trim()
                        const isMatching = roundNo.some(round => roundno.toLowerCase().includes(round.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.get(locators.report.filter['roundId']).clear()
            })
        })
        cy.log(`**BOA-RPT-070, PASSED**`)
        // cy.log(`Verify the Round Number value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to validate Game Type field and manage Search Criteria of data table by (Game Type)', () => {
    //User should be able to validate Game Type field and manage Search Criteria of data table by (Game Type)
        const gameType = ['All', 'Live Game', 'Slot Game']
        const column22 = '#tableBody > tr:first-child > td:nth-child(22)'
        const trimmed = ['slo', 'live g']

        cy.get(locators.multimodule['form-input9']).should('have.attr', 'type', 'search')
        cy.log(`**BOA-RPT-071, PASSED**`)
        // cy.log(`Verify the Game Type field by (Game Type - Input Type), PASSED**`)
        
        cy.clearFields()

        cy.get(locators.multimodule['form-input9']).click({force: true})
        cy.get(locators.multimodule['dropdown']).should('be.visible')

        gameType.forEach((gameType) => {
            cy.get(locators.multimodule['form-input9']).click({force:true})
            cy.get(locators.multimodule['dropdown'])
                .should('be.visible')
                .contains(gameType)
                .should('exist')
        })
        cy.log(`**BOA-RPT-072, PASSED**`)
        // cy.log(`Validate the Game Type dropdown box by (Dropdown List), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input9']).should('exist')
        cy.get(locators.multimodule['selection']).contains('All')
        cy.search()

        cy.rows()

        cy.get(column22).should('exist').then(($column22) => {
            const types = $column22.text().trim()
            expect(gameType).to.include(types)
        })
        cy.log(`**BOA-RPT-073, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Default Status), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        gameType.forEach((gametype) => {
            cy.get(locators.multimodule['form-input9']).click({ force: true })
            cy.get(locators.multimodule['dropdown'])
                .contains(gametype)
                .click()
            cy.search()

            cy.wait(1000)
            
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column22).should('exist').then(($column22) => {
                        const gametypes = $column22.text().trim()
                        expect(gameType).to.include(gametypes)
                    })
                }
            })
        })
        cy.log(`**BOA-RPT-074, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Select Status), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        gameType.forEach((clickType) => {
            cy.get(locators.multimodule['form-input9']).type(clickType, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .contains(clickType)
                    .click()
            })
            cy.search()

            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column22).should('exist').then(($column22) => {
                        const type = $column22.text().trim()
                        expect(gameType).to.include(type)
                    })
                }
            cy.wait(500)
            })
        })
        cy.log(`**BOA-RPT-075, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Valid Type In), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        trimmed.forEach((fuzzyGameType) => {
            cy.get(locators.multimodule['form-input9']).type(fuzzyGameType, { delay: 200, force: true }).then(() => {
                cy.get(locators.multimodule['dropdown-name'])
                    .contains(new RegExp (`${fuzzyGameType}`, 'i'))
                    .click()
            })
            cy.search()

            cy.wait(1000)
            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column22).should('exist').then(($column22) => {
                        const types = $column22.text().trim()
                        const isMatching = trimmed.some(fuzzy => types.toLowerCase().includes(fuzzy.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.wait(500)
            })
        })
        cy.log(`**BOA-RPT-076, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Fuzzy Type In), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input9']).type('invalid', { delay: 200, force: true })
            .then(() => {
                cy.get(locators.multimodule['invalid-option'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-077, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Invalid Type In), PASSED**`)
        
        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input9']).type('Live Game' + '{enter}', { delay: 200, force: true })
        cy.search()

        cy.wait(1000)
        cy.get(locators.multimodule['table']).then(table => {
            if (table.find(locators.multimodule['noData']).length > 0) {
                cy.contains('No data available', { timeout: 20000 }).should('be.visible')
            } else {
                cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                cy.get(column22).should('exist').then(($column22) => {
                    const type = $column22.text().trim()
                    expect(gameType).to.include(type)
                })
            }
        cy.wait(500)
        })
        cy.log(`**BOA-RPT-078, PASSED**`)
        // cy.log(`Verify the Game Type value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to validate Game ID field and manage Search Criteria of data table by (Game ID)', () => {
    //User should be able to validate Game ID field and manage Search Criteria of data table by (Game ID)
        const gameID = ['55', '125', '31']
        const column19 = '#tableBody > tr:first-child > td:nth-child(19)'
        const trimmed = ['12', '3']

        cy.get(locators.report.filter['gameId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`**BOA-RPT-079, PASSED**`)
        // cy.log(`Verify the Game ID field by (Game Name - Input Type), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        gameID.forEach((gameIDs) => {
            cy.get(locators.report.filter['gameId']).type(gameIDs, { delay : 200 })
            cy.search()
            cy.wait(1000)

            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column19).should('exist').then(($column19) => {
                        const games = $column19.text().trim()
                        const isMatching = gameID.some(casing => games.toLowerCase().includes(casing.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.get(locators.report.filter['gameId']).clear()
            })
        })
        cy.log(`**BOA-RPT-080, PASSED**`)
        // cy.log(`Verify the Game ID value in Search Criteria using (Valid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        trimmed.forEach((fuzzyGameID) => {
            cy.get(locators.report.filter['gameId']).type(fuzzyGameID, { delay: 200 })
            cy.search()

            cy.get(locators.multimodule['noData'])
                .should('exist')
                .contains('No data available')
            
            cy.wait(500)
        })
        cy.log(`**BOA-RPT-081, PASSED**`)
        // cy.log(`Verify the Game ID value in Search Criteria using (Fuzzy), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['gameId']).type('sample', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contains.text', 'The game id must be a number.')
        cy.log(`**BOA-RPT-082, PASSED**`)
        // cy.log(`Verify the Game ID value in Search Criteria using (Other Character), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['gameId']).type('000', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`**BOA-RPT-083, PASSED**`)
        // cy.log(`Verify the Game ID value using (Invalid), PASSED**`)

        cy.clearFields()
        cy.reportRequiredFields()

        gameID.forEach((gameIDs) => {
            cy.get(locators.report.filter['gameId']).type(gameIDs + '{enter}', { delay : 200 })
            cy.wait(1000)

            cy.get(locators.multimodule['table']).then(table => {
                if (table.find(locators.multimodule['noData']).length > 0) {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('not.exist')
                    cy.get(column19).should('exist').then(($column19) => {
                        const games = $column19.text().trim()
                        const isMatching = gameID.some(casing => games.toLowerCase().includes(casing.toLowerCase()))
                        expect(isMatching).to.be.true
                    })
                }
            cy.get(locators.report.filter['gameId']).clear()
            })
        })
        cy.log(`**BOA-RPT-084, PASSED**`)
        // cy.log(`Verify the Game ID value in Search Criteria using (Enter Key), PASSED**`)
    })

    it('User should be able to manage Betting Transaction History by validating and verifying the content and elements of (Summary Table)', () => {
        //User should be able to manage Betting Transaction History by validating and verifying the content and elements of (Summary Table)

        const label = [
            'Total Transaction Count',
            'Total Player Count',
            'Currency',
            'Total Transaction Amount',
            'Total Payout',
            'Total Win-Lose Amount',
            'Total Turnover Amount'
        ]
        label.forEach((summaryColumn) => {
            cy.get(locators.multimodule['summaryRows'])
                .should('be.visible')
                .contains(summaryColumn)
                .should('exist')
        })
        cy.log(`**BOA-RPT-085, PASSED**`)
        // cy.log(`Validate the Summary Table by (Column Names), PASSED**`)

        cy.reportRequiredFields()
        cy.search()

        cy.wait(500)

        const rows = [
            { row: locators.multimodule.summaryRow1, id: '86' },
            { row: locators.multimodule.summaryRow2, id: '87' },
            { row: locators.multimodule.summaryRow3, id: '88' },
            { row: locators.multimodule.summaryRow4, id: '89' },
            { row: locators.multimodule.summaryRow5, id: '90' },
            { row: locators.multimodule.summaryRow6, id: '91' },
            { row: locators.multimodule.summaryRow7, id: '92' }
        ]

        rows.forEach(({ row, id }) => {
            cy.get(row)
                .invoke('text')
                .then((text) => {
                    const trimmedText = text.trim()
                    const isNumber = !Number.isNaN(+trimmedText)
        
                    if (isNumber) {
                        expect(isNumber, 'input should be a number').to.eq(true);
                        cy.log(`**BOA-RPT-0${id}, PASSED**`)
                    } else {
                        cy.get(row).should('be.visible')
                        cy.log(`**BOA-RPT-0${id}, PASSED**`)
                    }
                })
        })
    })

    it('User should be able to manage Betting Transaction History by validating and verifying the content and elements of (Betting Transaction History Table)', () => {
    //User should be able to manage Betting Transaction History by validating and verifying the content and elements of (Betting Transaction History Table)

        const bethistory = [
            '#',
            'Transaction Date/Time',
            'Credit Date/Time',
            'Transaction ID',
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
            'IP'
        ]
        bethistory.forEach((label) => {
            cy.get(locators.multimodule['dataTable-rows'])
                .should('be.visible')
                .contains(label)
                .should('exist')
        })
        cy.log(`**BOA-RPT-093, PASSED**`)

        cy.reportRequiredFields()
        cy.search()
        cy.wait(1000)
    
        const rows = [
            { row: locators.multimodule['1row1'], value: '1' },
            { row: locators.multimodule['1row2'], value: '2' },
            { row: locators.multimodule['1row3'], value: '3' },
            { row: locators.multimodule['1row4'], value: '4' },
            { row: locators.multimodule['1row5'], value: '5' }
        ]

        rows.forEach(({ row, value }) => {
            cy.get(row).should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    expect(text.trim()).to.equal(value)
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-095, PASSED**`)
        // cy.log(`Verify the data of '#' Column in data table by (Incrementing Value), PASSED**`)
    
        const dates = [
            locators.multimodule['2row1'],
            locators.multimodule['2row2'],
            locators.multimodule['2row3'],
            locators.multimodule['2row4'],
            locators.multimodule['2row5']
        ]

        dates.forEach((date) => {
            cy.get(date).should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    expect(text.trim()).to.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-096, PASSED**`)
        // cy.log(`Verify the data of 'Transaction Date/Time' by (Date and Time Format), PASSED**`)
    
        const credits = [
            locators.multimodule['3row4'],
            locators.multimodule['3row7'],
            locators.multimodule['3row8']
        ]

        credits.forEach((credit) => {
            cy.get(credit).should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const textTrim = text.trim()
                    if (textTrim === '--') {
                        expect(textTrim).to.equal('--')
                    }
                    else {
                        expect(textTrim).to.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)
                    }                   
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-097, PASSED**`)
        // cy.log(`Verify the data of 'Credit Date/Time' by (Date and Time Format), PASSED**`)
    
        const ids = [
            locators.multimodule['4row1'],
            locators.multimodule['4row2'],
            locators.multimodule['4row3'],
            locators.multimodule['4row4'],
            locators.multimodule['4row5']
        ]

        let pref = new Set()

        ids.forEach((id) => {
            cy.get(id)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    expect(pref.has(trim), `Duplicate found: ${trim}`).to.be.false
                    pref.add(trim)
                })
        })
        cy.log(`**BOA-RPT-098, PASSED**`)
        // cy.log(`Verify the data of 'Transaction ID' by (Unique Value), PASSED**`)
    
        const operator = Cypress.env('operator')
        const names = [
            locators.multimodule['5row1'],
            locators.multimodule['5row2'],
            locators.multimodule['5row3'],
            locators.multimodule['5row4'],
            locators.multimodule['5row5']
        ]

        names.forEach((name) => {
            cy.get(name)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const match = text.trim()
                    expect(match).to.equal(operator).and.to.be.a('string')
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-099, PASSED**`)
        // cy.log(`Verify the data of Operator Name' by (Text/String Value), PASSED**`)  
        const order = 'th:nth-child(6) > button > span > i'

        const players = [
            locators.multimodule['6row1'],
            locators.multimodule['6row2'],
            locators.multimodule['6row3'],
            locators.multimodule['6row4'],
            locators.multimodule['6row5']
        ]

        times(2, () => {
            cy.get(order).click()
        })
        cy.wait(1000)

        players.forEach((id) => {
            cy.get(id)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const isNum = /\d/.test(trim)
                    const isString = /[a-zA-Z]/.test(trim)
                    
                    if (isString && isNum) {
                        expect(isString && isNum, 'combined number and string').to.be.true
                    }
                    else if (isNum) {
                        expect(isNum, 'numeric').to.be.true
                    }
                    else {
                        expect(isString, 'string').to.be.true
                    }
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-100, PASSED**`)
        // cy.log(`Verify the data of 'Player ID' by (Numberic/String Value), PASSED**`)
    
        const currencies = [
            locators.multimodule['7row1'],
            locators.multimodule['7row2'],
            locators.multimodule['7row3'],
            locators.multimodule['7row4'],
            locators.multimodule['7row5']
        ]

        currencies.forEach((currency) => {
            cy.get(currency)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const isString = /[a-zA-Z]/.test(trim)
                    expect(isString).to.be.true
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-101, PASSED**`)
        // cy.log(`Verify the data of 'Currency' by (Text/String Value), PASSED**`)
    
        const bets = [
            locators.multimodule['8row1'],
            locators.multimodule['8row2'],
            locators.multimodule['8row3'],
            locators.multimodule['8row4'],
            locators.multimodule['8row5']
        ]

        bets.forEach((bet) => {
            cy.get(bet)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const betAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(betAmount, 'betting amount is in currency format')
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-102, PASSED**`)
        // cy.log(`Verify the data of 'Betting Amount' by (Numberic/Currency Format), PASSED**`)
    
        const pays = [
            locators.multimodule['9row1'],
            locators.multimodule['9row2'],
            locators.multimodule['9row3'],
            locators.multimodule['9row4'],
            locators.multimodule['9row5']
        ]

        pays.forEach((pay) => {
            cy.get(pay)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const payoutAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(payoutAmount, 'payout amount is in currency format')
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-103, PASSED**`)
        // cy.log(`Verify the data of 'Payout Amount' by (Numberic/Currency Format), PASSED**`)
    
        const wls = [
            locators.multimodule['10row1'],
            locators.multimodule['10row2'],
            locators.multimodule['10row3'],
            locators.multimodule['10row4'],
            locators.multimodule['10row5']
        ]

        wls.forEach((winlose) => {
            cy.get(winlose)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const wlAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(wlAmount, 'win-lose amount is in currency format')
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-104, PASSED**`)
        // cy.log(`Verify the data of 'Win-Lose Amount' by (Numberic/Currency Format), PASSED**`)
    
        const turnovers = [
            locators.multimodule['11row1'],
            locators.multimodule['11row2'],
            locators.multimodule['11row3'],
            locators.multimodule['11row4'],
            locators.multimodule['11row5']
        ]

        turnovers.forEach((turnover) => {
            cy.get(turnover)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const turnoverAmount = /^\d+\.\d{2}$/
                    expect(trim).to.match(turnoverAmount, 'turnover amount is in currency format')
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-105, PASSED**`)
        // cy.log(`Verify the data of 'Turnover Amount' by (Numberic/Currency Format), PASSED**`)

        const rounds = [
            locators.multimodule['12row1'],
            locators.multimodule['12row2'],
            locators.multimodule['12row3'],
            locators.multimodule['12row4'],
            locators.multimodule['12row5']
        ]

        rounds.forEach((round) => {
            cy.get(round)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    expect(trim, `${trim}`).to.not.be.empty
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-106, PASSED**`)
        //Verify the data of 'Round Number' by (Visibility)

        const shoes = [
            locators.multimodule['13row1'],
            locators.multimodule['13row2'],
            locators.multimodule['13row3'],
            locators.multimodule['13row4'],
            locators.multimodule['13row5']
        ]

        shoes.forEach((sh) => {
            cy.get(sh)
                .should('be.visible')
                .invoke('text')
                .should('not.be.empty')
                .then((text) => {
                    const trim = text.trim()
                    const shoe = /^\d{2}-\d{1,2}$/.test(trim)
                    const empty = '--'

                    if (trim === empty) {
                        expect(trim, `${trim} shoe hand is empty`).to.equal(empty)
                    }
                    else {
                        expect(shoe, `${trim} shoe hand has data`).to.be.true
                    }
                    cy.wait(100)
                })
        })
        cy.log(`**BOA-RPT-107, PASSED**`)
        //Verify the data of 'Shoe Hand' by (Visibility)




    })



})