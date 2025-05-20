describe('Project - 01', () => {
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/form-elements')
  })

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate the heading is "Contact Us"
   * Validate the address is "2800 S River Rd Suite 310, Des Plaines, IL 60018"
   * Validate the email is "info@techglobalschool.com"
   * Validate the phone number is "(224) 580-2150"
   */
  it('Test Case 01 - Validate the Contact Us information', () => {
    cy.get('.is-size-3').should('have.text', 'Contact Us')
    cy.get('#address').should(
      'have.text',
      '2800 S River Rd Suite 310, Des Plaines, IL 60018'
    )
    cy.get('#email').should('have.text', 'info@techglobalschool.com')
    cy.get('#phone-number').should('have.text', '(224) 580-2150')

    //way2
    const expectedFields = [
      'Contact Us',
      '2800 S River Rd Suite 310, Des Plaines, IL 60018',
      'info@techglobalschool.com',
      '(224) 580-2150',
    ]

    cy.get('.mb-5')
      .children()
      .each((ele, index) => {
        cy.wrap(ele).should('have.text', expectedFields[index])
      })
  })

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate that the Full name input box is displayed
   * Validate that the Full name input box is required
   * Validate that the label of the Full name input box is "Full name *"
   * Validate that the placeholder of the Full name input box is "Enter your full name"
   */
  it('Test Case 02 - Validate the Full name input box', () => {
    cy.get('[for="name"]')
      .as('label')
      .parent()
      .find('.input')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your full name')
      .and('have.attr', 'required')

    cy.get('@label').should('have.text', 'Full name *')
  })

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate the label is "Gender *"
   * Validate that the Gender is required
   * Validate the options are "Female", "Male" and "Prefer not to disclose"
   * Validate the options are clickable and not selected
   * Click on the "Male" option and validate it is selected while the others are not selected
   * Click on the "Female" option and validate it is selected while the others are not selected
   */

  it('Test Case 03 - Validate the Gender radio button', () => {
    cy.contains('Gender *').should('have.text', 'Gender *')

    cy.get('[type=\'radio\']').first().should('have.attr', 'required')

    const expectedRadio = ['Male', 'Female', 'Prefer not to disclose']

    cy.get('[type=\'radio\']').each((ele, index) => {
      cy.wrap(ele).parent().should('have.text', expectedRadio[index])
      cy.wrap(ele).should('be.enabled').and('not.be.checked')
    })

    // way 1
    cy.contains('Male').find('input').check().should('be.checked')
    cy.contains('Female').find('input').should('not.be.checked')
    cy.contains('Prefer not to disclose')
      .find('input')
      .should('not.be.checked')

    cy.contains('Female').find('input').check().should('be.checked')
    cy.contains('Male').find('input').should('not.be.checked')
    cy.contains('Prefer not to disclose')
      .find('input')
      .should('not.be.checked')

    //way 2
    const checkRadioOption = (selectedOption, allOptions) => {
      cy.contains(selectedOption).find('input').check().should('be.checked')

      const notSelectedOptions = allOptions.filter(
        (ele) => ele !== selectedOption
      )

      for (let option of notSelectedOptions) {
        cy.contains(option).find('input').should('not.be.checked')
      }
    }

    checkRadioOption('Male', expectedRadio)
    checkRadioOption('Female', expectedRadio)
    checkRadioOption('Prefer not to disclose', expectedRadio)
  })

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate that the Address input box is displayed
   * Validate that the Address input box is not required
   * Validate that the label of the Address input box is "Address"
   * Validate that the placeholder of the Address input box is "Enter your address*"
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate that the Email input box is displayed
   * Validate that the Email input box is required
   * Validate that the label of the Email input box is "Email *"
   * Validate that the placeholder of the Email input box is "Enter your email"
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate that the Phone input box is displayed
   * Validate that the Phone input box is not required
   * Validate that the label of the Phone input box is "Phone"
   * Validate that the placeholder of the Address input box is "Enter your phone number"
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate that the Message text area is displayed
   * Validate that the Message text area is not required
   * Validate that the label of the Message text area is "Message"
   * Validate that the placeholder of the Message text area is "Type your message here…"
   */

  const testCases = [
    {
      discription: 'Address Input Box',
      label: 'Address',
      placeholder: 'Enter your address',
      isRequired: false,
    },
    {
      discription: 'Email Input Box',
      label: 'Email *',
      placeholder: 'Enter your email',
      isRequired: true,
    },
    {
      discription: 'Phone Number Input Box',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      isRequired: false,
    },
    {
      discription: 'Message Test Area',
      label: 'Message',
      placeholder: 'Type your message here...',
      isRequired: false,
    },
  ]

  for (const tc of testCases) {
    it(`Test Case - ${tc.discription}`, () => {
      cy.contains('.label', tc.label)
        .should('have.text', tc.label)
        .and('be.visible')

      cy.contains('.label', tc.label)
        .parent()
        .find('input, textarea')
        .should(tc.isRequired ? 'have.attr' : 'not.have.attr', 'required')
    })
  }

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate the label is "I give my consent to be contacted."
   * Validate that the Consent checkbox is required
   * Validate that the Consent checkbox is clickable
   * Click on the "I give my consent to be contacted." checkbox and validate it is selected
   * Click on the "I give my consent to be contacted." checkbox again and validate it is not selected
   */
  it('Test Case 08 - Validate the Consent checkbox', () => {})

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Validate the "SUBMIT" button is displayed
   * Validate the "SUBMIT" button is clickable
   * Validate that the button text is "SUBMIT"
   */
  it('Test Case 09 - Validate the SUBMIT button', () => {})

  /**
   * Navigate to https://techglobal-training.com/frontend/project-1
   * Enter a first name
   * Select a gender
   * Enter an address
   * Enter an email
   * Enter a phone number
   * Enter a message
   * Select the "I give my consent to be contacted." checkbox
   * Click on the "SUBMIT" button
   * Validate the form message "Thanks for submitting!" is displayed under the "SUBMIT" button
   */
  it('Test Case 10 - Validate the form submission', () => {})
})
