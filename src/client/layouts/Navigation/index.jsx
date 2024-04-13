import { AppContext } from '@/client/context'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const { logOut } = useContext(AppContext)

    const navigateToLogin = () => {
        logOut()
    }

    const navLinks = [
        {
            label: 'Home',
            to: '/app'
        },
        {
            label: 'Products',
            to: '/app/product-catalog'
        },
        {
            label: 'Inventories',
            to: '/app/inventories'
        }
    ]

    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/app">
                    <img
                        src="/icon.png"
                        alt="Bulma: a modern CSS framework based on Flexbox"
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
                    {navLinks.map((link) => (
                        <Link key={`nav-link-${link.to}`} className="navbar-item" to={link.to}>
                            {link.label}
                        </Link>
                    ))}
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
