import React from 'react'
import { FormStatusBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { signUpState } from '@/presentation/pages/signup/components'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signUpState)

  return <FormStatusBase state={state} />
}

export default FormStatus
