import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({ children, title }) => {
    return (
        <section className="mb-4 is-flex is-justify-content-space-between">
            <h2 className="title is-3">{title}</h2>
            {children}
        </section>
    )
}

PropTypes.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
}

export default PageHeader
