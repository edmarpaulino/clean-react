import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
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
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
  return {
    validationStub,
    authenticationSpy,
    setCurrentAccountMock,
    router
  }
}

const simulateValidSubmit = async (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId<HTMLButtonElement>('submit')).toBeDisabled()
    FormHelper.testStatusForField('email', validationError)
    FormHelper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    expect(screen.getByTestId<HTMLButtonElement>('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    FormHelper.populateField('email', faker.internet.email())
    FormHelper.populateField('password', faker.internet.password())
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    await waitFor(() => form)
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    void simulateValidSubmit()
    void simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.word.words()
    const { authenticationSpy } = makeSut({ validationError })
    FormHelper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, router, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(router.state.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { router } = makeSut()
    const signupLink = screen.getByTestId('signup-link')
    fireEvent.click(signupLink)
    expect(router.state.location.pathname).toBe('/signup')
  })
})
