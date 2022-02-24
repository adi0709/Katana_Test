/// <reference types= "cypress" />

class Login {
  visitLogin() {
    cy.visit("/");
    cy.contains("Sign in").should("exist").and("be.visible").click();
  }
  enterCredentials() {
    cy.get("#1-email")
      .should("exist")
      .and("be.visible")
      .type(Cypress.env("email"));
    cy.get('[name="password"')
      .should("exist")
      .and("be.visible")
      .type(Cypress.env("password"));
    cy.intercept({
      method: "GET",
      url: "https://sales.katanamrp.com/api/salesOrderOpenLists?filter=**",
    }).as("salesList");
    cy.get('[name="submit"').should("exist").and("be.visible").click();
    cy.wait("@salesList", { timeout: 5000 })
      .its("response.statusCode")
      .should("eq", 200);
  }
  validateSelectors($data) {
    const selectors = $data;
    for (var i = 0; i < selectors.length; i++)
      cy.get(selectors[i]).should("exist").and("be.visible");
  }
  validateLogin() {
    this.validateSelectors(Cypress.env("navSelectors"));
    cy.get(".sc-hKFxyN")
      .should("exist")
      .and("be.visible")
      .and("contain.text", Cypress.env("username"));
  }
}

module.exports = new Login();
