// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('clickCard', (link) => {
  cy.contains('.card, [class*="projectCard"]', link).click()
})

Cypress.Commands.add('loginApp', (email, name) => {
  cy.get('[name="email"]').type(email)
  cy.get('.mb-3 > input').clear().type(name)
  cy.get('.mb-3 + button').click()
})

/**
 * Adds two numbers.
 *
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} - The sum of the two numbers.
 *
 * @example
 * add(2, 5)
 * // Returns 5
 *
 * @example
 * add(7, 3)
 * // Return 10
 */
export function add(a, b) {
  return a + b
}
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//

Cypress.Commands.add('logText', { prevSubject: true }, (subject) => {
  const text = subject.text()
  cy.log(text)

  return cy.wrap(subject)
})

Cypress.Commands.add(
  'haveText',
  { prevSubject: 'element' },
  (subject, expectedText) => {
    cy.wrap(subject).should('have.text', expectedText)
    expect(subject).to.have.text(expectedText)
  }
)
Cypress.Commands.add(
  'validateAttributeAndValue',
  { prevSubject: true },
  (subject, attrName, attrValue = null) => {
    if (attrValue === null) {
      cy.wrap(subject).should('have.attr', attrName)
    } else {
      cy.wrap(subject).should('have.attr', attrName, attrValue)
    }
  }
)
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
