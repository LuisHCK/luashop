import { AppContext } from '@/client/context'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const { logOut } = useContext(AppContext)

    const navigateToLogin = () => {
        logOut()
    }

    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/app">
                    <img
                        src="https://bulma.io/images/bulma-logo.png"
                        alt="Bulma: a modern CSS framework based on Flexbox"
                        width="112"
                        height="28"
                    />
                </Link>
                <div className="navbar-burger" data-target="appNavbar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="appNavbar" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/app">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/app/product-catalog">
                        Products
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <button
                                    onClick={navigateToLogin}
                                    className="button is-warning is-small is-rounded"
                                >
                                    Logout
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
