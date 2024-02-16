import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({
    children,
    isLoading,
    isRounded,
    isSecondary,
    isPrimary,
    isSmall,
    type,
    onClick
}) => {
    return (
        <button
            className={classNames('button', {
                'isLoading': isLoading,
                'is-primary': isPrimary,
                'is-secondary': isSecondary,
                'is-small': isSmall,
                'is-rounded': isRounded
            })}
            type={type}
            onClick={onClick}
        >
            {children}
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
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func
}

export default Button