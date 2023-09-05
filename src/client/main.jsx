import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { AppContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppContextProvider>
            <Router />
        </AppContextProvider>
    </React.StrictMode>
)
