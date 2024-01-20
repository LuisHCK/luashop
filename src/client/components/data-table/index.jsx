import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import snakeCase from 'lodash/snakeCase'

const DataTable = ({ columns, rows, selectable }) => {
    const renderCell = (render, row) => {
        if (typeof render === 'string') {
            return get(row, render)
        } else if (typeof render === 'function') {
            return render(row)
        }

        return `unknown render: ${render}`
    }
    return (
        <table className="table is-striped is-hoverable is-fullwidth is-responsive">
            <thead>
                <tr>
                    {selectable && (
                        <th>
                            <input type="checkbox" />
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
                                <input type="checkbox" />
                            </td>
                        )}
                        {columns.map((col) => (
                            <td key={`td-${row.id}-${col.name}`}>{renderCell(col.render, row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
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
    selectable: PropTypes.bool
}

DataTable.defaultProps = {
    columns: [],
    rows: [],
    selectable: false
}

export default DataTable
