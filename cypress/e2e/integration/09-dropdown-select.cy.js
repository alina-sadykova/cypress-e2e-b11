/// <reference types="cypress"/>

describe('Dropdown select', () => {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend')
  })
  beforeEach(() => {
    cy.contains('.card', 'Dropdowns').click()
  })

  it('Select product & color', () => {
    // cy.get('#product_dropdown')
    //   .select('Apple Watch Series 8')
    //   .should('have.value', 'Apple Watch Series 8');

    // cy.get('#color_dropdown')
    //   .select('Yellow')
    //   .should('have.value', 'Yellow');

    cy.get('#product_dropdown').select('Apple Watch Series 8')
    cy.get('#color_dropdown').select('Yellow')

    cy.get('#product_dropdown option:selected').should(
      'have.text',
      'Apple Watch Series 8'
    )
    cy.get('#color_dropdown option:selected').should('have.text', 'Yellow')
  })

  it.only('Select product & color & delivery', () => {
    cy.get('#product_dropdown option:selected').should(
      'contain.text',
      'Select'
    )
    cy.get('#product_dropdown').select('Apple Watch Series 8')
    cy.get('#product_dropdown option:selected').should(
      'have.text',
      'Apple Watch Series 8'
    )

    cy.get('#color_dropdown option:selected').should('contain.text', 'Select')
    cy.get('#color_dropdown').select('Yellow')
    cy.get('#color_dropdown').select('Silver')
    cy.get('#color_dropdown option:selected').should('have.text', 'Silver')

    cy.get('#shipment_dropdown').click()
    cy.get('span[aria-label="Delivery"]').click()
  });

  [
    {
      product: 'Apple Watch Series 8',
      color: 'Yellow',
      delivery: 'Delivery',
    },
    {
      product: 'iPad Pro 11',
      color: 'Green',
      delivery: 'Pick up',
    },
  ].forEach(({ product, color, delivery }) => {
    it(`Validate the result of selections for ${product}`, () => {
      /*
            Select "iPad Pro 11"
            Select "Green"
            Select "Pick up"
            Click on "SUBMIT" button
            Validate "Your Green iPad Pro 11 is ready to be picked up." is visible
          */
      //   const product = "iPad Pro 11";
      //   const color = "Green";
      //   const delivery = "Pick up";
      const deliveryMessage =
        deliveryOrPickup === 'Pick up'
          ? 'is ready to be picked up'
          : 'will be delivered to you'
      const expectedResult = `Your ${color} ${product} ${deliveryMessage}.`
      cy.get('#product_dropdown')
        .select(product)
        .should('contain.text', product)
      cy.get('#color_dropdown').select(color).should('contain.text', color)
      cy.get('div[aria-label="Dropdown select"]')
        .click()
        .contains(`span[aria-label="${delivery}"]`, delivery)
        .click()
      cy.get('#submit').should('have.text', 'SUBMIT').click()
      cy.get('#result').should('have.text', expectedResult)
    })
  })
})
