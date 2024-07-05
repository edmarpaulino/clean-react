import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { signUpState } from '@/presentation/pages/signup/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(signUpState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
