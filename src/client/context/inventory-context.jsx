import React, { createContext, useEffect, useState } from 'react'
import inventoriesAPI from '@/client/lib/backend/inventories'

const initialState = {
    inventories: [],
    selectedInventory: null,
    isLoading: false,
    inventoryForm: null,
    modalIsOpen: false
}

export const InventoryContext = createContext(initialState)

export const InventoryContextProvider = ({ children }) => {
    const [inventories, setInventories] = useState(initialState.inventories)
    const [selectedInventory, setSelectedInventory] = useState(initialState.selectedInventory)
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [inventoryForm, setInventoryForm] = useState(initialState.inventoryForm)
    const [modalIsOpen, setModalIsOpen] = useState(initialState.modalIsOpen)

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const loadInventoriesData = async () => {
        const data = await inventoriesAPI.getInventories()

        if (!data) {
            console.error('Error loading Inventories list')
            return
        }

        setInventories(data)
    }

    const createInventory = async () => {
        const res = await inventoriesAPI.createInventory(inventoryForm)

        if (res) {
            loadInventoriesData()
        } else {
            console.error('Error creating new Inventory')
        }
    }

    const updateInventory = async () => {
        const res = await inventoriesAPI.updateInventory({
            ...inventoryForm,
            _id: selectedInventory._id
        })

        if (res) {
            loadInventoriesData()
        } else {
            console.error('Error updating inventory')
        }
    }

    const submitInventoryForm = () => {
        setIsLoading(true)

        if (!selectedInventory) {
            createInventory()
        } else {
            updateInventory()
        }
        setIsLoading(false)
        setModalIsOpen(false)
    }

    const openEditModal = (data) => {
        setSelectedInventory(data)
        setModalIsOpen(true)
    }

    const openCreateModal = () => {
        clearFormData()
        setModalIsOpen(true)
    }

    const clearFormData = () => {
        setInventoryForm(initialState.inventoryForm)
        setSelectedInventory(initialState.selectedInventory)
    }

    useEffect(() => {
        loadInventoriesData()
    }, [])

    return (
        <InventoryContext.Provider
            value={{
                inventories,
                selectedInventory,
                setSelectedInventory,
                isLoading,
                setIsLoading,
                inventoryForm,
                setInventoryForm,
                modalIsOpen,
                setModalIsOpen,
                toggleModal,
                submitInventoryForm,
                openEditModal,
                openCreateModal
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
}
