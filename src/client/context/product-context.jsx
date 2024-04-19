import { createContext, useEffect, useState } from 'react'
import { createProduct, getProducts, updateProduct } from '@/client/lib/backend/products'
import omit from 'lodash/omit'
import { bulkImportProducts, getInventories } from '@/client/lib/backend/inventories'

const initialState = {
    modalIsOpen: false,
    selectedProduct: null,
    selectedProducts: {},
    productForm: {},
    isLoading: false,
    bulkImportModalIsOpen: false,
    inventories: [],
    selectedInventory: ''
}

let BULK_IMPORT_SAVE_TIMEOUT = null

export const ProductContext = createContext(initialState)

export const ProductContextProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(initialState.modalIsOpen)
    const [selectedProduct, setSelectedProduct] = useState(initialState.selectedProduct)
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [productForm, setProductForm] = useState(initialState.productForm)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})
    const [selectedProducts, setSelectedProducts] = useState(initialState.selectedProducts)
    const [bulkImportModalIsOpen, setBulkImportModalIsOpen] = useState(
        initialState.bulkImportModalIsOpen
    )
    const [inventories, setInventories] = useState(initialState.inventories)
    const [selectedInventory, setSelectedInventory] = useState(initialState.selectedInventory)

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
        const updatedList = { ...selectedProducts }

        if (checked) {
            products.forEach((product) => {
                updatedList[product._id] = product
            })
        } else {
            products.forEach(({ _id }) => {
                if (updatedList[_id]) {
                    delete updatedList[_id]
                }
            })
        }

        setSelectedProducts(updatedList)
    }

    const updateSelectedProductAttribute = ({ id, field, value }) => {
        const updatedList = { ...selectedProducts }

        if (updatedList[id]) {
            updatedList[id] = { ...updatedList[id], [field]: value }
        }

        setSelectedProducts(updatedList)

        // Store changes in local storage after a delay
        clearTimeout(BULK_IMPORT_SAVE_TIMEOUT)

        BULK_IMPORT_SAVE_TIMEOUT = setTimeout(() => {
            console.log('Saved to local storage')
            localStorage.setItem('bulkProductImport', JSON.stringify(updatedList))
        }, 3000)
    }

    const clearBulkImport = () => {
        localStorage.removeItem('bulkProductImport')
        setSelectedInventory('')
        setSelectedProducts(initialState.selectedProducts)
    }

    const submitBulkImport = async () => {
        try {
            const productsToAdd = Object.keys(selectedProducts).map((key) => {
                const { _id, price, lot, stock } = selectedProducts[key]

                return { _id, price, lot, stock }
            })

            const res = await bulkImportProducts(selectedInventory, productsToAdd)

            setSelectedProducts(initialState.selectedProducts)
            setSelectedInventory(initialState.selectedInventory)
            setBulkImportModalIsOpen(false)

            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getInventories()
            if (data) {
                setInventories(data)
            }
        }

        getData()
    }, [])

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
                toggleBulkImportModal,
                updateSelectedProductAttribute,
                inventories,
                selectedInventory,
                setSelectedInventory,
                clearBulkImport,
                submitBulkImport
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
