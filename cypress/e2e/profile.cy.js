// pre-requisite
// the user must be only exclusive for automation
// the user must have 200 logs activities

import { faker } from '@faker-js/faker'
import locators from '../support/locators.js'

describe('Profile Test General', () => {
    before(() => {
        cy.login()})

    it('Profile Settings', ()=>{
        cy.visit('/')
        cy.get(locators.profile['icon']).should('be.visible').click()
        cy.url().should('include', '/profile');
        cy.get(locators.profile['image']).should('be.visible')
        cy.get(locators.profile.general['container']).should('be.visible')
        cy.get(locators.profile.general['tab']).should('have.text', 'General')
        cy.get(locators.profile.security['tab']).should('have.text', 'Security')
        cy.get(locators.profile.activity['tab']).should('have.text', 'Activity Logs')
    })

    it('Change Profile Full Name', ()=>{
        cy.get(locators.profile.general['fullname']).clear().type(faker.person.fullName())
        cy.get(locators.login['submit']).click()
        cy.get(locators.profile['prompt']).should('be.visible')
        cy.get(locators.profile['yesbtn']).click()
        cy.get(locators.profile['toast-s']).should('be.visible')
        cy.get(locators.profile['toast-msg']).should('have.text', 'General profile updated successfully.')
        cy.get(locators.profile['toast-close']).click()
    })

    it('Dont Change Profile Full Name', ()=>{
        cy.get(locators.login['submit']).click()
        cy.get(locators.profile['toast-s']).should('be.visible')
        cy.get(locators.profile['toast-msg']).should('have.text', 'No changes were made.')
        cy.get(locators.profile['toast-close']).click()
    })
})

describe('Change Password Test Security', () => {

    const password = Cypress.env('password')
    const passEnv = Cypress.env('passwords')
    const passwords = passEnv.split(':')
    const selectPassword = Math.floor(Math.random() * passwords.length)
    const selectedPass = passwords[selectPassword]

    const passwordChange = (password, selectedPass, mismatched=false) => {
        cy.get(locators.profile.security['current-pass']).clear().type(password)

        if (mismatched) {
            cy.get(locators.profile.security['new-pass']).clear().type(selectedPass)
            cy.get(locators.profile.security['confirm-pass']).clear().type(faker.internet.password())
        }   else {
            cy.get(locators.profile.security['new-pass']).clear().type(selectedPass)
            cy.get(locators.profile.security['confirm-pass']).clear().type(selectedPass)
        }

        cy.get(locators.profile.security['update-btn']).click()
    }

    it('successful change', ()=>{
        // change the current password
        cy.get(locators.profile.security['tab']).click()
        passwordChange(password, selectedPass)
        cy.get(locators.profile['toast-s']).should('be.visible')
        cy.get(locators.profile['toast-msg']).should('have.text', 'Profile security password reset successfully.')
        cy.get(locators.profile['toast-close']).click()
        })

    it('blank passwords', ()=>{
        // validation check
        cy.get(locators.profile.security['update-btn']).click()
        cy.get(locators.profile.security['error-msg']).should('have.length', 3)
        cy.get(locators.profile.security['current-error']).should('have.text', 'The current password field is required.')
        cy.get(locators.profile.security['new-error']).should('have.text', 'The new password field is required.')
        cy.get(locators.profile.security['confirm-error']).should('have.text', 'The confirm password field is required.')
    })

    it('incorrect current password', ()=>{
        const randomString = faker.internet.password()
        passwordChange(randomString, selectedPass)
        cy.get(locators.profile.security['current-error']).should('have.text', 'The current password field is invalid')
    })

    it('mismatched new password', ()=>{
        passwordChange(selectedPass, password, true)
        cy.get(locators.profile.security['confirm-error']).should('have.text', 'The confirm password and new password must match.')
    })

    it('change password back to original', ()=>{
        passwordChange(selectedPass, password)
        cy.get(locators.profile['toast-s']).should('be.visible')
        cy.get(locators.profile['toast-msg']).should('have.text', 'Profile security password reset successfully.')
        cy.get(locators.profile['toast-close']).click()
    })
})

describe('Activity Logs', () => {
    it('table entries verification', ()=>{
        cy.get(locators.profile.activity['tab']).click()
        cy.get(locators.profile.activity['preloader']).should('not.visible')
        cy.get(locators.profile.activity['table']).should('be.visible')
        cy.get(locators.profile.activity['total']).then($element => {
            const count = $element.text()
            if (count >= 200){
                cy.get(locators.profile.activity['entry']).then($select => {
                    cy.wrap($select).find('option').each(($option) => {
                        const value = $option.val();
                        cy.wrap($select).select(value);
                        cy.get(locators.profile.activity['rows']).should('have.length', value)
                    });
                });
            }
            else {
                cy.failing('User activities is less than 200. Cannot validate entries.')
            }
        })

    }) 
})