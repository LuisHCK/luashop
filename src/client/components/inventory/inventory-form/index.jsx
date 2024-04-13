import React, { Fragment, useContext } from 'react'
import Modal from '@/client/components/modal'
import { InventoryContext } from '@/client/context/inventory-context'
import isEmpty from 'lodash/isEmpty'
import Button from '@/client/components/bulma/buttons/button'
import Form from '@/client/components/form'

export const InventoryForm = () => {
    const {
        modalIsOpen,
        toggleModal,
        inventoryForm,
        setInventoryForm,
        isLoading,
        selectedInventory,
        submitInventoryForm
    } = useContext(InventoryContext)

    const modalFooter = (
        <div className="buttons">
            <Button
                disabled={isEmpty(inventoryForm)}
                isLoading={isLoading}
                onClick={submitInventoryForm}
                isPrimary
                isRounded
            >
                Submit
            </Button>
            <Button disabled={isLoading} onClick={toggleModal} isSecondary isRounded>
                Cancel
            </Button>
        </div>
    )

    return (
        <Modal
            isOpen={modalIsOpen}
            title={selectedInventory ? 'Update inventory' : 'Create new inventory'}
            onClose={toggleModal}
            footer={modalFooter}
        >
            <Form
                fields={formFields}
                onChange={setInventoryForm}
                data={selectedInventory}
                hideSubmitButton
            />
        </Modal>
    )
}

const formFields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'description', label: 'Description' },
    { name: 'location', label: 'location' }
]
