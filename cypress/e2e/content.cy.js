import locators from "../support/locators"

describe('Content Management Module Test', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    //Player submodule
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

        //Operator Name
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

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.content.comboxTable1
                for (const key in table) {
                    cy.get(locators.content.comboxTable1[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { force: true, delay: 100 })
                        cy.get(locators.content.filter['dropdown']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.comboxTable1[key]).contains(element.text())
                        // cy.get(locators.content.filter['reset'])
                    })
                }
            }   
        })

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.content.inputTable1
                for (const key in table) {
                    cy.get(locators.content.inputTable1[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { delay: 100 })
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
                        cy.get(locators.content.inputTable1[key]).contains(element.text()) 
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        // cy.get(locators.profile.activity['preloader'], { timeout: 100000 }).should('not.be.visible')
        // cy.wait(1000)

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Player export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
        
    })

    //Operator submodule
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

        //Input
        cy.get(locators.content.filter['operator']).type(operator, {delay: 200})
        cy.get(locators.content['search']).click()
        cy.wait(500)

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.content.comboxTable2
                for (const key in table) {
                    cy.get(locators.content.comboxTable2[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { force: true, delay: 100 })
                        cy.get(locators.content.filter['dropdown']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.comboxTable2[key]).contains(element.text())
                        // cy.get(locators.content.filter['reset'])
                    })
                }
            }   
        })

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Operator export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i <= 2; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    
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

    //Vendor submodule
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

        //Input
        cy.get(locators.content.filter['vendor']).type(vendor, { delay: 100 })
        cy.get(locators.report.filter['search']).click()
        cy.wait(500)

        //Dropdown
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.content.comboxTable3
                for (const key in table) {
                    cy.get(locators.content.comboxTable3[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { force: true, delay: 100 })
                        cy.get(locators.content.filter['dropdown']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
                        cy.get(locators.content.filter['dropdown-name']).each($element => {
                            if ($element.text().trim() === element.text().trim()){
                                cy.wrap($element).click()
                            }
                        })
                        cy.get(locators.content.filter['search']).click()
                        cy.wait(1000)
                        cy.get(locators.content.comboxTable3[key]).contains(element.text())
                    })
                }
            }   
        })

        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Vendor export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
                        cy.wrap($spans.eq(i))
                            .should('be.visible')
                            .and('contain.text', 'All')
                        cy.log(`Validated span element at index ${i} with text "All".`);
                    }
                })
                    
                cy.get(locators.profile.activity['table']).should('contain', 'No data available')
            })

        cy.log('All tests passed successfully!')
    })

    //Games submodule
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
                        // cy.get(locators.content.filter['reset']).click()
                        // cy.get(locators.profile.activity['table']).should('contain', 'No data available')
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
        // cy.get(locators.content.filter['form-input6']).contains('baccarat')
        // cy.get(locators.content.filter['reset']).click()
        // cy.get(locators.profile.activity['table']).should('contain', 'No data available')
        
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

    //Sub Game Type submodule
    it ('Sub Game Type', () => {
        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['sub-game']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Sub Game Type Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Sub Game Type')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Game Type')    
            .should('contain.text', 'Sub Game Type')
                
        //Sub Game Type (Input)
        cy.get(locators.content.filter['subgame-type']).type('baccarat')
        cy.get(locators.content.filter['search']).click()
        cy.get(locators.content.filter['subgame-type']).clear()

        //Game Type (Dropdown)
        cy.get(locators.content.filter['form-input1']).type('Chess Game', { force: true, delay: 100 })
        cy.get(locators.content.filter['dropdown']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).each($element => {
            if ($element.text() === 'Chess Game'){
                cy.wrap($element).click()
            }
        })
        cy.get(locators.content.filter['search']).click()
        // cy.get(locators.content.filter['reset']).click()
        // cy.get(locators.profile.activity['table']).should('contain', 'No data available')
        cy.wait(500)
    
        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Sub-Game Type export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

        cy.get(locators.content.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
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

    //Bet Limit Sets submodule
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
            .should('contain.text', 'Currency') // Currency
            .should('contain.text', 'Minimum Bet Amount')    
            .should('contain.text', 'Maximum Bet Amount')
                
        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.content.inputTable4
                for (const key in table) {
                    cy.get(locators.content.inputTable4[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { delay: 100 })
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.inputTable4[key]).contains(element.text())
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        //Dropdown
        cy.get(locators.content.filter['form-input2']).type('CNY', {force: true, delay: 100 })
        cy.get(locators.content.filter['dropdown']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).should('be.visible')
        cy.get(locators.content.filter['dropdown-name']).each($element => {
            if ($element.text() === 'CNY'){
                cy.wrap($element).click()
            }
        })
        // cy.get(locators.content.filter['form-input2']).contains('CNY')
        cy.get(locators.content.filter['search']).click()
        // cy.get(locators.content.filter['reset']).click()
        // cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')
        cy.wait(500)
        // cy.get(locators.profile.activity['rows']).then((rows) => {
        //     const count = rows.length;
        //     if (count == 1) {
        //         const table = locators.content.comboxTable5
        //         for (const key in table) {
        //             cy.get(locators.content.comboxTable5[key]).then(element => {
        //                 cy.get(locators.content.filter[key]).type(element.text(), { force: true })
        //                 cy.get(locators.content.filter['dropdown']).should('be.visible')
        //                 cy.get(locators.content.filter['dropdown-name']).should('be.visible')
        //                 cy.get(locators.content.filter['dropdown-name']).each($element => {
        //                     if ($element.text().trim() === element.text().trim()){
        //                         cy.wrap($element).click()
        //                     }
        //                 })
        //                 cy.get(locators.content.filter['search']).click()
        //                 cy.get(locators.content.comboxTable5[key]).contains(element.text())
        //                 cy.get(locators.content.filter['reset']).click()
        //                 cy.get(locators.profile.activity['table']).should('contain', 'No data available')
        //             })
        //         }
        //     }   
        // })
    
        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Bet Limit Sets export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

       cy.get(locators.content.filter['reset']).click()
            .then(() => {
                cy.get(locators.report.filter['selection']).then(($spans) => {
                    // Validate the next three spans contain "All"
                    for (let i = 0; i == 0; i++) {
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
    //Currency
    it ('Currency', () => {
        cy.visit('/')
        cy.get(locators.content['content']).click()
        cy.get(locators.content['container']).should('be.visible')
        cy.get(locators.content['currency']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Currency Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Currency')
        cy.get(locators.report.filter['form'])
            .should('contain.text', 'Currency ID')    
            .should('contain.text', 'Currency')

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length;
            if (count >= 1) {
                const table = locators.content.inputTable5
                for (const key in table) {
                    cy.get(locators.content.inputTable5[key]).then(element => {
                        cy.get(locators.content.filter[key]).type(element.text(), { delay: 100 })
                        cy.get(locators.content.filter['search']).click()
                        cy.get(locators.content.inputTable5[key]).contains(element.text())
                        cy.get(locators.content.filter[key]).clear()
                    })
                }
            }   
        })

        cy.wait(500)
    
        //Export Table
        cy.get(locators.content.filter['export']).click()
        cy.get(locators.content.filter['pop-up']).should('be.visible')
        cy.get(locators.content.filter['pop-up-head']).contains('OGAPIIntegration')
        cy.get(locators.content.filter['pop-up-body']).contains('Your Currency export is currently in progress. You will be notified once it is complete.')
        cy.get(locators.content.filter['bell']).click()
        cy.get(locators.content.filter['notif']).click()

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