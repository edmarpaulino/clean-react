import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, SaveAccessTokenMock, ValidationStub, FormHelper } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
  router: any
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError ?? null
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: (
        <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
      )
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/login'], initialIndex: 0 })
  const sut = render(<RouterProvider router={router} />)
  return {
    sut,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock,
    router
  }
}

const simulateValidSubmit = async (sut: RenderResult, email?: string, password?: string): Promise<void> => {
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeTruthy()
}

const testElementTextContent = (sut: RenderResult, testId: string, textContent: string): void => {
  const element = sut.getByTestId(testId)
  expect(element.textContent).toBe(textContent)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'email')
    FormHelper.populateField(sut, 'password')
    FormHelper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    void simulateValidSubmit(sut)
    void simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.word.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    testElementTextContent(sut, 'main-error', error.message)
    FormHelper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, router, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(router.state.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    testElementTextContent(sut, 'main-error', error.message)
    FormHelper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should go to signup page', async () => {
    const { sut, router } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(router.state.location.pathname).toBe('/signup')
  })
})
