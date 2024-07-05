import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const PATH = /api\/surveys/

const mockUnexpectedError = (): void => {
  Http.mockServerError(PATH, 'GET')
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
})
