# Katana Automation Tests

This repo contains automation tests for the Veriff: Document Verifaction Platform

#Setting Up

1. Download the repo to your local system.  
   `git clone https://github.com/adi0709/Katana_Test.git`
2. Make sure you have node and npm installed.
3. Make sure to install the latest version of cypress in the folder.
   Use the commands:  
    `npm install cypress --save-dev`  
    or  
    `yarn add cypress --dev`

4. Make sure to update all the dependencies
   `npm install`
5. Execute the UI tests by running the following commands  
   `npx cypress open`  
   or  
   `npx cypress run --headed --browser chrome`
   or
   `npm run test`
6. 'npm run test` will execute the tests and provide the link to Cypress Dashboard
