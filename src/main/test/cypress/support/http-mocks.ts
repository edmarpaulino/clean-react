import { faker } from '@faker-js/faker'
import type { Method } from 'cypress/types/net-stubbing'

const REQUEST_DELAY_MS = 100

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    delay: REQUEST_DELAY_MS,
    statusCode: 401,
    body: {
      error: faker.word.words()
    }
  }).as('request')
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    delay: REQUEST_DELAY_MS,
    statusCode: 403,
    body: {
      error: faker.word.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  const statusCodes = [400, 404, 500]
  const randomStatusCodesIndex = Math.floor(Math.random() * statusCodes.length)
  const statusCode = statusCodes[randomStatusCodesIndex]
  cy.intercept(method, url, {
    delay: REQUEST_DELAY_MS,
    statusCode,
    body: {
      error: faker.word.words()
    }
  }).as('request')
}

export const mockOk = (url: RegExp, method: Method, body: any): void => {
  cy.intercept(method, url, {
    delay: REQUEST_DELAY_MS,
    statusCode: 200,
    body
  }).as('request')
}
