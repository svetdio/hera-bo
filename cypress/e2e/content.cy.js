import locators from "../support/locators"

describe('Content Management Test', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it ('Player', () => {
        const operator = Cypress.env('operator')

        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['player']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Player Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Player')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Player ID')
            .should('contain.text', 'Status')

        cy.get(locators.content.filter['operator']).type(operator, {delay: 200})
        cy.get(locators.content.filter['operator-dropdown']).should('be.visible')
        cy.get(locators.content.filter['parent-operator']).should('be.visible')
        cy.get(locators.content.filter['operator-name']).should('be.visible')
        cy.get(locators.content.filter['operator-name']).each($element => {
            if ($element.text() === operator){
                cy.wrap($element).click()
            }
        })

        cy.get(locators.content.filter['sub-operator']).click();
        cy.get(locators.content.filter['check']).should('be.visible');
        cy.get(locators.report.filter['search']).click()

        cy.wait(500)
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count == 1) {
                const table = locators.report.table1
                for (const key in table) {
                    cy.get(locators.content.table1[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text())
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.table1[key]).contains(element.text())
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Player export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
        
    })

    it('Operator', () => {
        const operator = Cypress.env('operator');
        cy.visit('/')

        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['operator']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Operator Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Operator')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Operator Name')
            .should('contain.text', 'Currency')
            .should('contain.text', 'Wallet Type')
            .should('contain.text', 'Status')

        cy.get(locators.content.filter['operator']).type(operator)
        cy.get(locators.content['search']).click()

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Operator export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })

    })

    // it('Add Operator', () => {
    //     cy.visit('/')

    //     cy.get(locators.content['content']).click()
    //     cy.get(locators.content['operator']).click()
    //     cy.get(locators.content['add-operator']).click()
    //     cy.get(locators.content.add_operator['operator-name']).type('testing')
    // })

    // it('Vendor', () => {
    //     cy.visit('/')

    //     cy.get(locators.content['content']).click()
    //     cy.get(locators.content['vendor']).click()
    //     cy.get(locators.content['vendor-name']).type('CG')
    //     cy.get(locators.content['search']).click()
    // })

    it ('Vendor', () => {
        const vendor = Cypress.env('vendor')

        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['vendor']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Vendor Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Vendor')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Status')

        cy.get(locators.content.filter['vendor']).type(vendor)
        cy.get(locators.report.filter['search']).click()

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Vendor export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })

    it ('Games', () => {
        const vendor = Cypress.env('vendor')

        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['games']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Player Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Games')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Vendor Name')
            .should('contain.text', 'Game ID')
            .should('contain.text', 'Game Code')
            .should('contain.text', 'Game Name')
            .should('contain.text', 'Game Type')    
            .should('contain.text', 'Sub Game Type')
            .should('contain.text', 'Status')
            .should('contain.text', 'Jackpot Game')

        cy.get(locators.content.filter['vendor']).type(vendor, {delay: 100, force: true })
        cy.get(locators.content.filter['vendor-dropdown']).should('be.visible')
        cy.get(locators.content.filter['vendor-name']).should('be.visible')
        cy.get(locators.content.filter['vendor-name']).each($element => {
            if ($element.text() === vendor){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.content.filter['search']).click()
        cy.get(locators.content.filter['reset']).click()

        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count == 1) {
                const table = locators.content.table2
                for (const key in table) {
                    cy.get(locators.content.table2[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text())
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.table2[key]).contains(element.text())
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Game export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!');
        })
    })
})