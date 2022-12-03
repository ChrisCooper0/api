/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("index page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("displays two input fields", () => {
    cy.get("input").should("have.length", 2);

    cy.get("input").first().should("have.attr", "placeholder", "email");
    cy.get("input").last().should("have.attr", "placeholder", "password");
  });

  it("displays two buttons", () => {
    cy.get("button").should("have.length", 2);

    cy.get("button").first().should("have.text", "Sign Up");
    cy.get("button").last().should("have.text", "Log In");
  });
});
