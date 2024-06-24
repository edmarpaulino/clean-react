import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { Error, SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import type { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState((prev) => ({ ...prev, surveys }))
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, error: error.message }))
      })
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
