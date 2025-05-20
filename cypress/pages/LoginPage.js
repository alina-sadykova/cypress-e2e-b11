class LoginPage extends BasePage {
  /* Locator methods
    always starts with get
    */
  getUsernameField() {
    return cy.get('#username')
  }

  getPasswordField() {
    return cy.get('#password')
  }

  getLoginButton() {
    return cy.get('#login_btn')
  }

  getSuccessLoginMessage() {
    return cy.get('#success_lgn')
  }

  getLoginErrorMessage() {
    return cy.get('#error_message')
  }

  getLogoutButton() {
    return cy.get('#logout')
  }

  getForgotPasswordLink() {
    return cy.get('a[href="/frontend/login"]')
  }

  /* Action Methods */
  clickLoginButton() {
    this.getLoginButton().click()
  }

  /**
   * This method can be used to login
   * @param {string} username
   * @param {string} password
   * @example
   * userLogin('Tech', 'Global123')
   */
  userLogin(username, password) {
    this.getUsernameField().type(username)
    this.getPasswordField().type(password)
    this.clickLoginButton()
  }
}
export default LoginPage
