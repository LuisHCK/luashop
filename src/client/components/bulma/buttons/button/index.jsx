import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

const Button = ({
    children,
    label,
    isLoading,
    isRounded,
    isSecondary,
    isPrimary,
    isSmall,
    isLink,
    type,
    onClick,
    icon,
    href,
    ...rest
}) => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (href) {
            navigate(href)
        } else {
            onClick?.()
        }
    }

    return (
        <button
            className={classNames('button', {
                'is-loading': isLoading,
                'is-primary': isPrimary,
                'is-secondary': isSecondary,
                'is-small': isSmall,
                'is-rounded': isRounded,
                'is-link': isLink
            })}
            type={type}
            onClick={onClickHandler}
            {...rest}
        >
            {icon && <span className="icon">{icon}</span>}
            <span>
                {label}
                {children}
            </span>
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.any,
    isLoading: PropTypes.bool,
    isRounded: PropTypes.bool,
    isSecondary: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isSmall: PropTypes.bool,
    isLink: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    icon: PropTypes.node,
    href: PropTypes.string
}

export default Button
