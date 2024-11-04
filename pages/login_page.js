import { $ } from '@wdio/globals'
import BasePage from './base_page.js';


class LoginPage extends BasePage {
  // Define the elements on the login page
  get txtUsername() {
    return '#email';
  }

  get txtPassword() {
    return '#password';
  }

  get btnLogin() {
    return '#submit';
  }

  get btnSignUp() {
    return '#signup';
  }

  get errorMessage() {
    return $('.error-message'); // Modify if the actual error message locator is different
  }

  async clickSignUP() {
    await this.clickElement(this.btnSignUp)
    await this.attachScreenshot('click Sign Up Button');
  }

  async enterUsername(email) {
    await this.fillData(this.txtUsername, email)
    await this.attachScreenshot('enter Username');
  }

  async enterPassword(password) {
    await this.fillData(this.txtPassword, password)
    await this.attachScreenshot('enter Password');
  }

  // Method to log in
  async clickloginButton() {
    await this.clickElement(this.btnLogin)
    await this.attachScreenshot('click Login Button');
  }
}

export default new LoginPage();