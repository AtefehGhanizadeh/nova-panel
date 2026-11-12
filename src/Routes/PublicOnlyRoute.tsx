import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '@/Redux/hooks'
import { getRedirectPath } from '@/Routes/redirectState'


export function PublicOnlyRoute() {
  const token = useAppSelector((state) => state.auth.token)
  const location = useLocation()

  if (token) {
    return <Navigate to={getRedirectPath(location.state)} replace />
  }

  return <Outlet />
}
