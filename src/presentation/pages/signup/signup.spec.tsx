import React from 'react'
import { type RenderResult, render, cleanup } from '@testing-library/react'
import SignUp from './signup'
import { FormHelper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError ?? null
  const sut = render(<SignUp validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.word.words({ count: 4 })
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
