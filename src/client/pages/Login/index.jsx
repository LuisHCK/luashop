import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import api from '@/client/lib/apiClient'
import Cookies from 'js-cookie'
import { parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '@/client/context'
import Form from '@/client/components/form'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const { currentUser, setCurrentUser } = useContext(AppContext)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const navigate = useNavigate()

    const goHome = () => navigate('/app/', { replace: true })

    const submitHanlder = async (formData) => {
        setLoading(true)
        setErrorMessage(undefined)

        const res = await api.post(
            '/api/auth/sign-in',
            formData,
            (res) => {
                console.log(res)
            }
        )

        if (res) {
            const expires = parseISO(res.exp)
            // Store user data
            Cookies.set('token', res.token, { expires })
            setCurrentUser(res.user)
            localStorage.setItem('currentUser', JSON.stringify(res.user))

            return goHome()
        } else {
            setErrorMessage('Email or password invalid')
        }

        setLoading(false)
    }

    useEffect(() => {
        if (currentUser) {
            goHome()
        }
    }, [currentUser])

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.hero} />
                <div className={styles.formContainer}>
                    <Form
                        title="Login"
                        fields={formFields}
                        onSubmit={submitHanlder}
                        errorMessage={errorMessage}
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

const formFields = [
    {
        name: 'email',
        id: 'email',
        type: 'email',
        placeholder: 'Type your email or username',
        required: true,
        label: 'Email'
    },
    {
        name: 'password',
        id: 'password',
        type: 'password',
        placeholder: 'Type your password',
        required: true,
        label: 'Password'
    }
]

export default LoginPage
