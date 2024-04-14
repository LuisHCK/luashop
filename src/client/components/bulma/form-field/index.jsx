import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const FormField = ({ type, label, placeholder, icon, isSmall, isRounded, ...rest }) => {
    return (
        <div className="field">
            {!!label && <label className="label">{label}</label>}
            <div className={classNames('control', { 'has-icons-left': !!icon })}>
                <input
                    className={classNames('input', {
                        'is-small': isSmall,
                        'is-rounded': isRounded
                    })}
                    placeholder={placeholder}
                    type={type}
                    {...rest}
                />
                {!!icon && <span className="icon is-small is-left">{icon}</span>}
            </div>
        </div>
    )
}

FormField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.node,
    isSmall: PropTypes.bool,
    isRounded: PropTypes.bool
}

export default FormField
