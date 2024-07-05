import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { signUpState } from '@/presentation/pages/signup/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(signUpState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
