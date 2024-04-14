import { createContext, useCallback, useEffect, useState } from 'react'
import { createProduct, getProducts, updateProduct } from '@/client/lib/backend/products'
import omit from 'lodash/omit'

const initialState = {
    modalIsOpen: false,
    selectedProduct: null,
    selectedProducts: {},
    productForm: {},
    isLoading: false,
    bulkImportModalIsOpen: false
}

export const ProductContext = createContext(initialState)

export const ProductContextProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(initialState.modalIsOpen)
    const [selectedProduct, setSelectedProduct] = useState(initialState.selectedProduct)
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [productForm, setProductForm] = useState(initialState.productForm)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})
    const [selectedProducts, setSelectedProducts] = useState(initialState.selectedProduct)
    const [bulkImportModalIsOpen, setBulkImportModalIsOpen] = useState(
        initialState.bulkImportModalIsOpen
    )

    const toggleModal = () => setModalIsOpen((prev) => !prev)

    const toggleBulkImportModal = () => setBulkImportModalIsOpen((prev) => !prev)

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

    const handleProductSelection = (checked, item) => {
        setSelectedProducts((prev) => {
            if (checked) {
                return {
                    ...prev,
                    [item._id]: item
                }
            } else {
                delete prev[item._id]
                return { ...prev }
            }
        })
    }

    const handleSelectAllProducts = (checked) => {
        if (checked) {
            setSelectedProducts(
                products.reduce((acc, product) => {
                    acc[product._id] = product
                    return acc
                }, {})
            )
        } else {
            setSelectedProducts(initialState.selectedProducts)
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
                changePage,
                selectedProducts,
                setSelectedProducts,
                handleProductSelection,
                handleSelectAllProducts,
                bulkImportModalIsOpen,
                toggleBulkImportModal
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
