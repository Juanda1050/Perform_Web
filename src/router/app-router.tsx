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
const RegisterPage = lazy(() => import('@/modules/auth/pages/register-page'))
const CompaniesPage = lazy(() => import('@/modules/companies/pages/companies-page'))
const UsersPage = lazy(() => import('@/modules/users/pages/users-page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
      {
        element: <AuthLayout />,
        children: [
          { path: 'auth/login', element: <LoginPage /> },
          { path: 'auth/register', element: <RegisterPage /> },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'companies', element: <CompaniesPage /> },
          { path: 'departments', element: <ComingSoon title="Departments" /> },
          { path: 'employees', element: <ComingSoon title="Employees" /> },
          { path: 'objectives', element: <ComingSoon title="Objectives" /> },
          { path: 'kpis', element: <ComingSoon title="KPIs" /> },
          { path: 'results', element: <ComingSoon title="Results" /> },
          { path: 'reports', element: <ComingSoon title="Reports" /> },
          { path: 'invitations', element: <ComingSoon title="Invitations" /> },
          { path: 'audit', element: <ComingSoon title="Audit" /> },
          { path: 'users', element: <UsersPage /> },
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
