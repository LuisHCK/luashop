import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import ReactPaginate from 'react-paginate'
import SearchBar from '@/client/components/searchbar'

const DataTable = ({
    columns,
    rows,
    selectable,
    pagination,
    onPageChange,
    onSearch,
    onSelect,
    onSelectAll,
    selectedRows,
    showSearchbar
}) => {
    const renderCell = (render, row) => {
        if (typeof render === 'string') {
            return get(row, render)
        } else if (typeof render === 'function') {
            return render(row)
        }

        return `unknown render method: ${render}`
    }

    const selectAllRef = useRef(null)

    const showPagination = pagination && pagination.totalPages > 1

    const handlePageChange = ({ selected }) => {
        onPageChange(selected + 1)

        if (selectAllRef.current) {
            selectAllRef.current.checked = false
        }
    }

    useEffect(() => {
        if (rows && rows.length && selectAllRef.current) {
            const allSelected = rows.every((row) => selectedRows && !!selectedRows[row._id])
            selectAllRef.current.checked = allSelected
        }
    }, [pagination, selectedRows, rows])

    return (
        <table className="table is-striped is-hoverable is-fullwidth is-responsive">
            {showSearchbar && (
                <thead>
                    <tr>
                        <td className="has-text-right" colSpan={columns.length}>
                            <SearchBar onChange={onSearch} />
                        </td>
                    </tr>
                </thead>
            )}
            <thead>
                <tr>
                    {selectable && (
                        <th>
                            <input
                                ref={selectAllRef}
                                onChange={({ target }) => onSelectAll(target.checked)}
                                type="checkbox"
                            />
                        </th>
                    )}
                    {columns.map((col) => (
                        <th key={`col-${snakeCase(col.name)}`}>{col.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={`tr-${row._id}`}>
                        {selectable && (
                            <td>
                                <input
                                    onChange={({ target }) => onSelect(target.checked, row)}
                                    checked={selectedRows && !!selectedRows[row._id]}
                                    value={row._id}
                                    type="checkbox"
                                />
                            </td>
                        )}
                        {columns.map((col) => (
                            <td key={`td-${row.id}-${col.name}`}>{renderCell(col.render, row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {showPagination && (
                <tfoot>
                    <tr>
                        <td colSpan={columns.length}>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                previousLabel="< Prev"
                                pageCount={pagination.totalPages || 1}
                                initialPage={pagination.page ? pagination.page - 1 : 0}
                                marginPagesDisplayed={2}
                                className="pagination is-centered is-rounded is-small is-justify-content-center"
                                nextClassName="pagination-previous"
                                previousClassName="pagination-previous"
                                containerClassName="pagination-list"
                                pageLinkClassName="pagination-link"
                                activeLinkClassName="is-current"
                                onPageChange={handlePageChange}
                            />
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    )
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            render: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        })
    ),
    rows: PropTypes.array,
    selectable: PropTypes.bool,
    pagination: PropTypes.shape({
        totalPages: PropTypes.number,
        page: PropTypes.number
    }),
    onPageChange: PropTypes.func,
    onSearch: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelect: PropTypes.func,
    showSearchbar: PropTypes.bool
}

DataTable.defaultProps = {
    columns: [],
    rows: [],
    selectable: false,
    pagination: null,
    onPageChange: (e) => e,
    onSearch: (e) => e
}

export default DataTable
