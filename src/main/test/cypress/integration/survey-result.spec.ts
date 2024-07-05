import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const PATH = /api\/surveys/

const mockUnexpectedError = (): void => {
  Http.mockServerError(PATH, 'GET')
}

const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(PATH, 'GET')
}

const mockSuccess = (): void => {
  cy.fixture('survey-result').then((surveyResult) => {
    Http.mockOk(PATH, 'GET', surveyResult)
  })
}

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account: object) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('Should reaload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })

  it('Should present survey result', () => {
    mockSuccess()
    cy.visit('/surveys/any_id')
    cy.getByTestId('question').should('have.text', 'Question')
    cy.getByTestId('day').should('have.text', '27')
    cy.getByTestId('month').should('have.text', 'jun')
    cy.getByTestId('year').should('have.text', '2023')
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
      assert.equal(li.find('[data-testid="percent"]').text(), '70%')
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
      assert.equal(li.find('[data-testid="percent"]').text(), '30%')
      assert.notExists(li.find('[data-testid="image"]'))
    })
  })

  it('Should go to SurveyList on back button click', () => {
    mockSuccess()
    cy.visit('')
    cy.visit('/surveys/any_id')
    cy.getByTestId('back-button').click()
    Helper.testUrl('/')
  })
})