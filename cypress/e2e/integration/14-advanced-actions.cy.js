/// <reference types="cypress"/>

describe("Keyboard & Mouse Actions", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("Actions");
  });

  it("Mouse actions using Cypress events", () => {
    // cy.get('#dropdown-testing').trigger('mouseover')

    cy.get("#dropdown-testing").realHover();
  });

  it("Keyboard Actions", () => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("HTML Elements");

    cy.get("#text_input1")
      .realClick()
      .realPress("KeyA")
      .realPress("Tab")
      .realPress("KeyB")
      .realPress("ArrowLeft")
      .realPress("KeyR")
      .realPress("Backspace");
    // .realPress(['Shift', 'KeyA'])
    // .realPress('Shift')
    // .realPress(["Alt", "Meta", "a"])
  });
});
