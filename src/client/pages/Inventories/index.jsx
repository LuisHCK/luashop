import React, { useContext, useEffect, useState } from 'react'
import inventoriesAPI from '@/client/lib/backend/inventories'
import InventoriesDataTable from '@/client/components/inventories/inventories-data-table'
import Button from '@/client/components/bulma/buttons/button'
import { IconPlus } from '@tabler/icons-react'
import { InventoryContext } from '@/client/context/inventory-context'
import { InventoryForm } from '@/client/components/inventory/inventory-form'

const Inventories = () => {
    const { openCreateModal, inventories } = useContext(InventoryContext)

    return (
        <div>
            <section className="mb-4 is-flex is-justify-content-space-between">
                <h2 className="title is-3">Inventories</h2>
                <Button
                    onClick={openCreateModal}
                    icon={<IconPlus />}
                    label="Create inventory"
                    isPrimary
                    isRounded
                />
            </section>
            <section>
                <InventoriesDataTable inventories={inventories} />
            </section>

            <InventoryForm />
        </div>
    )
}

export default Inventories
