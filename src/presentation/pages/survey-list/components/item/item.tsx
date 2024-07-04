import React from 'react'
import Styles from './item-styles.scss'
import { Calendar, Icon, IconName } from '@/presentation/components'
import type { LoadSurveyList } from '@/domain/usecases'
import { useNavigate } from 'react-router-dom'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  const navigate = useNavigate()

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <a
          data-testid="link"
          onClick={() => {
            navigate(`/surveys/${survey.id}`)
          }}
        >
          Ver Resultado
        </a>
      </footer>
    </li>
  )
}

export default SurveyItem
