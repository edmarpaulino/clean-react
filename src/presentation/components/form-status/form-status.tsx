import React from 'react'
import * as Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }) => {
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
