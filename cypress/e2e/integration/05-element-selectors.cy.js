/// <reference types="cypress"/>

/*
TEST CASE: Validate Register Button
Go to https://www.techglobal-training.com/frontend/html-elements
Click on "Register" button
Validate "You clicked on “Register”" is visible

TEST CASE: Validate Headings Section
Go to https://www.techglobal-training.com/frontend/html-elements
Validate "Programming Languages" heading is visible
Validate "Automation Tools" heading is visible
*/

describe("Cypress Selectors", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/html-elements");
  });

  it("Validate Register Button", () => {
    cy.get("#register_button")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "Register")
      .click();

    cy.get(".mt-1")
      .should("be.visible")
      .and("have.text", "You clicked on “Register”");

    cy.contains("You clicked on “Register”").should("be.visible");
  });

  it("Validate Headings Section", () => {
    cy.get("#languages_heading")
      .should("be.visible")
      .and("have.text", "Programming Languages");

    cy.get("#tools_heading")
      .should("be.visible")
      .and("have.text", "Automation Tools");
  });
});
