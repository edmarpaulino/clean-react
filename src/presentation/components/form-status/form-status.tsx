import React, { useContext } from 'react'
import * as Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {state.mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
