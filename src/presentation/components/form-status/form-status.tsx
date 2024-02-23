import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {Boolean(state.isLoading) && <Spinner className={Styles.spinner} />}
      {Boolean(state.mainError) && <span className={Styles.error}>{state.mainError}</span>}
    </div>
  )
}

export default FormStatus
