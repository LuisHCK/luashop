import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductsDataTable from '@/client/components/products/products-data-table'
import { getProducts } from '@/client/lib/backend'
import { IconPlus } from '@tabler/icons-react'
import omit from 'lodash/omit'
import ProductModal from '@/client/components/products/product-modal'
import { ProductContext } from '@/client/context/product-context'

const ProductCatalog = () => {
    const { modalIsOpen, toggleModal } = useContext(ProductContext)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({})
    const [searchTerm, setSearchTerm] = useState(null)

    const loadProductData = useCallback(
        async (params) => {
            setIsLoading(true)
            const response = await getProducts(params)
            setProducts(response.docs)
            setPagination(omit(response, 'docs'))
            setIsLoading(false)
        },
        [pagination]
    )

    useEffect(() => {
        loadProductData()
    }, [])

    const handleSearch = (value) => {
        if (value) {
            setSearchTerm(value)
            loadProductData({ searchTerm: value })
        } else {
            setSearchTerm('')
            loadProductData()
        }
    }

    const handlePagination = (page) => {
        if (pagination.page) {
            loadProductData({ page, searchTerm })
        }
    }

    return (
        <div>
            <section className="mb-4 is-flex is-justify-content-space-between">
                <h2 className="title is-3">Products</h2>
                <button onClick={toggleModal} className="button is-primary is-rounded">
                    <span className="icon">
                        <IconPlus />
                    </span>
                    <span>New product</span>
                </button>
            </section>
            <section>
                <ProductsDataTable
                    products={products}
                    isLoading={isLoading}
                    pagination={pagination}
                    onPageChange={handlePagination}
                    onSearch={handleSearch}
                />
            </section>
            <ProductModal />
        </div>
    )
}

export default ProductCatalog
