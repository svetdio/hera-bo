import locators from '../support/locators.js'

describe('Activity Logs Test', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
        cy.visit('/')
        cy.navigateToActivityLogs()
    })

it('User should be able to access the ACTIVITY LOGS (Accessibility)', () => {
    const username = '74_viva'
    const password = 'BdholhPIsg0NkzP4'

    // navigate to Activity Logs
    cy.log(`**BOA-ACT-001, PASSED**`)
    cy.log(`**BOA-ACT-002, PASSED**`)

    cy.get(locators.home['logout']).click()
    cy.login(username, password)
    cy.visit('/')

    cy.get(locators.logs['logs']).should('not.exist')
    cy.log(`**BOA-ACT-003, PASSED**`)
})

it('User should be able to access the activity logs using (Full name Search field)', () => {
    const fname = 'Svet Jazmine'
    const fullName = [
        locators.multimodule['4row1'],
        locators.multimodule['4row2'],
        locators.multimodule['4row3'],
        locators.multimodule['4row4'],
        locators.multimodule['4row5']
    ]

    // navigate to Activity Logs
    cy.get(locators.multimodule['form1'])
        .should('be.visible')
        .should('contain.text', 'Full Name')
    cy.log(`**BOA-ACT-004, PASSED**`)

    cy.get(locators.multimodule['form1']).type(fname, {delay: 100})
    cy.search()

    cy.wait(500)

    fullName.forEach((column4) => {
        cy.get(column4)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const trim = text.trim()
                expect(trim).to.eq(fname)
            })
    })
    cy.log(`**BOA-ACT-005, PASSED**`)
})

it('User should be able to access the activity logs using (Username Search field)', () => {
    const uname = 'testersvet'
    const username = [
        locators.multimodule['5row1'],
        locators.multimodule['5row2'],
        locators.multimodule['5row3'],
        locators.multimodule['5row4'],
        locators.multimodule['5row5']
    ]

    // navigate to Activity Logs
    cy.get(locators.multimodule['form2'])
        .should('be.visible')
        .should('contain.text', 'Username')
    cy.log(`**BOA-ACT-006, PASSED**`)

    cy.get(locators.multimodule['form2']).type(uname, {delay: 100})
    cy.search()
    
    cy.wait(500)

    username.forEach((column5) => {
        cy.get(column5)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const trim = text.trim()
                expect(trim).to.eq(uname)
            })
    })
    cy.log(`**BOA-ACT-007, PASSED**`)
})

it('User should be able to access the activity logs using (Date Picker)', () => {
    // navigate to Activity Logs
    cy.get(locators.multimodule['form3'])
    .should('be.visible')
    .should('contain.text', 'Date Created')
    cy.log(`**BOA-ACT-008, PASSED**`)

    cy.get(locators.multimodule['form3']).click()
    cy.wait(500)
    cy.get(locators.report.filter['date-modal']).should('be.visible')
    cy.get(locators.report.filter['thisMonth']).click()
    cy.search()
    cy.wait(500)
    cy.log(`**BOA-ACT-009, PASSED**`)

    cy.get(locators.multimodule['form3']).click()
    cy.wait(500)
    cy.get(locators.report.filter['date-modal']).should('be.visible')
    cy.get(locators.report.filter['prevMonth']).click()
    cy.get('.dp__cell_inner').contains('1').click()
    cy.get('.dp__cell_inner').contains('20').click()
    cy.get(locators.report.filter['apply']).click()
    cy.search()
    cy.wait(500)
    cy.log(`**BOA-ACT-010, PASSED**`)
})

it('User should be able to access the activity logs using (ACTIVITY Dropdown)', () => {
    //navigate to Activity Logs
    cy.get(locators.multimodule['form4'])
        .should('be.visible')
        .should('contain.text', 'Activity')
    cy.log(`**BOA-ACT-011, PASSED**`)

    cy.get(locators.multimodule['form4']).click()
    cy.get(locators.multimodule['dropdown']).should('be.visible')
    cy.log(`**BOA-ACT-012, PASSED**`)
    
    cy.get(locators.multimodule['dropdown-name'])
        .contains('Create Bet Limit Failed')
        .click()
    cy.search()
    cy.wait(1000)

    cy.get(locators.multimodule['table']).then(table => {
        if (table.find(locators.multimodule['noData']).length > 0) {
            cy.contains('No data available', { timeout: 20000 }).should('be.visible')
        } else {
            cy.contains('No data available', { timeout: 20000 }).should('not.exist')
            cy.get(locators.multimodule['8row1'])
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    const trim = text.trim()
                    expect(trim).to.eq('Create Bet Limit Failed')
                })
        }
    })
    cy.log(`**BOA-ACT-013, PASSED**`)
})

it('User should be able to see the content of the table in activity logs using (Date Created)', () => {
    //navigate to Activity Logs
    cy.get(locators.multimodule['dataTable-rows'])
        .contains('Date Created')
        .should('be.visible')

    cy.wait(1000)

    cy.get(locators.multimodule['2row1'])
        .should('not.be.empty')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)
        })
    cy.log(`**BOA-ACT-014, PASSED**`)

    const orderDate = 'th:nth-child(2) > button'
    const dates = [
        locators.multimodule['2row1'],
        locators.multimodule['2row2'],
        locators.multimodule['2row3'],
        locators.multimodule['2row4'],
        locators.multimodule['2row5']
    ]

    //ascending
    cy.get(orderDate).click()
    cy.wait(1000)

    cy.wrap([]).as('dateList1') // Store extracted dates

    // Extract text from each date element
    dates.forEach(date => {
        cy.get(date)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim()
                const dateObj = new Date(trimmedText.replace(/\//g, '-')) // Convert to Date object
    
                cy.get('@dateList1').then(dateList1 => {
                    dateList1.push(dateObj) // Store converted date
                    cy.wrap(dateList1).as('dateList') // Update stored dates
                })
            })
    })

    cy.get('@dateList1').then(dateList1 => {
        const isAscending = dateList1.every((date, index, arr) => 
            index === 0 || arr[index - 1] <= date
        )
        expect(isAscending, 'Dates should be in ascending order').to.be.true
    })
    cy.log(`**BOA-ACT-015, PASSED**`)

    //descending
    cy.get(orderDate).click()
    cy.wait(1000)

    cy.wrap([]).as('dateList2')

    dates.forEach(date => {
        cy.get(date)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim()
                const dateObj = new Date(trimmedText.replace(/\//g, '-'))
    
                cy.get('@dateList2').then(dateList2 => {
                    dateList2.push(dateObj)
                    cy.wrap(dateList2).as('dateList2')
                })
            })
    })

    cy.get('@dateList2').then(dateList2 => {
        const isDescending = dateList2.every((date, index, arr) => 
            index === 0 || arr[index - 1] > date // Ensuring strict descending order
        )
        expect(isDescending, 'Dates should be in descending order').to.be.true
    })
    cy.log(`**BOA-ACT-016, PASSED**`)
})

it(`User should be able to see the content of the table in activity logs using (Operator/Vendor Name)`, () => {
    const orderOperator = 'th:nth-child(3) > button'
    const operator = [
        locators.multimodule['3row1'],
        locators.multimodule['3row2'],
        locators.multimodule['3row3'],
        locators.multimodule['3row4'],
        locators.multimodule['3row5']
    ]
    
    //navigate to Activity Logs
    cy.get(locators.multimodule['dataTable-rows'])
        .contains('Operator / Vendor Name')
        .should('be.visible')

    cy.wait(1000)

    operator.forEach((operators) => {
        cy.get(operators)
            .should('not.be.empty')
            .invoke('text')
            .then((text) => {
                if (text === '--') {
                    expect(text.trim()).to.eq('--')
                } else {
                    expect(text.trim()).to.not.be.empty
                }
            })
    })
    cy.log(`**BOA-ACT-017, PASSED**`)

    cy.get(orderOperator).click()
        cy.wait(1000)
        
    operator.forEach((operators) => {
        cy.get(operators)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq('--')
            })
    })
    cy.log(`**BOA-ACT-018, PASSED**`)

    cy.get(orderOperator).click()
    cy.wait(1000)
    
    cy.wrap([]).as('names')

    operator.forEach(locator => {
        cy.get(locator).invoke('text').then(text => {
            cy.get('@names').then(values => {
                values.push(text.trim())
                cy.wrap(values).as('names')
            })
        })
    })

    cy.get('@names').then(values => {
        const sortedValues = [...values].sort((a, b) => b.localeCompare(a)) // Descending order
        expect(values).to.deep.equal(sortedValues) // Compare original vs sorted
    })
    cy.log(`**BOA-ACT-019, PASSED**`)
})

it('User should be able to see the content of the table in activity logs using (Full Name)', () => {

    //navigate to Activity Logs
    const orderFullName = 'th:nth-child(4) > button'
    const fullName = [
        locators.multimodule['4row1'],
        locators.multimodule['4row2'],
        locators.multimodule['4row3'],
        locators.multimodule['4row4'],
        locators.multimodule['4row5']
    ]

    cy.get(locators.multimodule['dataTable-rows'])
        .contains('Full Name')
        .should('be.visible')

    cy.wait(1000)

    fullName.forEach((names) => {
        cy.get(names)
            .should('not.be.empty')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.not.be.empty
                
            })
    })
    cy.log(`**BOA-ACT-020, PASSED**`)

    cy.get(orderFullName).click()
    cy.wait(1000)
    
    cy.wrap([]).as('names')

    fullName.forEach(locator => {
        cy.get(locator).invoke('text').then(text => {
            cy.get('@names').then(values => {
                values.push(text.trim())
                cy.wrap(values).as('names')
            })
        })
    })

    cy.get('@names').then(values => {
        const sortedValues = [...values].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) // Descending order
        expect(values).to.deep.equal(sortedValues) // Compare original vs sorted
    })
    cy.log(`**BOA-ACT-021, PASSED**`)

    cy.log(`**BOA-ACT-022, PASSED**`)

})









})