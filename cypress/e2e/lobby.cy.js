import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Lobby Management Module Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it ('Media Components', () => {
        cy.visit('/')
        cy.get(locators.lobby['lobby']).click()
        cy.get(locators.lobby['container']).should('be.visible')
        cy.get(locators.lobby['media']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Currency Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Media Components')
        cy.get(locators.lobby.filter['form'])
            .should('contain.text', 'Section Code')    

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.lobby.inputTable1
                for (const key in table) {
                    cy.get(locators.lobby.inputTable1[key]).then(element => {
                        cy.get(locators.lobby.filter[key]).type(element.text())
                        cy.get(locators.lobby.filter['search']).click()
                        cy.get(locators.lobby.inputTable1[key]).contains(element.text())
                        cy.get(locators.lobby.filter[key]).clear()
                    })
                }
            }   
        })

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')
            })

        //Action Table
        cy.get(locators.lobby.filter['update'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Update Media Component')

        cy.get(locators.lobby.filter['upload'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Upload Media Component')
        
        cy.get(locators.lobby.filter['delete'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Delete Media Component')

        cy.get(locators.lobby.filter['hide'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Hide Media Component')
        
        cy.then(() => {
            cy.log('All tests passed successfully!')
        })
    })

    it ('Announcements', () => {
        cy.visit('/')
        cy.get(locators.lobby['lobby']).click()
        cy.get(locators.lobby['container']).should('be.visible')
        cy.get(locators.lobby['announce']).click()
        cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')

        //Currency Text Validation
        cy.get(locators.report['text-head']).should('contain.text', 'Announcements')
        cy.get(locators.lobby.filter['form'])
            .should('contain.text', 'Title')    

        //Input
        cy.get(locators.profile.activity['rows']).then((rows) => {
            const count = rows.length
            if (count >= 1) {
                const table = locators.lobby.inputTable2
                for (const key in table) {
                    cy.get(locators.lobby.inputTable2[key]).then(element => {
                        cy.get(locators.lobby.filter[key]).type(element.text())
                        cy.get(locators.lobby.filter['search']).click()
                        cy.get(locators.lobby.inputTable2[key]).contains(element.text())
                        cy.get(locators.lobby.filter[key]).clear()
                    })
                }
            }   
        })

        cy.get(locators.content.filter['reset'])
            .click()
            .then(() => {
                cy.get(locators.profile.activity['table']).should('not.contain', 'No data available')
            })

        //Action Table
        cy.get(locators.lobby.filter['update'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Update Announcement')
        
        cy.get(locators.lobby.filter['delete'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Delete Announcement')

        cy.get(locators.lobby.filter['hide'])
            .eq(0)
            .trigger('mouseenter')
            .get(locators.lobby.filter['action-hover'])
            .should('be.visible')
            .and('contain.text', 'Hide Announcement')

        cy.then(() => {
            cy.log('All tests passed successfully!')
        })
    })
})