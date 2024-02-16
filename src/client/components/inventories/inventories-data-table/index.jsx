import React from 'react'
import DataTable from '@/client/components/data-table'
import EditButton from '@/client/components/buttons/edit'
import { longDate } from '@/client/utils/datetime'

const InventoriesDataTable = ({ inventories, pagination, onPageChange, onSearch }) => {
    const columns = [
        { name: 'Name', render: 'name' },
        { name: 'Location', render: 'location' },
        { name: 'Description', render: 'description' },
        {
            name: 'Created at',
            render: (row) => <small>{longDate(row.createdAt)}</small>
        },
        {
            name: 'Updated at',
            render: (row) => <small>{longDate(row.updatedAt)}</small>
        },
        {
            name: 'Actions',
            render: () => <EditButton isSmall />
        }
    ]
    return (
        <DataTable
            rows={inventories}
            columns={columns}
            pagination={pagination}
            onPageChange={onPageChange}
            onSearch={onSearch}
        />
    )
}

InventoriesDataTable

export default InventoriesDataTable