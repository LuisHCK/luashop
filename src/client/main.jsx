import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { AppContextProvider } from './context'
import './index.scss'
import Modal from './components/modal'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppContextProvider>
            <Router />
            <Modal />
        </AppContextProvider>
    </React.StrictMode>
)
