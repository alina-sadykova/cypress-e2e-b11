class MainPage {
  getTodoAppModal() {
    return cy.get(".column");
  }
  getModalHeader() {
    return cy.get('p[class^="panel-heading"]');
  }
  getNewTodoInput() {
    return cy.get("#input-add");
  }
  getAddButton() {
    return cy.get("#add-btn");
  }
  getSearcrhInput() {
    return cy.get("#search");
  }
  getTodoListEmptyMessage() {
    return cy.get('div[class^="panel"]');
  }
  getTodoListContainer() {
    return cy.get("#panel .todo-item");
  }
  getTodoListText() {
    return cy.get("#panel .mr-auto span").last();
  }
  getTodoListIcon() {
    return cy.get(".ml-1 .panel-icon");
  }
  getTodoListRow() {
    return cy.get(".ml-1");
  }
  getDeleteIcon() {
    return cy.get(".panel-icon.has-text-danger");
  }
  getDeleteButton() {
    return cy.get("#clear");
  }
  getSearchInput() {
    return cy.get("#search");
  }

  // Methods
  clickAddButton() {
    this.getAddButton().click();
  }
  clickDeleteIcon() {
    this.getDeleteIcon().click();
  }
  clickDeleteButton() {
    this.getDeleteButton().click();
  }
  /**
   * This method can be used to enter a task in the todo input field
   * @param {*} value
   * @example
   * enterNewTask('Read a book')
   */
  enterNewTask(value) {
    this.getNewTodoInput().type(value);
    this.clickAddButton();
    this.getNewTodoInput().clear();
    this.getNewTodoInput().should("have.value", "");
  }

  /**
   * This method can be used to enter a value in a search bar
   * @param {*} input
   * @example
   * enterTaskInSearchBar('Buy groceries')
   */
  enterTaskInSearchBar(input) {
    this.getSearchInput().type(input);
  }
}
export default MainPage;
