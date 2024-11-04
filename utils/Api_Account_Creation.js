import { $ } from '@wdio/globals';
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiData = require('../test_data/api_test_data.json');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');
const { remote } = require('webdriverio');
import LoggingUtility from './loggerUtil.js';
import envConfig from '../config/environment.json';
import apiloadTestData from './apitestDataUtil.js'

const apitestData = apiloadTestData();
const currentEnv = process.env.NODE_ENV || 'staging'; // Default to 'dev' if no environment is set
const { baseURL } = envConfig[currentEnv];

export async function creationofUser() {
    try {
        const rewardscentral = axios.create({
            baseURL: baseURL,
        });

        // Generate random user data using Faker
        const randFirstName = faker.person.firstName();
        const randLastName = faker.person.lastName();
        const randEmail = faker.internet.email({ firstName: randFirstName, lastName: randLastName });
        const pass = apitestData.Credential.password

        console.log("Generating random user data: ", randFirstName, randLastName, randEmail);

        // API call to create a user
        const response = await rewardscentral.post('/users', {
            firstName: randFirstName,
            lastName: randLastName,
            email: randEmail,
            password: pass
        });

        // Verify the user creation status
        await expect(response.status).to.equal(201);

        const createdUserFilePath = path.join(process.cwd(), 'api_tokens', 'api_user_created.json');
        fs.writeFileSync(createdUserFilePath, JSON.stringify(response.data, null, 2));

        // Extract and log the user ID
        // const user_id = response.data.user._id; // Adjust based on actual structure
        // const token = response.data.token;
        // const email = response.data.email;

        const user_id = response.data.user._id;
        const token = response.data.token;
        const email = response.data.user.email;

        console.log(`User token: ${token}`);
        console.log(`User created with ID: ${user_id}`);
        LoggingUtility.logMessage(`User data: ${JSON.stringify(response.data, null, 2)}`,"info");
        console.log(`User data: ${JSON.stringify(response.data, null, 2)}`);

        // You can add WebdriverIO commands to interact with the UI if needed
        return { user_id, token, email };
        


    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export async function InvalidCreationofUser(testdata) {
    try {
        const rewardscentral = axios.create({
            baseURL: "https://thinking-tester-contact-list.herokuapp.com",
        });

        // API call to create a user
        const response = await rewardscentral.post('/users', {
            firstName: testdata.firstName,
            lastName: testdata.lastName,
            email: testdata.email,
            password: testdata.password
        });

        // Expecting an error
        

    } catch (error) {
        if (error.response) {
            console.error('Error response from API:', error.response.data);
            console.error('Response status:', error.response.status);
            
            await expect(error.response.status).to.equal(400)

            // Log the error data into a file
            const errorFilePath = path.join(process.cwd(), 'api_tokens', 'invalid_user_creation.json');
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

