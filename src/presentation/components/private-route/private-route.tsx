import React from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '../atoms/atoms'

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  return getCurrentAccount()?.accessToken ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
