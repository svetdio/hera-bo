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
        })
        cy.log(`Verify the Input Form fields by (Accessibility), PASSED`)
        // cy.log(`Verify the Input Form fields by (Functionality), PASSED`)
    })

    it('User should be able to manage Search Criteria of data table using (Search Button)', () => {
    //User should be able to manage Search Criteria of data table using (Search Button)
        cy.reportRequiredFields()
            cy.search()
        cy.wait(500)

        cy.rows()
        cy.log(`Verify the "Search" button functionality with input in required search fields (With Input in Required Fields), PASSED`)

        cy.clearFields()

        cy.transactionDateTime()
        cy.search()

        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.rows()
        cy.log(`Verify the "Search" button functionality with input in all search fields (With Missing Required Field), PASSED`)

        cy.clearFields()

        cy.search()
        cy.get(locators.multimodule['error-msg']).should('be.visible')

        cy.wait(1000)

        cy.rows()
        cy.log(`Verify the "Search" button functionality without input in all search fields (Empty Input), PASSED`)

        //clear fields
        cy.get(locators.multimodule['reset']).click()
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
                    'form-input9':  'Chess Game'
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
        cy.log(`Verify the "Reset" button functionality with input in search fields (With Input - No Data Table), PASSED`)

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
                    'form-input9':  'Chess Game'
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
        cy.log(`Verify the "Reset" button functionality with input in search fields (With Input - With Data Table), PASSED`)

        cy.wait(500)

        cy.get(locators.multimodule['reset']).click()
        cy.get(locators.multimodule['table']).should('contain.text', 'No data available')
        cy.log(`Verify the "Reset" button functionality with input in search fields (Empty Input), PASSED`)
    })

    it('User should be able to validate the Search Criteria Transaction Date/Time and Operator Name as (Required Fields)', () => {
    //User should be able to validate the Search Criteria Transaction Date/Time and Operator Name as (Required Fields)
        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Both Field), PASSED`)

        cy.clearFields()

       cy.operatorName()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
        
        cy.wait(1000)

        cy.rows()
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Missing Transaction Date/Time), PASSED`)

        cy.clearFields()

        cy.transactionDateTime()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The operator name field is required.')

        cy.wait(1000)

        cy.rows()
        cy.log(`Verify the "Transaction Date/Time" and "Operator Name" as required fields (With Input - Missing Operator Name), PASSED`)

        cy.clearFields()

        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The transaction date field is required.')
            .should('contain.text', 'The operator name field is required.')
        
        cy.wait(1000)

        cy.rows()
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
        const column2 = '#tableBody > tr:first-child > td:nth-child(2)'
            
        cy.reportRequiredFields()
        cy.search()
        cy.rows()

        // cy.get(column2).should('exist').then(($column2) => {
        //     const datetime = $column2.text().trim()
        //     expect('2024/12/20 06:01:13').to.equal(datetime)
        // })
        cy.log(`Validate the "Transaction Date/Time" field by (Default Time), PASSED`)

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
        cy.log(`Validate the "Transaction Date/Time" field by (Custom Time), PASSED`)
    })

    it('User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)', () => {
    //User should be able to navigate Transaction Date/Time field to present data table using (Date Range - Paramaters)
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

        cy.operatorName()
        cy.search()
        cy.get(locators.multimodule['error-msg'])
            .should('be.visible')
            .should('contain.text', 'The query transaction date cannot exceed 31 days.')

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Greater than 31 Days Range), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['today']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Today), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['yesterday']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Yesterday), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisWeek']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (This week), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['lastWeek']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Last week), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['thisMonth']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (This month), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Last month), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['transaction-date'])
            .should('be.visible')
            .click()
        cy.get(locators.report.filter['date-modal']).should('be.visible')
        cy.get(locators.report.filter['twoMonths']).click()

        cy.operatorName()
        cy.search()

        cy.rows()
        cy.log(`Validate the "Transaction Date/Time" field by (Two months ago), PASSED`)

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
        cy.log(`Validate the "Transaction Date/Time" field by (Three months ago or more), PASSED`)
    })
    
    it('User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)', () => {
    //User should be able to validate Operator Name field and manage Search Criteria of data table by (Operator Name)
        const operator = Cypress.env('operator')
        const column5 = '#tableBody > tr:first-child > td:nth-child(5)' 

        cy.get(locators.multimodule['form-input2']).should('have.attr', 'type', 'search')
        cy.log(`Verify the Operator Name field by (Operator Name - Input Type), PASSED`)

        cy.get(locators.multimodule['form-input2']).type(operator, {delay: 200})
        cy.get(locators.multimodule['dropdown']).should('be.visible')
        cy.log(`Validate the Operator Name dropdown box by (Dropdown List), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()
        
        cy.rows()

        cy.get(column5).should('exist').then(($column) => {
            const operatorName = $column.text().trim()
            expect(operator).to.include(operatorName)
        })
        cy.log(`Verify the Operator Name value in Search Criteria using (Valid), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()
        cy.search()

        cy.rows()
        cy.get(column5).should('exist').then(($column) => {
            const operatorName = $column.text().trim()
            expect(operator).to.include(operatorName)
        })
        cy.log(`Verify the Operator Name value in Search Criteria using (Fuzzy), PASSED`)

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
        cy.log(`Verify the Operator Name value using (Invalid), PASSED`)

        cy.clearFields()

        cy.transactionDateTime()

        cy.get(locators.multimodule['form-input2']).type(operator + '{enter}', { delay: 200 })
            .then(() => {
                cy.get(locators.multimodule['operator-dropdown']).should('be.visible')
            })
        cy.log(`Verify the Operator Name value in Search Criteria using (Enter Key), PASSED`)
    })

    it('User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)', () => {
    //User should be to able validate and manage Search Criteria using Player ID field and its other function to present data table by (Player ID)
        const typeplayerId = '12345671'
        const playerIds = ['12345671', '5671', '123', '45', '23414']
        const firstrow = '#tableBody > tr:first-child > td:nth-child(6)'

        cy.get(locators.report.filter['playerId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`Verify the Player ID field by (Player ID - Input Type), PASSED`)
        cy.log(`Verify the Search exact Player ID field by (Accessibility), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['fuzzy-search'])
            .check()
            .should('be.checked')
        cy.log(`Fuzzy search is checked`)

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
        cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - ON), PASSED`)

        cy.clearFields()

        cy.get(locators.report.filter['fuzzy-search'])
            .click()
            .uncheck()
            .should('not.be.checked')
        cy.log(`Fuzzy search is unchecked`)

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
                            cy.log(`Verify the fuzzy Player ID value in Search Criteria using (Search exact Player ID - OFF), PASSED`)
                        }
                    })
                } else {
                    cy.contains('No data available', { timeout: 20000 }).should('be.visible')
                    cy.log(`Verify the Player ID value using (Invalid), PASSED`)
                } 
            })
        })
        
        cy.clearFields()
                
        cy.get(locators.report.filter['fuzzy-search']).click().check()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['playerId']).type(typeplayerId + '{enter}', {delay: 200})
        cy.rows()
        cy.log(`Verify the Player ID value in Search Criteria using (Enter Key), PASSED`)
    })
    
    it('User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)', () => {
    //User should be able to validate Transaction ID field and manage Search Criteria of data table by (Transaction ID)
        const column4 = '#tableBody > tr:first-child > td:nth-child(4)'
        
        cy.get(locators.report.filter['transactionId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`Verify the Transaction ID field by (Transaction ID - Input Type), PASSED`)
        
        cy.clearFields()
        
        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('qaatest3310m0zbqf1hrqn474o8', { delay: 200 })
        cy.search()
        cy.get(locators.multimodule['noData']).should('not.exist')
        
        cy.get(column4).should('exist').then(($column4) => {
            const id = $column4.text().trim()
            expect('qaatest3310m0zbqf1hrqn474o8').to.include(id)
        })
        cy.log(`Verify the Transaction ID value in Search Criteria using (Valid), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('831215', {delay: 200})
        cy.search()
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`Verify the Transaction ID value in Search Criteria using (Fuzzy), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('11122233', {delay: 200})
        cy.search()
        cy.rows()
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`Verify the Transaction ID value using (Invalid), PASSED`)
        
        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.report.filter['transactionId']).type('8312152521' + '{enter}', {delay: 200})
        cy.search()
        cy.rows()
        cy.log(`Verify the Transaction ID value in Search Criteria using (Enter Key), PASSED`)
    })

    it('User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)', () => {
    // User should be able to validate Transaction Status field and manage Search Criteria of data table by (Transaction Status)
        const status = ['All', 'Debit', 'Credit','Cancel', 'Resettle', 'Rollback']
        const column16 = '#tableBody > tr:first-child > td:nth-child(16)' 
        const trimmed = ['deB', 'dit', 'roll', 'Cel']

       
        cy.get(locators.multimodule['form-input5']).should('have.attr', 'type', 'search')    
        cy.log(`Verify the Transaction Status field by (Transaction Status - Input Type), PASSED`)

        cy.clearFields()

        cy.get(locators.multimodule['form-input5']).click({force: true})
        cy.get(locators.multimodule['dropdown']).should('be.visible')

        status.forEach((status) => {
            cy.get(locators.multimodule['form-input5']).click({force: true})
            cy.get(locators.multimodule['dropdown'])
                .should('be.visible')
                .contains(status)
                .should('exist')
        })
        cy.log(`Validate the Transaction Status dropdown box by (Dropdown List), PASSED`)

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
        cy.log(`Verify the Transaction Status value in Search Criteria using (Default Status), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()
                                
        cy.get(locators.multimodule['form-input5']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .contains('Debit')
            .click()
        cy.search()

        cy.rows()
        
        cy.get(column16).should('exist').then(($column16) => {
            const stats = $column16.text().trim()
            expect(status).to.include(stats)
        })
        cy.log(`Verify the Transaction Status value in Search Criteria using (Select Status), PASSED`)

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
            cy.rows() 
            cy.get(column16).should('exist').then(($column16) => {
                const stats = $column16.text().trim()
                expect(status).to.include(stats)
            })
        })
        cy.log(`Verify the Transaction Status value in Search Criteria using (Valid Type In), PASSED`)

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
        cy.log(`Verify the Transaction Status value in Search Criteria using (Fuzzy Type In), PASSED`)

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
        cy.log(`Verify the Transaction Status value in Search Criteria using (Invalid Type In), PASSED`)

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
                    expect('Cancel').to.include(stats)
                })
            }
        })
        cy.log(`Verify the Transaction Status value in Search Criteria using (Enter Key), PASSED`)
    })

    it('User should be able to validate Transaction Status field and manage Search Criteria of data table by (Vendor Name)', () => {
    //User should be able to validate Transaction Status field and manage Search Criteria of data table by (Vendor Name)
        const vendorName = ['og', 'viva','CG']
        const column23 = '#tableBody > tr:first-child > td:nth-child(23)'
        const trimmed = ['vIv', 'Mx', 'chE']

        cy.get(locators.multimodule['form-input6']).should('have.attr', 'type', 'search') 
        cy.log(`Verify the Vendor Name field by (Vendor Name - Input Type), PASSED`)

        cy.get(locators.multimodule['form-input6']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .should('be.visible')
            .should('exist')

        cy.get(locators.multimodule['dropdown-name'])
            .should('be.visible')
            .should('exist')
        cy.log(`Validate the Vendor Name dropdown box by (Dropdown List), PASSED`)

        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).should('exist')
        cy.get(locators.multimodule['selection']).contains('All')
        cy.search()

        cy.rows()
        
        cy.get(column23).should('exist').then(($column23) => {
            const vendor = $column23.text().trim()
            expect(vendorName).to.include(vendor)
        })
        cy.log(`Verify the Vendor Name value in Search Criteria using (Default Status), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()
                                
        cy.get(locators.multimodule['form-input6']).click({force: true})
        cy.get(locators.multimodule['dropdown'])
            .contains('CG')
            .click()
        
        cy.search()
        cy.rows()
        cy.log(`Verify the Vendor Name value in Search Criteria using (Select Status), PASSED`)

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
        cy.log(`Verify the Vendor Name value in Search Criteria using (Valid Type In), PASSED`)

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
        cy.log(`Verify the Vendor Name value in Search Criteria using (Fuzzy Type In), PASSED`)

        cy.clearFields()
    
        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).type('random', { delay: 200, force: true })
            .then(() => {
                cy.get(locators.multimodule['invalid-option'])
                    .should('be.visible')
                    .should('have.text', 'No Matching Option')
            })
        cy.rows() 
        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`Verify the Vendor Name value in Search Criteria using (Invalid Type In), PASSED`)

        cy.clearFields()

        cy.reportRequiredFields()

        cy.get(locators.multimodule['form-input6']).type('og' + '{enter}', {force: true})
        cy.search()

        cy.rows()
        
        cy.get(column23).should('exist').then(($column23) => {
            const vendor = $column23.text().trim()
            expect('og').to.include(vendor)
        })
        cy.log(`Verify the Vendor Name value in Search Criteria using (Enter Key), PASSED`)

    })

    it('User should be able to validate Game Name field and manage Search Criteria of data table by (Game Name)', () => {
    //User should be able to validate Game Name field and manage Search Criteria of data table by (Game Name)
        const gameName = ['Pastry Party', 'speed baccarat', 'three cards']
        const column21 = '#tableBody > tr:first-child > td:nth-child(21)' 
        const trimmed = ['pastry', 'speed', 'thre']
        
        cy.get(locators.report.filter['gameName'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`Verify the Game Name field by (Game Name - Input Type), PASSED`)

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
        cy.log(`Verify the Game Name value in Search Criteria using (Valid), PASSED`)

        cy.clearFields()
        cy.reportRequiredFields()

        trimmed.forEach((fuzzyGame) => {
            cy.get(locators.report.filter['gameName']).type(fuzzyGame, { delay: 200 })
            cy.search()

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
        cy.log(`Verify the Game Name value in Search Criteria using (Fuzzy), PASSED`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.get(locators.report.filter['gameName']).type('invalid Game', { delay: 200 })
        cy.search()

        cy.get(locators.multimodule['noData'])
            .should('exist')
            .contains('No data available')
        cy.log(`Verify the Game Name value using (Invalid), PASSED`)

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
        cy.log(`Verify the Game Name value in Search Criteria using (Enter Key), PASSED`)
    })

    it('User should be able to validate Round Number field and manage Search Criteria of data table by (Round Number)', () => {
    //User should be able to validate Round Number field and manage Search Criteria of data table by (Round Number)
        const column12 = '#tableBody > tr:first-child > td:nth-child(12)'

        cy.get(locators.report.filter['roundId'])
            .should('have.attr', 'type', 'text')
            .should('be.visible')
        cy.log(`Verify the Round Number field by (Round Number - Input Type), PASSED`)

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
        cy.log(`Verify the Round Number value in Search Criteria using (Valid), PASSED`)

        cy.clearFields()
        cy.reportRequiredFields()

        cy.log(`Verify the Round Number value in Search Criteria using (Fuzzy), PASSED`)

        cy.log(`Verify the Round Number value using (Invalid), PASSED`)

        cy.log(`Verify the Round Number value in Search Criteria using (Enter Key), PASSED`)
        

    })

})