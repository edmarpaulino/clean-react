import React from 'react'
import Styles from './answer-styles.scss'

type Props = {
  answer: {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
}

const Answer: React.FC<Props> = ({ answer }) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  return (
    <li data-testid="answer-wrap" key={answer.answer} className={[Styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
