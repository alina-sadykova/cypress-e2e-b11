/// <reference types='cypress'/>

it('Validate TechGlobal URL and title', () => {
  cy.visit('https://www.techglobal-training.com/')

  // Validate URL
  cy.url().should('eq', 'https://www.techglobal-training.com/')
  cy.url().should('not.be', 'https://www.apple.com/')
  cy.url().should('include', 'techglobal')
  cy.url().should('not.include', 'apple')
  cy.url().should('contain', 'techglobal')
  cy.url().should('not.contain', 'apple')

  // Valivate title
  cy.title().should('eq', 'TechGlobal Training | Home')
  cy.title().should('equal', 'TechGlobal Training | Home')
  cy.title().should('not.eq', 'apple')
  cy.title().should('contain', 'TechGlobal')
  cy.title().should('include', 'TechGlobal')
  cy.title().should('not.include', 'apple')
  cy.title().should('not.contain', 'apple')
})
