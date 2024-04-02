import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.word.sample())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password')
      .focus()
      .type(faker.word.sample({ length: 3 }))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('password')
      .focus()
      .type(faker.internet.password({ length: 10 }))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
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
})
