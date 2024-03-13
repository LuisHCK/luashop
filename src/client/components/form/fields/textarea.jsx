import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

const Textarea = ({ value, label, className, onChange, inputClassName, ...rest }) => {
    const [currentValue, setCurrentValue] = useState(value || '')

    const onChangeHandler = ({ currentTarget }) => {
        setCurrentValue(currentTarget.value)

        if (onChange) {
            onChange({
                name: rest.name,
                value: currentTarget.value
            })
        }
    }

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    return (
        <div className={classNames('field', className)}>
            <label className="label">{label}</label>
            <div className="control">
                <textarea
                    value={currentValue}
                    className={classNames('textarea', inputClassName)}
                    onChange={onChangeHandler}
                    {...rest}
                />
            </div>
        </div>
    )
}

export default Textarea
