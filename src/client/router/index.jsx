import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Import pages
import LoginPage from '@/client/pages/Login'
import DashboardPage from '@/client/pages/Dashboard'
import AboutPage from '@/client/pages/About'
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
    /** @type {import('react-router-dom').RouteObject} */
    const publicRoutes = [
        {
            path: '/about',
            element: <AboutPage />
        },
        {
            path: '/login',
            element: <LoginPage />
        }
    ]

    /** @type {import('react-router-dom').RouteObject} */
    const protectedRoutes = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <DashboardPage />
                }
            ]
        }
    ]

    const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

    return <RouterProvider router={router} />
}

export default Router
