import { Suspense, lazy } from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { ComingSoon } from '@/components/layout/coming-soon'
import { ProtectedRoute } from '@/modules/auth/components/protected-route'
import { ROUTES } from '@/config/routes'

const DashboardPage = lazy(() => import('@/router/pages/dashboard-page'))
const LoginPage = lazy(() => import('@/modules/auth/pages/login-page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
      {
        element: <AuthLayout />,
        children: [{ path: 'auth/login', element: <LoginPage /> }],
      },
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'companies', element: <ComingSoon title="Companies" /> },
          { path: 'departments', element: <ComingSoon title="Departments" /> },
          { path: 'employees', element: <ComingSoon title="Employees" /> },
          { path: 'objectives', element: <ComingSoon title="Objectives" /> },
          { path: 'kpis', element: <ComingSoon title="KPIs" /> },
          { path: 'results', element: <ComingSoon title="Results" /> },
          { path: 'reports', element: <ComingSoon title="Reports" /> },
          { path: 'invitations', element: <ComingSoon title="Invitations" /> },
          { path: 'audit', element: <ComingSoon title="Audit" /> },
          { path: 'users', element: <ComingSoon title="Users" /> },
          { path: 'settings', element: <ComingSoon title="Settings" /> },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
