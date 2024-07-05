import React from 'react'
import FlipMove from 'react-flip-move'
import Styles from './result-styles.scss'
import { Calendar } from '@/presentation/components'
import { useNavigate } from 'react-router-dom'
import type { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
  const navigate = useNavigate()

  const goBack = (): void => {
    navigate(-1)
  }

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answerList}>
        {/* To fix FlipMovePropConverter error */}
        <>
          {surveyResult.answers.map((answer) => (
            <SurveyResultAnswer key={answer.answer} answer={answer} />
          ))}
        </>
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={goBack}>
        Voltar
      </button>
    </>
  )
}

export default Result
