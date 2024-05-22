import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.person.fullName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password: string = faker.internet.password({ length: 10 })
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name')
      .focus()
      .type(faker.word.sample({ length: 2 }))
    FormHelper.testInputStatus('name', 'Campo inválido')
    cy.getByTestId('email').focus().type(faker.word.sample())
    FormHelper.testInputStatus('email', 'Campo inválido')
    cy.getByTestId('password')
      .focus()
      .type(faker.word.sample({ length: 3 }))
    FormHelper.testInputStatus('password', 'Campo inválido')
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.word.sample({ length: 4 }))
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.person.fullName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    const password: string = faker.internet.password({ length: 10 })
    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse email já está em uso')
    FormHelper.testUrl('/signup')
  })
})
