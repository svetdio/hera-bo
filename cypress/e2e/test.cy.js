import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
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
    
            // Input
            cy.get(locators.profile.activity['rows']).then((rows) => {
                const count = rows.length;
                if (count == 1) {
                    const table = locators.content.inputTable2
                    for (const key in table) {
                        cy.get(locators.content.inputTable2[key]).then(element => {
                            cy.get(locators.content.filter[key]).type(element.text(), { delay: 100 })
                            cy.get(locators.content.filter['search']).click()
                            cy.get(locators.content.inputTable2[key]).contains(element.text())
                            cy.get(locators.content.filter[key]).clear()
                        })
                    }
                }   
            })
        
            //Dropdown
            cy.get(locators.profile.activity['rows']).then((rows) => {
                const count = rows.length;
                if (count == 1) {
                    const table = locators.content.comboxTable4
                    for (const key in table) {
                        cy.get(locators.content.comboxTable4[key]).then(element => {
                            cy.get(locators.content.filter[key]).type(element.text(), { force: true, delay: 100 })
                            cy.get(locators.content.filter['dropdown']).should('be.visible')
                            cy.get(locators.content.filter['dropdown-name']).should('be.visible')
                            cy.get(locators.content.filter['dropdown-name']).each($element => {
                                if ($element.text().trim() === element.text().trim()){
                                    cy.wrap($element).click()
                                }
                            })
                            cy.get(locators.content.filter['search']).click()
                            cy.get(locators.content.comboxTable4[key]).contains(element.text())
                            cy.get(locators.content.filter['reset']).click()
                            cy.get(locators.profile.activity['table']).should('contain', 'No data available')
                        })
                    }
                }   
            })
    
            //Sub Game Type
            cy.get(locators.content.filter['form-input6']).type('baccarat', {force: true, delay: 100 })
            cy.get(locators.content.filter['dropdown']).should('be.visible')
            cy.get(locators.content.filter['dropdown-name']).should('be.visible')
            cy.get(locators.content.filter['dropdown-name']).each($element => {
                if ($element.text() === 'baccarat'){
                    cy.wrap($element).click()
                }
            })
            cy.get(locators.content.filter['search']).click()
            
            //Export Table
            cy.get(locators.content.filter['export']).click()
            
            cy.get(locators.content.filter['pop-up']).should('be.visible')
            cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
            cy.get(locators.content.filter['pop-up-body']).contains('Your Game export is currently in progress. You will be notified once it is complete.')
            cy.get(locators.content.filter['bell']).click()
            cy.get(locators.content.filter['notif']).click()
    
            cy.get(locators.content.filter['reset']).click()
                .then(() => {
                    cy.get(locators.report.filter['selection']).then(($spans) => {
                        // Validate the next three spans contain "All"
                        for (let i = 0; i <= 4; i++) {
                            cy.wrap($spans.eq(i))
                                .should('be.visible')
                                .and('contain.text', 'All')
                            cy.log(`Validated span element at index ${i} with text "All".`);
                        }
                    })
                        
                    cy.get(locators.profile.activity['table']).should('contain', 'No data available')
                })

            cy.then(() => {
                cy.log('All tests passed successfully!')
            })
        })
    
})