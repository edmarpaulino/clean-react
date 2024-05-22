import React from 'react'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'
import { faker } from '@faker-js/faker'

const makeSut = (inputName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {}, setState: (): any => undefined }}>
      <Input name={inputName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const inputName: string = faker.database.column()
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const inputName: string = faker.database.column()
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const inputName: string = faker.database.column()
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName)
    const label = sut.getByTestId(`${inputName}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toEqual(input)
  })
})
