import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { AppContextProvider } from './context'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppContextProvider>
            <Router />
        </AppContextProvider>
    </React.StrictMode>
)
