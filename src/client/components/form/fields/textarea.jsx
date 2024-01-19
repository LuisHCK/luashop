import classNames from 'classnames'
import React from 'react'

const Textarea = ({ label, className, inputClassName, ...rest }) => {
    return (
        <div className={classNames('field', className)}>
            <label className="label">{label}</label>
            <div className="control">
                <textarea class={classNames('textarea', inputClassName)} {...rest} />
            </div>
        </div>
    )
}

export default Textarea
