import React, { Fragment, useContext, useMemo } from 'react'
import Modal from '@/client/components/modal'
import ProductForm from '../product-form'
import Button from '../../buttons/button'
import { ProductContext } from '@/client/context/product-context'

const ProductModal = () => {
    const {
        selectedProduct,
        toggleModal,
        modalIsOpen,
        formLoading,
        clearProductForm,
        productForm
    } = useContext(ProductContext)

    const handleClose = () => {
        toggleModal()
        clearProductForm()
    }

    const handleSubmit = () => {
        console.log(productForm)
    }

    const modalFooter = useMemo(
        () => (
            <Fragment>
                <Button isLoading={formLoading} onClick={handleSubmit} isPrimary isRounded>
                    Submit
                </Button>
                <Button onClick={handleClose} isSecondary isRounded>
                    Cancel
                </Button>
            </Fragment>
        ),
        [productForm]
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
