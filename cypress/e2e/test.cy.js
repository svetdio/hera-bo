import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it ('Bet Limit Sets', () => {
        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['bet-limit']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Bet Limit Sets Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Bet Limit Sets')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Bet Limit ID')    
            .should('contain.text', 'Ban') // Currency
            .should('contain.text', 'Minimum Bet Amount')    
            .should('contain.text', 'Maximum Bet Amount')
                
        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count == 1) {
                const table = locators.content.table2
                for (const key in table) {
                    cy.get(locators.content.table2[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text())
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        //Currency (Dropdown)
        cy.get(locators.content.filter['dp1']).type('Chess Game', { force: true })
        cy.get(locators.content.filter['dropdown']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).each($element => {
            if ($element.text() === 'Chess Game'){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.content.filter['search']).click()
        cy.get(locators.content.filter['reset']).click()
        cy.get(locators.profile.activity['table']).should('contain', 'No data available')
        cy.wait(500)
    
        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Sub-Game Type export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.then(() => {
            cy.log('All tests passed successfully!')
        })
    })
})