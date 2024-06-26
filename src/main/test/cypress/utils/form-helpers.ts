export const testInputStatus = (field: string, error?: string): void => {
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).focus().should(attr, 'title', error)
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('exist')
  cy.getByTestId('main-error').should('contain.text', error)
}
