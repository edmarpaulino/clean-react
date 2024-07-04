import React from 'react'
import { screen, render } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2024-06-23T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('23')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jun$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2023-12-07T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('07')
    expect(screen.getByTestId('month')).toHaveTextContent(/^dez$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
