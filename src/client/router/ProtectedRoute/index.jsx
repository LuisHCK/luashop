import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '@/client/context'
import MainLayout from '@/client/layouts/MainLayout'

const ProtectedRoute = () => {
    const { currentUser } = useContext(AppContext)

    if (!currentUser?._id) {
        return <Navigate to="/login" />
    }

    return <MainLayout />
}

export default ProtectedRoute
