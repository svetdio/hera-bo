import locators from '../support/locators.js'

describe('Main Modules Test', () => {
    beforeEach(() => {
        Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
        Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
    })

    it('Checking Buttons of Main Modules', () => {
        cy.visit('/')
        //Report
        cy.get(locators.report['report']).eq(0).click()
        cy.get(locators.report['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Betting Transaction History').should('exist')
                cy.contains('Transfer Transaction History').should('exist')
                cy.contains('Player Cash Flow Records')
                cy.contains('Promo Report')
                cy.contains('Game Report')
                cy.contains('Operator Summary (Daily)')
                cy.contains('Operator Summary (Monthly)')
                cy.contains('Vendor Summary')
                cy.contains('Player Summary')
                cy.contains('Sports Betting Transaction')
            })
        cy.get(locators.report['report']).eq(0).click()

        //Content Management
        cy.get(locators.content['content']).eq(0).click()
        cy.get(locators.content['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Player').should('exist')
                cy.contains('Operator').should('exist')
                cy.contains('Vendor').should('exist')
                cy.contains('Games').should('exist')
                cy.contains('Sub Game Type').should('exist')
                cy.contains('Bet Limit Sets').should('exist')
                cy.contains('Ban').should('exist')
            })
        cy.get(locators.content['content']).eq(0).click()

        //Lobby Management
        cy.get(locators.lobby['lobby']).eq(0).click()
        cy.get(locators.lobby['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Media Components').should('exist')
                cy.contains('Announcements').should('exist')
            })
        cy.get(locators.lobby['lobby']).eq(0).click()

        //Promotion
        cy.get(locators.promotion['promo']).eq(0).click()
        cy.get(locators.promotion['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Promo Manage').should('exist')
            })
        cy.get(locators.promotion['promo']).eq(0).click()

        //Permission
        cy.get(locators.permission['permission']).eq(0).click()
        cy.get(locators.permission['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Role Settings').should('exist')
                cy.contains('User Manage').should('exist')
            })
        cy.get(locators.permission['permission']).eq(0).click()

        //System Configuration
        cy.get(locators.system['system']).eq(0).click()
        cy.get(locators.system['container'])
            .should('be.visible')
            .within(() => {
                cy.contains('Maintenance').should('exist')
            })
        cy.get(locators.system['system']).eq(0).click()

        //Activity Logs
        cy.get(locators.logs['logs']).click()



        // cy.get(locators.report['betting-history']).click()
        // cy.get(locators.report['transfer-history']).click()

    })
})