import React, { useEffect, useMemo, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { Error, SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, error: error.message }))
  })
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const contextValue = useMemo(
    () => ({
      state,
      setState
    }),
    [state, setState]
  )

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
        <SurveyContext.Provider value={contextValue}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
