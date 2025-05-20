/// <reference types='cypress' />
describe('Login Validation', () => {
  /* Navigate to https://techglobal-training.com/frontend/login */
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/login')
  })
  it('TC01 - Validate login form', () => {
    const labelText = [
      'Please enter your username',
      'Please enter your password',
    ]
    /* Validate that the username input box is displayed
    Validate that the username input box is not required
    Validate that the label of the username input box is “Please enter your username”
    Validate that the password input box is displayed
    Validate that the password input box is not required
    Validate that the label of the password input box is “Please enter your password” */
    cy.get('div[class^=\'LoginForm_form\'] label').each((el, index) => {
      cy.wrap(el, index)
        .should('have.text', labelText[index])
        .parent()
        .find('input')
        .should('be.visible')
        .and('not.have.attr', 'required')
    })

    /* Validate the “LOGIN” button is displayed
    Validate the “LOGIN” button is clickable
    Validate that the button text is “LOGIN” */
    cy.get('#login_btn').should('be.visible').and('have.text', 'LOGIN').click()

    /* Validate the “Forgot Password?” link is displayed
    Validate that the “Forgot Password?” link is clickable
    Validate that the link text is “Forgot Password?” */
    cy.get('a[href="/frontend/login"]')
      .should('be.visible')
      .and('have.text', 'Forgot Password?')
      .click()
  })

  it('TC02 - Validate the valid login', () => {
    /* Enter the username as “TechGlobal”
    Enter the password as “Test1234”
    Click on the “LOGIN” button
    Validate the success message is displayed as “You are logged in”
    Validate the logout button displayed with the text “LOGOUT” */
    cy.get('#username').type('TechGlobal')
    cy.get('#password').type('Test1234')
    cy.get('#login_btn').click()
    cy.get('#success_lgn').should('have.text', 'You are logged in')
    cy.get('#logout').should('have.text', 'LOGOUT')
  })

  it('TC03 - Validate the logout', () => {
    /* Enter the username as “TechGlobal”
    Enter the password as “Test1234”
    Click on the “LOGIN” button
    Click on the “LOGOUT” button
    Validate that the login form is displayed */
    cy.get('#username').type('TechGlobal')
    cy.get('#password').type('Test1234')
    cy.get('#login_btn').click()
    cy.get('#logout').click()
    cy.get('div[class^=\'LoginForm_form\'] form').should('be.visible')
  })

  it('TC04 - Validate the Forgot Password? Link and Reset Password modal', () => {
    /* Click on the “Forgot Password?” link
    Validate that the modal heading “Reset Password” is displayed
    Validate that the close button is displayed
    Validate that the email input box is displayed
    Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
    Validate the “SUBMIT” button is displayed
    Validate the “SUBMIT” button is clickable
    Validate that the button text is “SUBMIT” */

    cy.get('a[href="/frontend/login"]').click()
    cy.get('#sub_heading').should('have.text', 'Reset Password')
    cy.get('.delete').should('be.visible')
    cy.get('input[id=\'email\']')
      .should('be.visible')
      .parent()
      .find('label[for="email"]')
      .should(
        'have.text',
        'Enter your email address and we\'ll send you a link to reset your password. '
      )
    cy.get('#submit').should('be.visible').and('have.text', 'SUBMIT').click()
  })

  it('TC05 - Validate the Reset Password modal close button', () => {
    /* Click on the “Forgot Password?” link
    Validate that the “Reset Password” modal is displayed
    Click on the close button
    Validate that the “Reset Password” modal is closed */
    cy.get('a[href="/frontend/login"]').click()
    cy.get('div[class$="is-active"]').should('be.visible')
    cy.get('.delete').click()
    cy.get('div[class$="is-active"]').should('not.exist')
  })

  it('TC06 - Validate the modal error message when SUBMIT button clicked without entering email', () => {
    cy.get('a[href="/frontend/login"]').click()
    cy.get('div[class$="is-active"]')
      .should('be.visible')
      .within(() => {
        cy.get('#submit').click()
        cy.get('.has-text-danger')
          .should('be.visible')
          .and('have.text', 'Email input cannot be left empty!')
      })
  })

  it('TC07 - Validate the Reset Password form submission', () => {
    /* Click on the “Forgot Password?” link
    Enter an email
    Click on the “SUBMIT” button
    Validate the form message “A link to reset your password has 
    been sent to your email address.” is displayed under the “SUBMIT” button */
    cy.get('a[href="/frontend/login"]').click()
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#submit').click()
    cy.get('#confirmation_message').should(
      'have.text',
      'A link to reset your password has been sent to your email address.'
    )
  })

  it('TC08 - Validate the invalid login with the empty credentials', () => {
    /* Leave username empty
    Leave password empty
    Click on the “LOGIN” button
    Validate the failure message is displayed as “Invalid Username entered!” above the form */
    cy.get('#login_btn').click()
    cy.get('#error_message').should('have.text', 'Invalid Username entered!')
  })

  it('TC09 - Validate the invalid login with the wrong username', () => {
    /* Enter the username as “John”
    Enter the password as “Test1234”
    Click on the “LOGIN” button
    Validate the failure message is displayed as “Invalid Username entered!” above the form */
    cy.get('#username').type('John')
    cy.get('#password').type('Test1234')
    cy.get('#login_btn').click()
    cy.get('#error_message').should('have.text', 'Invalid Username entered!')
  })

  it('TC10 - Validate the invalid login with the wrong password', () => {
    /* Enter the username as “TechGlobal”
    Enter the password as “1234”
    Click on the “LOGIN” button
    Validate the failure message is displayed as “Invalid Password entered!” above the form */
    cy.get('#username').type('TechGlobal')
    cy.get('#password').type('1234')
    cy.get('#login_btn').click()
    cy.get('#error_message').should('have.text', 'Invalid Password entered!')
  })

  it('TC11 - Validate the invalid login with the wrong username and password', () => {
    /*Enter the username as “John”
    Enter the password as “1234”
    Click on the “LOGIN” button
    Validate the failure message is displayed as “Invalid Username entered!” above the form */
    cy.get('#username').type('John')
    cy.get('#password').type('1234')
    cy.get('#login_btn').click()
    cy.get('#error_message').should('have.text', 'Invalid Username entered!')
  })
})
