/* eslint-disable react/prop-types */

import React from 'react'
import * as Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }) => {
  const negativeClass = isNegative ? Styles.negative : ''
  return (
    <div {...props} data-testid="spinner" className={[Styles.spinner, negativeClass, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
