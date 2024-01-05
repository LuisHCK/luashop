import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Import pages
import LoginPage from '@/client/pages/Login'
import DashboardPage from '@/client/pages/Dashboard'
import AboutPage from '@/client/pages/About'
import ProtectedRoute from './ProtectedRoute'
import ProductCatalog from '@/client/pages/ProductCatalog'
const Router = () => {
    /** @type {import('react-router-dom').RouteObject} */
    const publicRoutes = [
        {
            path: '/app/about',
            element: <AboutPage />
        },
        {
            path: '/app/login',
            element: <LoginPage />
        }
    ]

    /** @type {import('react-router-dom').RouteObject} */
    const protectedRoutes = [
        {
            path: '/app/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <DashboardPage />
                },
                {
                    path: 'product-catalog',
                    element: <ProductCatalog />
                }
            ]
        }
    ]

    const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

    return <RouterProvider router={router} />
}

export default Router
