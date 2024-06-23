import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import SignUp from './signup'
import { AddAccountSpy, FormHelper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { EmailInUseError } from '@/domain/errors'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import type { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'

type SutParams = {
  validationError: string
}

type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
  router: React.ComponentProps<typeof RouterProvider>['router']
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError ?? null
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/signup',
      element: <SignUp validation={validationStub} addAccount={addAccountSpy} />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/signup'], initialIndex: 0 })
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
  return {
    validationStub,
    addAccountSpy,
    setCurrentAccountMock,
    router
  }
}

const simulateValidSubmit = async (
  name: string = faker.person.fullName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('name', name)
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  FormHelper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId<HTMLButtonElement>('submit')).toBeDisabled()
    FormHelper.testStatusForField('name', validationError)
    FormHelper.testStatusForField('email', validationError)
    FormHelper.testStatusForField('password', validationError)
    FormHelper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    makeSut({ validationError })
    FormHelper.populateField('name')
    FormHelper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    makeSut({ validationError })
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    makeSut({ validationError })
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    makeSut({ validationError })
    FormHelper.populateField('passwordConfirmation')
    FormHelper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.testStatusForField('name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('passwordConfirmation')
    FormHelper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.populateField('passwordConfirmation')
    expect(screen.getByTestId<HTMLButtonElement>('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    const password = faker.internet.password()
    FormHelper.populateField('name', faker.person.fullName())
    FormHelper.populateField('email', faker.internet.email())
    FormHelper.populateField('password', password)
    FormHelper.populateField('passwordConfirmation', password)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    await waitFor(() => form)
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    void simulateValidSubmit()
    void simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.word.words()
    const { addAccountSpy } = makeSut({ validationError })
    FormHelper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, router, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(router.state.location.pathname).toBe('/')
  })

  test('Should go to login page', async () => {
    const { router } = makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(router.state.location.pathname).toBe('/login')
  })
})
