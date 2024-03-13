import { createContext, useCallback, useEffect, useState } from 'react'
import { createProduct, getProducts, updateProduct } from '@/client/lib/backend/products'
import omit from 'lodash/omit'

const initialState = {
    modalIsOpen: false,
    selectedProduct: null,
    productForm: {},
    isLoading: false
}

export const ProductContext = createContext(initialState)

export const ProductContextProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(initialState.modalIsOpen)
    const [selectedProduct, setSelectedProduct] = useState(initialState.selectedProduct)
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [productForm, setProductForm] = useState(initialState.productForm)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const clearProductForm = () => {
        setSelectedProduct(null)
        setProductForm(initialState.productForm)
    }

    const loadProducts = async (params) => {
        setIsLoading(true)
        const response = await getProducts(params)
        setProducts(response.docs)
        setPagination(omit(response, 'docs'))
        setIsLoading(false)
    }

    const submitProductForm = async () => {
        setIsLoading(true)

        let result

        if (selectedProduct) {
            await updateProduct({ ...productForm, _id: selectedProduct._id })
        } else {
            await createProduct(productForm)
        }

        clearProductForm()
        toggleModal()

        // Post creation cleanup
        setIsLoading(false)
        loadProducts()
    }

    const searchProduct = (value) => {
        if (value) {
            loadProducts({ searchTerm: value })
        } else {
            loadProducts()
        }
    }

    const changePage = (page) => {
        if (pagination.page) {
            loadProducts({ page })
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        if (!modalIsOpen) {
            setSelectedProduct(null)
        }
    }, [modalIsOpen])

    return (
        <ProductContext.Provider
            value={{
                modalIsOpen,
                setModalIsOpen,
                selectedProduct,
                setSelectedProduct,
                toggleModal,
                isLoading,
                clearProductForm,
                productForm,
                setProductForm,
                submitProductForm,
                products,
                loadProducts,
                pagination,
                searchProduct,
                changePage
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
