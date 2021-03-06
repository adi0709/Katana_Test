/// <reference types= "cypress" />
import CustomerForm from "../CustomerForm/CustomerForm";

class SalesOrder {
  clickSalesOrder() {
    cy.intercept({
      method: "GET",
      url: "https://settings.katanamrp.com/api/taxRates?**",
    }).as("SalesData");
    cy.get("#add-sales").click();
    cy.wait("@SalesData", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);
    CustomerForm.validateSave("rgb(228, 44, 0)", "Not saved", ".notSaved");
  }
  SearchCustomer() {
    cy.intercept({
      method: "GET",
      url: "https://customers.katanamrp.com/api/customers/searchBy?keyword=**",
    }).as("SearchCustomer");
    cy.get(".MuiAutocomplete-root").within(() => {
      cy.get("[placeholder='Search or create customer']").type("Demo");
    });
    cy.wait("@SearchCustomer", { timeout: 5000 })
      .its("response.statusCode")
      .should("eq", 200);
    cy.intercept({
      method: "GET",
      url: "/api/customer-addresses?filter={'where':{'customerId':**",
    }).as("saveDetails");
    cy.get("[id*='-popup']", { timeout: 20000 })
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("[id*='-option-1']", { timeout: 20000 })
          .should("be.visible")
          .and("contain.text", "Mary Lights [DEMO]")
          .click();
      });
    cy.get('[data-testid="header-name-salesOrder"]').click(); //to get the sales order saved
  }
  validateCreateSalesOrder() {
    CustomerForm.validateSave(
      "rgb(148, 154, 159)",
      "All changes saved",
      ".saved"
    );
  }

  validateAddressUpdate() {
    cy.get('[data-testid="address-field-location"]').should(
      "contain.text",
      "Peetri"
    );
    CustomerForm.clickClose();
  }
  deleteCreatedSalesOrder() {
    cy.get("#KatanaGridContainer").within(() => {
      cy.get(".ag-center-cols-container [aria-colindex='2']")
        .its("length")
        .then(($el) => {
          for (var i = 7; i < $el; i++) {
            cy.get(".ag-center-cols-container [aria-colindex='2']")
              .eq(i)
              .click();
          }
        });
    });
    cy.get("[data-testid='actionBarMenu']").click();
    cy.get("[role='menu']")
      .eq(4)
      .within(() => {
        cy.contains("Delete").click();
      });
    cy.get('[role="dialog"]')
      .should("exist")
      .should("be.visible")
      .within(() => {
        cy.get(".MuiDialogActions-root").within(() => {
          cy.get(".MuiButton-text").should("exist").and("be.visible");
          cy.get(".MuiButton-contained")
            .should("exist")
            .and("be.visible")
            .click();
        });
      });
  }
  validateDeleteSalesOrder() {
    cy.get('[aria-colindex="3"] > .ag-react-container')
      .its("length")
      .then(($len) => {
        for (var i = 1; i < $len; i++) {
          cy.get('[aria-colindex="3"] > .ag-react-container')
            .eq(i)
            .should("contain.text", "Demo");
        }
      });
  }
}

module.exports = new SalesOrder();
