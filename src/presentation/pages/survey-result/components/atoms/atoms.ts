import type { LoadSurveyResult } from '@/domain/usecases'
import { atom } from 'recoil'

export const surveyResultState = atom({
  key: 'surveyResultState',
  default: {
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model | null,
    reload: false
  }
})

export const onSurveyAnswerState = atom({
  key: 'onSurveyAnswerState',
  default: {
    onAnswer: null as unknown as (answer: string) => void
  }
})
