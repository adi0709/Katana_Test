Feature: Test the product search functionality

    Successfully Test the Katana Product Functionality
    Scenario: Login into the platform
        Given the platoform is opened
        When the credentials are provided
        Then the login is successful

    Scenario: Open Create customer form
        Given the login is successful
        When the GlobalAdd button is clicked
        And the add new customer button is clicked
        Then the Create New Customer form is opened

    Scenario: Create a new Customer
        Given the Create New Customer form is opened
        When the Mandatory fields are filled
        Then a customer is created

    Scenario: Create a new Customer with Address
        Given the GlobalAdd button is clicked
        And the add new customer button is clicked
        When the Mandatory fields are filled
        And the billing address is added
        Then a customer is created

    Scenario: Delete the created data
        Given customer list is visible
        When the created users are deleted
        Then the created users get deleted

    Scenario: Open Sales Order Page
        Given the GlobalAdd button is clicked
        When the add new Sales Order button is clicked
        Then the sales order tab is opened

    Scenario: Create a new Sales Order
        Given the sales order tab is opened
        When the mandatory fields of the sales form is filled
        Then the Sales order is created

    Scenario: Edit Customer Address of a Sales Order
        Given the sales order list is visible
        When the Sales Order Customer Address is edited
        Then the Customer order gets updated

    Scenario:  Delete Sales Order Data
        Given the sales order list is visible
        When the created Sales order are deleted
        Then the Craeted Sales orger get deleted