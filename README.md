# Selenium Javascript WebdriverIO with Mocha


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)
- [Reporting and Logs](#reporting-and-logs)
 
## Introduction
WebdriverIO is a popular JavaScript testing framework for automating web applications. It provides a robust platform for writing, managing, and executing end-to-end tests for both browser and mobile applications.

WebdriverIO is a Next-gen test automation framework that works seamlessly with Selenium WebDriver and Puppeteer. It allows you to write and execute tests in various environments like Chrome, Firefox, Safari, and more, with great cross-browser compatibility. It is especially suitable for modern web and mobile testing, with support for native mobile app testing using Appium.


 
## Features
- **Cross-Browser Testing**
- **Supports Multiple Drivers**
- **Flexible Integration**
- **Rich Plugin Ecosystem**
- **Developer-Friendly**
 
## Installation
 **Pre-requisites:**
 1. **Install VS Code**
    - Ensure you have Visual Studio Code installed on your machine.
 2. **Install Node.js and npm**  
    - Download and install Node.js, which also installs npm (Node Package Manager).
 3. **Verify installations**  
   _Run the following commands in the terminal to confirm that Node.js and npm are successfully installed:_
   ```
   node -v
   npm -v
   ```
**Installation Steps:**
 1. Clone the Repository to your local machine:
```
- git clone https://github.com/hudjin05/WebdriverIO-Automation-Framework
- cd your-repo
```

 2. Open the Project in VS Code
Open the project folder in Visual Studio Code:

 3. Install All Dependencies. In the project directory, install the code below:
```
npm install
```
**Configuration:**
```
· WebdriverIO Configuration: Modify the wdio.conf.js test timeout and other WebdriverIO-specific settings.
· Environment Variables: Use .json files to manage different environment URL.
```
## Folder Structure
  ```
Main Folder Directory
├── api_tokens/                # API Tokens
├── config/                   # Environment
├── hooks/                    # Web-Hooks (Initialize and Teardown)
├── logs/                     # Log Files for test execution
├── pages/                    # Page Objects
├── reports/                  # This is where the allure-report and screenshots are saved.
├── test/                     # Test scripts 
├── test_data/                # Test Data for test execution
├── utils/                    # utilities function (API setup, logging text file, take screenshot, reporter utils and etc.)
├── package-lock.json         # Details of dependencies
├── package.json              # Project metadata and dependencies
├── wdio.conf.js              # WedriverIO configuration
└── README.md                 # Project documentation
  ```

## Running Tests


To run all tests, use this command:
```
$env:NODE_ENV="staging"; npx wdio wdio.conf.js
```
To run a specific test spec, use the following commands:
```
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/ui/Account_Creation_via_ui.spec.js --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/ui/Contact_Creation_for_the_New_User_via_UI.spec.js --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/ui/Delete_Contract_via_UI.spec.js --browser microsoftedge$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/ui/Edit_Contract_via_UI.spec.js --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/api/Account_Creation_via_UI.spec.js --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/api/Contact_Creation_for_the_New_User_via_UI.spec.js --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/api/Delete_Contract_via_UI.spec.js --browser microsoftedge$env:NODE_ENV="staging"; npx wdio run ./wdio.conf.js --spec test/api/Edit_Contract_via_API.spec.js --browser microsoftedge

```
To run a specific test with tags:
list of tags:
 - @ALLUI
 - @ALLAPI
 - @UICreation
 - @uiaccountcreation
 - @uiinvalidaccountcreation
 - @UIContact
 - @uinewcontact
 - @uimultiplecontact
 - @uiinvalidcontact
 - @UIDelete
 - @uideletecontact
 - @uiinvaliddelete
 - @UIEdit
 - @uieditcontact
 - @uiinvalidupdate
 - @APICreation
 - @apiaccountcreation
 - @apifailedaccountcreation
 - @APIContact
 - @apinewcontact
 - @apiadditionalcontact
 - @apiinvalidcontact
 - @APIDelete
 - @apideletecontact
 - @apiinvaliddeletecontact
 - @APIEdit
 - @apieditcontact
 - @apiinvalideditcontact
```
$env:NODE_ENV="staging"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser microsoftedge
```
To run all tests in a different environment, use the following commands:
```
$env:NODE_ENV="staging"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser microsoftedge
$env:NODE_ENV="dev"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser microsoftedge
$env:NODE_ENV="prod"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser microsoftedge
```

To run all tests in a different browsers, use the following commands:
```
$env:NODE_ENV="staging"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser microsoftedge
$env:NODE_ENV="staging"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser chrome
$env:NODE_ENV="staging"; npx wdio wdio.conf.js --mochaOpts.grep=@ALLUI --browser firefox
```

## Reporting and Logs
- Allure-results: These results are typically in the form of JSON files and contain detailed information about each test, including test steps, statuses, attachments, and other metadata. To generate the report using to report/allure-report folder:
```
allure generate reports/allure-results -o reports/allure-report --clean
```
- Allure Report: This folder is the output of the Allure report generation process. It contains the static HTML files and assets needed to visualize the test results in a web browser. To open the report using:
```
allure open ./reports/allure-report
```
- Logs: Logs are stored in the logs/ folder.
- Screenshots: Screenshots are captured automatically and saved in the report/Screenshots/ folder.





