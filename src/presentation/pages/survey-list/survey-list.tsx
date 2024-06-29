import React, { useContext, useEffect, useMemo, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { Error, SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { AccessDeniedError } from '@/domain/errors'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
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
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount!(undefined)
          navigate('/login')
        } else {
          setState((prev) => ({ ...prev, error: error.message }))
        }
      })
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
