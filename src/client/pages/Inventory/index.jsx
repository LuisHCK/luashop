import Button from '@/client/components/bulma/buttons/button'
import { InventoryProducts } from '@/client/components/inventory/inventory-form/products'
import PageHeader from '@/client/components/page-header'
import { InventoryDetailContext } from '@/client/context/inventory-detail-context'
import { IconPackageImport } from '@tabler/icons-react'
import React, { useContext } from 'react'

const InventoryPage = () => {
    const { inventory } = useContext(InventoryDetailContext)

    return (
        <div>
            <PageHeader title={inventory && inventory.name}>
                <Button label="Add products" icon={<IconPackageImport />} isPrimary isRounded />
            </PageHeader>

            <InventoryProducts />
        </div>
    )
}

export default InventoryPage
