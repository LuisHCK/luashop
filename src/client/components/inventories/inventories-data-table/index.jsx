import React, { useContext } from 'react'
import DataTable from '@/client/components/data-table'
import EditButton from '@/client/components/bulma/buttons/edit'
import { longDate } from '@/client/lib/datetime'
import { InventoryContext } from '@/client/context/inventory-context'
import Button from '@/client/components/bulma/buttons/button'
import { IconEye } from '@tabler/icons-react'

const InventoriesDataTable = ({ inventories, pagination, onPageChange, onSearch }) => {
    const { openEditModal } = useContext(InventoryContext)

    const columns = [
        { name: 'Name', render: 'name' },
        { name: 'Location', render: 'location' },
        {
            name: 'Total products',
            render: () => <span className="tag is-primary is-rounded">0</span>
        },
        { name: 'Description', render: 'description' },
        {
            name: 'Created at',
            render: (row) => <small className="is-size-7">{longDate(row.createdAt)}</small>
        },
        {
            name: 'Updated at',
            render: (row) => <small className="is-size-7">{longDate(row.updatedAt)}</small>
        },
        {
            name: 'Actions',
            render: (row) => (
                <div className="buttons">
                    <Button
                        href={`/app/inventories/${row._id}`}
                        icon={<IconEye />}
                        isSmall
                        isRounded
                        isSecondary
                        isLink
                    >
                        View
                    </Button>
                    <EditButton onClick={() => openEditModal(row)} isSmall />
                </div>
            )
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
