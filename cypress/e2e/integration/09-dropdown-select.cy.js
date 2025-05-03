/// <reference types="cypress"/>

describe("Dropdown select", () => {
  beforeEach(() => {
    cy.contains(".card", "Dropdowns").click();
  });

  it("Select product & color", () => {
    // cy.get('#product_dropdown')
    //   .select('Apple Watch Series 8')
    //   .should('have.value', 'Apple Watch Series 8');

    // cy.get('#color_dropdown')
    //   .select('Yellow')
    //   .should('have.value', 'Yellow');

    cy.get("#product_dropdown").select("Apple Watch Series 8");
    cy.get("#color_dropdown").select("Yellow");

    cy.get("#product_dropdown option:selected").should(
      "have.text",
      "Apple Watch Series 8"
    );
    cy.get("#color_dropdown option:selected").should("have.text", "Yellow");
  });

  it.only("Select product & color & delivery", () => {
    cy.get("#product_dropdown option:selected").should(
      "contain.text",
      "Select"
    );
    cy.get("#product_dropdown").select("Apple Watch Series 8");
    cy.get("#product_dropdown option:selected").should(
      "have.text",
      "Apple Watch Series 8"
    );

    cy.get("#color_dropdown option:selected").should("contain.text", "Select");
    cy.get("#color_dropdown").select("Yellow");
    cy.get("#color_dropdown").select("Silver");
    cy.get("#color_dropdown option:selected").should("have.text", "Silver");

    cy.get("#shipment_dropdown").click();
    cy.get('span[aria-label="Delivery"]').click();
  });

  it.only("Validate the result of selections", () => {
    /*
        Select "iPad Pro 11"
        Select "Green"
        Select "Pick up"
        Click on "SUBMIT" button
        Validate "Your Green iPad Pro 11 is ready to be picked up." is visible
      */
    cy.get("#product_dropdown")
      .select("iPad Pro 11")
      .should("contain.text", "iPad Pro 11");
    cy.get("#color_dropdown").select("Green").should("contain.text", "Green");
    cy.get('div[aria-label="Dropdown select"]')
      .click()
      .contains('span[aria-label="Pick up"]', "Pick up")
      .click();
    cy.get("#submit").should("have.text", "SUBMIT").click();
    cy.get("#result").should("be.visible");
  });
});
