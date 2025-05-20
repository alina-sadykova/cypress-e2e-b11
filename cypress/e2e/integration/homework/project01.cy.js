/// <reference types='cypress' />

Cypress.on('uncaught:exception', (err) => {
  // Ignore known preventDefault() error
  if (
    err.message.includes(
      'Cannot read properties of undefined (reading \'preventDefault\')'
    )
  ) {
    return false // Prevent Cypress from failing the test
  }
})

describe('Project 1', () => {
  //  Navigate to https://techglobal-training.com/frontend/form-elements
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/form-elements')
  })

  it('Test Case 01 - Validates the Contact Us Form', () => {
    // Validate the heading is “Contact Us”
    cy.get('.mb-5 h1').should('have.text', 'Contact Us')

    // Validate the address is “2800 S River Rd Suite 310, Des Plaines, IL 60018”
    cy.get('#address').should(
      'have.text',
      '2800 S River Rd Suite 310, Des Plaines, IL 60018'
    )

    // Validate the email is “info@techglobalschool.com"
    cy.get('#email').should('have.text', 'info@techglobalschool.com')

    //  Validate the phone number is “(224) 580-2150”
    cy.get('#phone-number').should('have.text', '(224) 580-2150')
  })

  it('Test Case 02 - Validate the Full name input box', () => {
    // Validate that the Full name input box is displayed
    // Validate that the Full name input box is required
    // Validate that the placeholder of the Full name input box is “Enter your full name”
    cy.get('input[placeholder="Enter your full name"]')
      .should('be.visible')
      .and('have.attr', 'required')

    // Validate that the label of the Full name input box is “Full name *”
    cy.get('label[for="name"]').should('have.text', 'Full name *')
  })

  it('Test Case 03 - Validate the Gender radio button', () => {
    const genderLabels = ['Male', 'Female', 'Prefer not to disclose']

    // Validate the label is “Gender *”
    cy.contains('.label', 'Gender *').should('be.visible')

    // Validate that the Gender is required
    cy.get('input[class=\'mr-1\']').as('genderSelectInput')
    cy.get('@genderSelectInput').should('have.attr', 'required')

    // Validate the options are “Female”, “Male” and “Prefer not to disclose”
    cy.get('label[class=\'radio\']').each((radioLabel, index) => {
      cy.wrap(radioLabel).should('have.text', genderLabels[index])
    })

    // Validate the options are clickable and not selected
    cy.get('@genderSelectInput').each((radioInput) => {
      cy.wrap(radioInput).click().should('not.be.selected')
    })

    // Click on the “Male” option and validate it is selected while the others are not selected
    cy.get('@genderSelectInput').eq(0).click().should('be.checked')
    cy.get('@genderSelectInput').each((el, index) => {
      if (index !== 0) {
        cy.wrap(el).should('not.be.checked')
      }
    })

    // Click on the “Female” option and validate it is selected while the others are not selected
    cy.get('@genderSelectInput').eq(1).click().should('be.checked')
    cy.get('@genderSelectInput').each((el, index) => {
      if (index !== 1) {
        cy.wrap(el).should('not.be.checked')
      }
    })
  })

  it('Test Case 04 - Validate the Address input box', () => {
    // Validate that the Address input box is displayed
    // Validate that the Address input box is not required
    cy.get('.input[placeholder=\'Enter your address\']')
      .should('be.visible')
      .and('not.have.attr', 'required')

    // Validate that the label of the Address input box is “Address”
    cy.get('.field .label').contains('Address').should('be.visible')

    // Validate that the placeholder of the Address input box is “Enter your address*”
    cy.get('.input[placeholder=\'Enter your address\']').should('be.visible')
  })

  it('Test Case 05 - Validate the Email input box', () => {
    // Validate that the Email input box is displayed
    // Validate that the Email input box is required
    cy.get('.input[type="email"]')
      .should('be.visible')
      .and('have.attr', 'required')

    // Validate that the label of the Email input box is “Email *”
    cy.get('.field .label').contains('Email *').should('be.visible')

    // Validate that the placeholder of the Email input box is “Enter your email”
    cy.get('input[placeholder="Enter your email"]').should('be.visible')
  })

  it('Test Case 06 -  Validate the Phone input box', () => {
    // Validate that the Phone input box is displayed
    // Validate that the Phone input box is not required
    cy.get('.input[type="phone"]')
      .should('be.visible')
      .and('not.have.attr', 'required')

    // Validate that the label of the Phone input box is “Phone”
    cy.get('.field .label').contains('Phone').should('be.visible')

    // Validate that the placeholder of the Phone input box is “Enter your phone number”
    cy.get('.input[placeholder="Enter your phone number"]').should(
      'be.visible'
    )
  })

  it('Test Case 07 - Validate the Message text area', () => {
    // Validate that the Message text area is displayed
    // Validate that the Message text area is not required
    cy.get('.textarea').should('be.visible').and('not.have.attr', 'required')

    // Validate that the label of the Message text area is “Message”
    cy.get('.field .label').contains('Message').should('be.visible')

    // Validate that the placeholder of the Message text area is “Type your message here…”
    cy.get('.textarea')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Type your message here...')
  })

  it('Test Case 08 - Validate the Consent checkbox', () => {
    // Validate the label is “I give my consent to be contacted.”
    cy.get('.checkbox').should(
      'have.text',
      ' I give my consent to be contacted.'
    )

    // Validate that the Consent checkbox is required
    cy.get('input[type="checkbox"]').should('have.attr', 'required')

    // Validate that the Consent checkbox is clickable
    // Click on the “I give my consent to be contacted.” checkbox and validate it is selected
    cy.get('input[type="checkbox"]').click().should('be.checked')

    // Click on the “I give my consent to be contacted.” checkbox again and validate it is not selected
    cy.get('input[type="checkbox"]').click().should('not.be.checked')
  })

  it('Test Case 09 - Validate the SUBMIT button', () => {
    // Validate the “SUBMIT” button is displayed
    // Validate that the button text is “SUBMIT”
    // Validate the “SUBMIT” button is clickable
    cy.get('.button[type="submit"]')
      .should('be.visible')
      .and('have.text', 'SUBMIT')
      .and('not.be.disabled')
      .click()
  })

  it('Test Case 10 - Validate the form submission', () => {
    // Enter a first name
    cy.get('input[placeholder="Enter your full name"]').type('John Doe')

    // Select a gender
    cy.get('input[class=\'mr-1\']').eq(0).click()

    // Enter an address
    cy.get('.input[placeholder=\'Enter your address\']').type(
      '123 ABC Street, Chicago, IL 23232'
    )

    // Enter an email
    cy.get('.input[type="email"]').type('johndoe@gmail.com')

    // Enter a phone number
    cy.get('.input[type="phone"]').type('123-232-1212')

    // Enter a message
    cy.get('.textarea').type('Lorem Ipsum')

    // Select the “I give my consent to be contacted.” checkbox
    cy.get('.checkbox input').click()

    // Click on the “SUBMIT” button
    cy.get('.button[type="submit"]').click()

    // Validate the form message “Thanks for submitting!” is displayed under the “SUBMIT” button
    cy.get('.mt-5')
      .should('be.visible')
      .and('have.text', 'Thanks for submitting!')
  })
})
