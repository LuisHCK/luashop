import React, { useContext } from 'react'
import isEmpty from 'lodash/isEmpty'
import Modal from '@/client/components/modal'
import ProductForm from '../product-form'
import Button from '../../bulma/buttons/button'
import { ProductContext } from '@/client/context/product-context'

const ProductModal = () => {
    const { selectedProduct, toggleModal, modalIsOpen, isLoading, productForm, submitProductForm } =
        useContext(ProductContext)

    const handleClose = () => {
        toggleModal()
    }

    const modalFooter = (
        <div className="buttons">
            <Button
                disabled={isEmpty(productForm)}
                isLoading={isLoading}
                onClick={submitProductForm}
                isPrimary
                isRounded
            >
                Submit
            </Button>
            <Button disabled={isLoading} onClick={handleClose} isSecondary isRounded>
                Cancel
            </Button>
        </div>
    )
    return (
        <Modal
            title={selectedProduct ? selectedProduct.name : 'Add new product'}
            isOpen={modalIsOpen}
            onClose={handleClose}
            footer={modalFooter}
        >
            <ProductForm />
        </Modal>
    )
}

export default ProductModal
