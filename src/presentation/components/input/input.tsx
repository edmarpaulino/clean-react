/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useRef } from 'react'
import * as Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { name: string }

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>(null)
  const error = state[`${props.name}Error`]

  return (
    <div data-testid={`${props.name}-wrap`} className={Styles.inputWrap} data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
        onChange={(e) => {
          setState((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current!.focus()
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
