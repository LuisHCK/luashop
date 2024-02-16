import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPag
}) => {
    return (
        <nav className="pagination is-rounded is-small" role="navigation" aria-label="pagination">
            <button className="pagination-previous">Previous</button>
            <button className="pagination-next">Next page</button>
            <ul className="pagination-list">
                <li><button className="pagination-link" aria-label="Goto page 1">1</button></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><button className="pagination-link" aria-label="Goto page 45">45</button></li>
                <li><button className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</button></li>
                <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><button className="pagination-link" aria-label="Goto page 86">86</button></li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    totalDocs: PropTypes.number,
    limit: PropTypes.number,
    totalPages: PropTypes.number,
    page: PropTypes.number,
    pagingCounter: PropTypes.number,
    hasPrevPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    prevPage: PropTypes.bool,
    nextPag: PropTypes.number,
}

export default Pagination