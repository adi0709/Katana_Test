/// <reference types= "cypress" />
import CustomerForm from "../CustomerForm/CustomerForm";

class SalesOrder {
  clickSalesOrder() {
    cy.intercept({
      method: "GET",
      url: "https://settings.katanamrp.com/api/taxRates?**",
    }).as("SalesData");
    cy.get("#add-sales").click();
    cy.wait("@SalesData", { timeout: 5000 })
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
    cy.get("[id*='-popup']", { timeout: 10000 })
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("[id*='-option-1']", { timeout: 10000 })
          .should("contain.text", "Mary Lights [DEMO]")
          .click();
      });
  }
  validateCreateSalesOrder() {
    CustomerForm.validateSave(
      "rgb(148, 154, 159)",
      "All changes saved",
      ".saved"
    );
    CustomerForm.clickClose();
  }

  editAddressSalesOrder() {
    cy.get('[row-index="7"] > [aria-colindex="3"]').click();
    CustomerForm.addAddress("[data-testid='inputSalesOrderBillingAddress']");
  }
  validateAddressUpdate() {
    cy.get('[data-testid="address-field-location"]').should(
      "contain.text",
      Cypress.env("completeAddress")
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
