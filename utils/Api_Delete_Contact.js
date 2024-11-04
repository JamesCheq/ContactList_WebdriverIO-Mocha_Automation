import { $ } from '@wdio/globals';
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiData = require('../test_data/api_test_data.json');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');
const { remote } = require('webdriverio');
import urlData from '../config/environment.json'
import LoggingUtility from './loggerUtil.js';
import envConfig from '../config/environment.json';
import apiloadTestData from './apitestDataUtil.js'
const apitestData = apiloadTestData();

const currentEnv = process.env.NODE_ENV || 'staging'; // Default to 'dev' if no environment is set
const { baseURL } = envConfig[currentEnv];

export async function DeleteContact(token, user_id) {
    try {
        const rewardscentral = axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // API call to create a user
        const response = await rewardscentral.delete(`/contacts/${user_id}/`);

        // Verify the user creation status
        await expect(response.status).to.equal(200);

        const apiTokenFilePath = path.join(process.cwd(), 'api_tokens', 'api_contact_Deleted.json');
        fs.writeFileSync(apiTokenFilePath, JSON.stringify(response.data, null, 2));

        //const user_id = response.data._id
        LoggingUtility.logMessage(`Contact with ID: ${user_id} has been deleted.`, "info");
        console.log(`Contact with ID: ${user_id} has been deleted.`);
        //return user_id

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};



export async function InvalidContactDeletion(token, invalid_user_id) {
    try {
        const rewardscentral = axios.create({
            baseURL: "https://thinking-tester-contact-list.herokuapp.com",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // API call to create a user
        const response = await rewardscentral.delete(`/contacts/${invalid_user_id}/`);

        //Expectign an error



    } catch (error) {
        if (error.response) {
            console.error('Error response from API:', error.response.data);
            console.error('Response status:', error.response.status);
            
            await expect(error.response.status).to.equal(400);

            // Log the error data into a file
            const errorFilePath = path.join(process.cwd(), 'api_tokens', 'invalid_Contact_Deletion.json');
            fs.writeFileSync(errorFilePath, JSON.stringify({
                errorData: error.response.data,
                status: error.response.status
            }, null, 2));
      
            LoggingUtility.logMessage(`Invalid Creation of User - response status: ${JSON.stringify(error.response.status, null, 2)}`, "info");
            LoggingUtility.logMessage(`Error response from API: ${JSON.stringify(error.response.data, null, 2)}`, "info");

            console.log('Error response saved to:', errorFilePath);
        } else {
            console.error('Error creating user:', error.message);
        }
    }
};

