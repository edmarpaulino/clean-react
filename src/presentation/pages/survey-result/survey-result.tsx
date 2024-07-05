import React, { useEffect } from 'react'
import * as Styles from './survey-result-styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import type { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { onSurveyAnswerState, SurveyResultData, surveyResultState } from '@/presentation/pages/survey-result/components'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, isLoading: false, surveyResult: null, error: error.message }))
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))
    saveSurveyResult
      .save({ answer })
      .then((surveyResult) => {
        setState((prev: any) => ({ ...prev, isLoading: false, surveyResult }))
      })
      .catch(handleError)
  }

  const reload = (): void => {
    setState((prev: any) => ({ isLoading: false, error: '', surveyResult: null, reload: !prev.reload }))
  }

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [onAnswer])

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
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
