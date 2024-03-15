import Button from '@/client/components/bulma/buttons/button'
import DataTable from '@/client/components/data-table'
import { InventoryDetailContext } from '@/client/context/inventory-detail-context'
import { IconPencil } from '@tabler/icons-react'
import React, { useContext } from 'react'

export const InventoryProducts = () => {
    const { products, pagination } = useContext(InventoryDetailContext)

    const columns = [
        {
            name: 'Name',
            render: ({ product }) => (
                <div>
                    {product.name}{' '}
                    <span className="tag is-small is-primary is-rounded">{product.unit}</span>
                </div>
            )
        },
        {
            name: 'Brand',
            render: 'product.brand'
        },
        {
            name: 'Price',
            render: 'price'
        },
        {
            name: 'Stock',
            render: 'stock'
        },
        {
            name: 'Minimum',
            render: 'minimum'
        },
        {
            name: 'Lot',
            render: 'lot'
        },
        {
            name: 'Codebar',
            render: 'product.codebar'
        },
        {
            name: 'Action',
            render: (row) => (
                <div className="buttons">
                    <Button label="Edit" icon={<IconPencil />} isRounded isSecondary isSmall />
                </div>
            )
        }
    ]

    return (
        <div>
            <DataTable pagination={pagination} rows={products} columns={columns} />
        </div>
    )
}
