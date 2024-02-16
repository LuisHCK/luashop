import { createContext, useState } from 'react'

const initialState = {
    modalIsOpen: false,
    selectedProduct: null,
    productForm: {},
    formLoading: false
}

export const ProductContext = createContext(initialState)

export const ProductContextProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(initialState.modalIsOpen)
    const [selectedProduct, setSelectedProduct] = useState(initialState.selectedProduct)
    const [productForm, setProductForm] = useState(initialState.productForm)
    const [formLoading, setFormLoading] = useState(initialState.formLoading)

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const clearProductForm = () => {
        setProductForm({})
        setSelectedProduct(null)
    }

    return (
        <ProductContext.Provider
            value={{
                modalIsOpen,
                setModalIsOpen,
                selectedProduct,
                setSelectedProduct,
                productForm,
                setProductForm,
                toggleModal,
                formLoading,
                setFormLoading,
                clearProductForm
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
