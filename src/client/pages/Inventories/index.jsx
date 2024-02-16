import React, { useEffect, useState } from 'react'
import { getInventories } from '@/client/lib/backend'
import InventoriesDataTable from '@/client/components/inventories/inventories-data-table'

const Inventories = () => {
    const [inventories, setInventories] = useState([])
    const [showModal, setShowModal] = useState(false)

    const getData = async () => {
        const data = await getInventories()
        setInventories(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <section>
                <button onClick={() => setShowModal((prev) => !prev)}>Add</button>
            </section>
            <section>
                <InventoriesDataTable inventories={inventories} />
            </section>

            
        </div>
    )
}

export default Inventories
