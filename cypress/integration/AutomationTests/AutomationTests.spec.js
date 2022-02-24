/// <reference types= "cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Login from "../PageObjects/Login/Login";
import CustomerForm from "../PageObjects/CustomerForm/CustomerForm";
import SalesOrder from "../PageObjects/SalesOrder/SalesOrder";

//Login Scenario
Given("the platoform is opened", () => {
  Login.visitLogin();
});
When("the credentials are provided", () => {
  Login.enterCredentials();
});
Then("the login is successful", () => {
  Login.validateLogin();
});
//Login Scenario Ends

//Create New Customer Form Scenario
When("the GlobalAdd button is clicked", () => {
  CustomerForm.clickGlobalAdd();
});
And("the add new customer button is clicked", () => {
  CustomerForm.clickAddNewCustomer();
});
Then("the Create New Customer form is opened", () => {
  CustomerForm.validateCustomerForm("Customer", "customerFormFields");
});
//Create New Customer Form Scenario Ends

//Create a New Customer Scenario
When("the Mandatory fields are filled", () => {
  CustomerForm.enterFormDetails();
});
Then("a customer is created", () => {
  CustomerForm.validateCustomer();
});
//Create a New Customer Scenario Ends

//Create a New Customer With Address Scneatio
And("the billing address is added", () => {
  CustomerForm.addAddress("[data-testid='inputCustomerDefaultBillingAddress']");
});
//Create a New Customer With Address Scneatio Ends

//Clean Data Scenario
Given("customer list is visible", () => {
  CustomerForm.validateCustomerList("#contactsTab", 1, "Customer");
});
When("the created users are deleted", () => {
  CustomerForm.cleanDataCreated();
});
Then("the created users get deleted", () => {});

//Clean Data Scenario Ends

//Open Sales Order Page Scenario
When("the add new Sales Order button is clicked", () => {
  SalesOrder.clickSalesOrder();
});
Then("the sales order tab is opened", () => {
  CustomerForm.validateCustomerForm("Sales order", "saleOrderElemets");
});
//Open Sales Order Page Scenario Ends

//Create a New Sales Order Scenario
When("the mandatory fields of the sales form is filled", () => {
  SalesOrder.SearchCustomer();
});
Then("the Sales order is created", () => {
  SalesOrder.validateCreateSalesOrder();
});
//Create a New Sales Order Scenario Ends

//Update Customer's Address in a Sales Order Scenario
Given("the sales order list is visible", () => {
  CustomerForm.validateCustomerList("#salesTab", 2, "Open");
});
When("the Sales Order Customer Address is edited", () => {
  SalesOrder.editAddressSalesOrder();
});
Then("the Customer order gets updated", () => {
  SalesOrder.validateAddressUpdate();
});
//Update Customer's Address in a Sales Order Scenario

//Delete Sales Order Data Scenario
When("the created Sales order are deleted", () => {
  SalesOrder.deleteCreatedSalesOrder();
});
Then("the Craeted Sales orger get deleted", () => {});
//Delete Sales Order Data Scenario Ends
