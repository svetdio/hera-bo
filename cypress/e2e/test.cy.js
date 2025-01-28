import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
        
        cy.visit('/')
        cy.navigateToBettingHistory()
    })

    it('Betting Transaction', () => {
        // const vendorName = ['og', 'viva','CG']
        // const column23 = '#tableBody > tr:first-child > td:nth-child(23)' 
        // const trimmed = ['viv', 'mx', 'che']

        // cy.reportRequiredFields()
                        
        // trimmed.forEach((fuzzyVendor) => {
        //     cy.get(locators.multimodule['form-input6']).type(fuzzyVendor, { delay: 200, force: true }).then(() => {
        //         cy.get(locators.multimodule['dropdown-name'])
        //             .should('be.visible')
        //             .contains(new RegExp(`${fuzzyVendor}`, 'i'))
        //             .click()
        //     })
        //     cy.search()
        //     cy.wait(1000)
        //     cy.get(locators.multimodule['table']).then(table => {
        //         if (table.find(locators.multimodule['noData']).length > 0) {
        //             cy.contains('No data available', { timeout: 20000 }).should('be.visible')
        //         } else {
        //             cy.contains('No data available', { timeout: 20000 }).should('not.exist')
        //             cy.get(column23).should('exist').then(($column23) => {
        //                 const vendor = $column23.text().trim()
        //                 const isMatching = trimmed.some(fuzzy => vendor.includes(fuzzy))
        //                 expect(isMatching).to.be.true
        //             })
        //         }
        //     cy.wait(500)
        //     })
        // })

        
        // const status = ['All', 'Debit', 'Credit','Cancel', 'Resettle', 'Rollback']
        // const column16 = '#tableBody > tr:first-child > td:nth-child(16)' 

        // cy.reportRequiredFields()
                        
        //         cy.get(locators.multimodule['form-input5']).should('exist')
        //         cy.get(locators.multimodule['selection']).contains('All')
        //         cy.search()
        
        //         cy.rows()
                
        //         cy.get(column16).should('exist').then(($column16) => {
        //             const stats = $column16.text().trim()
        //             expect(status).to.include(stats)
        //         })


        
        // cy.get(column16).should('exist').then(($column16) => {
        //     const stats = $column16.text().trim()
        //     expect(status).to.include(stats)
        // })

        const status = ['All', 'Debit', 'Credit','Cancel', 'Resettle', 'Rollback']
                const column16 = '#tableBody > tr:first-child > td:nth-child(16)' 
                const trimmed = ['deB', 'dit', 'roll', 'Cel']
        
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
                            // cy.get(column16).should('exist').then(($column16) => {
                            //     const stats = $column16.text().trim()
                            //     const isMatching = trimmed.some(fuzzy => stats.includes(fuzzy))
                            //     expect(isMatching).to.be.true
                            // })
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
                cy.rows() 
                cy.get(locators.multimodule['noData'])
                    .should('exist')
                    .contains('No data available')
                cy.log(`Verify the Transaction Status value in Search Criteria using (Invalid Type In), PASSED`)
        
                cy.clearFields()
        
                cy.reportRequiredFields()
                                                        
                cy.get(locators.multimodule['form-input5']).type('Cancel' + '{enter}', {force: true})
                cy.search()
        
                cy.rows()
                
                cy.get(column16).should('exist').then(($column16) => {
                    const stats = $column16.text().trim()
                    expect('Cancel').to.include(stats)
                })
                cy.log(`Verify the Transaction Status value in Search Criteria using (Enter Key), PASSED`)





            
            

            
            
    })
    
})