import BasePage from './BasePage'

class TablesPage extends BasePage {
  getTableHeaders() {
    return cy.get('th[class^="header"]')
  }
}
export default TablesPage
