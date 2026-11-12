import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { LoginPage } from '@/Pages/LoginPage'
import { NotFoundPage } from '@/Pages/NotFoundPage'
import { ProductsPage } from '@/Pages/ProductsPage'
import { UsersPage } from '@/Pages/UsersPage'
import { ROUTES } from '@/Routes/paths'
import { ProtectedRoute } from '@/Routes/ProtectedRoute'
import { PublicOnlyRoute } from '@/Routes/PublicOnlyRoute'
import { AdminLayout } from '@/Components/Layout/AdminLayout'

const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: ROUTES.products, element: <ProductsPage /> },
          { path: ROUTES.users, element: <UsersPage /> },
        ],
      },
    ],
  },
  { path: ROUTES.home, element: <Navigate to={ROUTES.products} replace /> },
  { path: ROUTES.notFound, element: <NotFoundPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
