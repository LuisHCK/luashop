import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { IconPencil } from '@tabler/icons-react'

const EditButton = ({ onClick, isSmall }) => {
    return (
        <button
            className={classNames('button is-rounded is-secondary', { 'is-small': isSmall })}
            onClick={onClick}
        >
            <span className="icon">
                <IconPencil />
            </span>
            <span>Edit</span>
        </button>
    )
}

EditButton.propTypes = {
    onClick: PropTypes.func,
    isSmall: PropTypes.bool
}

EditButton.defaultProps = {
    onClick: () => {},
    isSmall: false
}

export default EditButton
