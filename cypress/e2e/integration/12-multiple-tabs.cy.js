/// <reference types="cypress"/>

describe("Handling iFrames", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("Multiple Windows");
  });

  it("Test Case 01 - Multiple tabs", () => {
    cy.get("#microsoft").should("have.attr", "target", "_blank");
    cy.get("#microsoft").invoke("removeAttr", "target").click();
  });
  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Multiple Windows" card
   * Click on the "Apple" link
   * Validate that the child window title is "Apple"
   * Navigate back to main page
   * Validate title contains "techglobal"
   */
  it("Test Case 02 - Handle multiple tabs", () => {
    cy.get("#apple").invoke("removeAttr", "target").click();
    cy.title().should("eq", "Apple");
    cy.go("back");
    cy.title().then((title) => {
      cy.wrap(title.toLowerCase()).should("contain", "techglobal");
    });
    // const result = "techglobal".replace("t", "T").replace("g", "G");
    // cy.title().should("contain", result);
  });
});
