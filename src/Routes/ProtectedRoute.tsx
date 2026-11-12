import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '@/Redux/hooks'
import { ROUTES } from '@/Routes/paths'
import { createRedirectState } from '@/Routes/redirectState'


export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to={ROUTES.login} replace state={createRedirectState(location)} />
  }

  return <Outlet />
}
