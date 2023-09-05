import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '@/client/context'

const MainLayout = () => {
    const { logOut } = useContext(AppContext)
    return (
        <div>
            <div>
                <h2>Main Layout</h2>
                <button onClick={logOut}>logout</button>
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout
