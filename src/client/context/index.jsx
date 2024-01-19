import Cookies from 'js-cookie'
import { createContext, useState } from 'react'

const intialState = {
    currentUser: null,
    setCurrentUser: () => {}
}

const storedUser = localStorage.getItem('currentUser')

export const AppContext = createContext(intialState)

export const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : undefined)

    const logOut = (callback) => {
        Cookies.remove('token')
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
    }

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser, logOut }}>
            {children}
        </AppContext.Provider>
    )
}
