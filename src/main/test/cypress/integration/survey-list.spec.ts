import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const PATH = /surveys/

const mockUnexpectedError = (): void => {
  Http.mockServerError(PATH, 'GET')
}

const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(PATH, 'GET')
}

const mockSuccess = (): void => {
  cy.fixture('survey-list').then((surveyList) => {
    Http.mockOk(PATH, 'GET', surveyList)
  })
}

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account: object) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('Should reaload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })

  it('Should present items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '27')
      assert.equal(li.find('[data-testid="month"]').text(), 'jun')
      assert.equal(li.find('[data-testid="year"]').text(), '2023')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '28')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2024')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
