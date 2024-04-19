import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ className, label, value, options, name, optionKey, optionDisplay, onChange }) => {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <div className="select is-rounded">
                    <select
                        value={value}
                        name={name}
                        className={className}
                        onChange={onChange}
                    >
                        <option disabled value="">
                            Select {label}
                        </option>
                        {!!options &&
                            options.map((opt) => (
                                <option value={opt[optionKey]} key={`${name}-${opt[optionKey]}`}>
                                    {opt[optionDisplay]}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string,
    optionKey: PropTypes.string.isRequired,
    optionDisplay: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default Select
