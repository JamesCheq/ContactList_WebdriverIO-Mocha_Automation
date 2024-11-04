import { $, browser } from '@wdio/globals';
import BasePage from './base_page.js';
import ContactListPage from './contact_list_page.js'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactDetailsPage extends BasePage {
    // Locators

    get txtContactDetailsHeader() {
        return "//h1[text()='Contact Details']";
    }

    get btnEdit() {
        return '#edit-contact'; // Save Button
    }

    get btnDelete() {
        return '#delete';
    }
    
    get btnReturn() {
        return '#return'; // Return to Contact List Button
    }

    get successMessage() {
        return $('.alert-success'); // Success alert
    }

    get errorMessage() {
        return $('.alert-danger'); // Error alert
    }

    // Method to delete a contact
    async verifyHeaderContactDetails() {
        await this.isElementVisible(this.txtContactDetailsHeader)
        await this.attachScreenshot('validate Contact Details');
    }

    async clickDeleteContact(){
        await this.clickDelete(this.btnDelete);
    }

    //Method to delete a contact
    async clickDeleteContactCancel() {

        browser.on('dialog', async (dialog) => {
            console.log('Dialog message:', dialog.message()); // Logs the confirmation message
            await dialog.dismiss(); // Ensure confirmation dialog is accepted
        });
        await this.clickElement(this.btnDelete)
        await this.attachScreenshot('click Delete Cancel Button');
    }
    
    async clickEditContact() {
        await this.clickElement(this.btnEdit)
        await this.attachScreenshot('click Edit Button');
    }

    async clickReturn() {
        await this.clickElement(this.btnReturn)
        await this.attachScreenshot('click Return Button');
    }

}



export default new ContactDetailsPage();
