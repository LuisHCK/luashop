import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { AppContext } from '@/client/context'
import { useEffect } from 'react'
import Navigation from '../Navigation'

const MainLayout = () => {
    const { currentUser } = useContext(AppContext)

    useEffect(() => {
        if (currentUser && !currentUser.organization) {
            alert(
                'Your user does not have an organization\nPlease create an organization to continue'
            )
        }
    }, [currentUser])

    return (
        <div>
            <Navigation />
            <main className="container mt-4">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
