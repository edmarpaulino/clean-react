import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import type { Validation } from '@/presentation/protocols/validation'
import type { AddAccount } from '@/domain/usecases'
import { useNavigate, Link } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState<any>({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: null,
    emailError: null,
    passwordError: null,
    passwordConfirmationError: null,
    mainError: null
  })

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])

  const validate = (field: 'name' | 'email' | 'password' | 'passwordConfirmation'): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState((prev: any) => ({ ...prev, [`${field}Error`]: validation.validate(field, formData) }))
    setState((prev: any) => ({
      ...prev,
      isFormInvalid: !!prev.nameError || !!prev.emailError || !!prev.passwordError || !!prev.passwordConfirmationError
    }))
  }

  useEffect(() => {
    validate('name')
  }, [state.name])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  useEffect(() => {
    validate('passwordConfirmation')
  }, [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((prev: any) => ({ ...prev, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount!(account)
      navigate('/')
    } catch (error: any) {
      setState((prev: any) => ({ ...prev, isLoading: false, mainError: error.message }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={contextValue}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link data-testid="login-link" to="/login" replace className={Styles.link}>
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
