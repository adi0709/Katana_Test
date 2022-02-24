/// <reference types= "cypress" />

import Login from "../Login/Login";

class CustomerForm {
  clickGlobalAdd() {
    cy.get("#globalAdd").should("exist").and("be.visible").click();
  }

  clickAddNewCustomer() {
    Login.validateSelectors(Cypress.env("globalAddselectors"));
    cy.intercept({
      method: "GET",
      url: "https://ipa.elev.io/api/settings/5940f58b1cb3d/en?is_init_load=false&loggedin_only=false&first_name=null&last_name=null&registered_at=null&previewMode=false&url=https%3A%2F%2Ffactory.katanamrp.com%2Fcustomer",
    }).as("Rates", { timeout: 20000 });
    cy.get("#add-customer").should("exist").and("be.visible").click();
    cy.wait("@Rates", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  }
  validateSave($color, $txt, $el) {
    cy.get(
      ".MuiGrid-justify-content-xs-center > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiGrid-root"
    ).within(() => {
      cy.get(".MuiButtonBase-root.print-hide")
        .should("exist")
        .and("be.visible");
      cy.get("span.print-hide > .MuiButtonBase-root")
        .should("exist")
        .and("be.visible");
      cy.get($el)
        .should("exist")
        .and("be.visible")
        .and("contain.text", $txt)
        .and("have.a.css", "color", $color);
    });
  }
  validateCustomerForm($txt, $el) {
    this.validateSave("rgb(228, 44, 0)", "Not saved", ".notSaved");
    cy.get(".MuiGrid-grid-xs-true").within(() => {
      cy.get(".MuiTypography-caption")
        .should("exist")
        .and("be.visible")
        .and("contain.text", $txt);
    });

    Login.validateSelectors(Cypress.env($el));
  }
  enterFormDetails() {
    cy.intercept({
      method: "POST",
      url: "https://customers.katanamrp.com/api/customers",
    }).as("customer");
    cy.get(Cypress.env("customerFormFields")[0]).type(Cypress.env("fName"));
    cy.get(Cypress.env("customerFormFields")[1]).type(Cypress.env("lName"));
    cy.get(Cypress.env("customerFormFields")[4]).type(Cypress.env("email"));
    cy.get(Cypress.env("customerFormFields")[3]).click(); //To save the added customer
    cy.wait("@customer", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
  }
  clickClose() {
    cy.get(".MuiGrid-root > .MuiButtonBase-root.print-hide").click();
  }
  validateCustomer() {
    this.validateSave("rgb(148, 154, 159)", "All changes saved", ".saved");
    cy.intercept({
      method: "GET",
      url: "https://customers.katanamrp.com/api/customers?filter=**",
    }).as("CustomerList");
    this.clickClose();

    cy.wait("@CustomerList", { timeout: 20000 })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[data-testid="cellName"]')
      .should("exist")
      .and("be.visible")
      .and("contain.text", Cypress.env("fName"));
  }
  addAddress($el) {
    cy.get($el).click();
    cy.get("[role='dialog']")
      .should("exist")
      .and("be.visible")
      .within(() => {
        for (var i = 0; i < Cypress.env("billingInfo").length; i++) {
          cy.get("input").eq(i).type(Cypress.env("billingInfo")[i]);
        }
        cy.get("[name='line1']").type(Cypress.env("address"));
      });

    cy.get(".MuiPaper-elevation1", { timeout: 10000 })
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("[role='option']", { timeout: 10000 })
          .eq(0)
          .should("contain.text", "Peetri 7, Tallinn, Estonia")
          .click({ force: true });
      });

    cy.get("[role='dialog']").within(() => {
      cy.get("#cancelButton").should("exist").and("be.visible");
      cy.get("#submitButton").should("exist").and("be.visible").click();
    });
  }
  validateCustomerList($selector, $el, $txt) {
    cy.get($selector).should("have.attr", "aria-selected", "true");
    cy.get("[role='tablist']")
      .eq($el)
      .within(() => {
        cy.get("[role='tab']").should("have.length", "2");
        cy.get("[role='tab']")
          .eq(0)
          .should("contain.text", $txt)
          .and("have.attr", "aria-selected", "true");
      });
  }
  cleanDataCreated() {
    cy.get('[data-testid="cellName"]')
      .its("length")
      .then(($customer) => {
        for (var i = 5; i < $customer; i++) {
          cy.get('[row-index="' + i + '"]').within(() => {
            cy.get('[ref="eInput"]').click();
          });
        }
        cy.contains("Bulk actions").click();
        cy.get(".MuiList-root").within(() => {
          cy.get("[role='menuitem']").should("contain.text", "Delete").click();
        });
      });
  }
  validateClearData() {
    cy.get('[data-testid="cellName"]').should(
      "not.contain.text",
      Cypress.env("fname")
    );
  }
}

module.exports = new CustomerForm();
