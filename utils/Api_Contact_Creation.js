const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiData = require('../test_data/api_test_data.json');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');
const { remote } = require('webdriverio');
import urlData from '../config/environment.json'
import LoggingUtility from './loggerUtil.js';
import ReusableHelpers from '../utils/reusable_scripts';
import apiloadTestData from './apitestDataUtil.js'
const apitestData = apiloadTestData();
const helpers = new ReusableHelpers();

import envConfig from '../config/environment.json';

const currentEnv = process.env.NODE_ENV || 'staging'; // Default to 'dev' if no environment is set
const { baseURL } = envConfig[currentEnv];

export async function AddContact(token) {
    try {
        const rewardscentral = axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // API call to create a user
        const response = await rewardscentral.post('/contacts', {
            firstName: apitestData.AddContact.firstName,
            lastName: apitestData.AddContact.lastName,
            email: apitestData.AddContact.email,
            birthdate: apitestData.AddContact.birthdate,
            phone: apitestData.AddContact.phone,
            street1: apitestData.AddContact.street1,
            street2: apitestData.AddContact.street2,
            city: apitestData.AddContact.city,
            stateProvince: apitestData.AddContact.stateProvince,
            postalCode: apitestData.AddContact.postalCode,
            country: apitestData.AddContact.country,
        });

        // Verify the user creation status
        await expect(response.status).to.equal(201);

        const apiTokenFilePath = path.join(process.cwd(), 'api_tokens', 'api_contact_Added.json');
        fs.writeFileSync(apiTokenFilePath, JSON.stringify(response.data, null, 2));

        const user_id = response.data._id
        console.log(`User token: ${token}`);
        LoggingUtility.logMessage(`User data: ${JSON.stringify(response.data, null, 2)}`, "info");
        console.log(`User data: ${JSON.stringify(response.data, null, 2)}`);
 
        return user_id

        

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export async function AddMultipleContact(token) {
    try {
        const rewardscentral = axios.create({
            baseURL: "https://thinking-tester-contact-list.herokuapp.com",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // API call to create a user
        const response = await rewardscentral.post('/contacts', {
            firstName: apitestData.AddContact.firstName,
            lastName: apitestData.AddContact.lastName,
            email: apitestData.AddContact.email,
            birthdate: apitestData.AddContact.birthdate,
            phone: apitestData.AddContact.phone,
            street1: apitestData.AddContact.street1,
            street2: apitestData.AddContact.street2,
            city: apitestData.AddContact.city,
            stateProvince: apitestData.AddContact.stateProvince,
            postalCode: apitestData.AddContact.postalCode,
            country: apitestData.AddContact.country,
        });

        const responses = await rewardscentral.post('/contacts', {
            firstName: apitestData.AdditionalContact.firstName,
            lastName: apitestData.AdditionalContact.lastName,
            email: apitestData.AdditionalContact.email,
            birthdate: apitestData.AdditionalContact.birthdate,
            phone: apitestData.AdditionalContact.phone,
            street1: apitestData.AdditionalContact.street1,
            street2: apitestData.AdditionalContact.street2,
            city: apitestData.AdditionalContact.city,
            stateProvince: apitestData.AdditionalContact.stateProvince,
            postalCode: apitestData.AdditionalContact.postalCode,
            country: apitestData.AdditionalContact.country,
        });

        // Verify the user creation status
        await expect(response.status).to.equal(201);

        const apiTokenFilePath = path.join(process.cwd(), 'api_tokens', 'api_contact_Added.json');
        const apiContactFilePath = path.join(process.cwd(), 'api_tokens', 'api_contact_Added_Multiple.json');
        fs.writeFileSync(apiTokenFilePath, JSON.stringify(responses.data, null, 2));
        //fs.writeFileSync(apiTokenFilePath, JSON.stringify(response.data, responses.data, null, 2));
        fs.writeFileSync(apiTokenFilePath, JSON.stringify({ contact1: response.data, contact2: responses.data }, null, 2));

        const user_id = response.data._id
        console.log(`User token: ${token}`);
        LoggingUtility.logMessage(`User data: ${JSON.stringify(response.data, null, 2)}`, "info");
        console.log(`User data: ${JSON.stringify(response.data, null, 2)}`);
        // Log both contact details to the console
        console.log(`First Contact Data: ${JSON.stringify(response.data, null, 2)}`);
        console.log(`Second Contact Data: ${JSON.stringify(responses.data, null, 2)}`);
 
        return user_id

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export async function InvalidAddContact(token, testdata) {
    try {
        const rewardscentral = axios.create({
            baseURL: "https://thinking-tester-contact-list.herokuapp.com",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // API call to create a user
        const response = await rewardscentral.post('/contacts', {
            firstName: testdata.firstName,
            lastName: testdata.lastName,
            email: testdata.email,
            birthdate: testdata.birthdate,
            phone: testdata.phone,
            street1: testdata.street1,
            street2: testdata.street2,
            city: testdata.city,
            stateProvince: testdata.stateProvince,
            postalCode: testdata.postalCode,
            country: testdata.country,
        });

        //Expecting an error

        // Verify the user creation status
        await expect(response.status).to.equal(201);


    } catch (error) {
        if (error.response) {
            console.error('Error response from API:', error.response.data);
            console.error('Response status:', error.response.status);

            await expect(error.response.status).to.equal(400);

            // Log the error data into a file
            const errorFilePath = path.join(process.cwd(), 'api_tokens', 'invalid_Contact_additional.json');
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
