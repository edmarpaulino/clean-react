import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {Boolean(state.isLoading) && <Spinner className={Styles.spinner} />}
      {Boolean(errorState.main) && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
