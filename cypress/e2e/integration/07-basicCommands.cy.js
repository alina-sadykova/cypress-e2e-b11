/// <reference types="cypress"/>

describe("Cypress Actions", () => {
  beforeEach(() => {
    cy.contains(".card", "HTML Elements").click();
  });

  /**
   * Visit the techglobal frontend page
   * Click and navigate to Html Elements page
   * Click on the Register button on the Html Elements Page
   * Validate "You clicked on "Register" text is visible
   * And click on the "Sign in" button
   * Validate "You clicked on "Sign in"" text is visible
   */
  // Option 1: using find
  it("Click Action - click()", () => {
    cy.get("#register_button").click();
    cy.get('[data-identifier="Buttons"]')
      .find("span")
      .should("have.text", "You clicked on “Register”");
    cy.get("#signin_button").click();
    cy.get('[data-identifier="Buttons"]')
      .find("span")
      .should("have.text", "You clicked on “Sign in”");
  });

  // Option 2
  it("Click Action - click()", () => {
    cy.get("#register_button").click();
    cy.get('[data-identifier="Buttons"] span').should(
      "have.text",
      "You clicked on “Register”"
    );
    cy.get("#signin_button").click();
    cy.get('[data-identifier="Buttons"] span').should(
      "have.text",
      "You clicked on “Sign in”"
    );
  });

  // Option 3: using contains()
  it("Click Action - click()", () => {
    cy.get("#register_button").click();
    cy.contains(
      '[data-identifier="Buttons"] span',
      "You clicked on “Register”"
    ).should("be.visible");
    cy.get("#signin_button").click();
    cy.contains(
      '[data-identifier="Buttons"] span',
      "You clicked on “Sign in”"
    ).should("be.visible");
  });

  it("Checkbox & Radio Buttons - check()", () => {
    // This assertion will not work, because '#apple_check' targets <label> web element
    // and this element is not the input itself, and it is not possible to get the input information from it
    cy.get("#apple_check").click().should("be.checked");

    /**
     * cy.check() can only be called on :checkbox and :radio.
     * Your subject is a: <label id="apple_check" class="checkbox">...</label>
     */

    // cy.get('#apple_check').check()

    /**
     * 1. Check on the Apple checkbox button
     * 2. Then Validate its checked
     * 3. Uncheck the Apple checkbox button
     * 4. Validate its unchecked
     */

    // cy.get('#checkbox_1').check().should('be.checked')
    // cy.get('#checkbox_1').uncheck().should('not.be.checked')

    cy.get("#checkbox_1")
      .check()
      .should("be.checked")
      .uncheck()
      .should("not.be.checked");
  });
});
