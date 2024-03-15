import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import inventoriesAPI from '@/client/lib/backend/inventories'
import omit from 'lodash/omit'

const initialState = {
    isLoading: false,
    inventory: null,
    products: [],
    pagination: null
}

export const InventoryDetailContext = createContext(initialState)

export const InventoryDetailContextProvider = ({ children }) => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [inventory, setInventory] = useState(initialState.inventory)
    const [products, setProducts] = useState(initialState.products)
    const [pagination, setPagination] = useState(initialState.pagination)

    const getInventory = async () => {
        setIsLoading(true)
        const data = await inventoriesAPI.getInventory(id)

        if (data) {
            setInventory(data)
        } else {
            console.error('Error getting inventory data')
        }

        setIsLoading(false)
    }

    const getInventoryProducts = async () => {
        const data = await inventoriesAPI.getInventoryProducts(id)

        if (data) {
            setProducts(data.docs)
            setPagination(omit(data, 'docs'))
        } else {
            console.error('Error getting inventory products')
        }
    }

    useEffect(() => {
        if (!inventory && id) {
            getInventory()
            getInventoryProducts()
        }
    }, [id, inventory])

    return (
        <InventoryDetailContext.Provider
            value={{
                inventory,
                products,
                pagination,
                setPagination
            }}
        >
            {children}
        </InventoryDetailContext.Provider>
    )
}
