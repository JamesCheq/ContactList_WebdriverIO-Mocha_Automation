import { $ } from '@wdio/globals';
// import Page from './page.js';
import BasePage from './base_page.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EditContactPage extends BasePage {
    // Locators

    get txtEditContactHeader() {
        return "//h1[text()='Edit Contact']";
    }

    get txtfirstName() {
        return '#firstName'; // Name input field
    }

    get txtlastName() {
        return '#lastName'; // Name input field
    }   

    get btnSubmit() {
        return 'button[type="submit"]'; // Save Button
    }

    get btnCancel() {
        return 'button*=Cancel'; // Cancel Button (assuming it contains "Cancel" text)
    }

    
    get successMessage() {
        return $('.alert-success'); // Success alert
    }

    get errorMessage() {
        return $('.alert-danger'); // Error alert
    }
    
    async verifyEditContactHeader() {
        await this.isElementVisible(this.txtEditContactHeader)
        await this.attachScreenshot('Verify Edit Contact Header');
    }

    async editFirstName(firstname) {
        await this.fillData(this.txtfirstName, firstname)
        await this.attachScreenshot('enter First Name');
    }


    async editLastName(lastname) {
        await this.fillData(this.txtlastName, lastname)
        await this.attachScreenshot('enter Last Name');
    }

    async clickSubmitButton() {
        await this.clickElement(this.btnSubmit)
        await this.attachScreenshot('click Submit Button');
    }

    // Method to cancel the edit action
    async clickCancelButton() {
        await this.clickElement(this.btnCancel)
        await this.attachScreenshot('click Cancel Button');
    }


    // Method to verify if success message is displayed
    async isSuccessMessageDisplayed() {
        return await this.successMessage.isDisplayed();
    }

    // Method to verify if error message is displayed
    async isErrorMessageDisplayed() {
        return await this.errorMessage.isDisplayed();
    }


}

export default new EditContactPage();
