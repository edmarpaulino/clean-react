import React from 'react'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import type { AccountModel } from '@/domain/models'
import type { AuthenticationParams } from '@/domain/usecases'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-comosite'

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/login'
  const axiosHttpClient = new AxiosHttpClient<AuthenticationParams, AccountModel>()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return <Login authentication={remoteAuthentication} validation={validationComposite} />
}
