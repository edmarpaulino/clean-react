import React, { useContext, useEffect } from 'react'
import * as Styles from './login-styles.scss'
import { LoginHeader, Footer } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import type { Validation } from '@/presentation/protocols/validation'
import type { Authentication } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginState, Input, SubmitButton, FormStatus } from '@/presentation/pages/login/components'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useRecoilState(loginState)

  const validate = (field: 'email' | 'password'): void => {
    const { email, password } = state
    const formData = { email, password }
    setState((prev: any) => ({ ...prev, [`${field}Error`]: validation.validate(field, formData) }))
    setState((prev: any) => ({ ...prev, isFormInvalid: !!prev.emailError || !!prev.passwordError }))
  }

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((prev: any) => ({ ...prev, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount!(account)
      navigate('/')
    } catch (error: any) {
      setState((prev: any) => ({ ...prev, isLoading: false, mainError: error.message }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton text="Entrar" />
        <Link data-testid="signup-link" to="/signup" replace className={Styles.link}>
          Criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
