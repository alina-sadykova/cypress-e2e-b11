/// <reference types="cypress"/>

describe("Cypress Custom Commands", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("HTML Elements");
  });

  it("Child Command", () => {
    cy.get(".mr-2").validateAttributeAndValue("type");
  });
  it("Parent Command", () => {
    /* Parent Commands */
    // cy.get()
    // cy.url()
    // cy.title()
    // cy.wrap()
    // cy.visit()
    // cy.on()
    // cy.window()

    cy.selectDropdown("#company_dropdown1", "Apple");

    cy.loginApp("randomEmail@gmail.com", "TechGlobal");
  });

  it.only("Child Command", () => {
    /* Child Commands */
    // .should()
    // .find()
    // .click()
    // all the action methods

    // Cypress.Commands.add('logText', { prevSubject: true }, (subject) => {
    //   const text = subject.text()
    //   cy.log(text)
    // })

    cy.get("#main_heading").then(($el) => {
      const text = $el.text();
      cy.log(text);
    });

    cy.get("#main_heading").logText();

    cy.get("#main_heading").haveText("HTML Elements");

    cy.get("#main_heading").logText().haveText("HTML Elements");

    cy.log(Cypress.env("SITE_URL"));
    cy.log(Cypress.env("SCHOOL_NAME"));
    cy.log(Cypress.env("UI_PASSWORD"));
    cy.log(Cypress.env("UI_USERNAME"));
  });
});

/*
REUSABILITY
function clickSearchButton() {
  cy.get(".searchButton").click();
}

function searchUser(userName) {
  cy.get(".searchBar").type(userName);
  this.clickSearchButton();
  cy.get(".row").contains(userName).should("have.text", userName);
}

function editOrShowUserByName(buttonType, userName) {
  cy.get(".row").contains(userName).find(buttonType).click();
  cy.url().should("eq", "/edit/user/18");
}

function searchAndEditOrShowUserByName(buttonType, userName) {
  this.searchUser();
  this.editOrShowUserByName(buttonType, userName);
}
*/
