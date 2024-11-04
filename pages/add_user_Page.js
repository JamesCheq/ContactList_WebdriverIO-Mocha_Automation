import { $ } from '@wdio/globals'
import BasePage from './base_page.js';

class AddUserPage extends BasePage {
  // Define the locators for the Add User page elements
  get nameInput() {
    return $('#name');
  }

  get emailInput() {
    return $('#email');
  }

  get phoneInput() {
    return $('#phone');
  }

  get submitButton() {
    return $('button[type="submit"]');
  }

  get successMessage() {
    return $('.alert-success'); // Adjust based on actual success message locator
  }

  get errorMessage() {
    return $('.alert-danger'); // Adjust based on actual error message locator
  }

   async clickSubmit() {
    await this.submitButton.click();
    await this.attachScreenshot('click Submit Button for Add User');
  }
}

export default new AddUserPage();