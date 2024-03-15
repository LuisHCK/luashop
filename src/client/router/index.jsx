import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProductContextProvider } from '@/client/context/product-context'
import { InventoryContextProvider } from '@/client/context/inventory-context'
import { InventoryDetailContextProvider } from '@/client/context/inventory-detail-context'
// Import pages
import LoginPage from '@/client/pages/Login'
import DashboardPage from '@/client/pages/Dashboard'
import AboutPage from '@/client/pages/About'
import ProtectedRoute from './ProtectedRoute'
import ProductCatalog from '@/client/pages/ProductCatalog'
import Inventories from '@/client/pages/Inventories'
import InventoryPage from '@/client/pages/Inventory'

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
                    element: (
                        <ProductContextProvider>
                            <ProductCatalog />
                        </ProductContextProvider>
                    )
                },
                {
                    path: 'inventories',
                    element: (
                        <InventoryContextProvider>
                            <Inventories />
                        </InventoryContextProvider>
                    )
                },
                {
                    path: 'inventories/:id',
                    element: (
                        <InventoryDetailContextProvider>
                            <InventoryPage />
                        </InventoryDetailContextProvider>
                    )
                }
            ]
        }
    ]

    const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

    return <RouterProvider router={router} />
}

export default Router
