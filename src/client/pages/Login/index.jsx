import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import api from '@/client/utils/apiClient'
import Cookies from 'js-cookie'
import { parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '@/client/context'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const { currentUser, setCurrentUser } = useContext(AppContext)
    const navigate = useNavigate()

    const goHome = () => navigate('/', { replace: true })

    const submitHanlder = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.currentTarget))

        const res = await api.post('/api/auth/sign-in', formData)

        if (res) {
            setInvalidCredentials(false)
            const expires = parseISO(res.exp)
            // Store user data
            Cookies.set('token', res.token, { expires })
            setCurrentUser(res.user)
            localStorage.setItem('currentUser', JSON.stringify(res.user))

            return goHome()
        } else {
            setInvalidCredentials(true)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (currentUser) {
            goHome()
        }
    }, [currentUser])

    return (
        <div>
            <form className={styles.formContainer} onSubmit={submitHanlder}>
                <h3>Sign in</h3>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your email address"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>

                {invalidCredentials && (
                    <div className={styles.formGroup}>Invalid email or password</div>
                )}

                <button className={styles.submitButton} type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}

export default LoginPage
