import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'

const IndexPage = lazy(() => import('@/router/index-page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <IndexPage /> }],
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
