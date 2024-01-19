import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { IconEye, IconEyeClosed, IconAt, IconAlignLeft, IconFingerprint } from '@tabler/icons-react'
import formFields from '@/client/lib/formFields'

const TextField = ({
    label,
    className,
    iconLeft,
    iconRight,
    inputClassName,
    id,
    type,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => setShowPassword((prev) => !prev)

    const leftIcon = useMemo(() => {
        switch (type) {
            case formFields.EMAIL:
                return <IconAt />

            case formFields.PASSWORD:
                return <IconFingerprint />

            default:
                return <IconAlignLeft />
        }
    }, [type])

    return (
        <div className={classNames('field', className)}>
            <label htmlFor={id} className="label">
                {label}
            </label>
            <div className="field has-addons" style={{ width: '100%!' }}>
                <div className={classNames('control', 'is-expanded', 'has-icons-left')}>
                    <input
                        className={classNames('input', 'is-rounded', inputClassName)}
                        type={showPassword ? 'text' : type}
                        {...rest}
                    />
                    <span className="icon is-small is-left">{leftIcon}</span>
                </div>
                {type === formFields.PASSWORD && (
                    <div className="control">
                        <button
                            type="button"
                            className="button is-rounded"
                            onClick={togglePassword}
                        >
                            {showPassword ? (
                                <IconEyeClosed color="hsl(0, 0%, 29%)" />
                            ) : (
                                <IconEye color="hsl(0, 0%, 29%)" />
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string
}

export default TextField
