import React from 'react'
import { FormStatusBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { signUpState } from '@/presentation/pages/signup/components'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signUpState)

  return <FormStatusBase state={state} />
}

export default FormStatus
