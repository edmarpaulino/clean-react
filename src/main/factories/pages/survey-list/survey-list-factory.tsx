import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'
import { PrivateRoute } from '@/presentation/components'

export const makeSurveyList: React.FC = () => {
  return (
    <PrivateRoute>
      <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
    </PrivateRoute>
  )
}
