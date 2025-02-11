import locators from "../support/locators"

Cypress.config('defaultCommandTimeout', 10000) // Set default command timeout to 10 seconds
Cypress.config('requestTimeout', 10000)   // Increase timeout for network requests

describe('Test', () => {
    beforeEach(() => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.login(username, password)
        
        cy.visit('/')
    })

    it('Betting Transaction', () => {
        //Report
        cy.get(locators.report['report']).click()
        cy.get(locators.report['container']).should('be.visible')

        const report = [
            { locator: locators.report['betting-history'], name: 'Betting Transaction History' },
            { locator: locators.report['transfer-history'], name: 'Transfer Transaction History' },
            { locator: locators.report['player-cashflow'], name: 'Player Cash Flow Records' },
            { locator: locators.report['promo-report'], name: 'Promo Report' },
            { locator: locators.report['game-report'], name: 'Game Report' },
            { locator: locators.report['opSum-daily'], name: 'Operator Summary (Daily)' },
            { locator: locators.report['opSum-monthly'], name: 'Operator Summary (Monthly)' },
            { locator: locators.report['vendor-summary'], name: 'Vendor Summary' },
            { locator: locators.report['player-summary'], name: 'Player Summary' },
            { locator: locators.report['sports-betting'], name: 'Sports Betting Transaction' }
        ]
        
        report.forEach(module => {
            cy.get(module.locator).click();
        
            // Validate the reset button exists and has the correct type
            cy.get(locators.multimodule['reset'])
              .should('have.attr', 'type', 'reset')
              .and('be.visible');
        
            cy.clearFields();
            cy.log(`✅ Reset button in **${module.name}** submodule is correct`);
        });
        cy.get(locators.report['report']).eq(0).click()

        //Content Management
        cy.get(locators.content['content']).eq(0).click()
        cy.get(locators.content['container']).should('be.visible')

        const content = [
            locators.content['player'],
            locators.content['operator'],
            locators.content['vendor'],
            locators.content['games'],
            locators.content['sub-game'],
            locators.content['bet-limit'],
            locators.content['currency']
        ]
        
        content.forEach(contentSubmodule => {
            cy.get(contentSubmodule).click()
            cy.get(locators.multimodule['reset'])
                .should('have.attr', 'type', 'reset')
                .click()
            cy.wait(1000)
        })
        cy.get(locators.content['content']).eq(0).click()

        //Lobby Management
        cy.get(locators.lobby['lobby']).eq(0).click()
        cy.get(locators.lobby['container']).should('be.visible')

        const lobby = [
            locators.lobby['media'],
            locators.lobby['announce']
        ]

        lobby.forEach(lobbySubmodule => {
            cy.get(lobbySubmodule).click()
            cy.get(locators.multimodule['reset'])
                .should('have.attr', 'type', 'reset')
                .click()
            cy.wait(1000)
        })
        cy.get(locators.lobby['lobby']).eq(0).click()

        //Promotion
        cy.get(locators.promotion['promo']).eq(0).click()
        cy.get(locators.promotion['container']).should('be.visible')
 
        cy.get(locators.promotion['promo-manage']).click()
        cy.get(locators.multimodule['reset'])
            .should('have.attr', 'type', 'reset')
            .click()
        cy.wait(1000)
        cy.get(locators.promotion['promo']).eq(0).click()

        //Permission
        cy.get(locators.permission['permission']).eq(0).click()
        cy.get(locators.permission['container']).should('be.visible')

        const permission = [
            locators.permission['role'],
            locators.permission['user']
        ]

        permission.forEach(permissionSubmodule => {
            cy.get(permissionSubmodule).click()
            cy.get(locators.multimodule['reset'])
                .should('exist')
                .should('have.attr', 'type', 'reset')
                .click()
            cy.wait(1000)
        })
        cy.get(locators.permission['permission']).eq(0).click()

        //Activity Logs
        cy.get(locators.logs['logs']).click()
        cy.get(locators.logs['container']).should('be.visible')
        cy.get(locators.logs['act-logs']).click()
        cy.get(locators.multimodule['reset'])
            .should('have.attr', 'type', 'reset')
            .click()
        cy.wait(1000)


            

            
            
    })
    
})