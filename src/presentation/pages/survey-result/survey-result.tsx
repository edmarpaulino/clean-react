import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import type { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model | null,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, surveyResult: null, error: error.message }))
  })

  const onAnswer = (answer: string): void => {
    setState((prev) => ({ ...prev, isLoading: true }))
    saveSurveyResult.save({ answer }).then().catch()
  }

  const reload = (): void => {
    setState((prev: any) => ({ isLoading: false, error: '', surveyResult: null, reload: !prev.reload }))
  }

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((prev: any) => ({ ...prev, surveyResult }))
      })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
