import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, FormHelper } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import ApiContext from '@/presentation/contexts/api/api-context'
import type { AccountModel } from '@/domain/models'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
  router: React.ComponentProps<typeof RouterProvider>['router']
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError ?? null
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login validation={validationStub} authentication={authenticationSpy} />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/login'], initialIndex: 0 })
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
  return {
    sut,
    validationStub,
    authenticationSpy,
    setCurrentAccountMock,
    router
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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
    FormHelper.testElementExists(sut, 'spinner')
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
    FormHelper.testElementTextContent(sut, 'main-error', error.message)
    FormHelper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, router, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(router.state.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { sut, router } = makeSut()
    const signupLink = sut.getByTestId('signup-link')
    fireEvent.click(signupLink)
    expect(router.state.location.pathname).toBe('/signup')
  })
})
