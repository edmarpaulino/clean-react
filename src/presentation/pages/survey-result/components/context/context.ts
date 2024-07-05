import { createContext } from 'react'

type Context = {
  onAnswer: (answer: string) => void
}

export default createContext<Context | null>(null)
