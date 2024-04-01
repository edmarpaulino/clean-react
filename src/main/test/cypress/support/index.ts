declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable
  }
}

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))
