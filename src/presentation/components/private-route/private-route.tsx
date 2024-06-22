import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate, Route, type RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount!()?.accessToken ? <Route {...props} /> : <Navigate to="/login" replace />
}

export default PrivateRoute
