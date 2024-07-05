import React, { useEffect } from 'react'
import * as Styles from './survey-list-styles.scss'
import { Error, Footer, Header } from '@/presentation/components'
import { SurveyListItem, surveyListState } from '@/presentation/pages/survey-list/components'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { useErrorHandler } from '@/presentation/hooks'
import { useRecoilState } from 'recoil'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, error: error.message }))
  })
  const [state, setState] = useRecoilState(surveyListState)

  const reload = (): void => {
    setState((prev: any) => ({ surveys: [], error: '', reload: !prev.reload }))
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState((prev) => ({ ...prev, surveys }))
      })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? <Error error={state.error} reload={reload} /> : <SurveyListItem surveys={state.surveys} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
