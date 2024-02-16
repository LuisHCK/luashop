import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import formFields from '@/client/lib/formFields'
import TextField from './fields/textfield'
import Textarea from './fields/textarea'

const Form = ({ title, groups, errorMessage, isLoading, onSubmit, hideSubmitButton }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        if (isLoading) {
            return
        }

        const formData = Object.fromEntries(new FormData(event.currentTarget))

        onSubmit?.(formData)
    }

    const renderInputField = (field) => {
        switch (field.type) {
            case formFields.TEXTAREA:
                return <Textarea disabled={isLoading} {...field} />

            default:
                return <TextField disabled={isLoading} {...field} />
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

    return (
        <form onSubmit={handleSubmit}>
            {title && <h3 className="is-size-3 mb-5">{title}</h3>}
            {groups.map((group) => (
                <div
                    key={`form-group-${group.name}`}
                    className="columns is-variable is-2 is-mobile is-multiline"
                >
                    {group.fields.map((field) => (
                        <div
                            key={`form-field-${field.name}`}
                            className={classNames('column', field.className)}
                        >
                            {renderInputField(field)}
                        </div>
                    ))}
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

const formField = PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.oneOf(Object.values(formFields)),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
})

Form.propTypes = {
    title: PropTypes.string,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            header: PropTypes.string,
            fields: PropTypes.arrayOf(formField),
            className: PropTypes.string
        })
    ),
    onSubmit: PropTypes.func,
    errors: PropTypes.string,
    isLoading: PropTypes.bool,
    hideSubmitButton: PropTypes.bool
}

export default Form
