import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (inputName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {}, setState: (): any => undefined }}>
      <Input name={inputName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const inputName: string = 'field'
    const sut = makeSut(inputName)
    const input = sut.getByTestId(inputName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
