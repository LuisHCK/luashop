import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { AppContext } from '@/client/context'
import { useEffect } from 'react'

const MainLayout = () => {
    const { logOut, currentUser } = useContext(AppContext)

    useEffect(() => {
        if (currentUser && !currentUser.organization) {
            alert(
                'Your user does not have an organization\nPlease create an organization to continue'
            )
        }
    }, [currentUser])

    return (
        <div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/product-catalog">Product Catalog</Link>
                        </li>
                    </ul>
                </nav>
                <button onClick={logOut}>logout</button>
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout
