import type { RenderResult } from '@testing-library/react'

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testChildCount = (sut: RenderResult, testId: string, count: number): void => {
  const element = sut.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}
