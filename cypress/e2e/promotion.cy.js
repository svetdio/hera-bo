import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Promotion Module Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it ('Promo Manage', () => {
        cy.visit('/')
        cy.get(locators.promotion['promo']).click()
        cy.get(locators.promotion['container']).should('be.visible')
        cy.get(locators.promotion['promo-manage']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Currency Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Promo Manage')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Promo Name')    

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.promotion.inputTable1
                for (const key in table) {
                    cy.get(locators.promotion.inputTable1[key]).then(element => {
                        cy.get(locators.promotion.filter[key]).type(element.text())
                        cy.get(locators.promotion.filter['search']).click()
                        cy.get(locators.promotion.inputTable1[key]).contains(element.text())
                        cy.get(locators.promotion.filter[key]).clear()
                    })
                }
            }   
        })

        cy.wait(500)
        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!')
        })
    })
})