import { faker } from '@faker-js/faker'
import { fireEvent, type RenderResult } from '@testing-library/react'

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(`${fieldName}`)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (
  sut: RenderResult,
  testId: string,
  count: number
): void => {
  const element = sut.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  testId: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (
  sut: RenderResult,
  testId: string,
  value: string = faker.word.sample()
): void => {
  const element = sut.getByTestId(testId)
  fireEvent.input(element, { target: { value } })
}

export const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeTruthy()
}

export const testElementTextContent = (
  sut: RenderResult,
  testId: string,
  textContent: string
): void => {
  const element = sut.getByTestId(testId)
  expect(element.textContent).toBe(textContent)
}
