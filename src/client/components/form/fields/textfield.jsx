import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { IconEye, IconEyeClosed, IconAt, IconAlignLeft, IconFingerprint } from '@tabler/icons-react'
import formFields from '@/client/lib/formFields'

const TextField = ({
    label,
    value,
    onChange,
    className,
    iconLeft,
    iconRight,
    inputClassName,
    id,
    name,
    type,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [currentValue, setCurrentValue] = useState(value || '')

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

    const onChangeHandler = ({ currentTarget }) => {
        setCurrentValue(currentTarget.value)

        if (onChange) {
            onChange({
                name,
                value: currentTarget.value
            })
        }
    }

    const passwordTogle = useMemo(() => {
        return (
            type === formFields.PASSWORD && (
                <div className="control">
                    <button type="button" className="button is-rounded" onClick={togglePassword}>
                        {showPassword ? (
                            <IconEyeClosed color="hsl(0, 0%, 29%)" />
                        ) : (
                            <IconEye color="hsl(0, 0%, 29%)" />
                        )}
                    </button>
                </div>
            )
        )
    }, [type, showPassword, formFields])

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    return (
        <div className={classNames('field', className)}>
            <label htmlFor={id || name} className="label">
                {label}
            </label>
            <div className="field has-addons" style={{ width: '100%!' }}>
                <div className={classNames('control', 'is-expanded', 'has-icons-left')}>
                    <input
                        id={id || name}
                        name={name}
                        className={classNames('input', 'is-rounded', inputClassName)}
                        type={showPassword ? 'text' : type}
                        value={currentValue}
                        onChange={onChangeHandler}
                        {...rest}
                    />
                    <span className="icon is-small is-left">{leftIcon}</span>
                </div>
                {passwordTogle}
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
