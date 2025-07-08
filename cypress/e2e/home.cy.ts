/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("lang", "en");
      },
    });
    cy.get('[data-testid="loader"]', { timeout: 5000 }).should("not.exist");
  });

  it("should display the main title on home", () => {
    cy.get('[data-testid="header-title"]', { timeout: 8000 })
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /Bienvenido a Mi Portafolio|Welcome to My Portfolio/);
  });

  it("should toggle dark mode and change language to English", () => {
    cy.get('[data-testid="toggle-theme"]')
      .filter(":visible")
      .first()
      .click({ force: true });

    cy.get('[data-testid="toggle-language"]')
      .filter(":visible")
      .first()
      .then(($btn) => {
        const isEnglish = $btn.text().includes("🇬🇧");
        if (!isEnglish) cy.wrap($btn).click({ force: true });
      });
    cy.get('[data-testid="toggle-language"]')
      .filter(":visible")
      .first()
      .should("contain.text", "🇬🇧");

    cy.get('[data-testid="header-title"]', { timeout: 10000 })
      .invoke("text")
      .then((t) => t.trim())
      .should("eq", "Welcome to My Portfolio");
  });

  it("should navigate to the Projects page and verify content", () => {
    cy.get('a[href="/projects"]').should("be.visible").click({ force: true });
    cy.url().should("include", "/projects");
    cy.contains(/(Proyectos destacados|Featured Projects)/, {
      timeout: 8000,
    }).should("be.visible");
  });
});
