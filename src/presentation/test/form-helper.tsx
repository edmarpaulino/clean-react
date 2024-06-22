import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (testId: string, count: number): void => {
  const element = screen.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (testId: string, isDisabled: boolean): void => {
  const button = screen.getByTestId<HTMLButtonElement>(testId)
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (testId: string, value: string = faker.word.sample()): void => {
  const element = screen.getByTestId(testId)
  fireEvent.input(element, { target: { value } })
}

export const testElementExists = (testId: string): void => {
  const element = screen.getByTestId(testId)
  expect(element).toBeTruthy()
}

export const testElementTextContent = (testId: string, textContent: string): void => {
  const element = screen.getByTestId(testId)
  expect(element.textContent).toBe(textContent)
}
