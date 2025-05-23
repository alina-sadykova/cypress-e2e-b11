/// <reference types='cypress'/>

import MainPage from "../../../pages/project04/MainPage";

describe("TODO LIST", () => {
  const mainPage = new MainPage();
  beforeEach(() => {
    cy.visit("/todo-list");
    cy.fixture("mainPage").then(function (data) {
      this.values = data.values;
    });
  });
  it("Test Case 01 - Todo-App Modal Verification", () => {
    mainPage.getTodoAppModal().should("exist").and("be.visible");
    mainPage.getModalHeader().should("have.text", "My Tasks");
    mainPage.getNewTodoInput().should("not.have.attr", "disabled");
    mainPage.getAddButton().should("be.enabled");
    mainPage.getSearcrhInput().should("be.enabled");
    mainPage.getTodoListEmptyMessage().should("have.text", "No tasks found!");
  });
  it("Test Case 02 - Single Task Addition and Removal", function () {
    mainPage.enterNewTask(this.values[0]);
    mainPage.getTodoListText().should("be.visible");
    mainPage.getTodoListContainer().should("have.length", 1);
    mainPage.getTodoListRow().click();
    mainPage
      .getTodoListIcon()
      .should("have.attr", "class", "panel-icon has-text-success");
    mainPage.clickDeleteButton();
    mainPage.getTodoListEmptyMessage().should("have.text", "No tasks found!");
  });
  it("Test Case 03 - Multiple Task Operations", function () {
    this.values.forEach((task) => {
      mainPage.enterNewTask(task);
    });
    // Skipped: Validate that all added items match the items displayed on the list.
    // mainPage.getTodoListText().each((tasks, index) => {
    //   const actualTexts = [...tasks].map((el) => el.innerText.trim());
    //   expect(actualTexts).to.deep.equal(this.values[index]);
    // });
    mainPage.getTodoListRow().click({ multiple: true });
    mainPage.clickDeleteButton();
    mainPage.getTodoListContainer().should("have.length", 0);
    mainPage.getTodoListEmptyMessage().should("have.text", "No tasks found!");
  });
  it("Test Case 04 - Search and Filter Functionality in todo App", function () {
    this.values.forEach((task) => {
      mainPage.enterNewTask(task);
    });
    const lastTask = this.values.at(-1);
    mainPage.enterTaskInSearchBar(lastTask);
    mainPage
      .getTodoListContainer()
      .should("have.length", 1)
      .first()
      .should("contain.text", lastTask);
  });
});
