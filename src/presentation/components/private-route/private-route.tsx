import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount!()?.accessToken ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
