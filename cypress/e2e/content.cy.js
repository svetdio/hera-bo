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

        cy.get(locators.content.filter['operator']).type(operator, {delay: 100})
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

    // it('Operator', () => {
    //     // const operator = Cypress.env('type')

    //     cy.visit('/')

    //     cy.get(locators.content['content']).click()
    //     cy.get(locators.content['operator']).click()
    //     cy.get(locators.content['operator-name']).type('testerQA12')
    //     cy.get(locators.content['search']).click()
    
        

    //     cy.get(locators.report.filter['operator-dropdown']).should('be.visible')
    //     cy.get(locators.report.filter['parent-operator']).should('be.visible')
    //     cy.get(locators.report.filter['operator-name']).should('be.visible')
    //     cy.get(locators.report.filter['operator-name']).each($element => {
    //         if ($element.text() === operator){
    //             cy.wrap($element).click()
    //         }
    //     })
    //     cy.get(locators.report.filter['search']).click()
    // })

    // it('Add Operator', () => {
    //     cy.visit('/')

    //     cy.get(locators.content['content']).click()
    //     cy.get(locators.content['operator']).click()
    //     cy.get(locators.content['add-operator']).click()
    //     cy.get(locators.content.add_operator['operator-name']).type('testing')
    //     // cy.get(locators.content.add_operator['parent-operator']).type('testerQA12')
    // })

    // it('Vendor', () => {
    //     cy.visit('/')

    //     cy.get(locators.content['content']).click()
    //     cy.get(locators.content['vendor']).click()
    //     cy.get(locators.content['vendor-name']).type('CG')
    //     cy.get(locators.content['search']).click()
    // })
})