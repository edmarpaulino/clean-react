import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
  return (): void => {
    setCurrentAccount!(undefined)
    navigate('/login')
  }
}
