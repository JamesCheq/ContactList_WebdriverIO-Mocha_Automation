import { $, expect } from '@wdio/globals'
import BasePage from './base_page.js';

class ContactListPage extends BasePage {
    // Define locators for the page elements

    get btnAddContact() {
        return '#add-contact'; 
    }

    get txtName() {
        return '#name'; 
    }

    get txtContactList(){
        return "//h1[text()='Contact List']";
    }

    get firstRowName(){
        return 'td:nth-child(2)';
    }

    async validateHeader(){
        await this.isElementVisible(this.txtContactList)
        await this.attachScreenshot('validate Contact List');
    }

    async clickAddContactButton(){
        await this.clickElement(this.btnAddContact)
        await this.attachScreenshot('click Add Contact Button');
    }

    async clickFirstRowName(){
        await this.clickElement(this.firstRowName)
        await this.attachScreenshot('click Contact');
    }

    // Method to verify if a contact exists in the contact list
    async isContactInList(fullName) {
        // Locate the contact table and check for the presence of the contact
        const contactTable = await $('table#myTable'); // Adjust the selector to your actual table selector
        const contactRows = await contactTable.$$('.contactTableBodyRow'); // Assuming each contact row has this class

        for (const row of contactRows) {
            const nameCell = await row.$('td:nth-child(2)'); // Assuming name is in the second column
            
            const nameText = await nameCell.getText();
            console.log("test1", nameText)
            if (nameText.includes(fullName)) {
                console.log("lopp", nameText)
                return true; // Contact found
            }
        }
        return false; // Contact not found
    }

    // Method to check if the first row exists
    async verifyDataIsDeleted() {
          // Use the selector from the getter to find the element
        const firstRowElement = await $(this.firstRowName);
        
        // Check if the first row element is displayed or exists
        const isDisplayed = await firstRowElement.isDisplayed(); // Check if the element is visible
        const exists = await firstRowElement.isExisting(); // Check if the element exists in the DOM
        
        // Log the results for debugging
        console.log(`First row displayed: ${isDisplayed}`);
        console.log(`First row exists: ${exists}`);
        
        // Verify that the row is not displayed or does not exist
        await expect(isDisplayed).toBe(false); // Assert that the row is not displayed
        await expect(exists).toBe(false); // Assert that the row does not exist
    }

    async verifyDataIsNotDeleted() {
        // Use the selector from the getter to find the element
        const firstRowElement = await $(this.firstRowName);  
        await firstRowElement.isDisplayed();
    
    }


}

export default new ContactListPage;
