import React from 'react'
import DataTable from '@/client/components/data-table'
import { parseISO, format } from 'date-fns'
import { IconPencil } from '@tabler/icons-react'

const ProductsDataTable = ({ products, isLoading }) => {
    const columns = [
        { name: 'Photo', render: (row) => <img width={64} height={64} src={row.photo} /> },
        { name: 'Name', render: 'name' },
        { name: 'Codebar', render: 'codebar' },
        {
            name: 'Unit',
            render: (row) => <span className="tag is-info is-rounded is-light">{row.unit}</span>
        },
        {
            name: 'Created at',
            render: (row) => (
                <small>{format(parseISO(row.createdAt), 'MM/dd/yyyy hh:mm aaa')}</small>
            )
        },
        {
            name: 'Updated at',
            render: (row) => (
                <small>{format(parseISO(row.updatedAt), 'MM/dd/yyyy hh:mm aaa')}</small>
            )
        },
        {
            name: 'Actions',
            render: () => (
                <button className="button is-small is-rounded is-secondary">
                    <span className="icon">
                        <IconPencil />
                    </span>
                    <span>Edit</span>
                </button>
            )
        }
    ]
    return <DataTable rows={products} columns={columns} />
}

ProductsDataTable

export default ProductsDataTable
