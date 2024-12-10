
import locators from '../support/locators.js'

const username = Cypress.env('username')
const password = Cypress.env('password')

describe('Login Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })  

  it('login success', () => {
    cy.get('label[for="username"]').should('have.text', 'Username ')
    cy.get('label[for="password"]').should('have.text', 'Password ')
    cy.get(locators.login['user']).type(username)
    cy.get(locators.login['password']).type(password)
    cy.get(locators.login['submit']).click()
    cy.get(locators.home['welcome']).should('include.text', `Welcome,${username}!`)
    cy.get(locators.home['logout']).click()
  })

  it('login fail', () => {
    cy.get(locators.login['user']).type(username)
    cy.get(locators.login['password']).type(password + '@')
    cy.get(locators.login['submit']).click()
    cy.get(locators.login['failed']).should('have.text', 'Login Failed!')
    cy.get(locators.login['failsubmit']).should('have.text', 'Invalid username/password.');
  })

  it('invalid credentials', () => {
    cy.get(locators.login['submit']).click()
    cy.get(locators.login['failed']).should('have.text', 'Login Failed!')
    cy.get(locators.login['failsubmit']).should('have.text', 'There was a problem with your submission.')
    cy.get(locators.login['text-error']).eq(0).should('have.text', 'The username field is required.');
    cy.get(locators.login['text-error']).eq(1).should('have.text', 'The password field is required.');

  })
})
