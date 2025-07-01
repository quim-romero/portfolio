/// <reference types="cypress" />

describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/contact");
    cy.get('[data-testid="loader"]', { timeout: 4000 }).should("not.exist");
  });

  it("should render the contact form with all fields", () => {
    cy.get("form").should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('textarea[name="message"]').should("exist");
  });

  it("should show validation errors if fields are empty", () => {
    cy.get('button[type="submit"]').click();

    cy.contains(/(El nombre es obligatorio|Name is required)/i).should(
      "be.visible"
    );
    cy.contains(
      /(El correo electrónico es obligatorio|Email is required)/i
    ).should("be.visible");
    cy.contains(/(El mensaje es obligatorio|Message is required)/i).should(
      "be.visible"
    );
  });

  it("should submit the form with valid data and show success message", () => {
    cy.get('input[name="name"]').type("Quim Test");
    cy.get('input[name="email"]').type("quim@test.com");
    cy.get('textarea[name="message"]').type("Este es un mensaje de prueba.");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="contact-success"]', { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
