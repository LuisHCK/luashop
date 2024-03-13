import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import formFields from '@/client/lib/formFields'
import TextField from './fields/textfield'
import Textarea from './fields/textarea'
import TagsInput from './fields/tags-input'
import { isEmpty } from 'lodash'

const Form = ({ title, fields, errorMessage, isLoading, hideSubmitButton, onChange, onSubmit }) => {
    const [formData, setFormData] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit?.(formData)
    }

    const onChangeHandler = ({ name, value }) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const renderInputField = (field) => {
        switch (field.type) {
            case formFields.TEXTAREA:
                return (
                    <Textarea
                        onChange={(event) => onChangeHandler(event)}
                        disabled={isLoading}
                        {...field}
                    />
                )

            case formFields.TAGS:
                return (
                    <TagsInput
                        onChange={(event) => onChangeHandler(event)}
                        disabled={isLoading}
                        {...field}
                    />
                )

            default:
                return (
                    <TextField
                        onChange={(event) => onChangeHandler(event)}
                        disabled={isLoading}
                        {...field}
                    />
                )
        }
    }

    const errorMessages = useMemo(() => {
        if (errorMessage) {
            return (
                <div className="message is-danger">
                    <p className="message-body">{errorMessage}</p>
                </div>
            )
        }
    }, [errorMessage])

    useEffect(() => {
        if (fields) {
            const data = fields.reduce((acc, curr) => {
                acc[curr.name] = curr.value
                return acc
            }, {})

            setFormData(data)
        }
    }, [fields])

    useEffect(() => {
        if (!isEmpty(formData)) {
            onChange?.(formData)
        }
    }, [formData])

    return (
        <form onSubmit={handleSubmit}>
            {title && <h3 className="is-size-3 mb-5">{title}</h3>}

            {fields.map((field) => (
                <div
                    key={`form-field-${field.name}`}
                    className={classNames('column', field.className)}
                >
                    {renderInputField(field)}
                </div>
            ))}

            {errorMessages}

            {!hideSubmitButton && (
                <div className="field">
                    <div className="control">
                        <button
                            type="submit"
                            className={classNames('button is-primary is-rounded', {
                                'is-loading': isLoading
                            })}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}

Form.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.oneOf(Object.values(formFields)),
            className: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.any,
            name: PropTypes.string,
            id: PropTypes.string
        })
    ),
    onSubmit: PropTypes.func,
    errors: PropTypes.string,
    isLoading: PropTypes.bool,
    hideSubmitButton: PropTypes.bool
}

export default Form
