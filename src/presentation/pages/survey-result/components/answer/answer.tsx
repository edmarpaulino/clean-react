import React from 'react'
import * as Styles from './answer-styles.scss'
import type { SurveyResultAnswerModel } from '@/domain/models'
import { useRecoilValue } from 'recoil'
import { onSurveyAnswerState } from '../atoms/atoms'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)

  const answerClick = (): void => {
    if (answer.isCurrentAccountAnswer) {
      return
    }
    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      key={answer.answer}
      aria-selected={answer.isCurrentAccountAnswer}
      className={Styles.answerWrap}
      onClick={answerClick}
    >
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
