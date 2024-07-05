import React from 'react'
import * as Styles from './loading-styles.scss'
import { Spinner } from '@/presentation/components'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading
