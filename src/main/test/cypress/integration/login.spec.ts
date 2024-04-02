import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    )
    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    )
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.word.sample())
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo inválido')
    cy.getByTestId('password')
      .focus()
      .type(faker.word.sample({ length: 3 }))
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo inválido'
    )
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .should('not.have.attr', 'title')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
      .should('not.have.attr', 'title')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 401,
      body: {
        error: faker.word.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 400,
      body: {
        error: faker.word.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 200,
      body: {
        invalidProperty: faker.string.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
      .type('{enter}')
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
    cy.url().should('eq', `${baseUrl}/`)
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
    cy.getByTestId('submit').click().click()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, {
      delay: 500,
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
