import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductsDataTable from '@/client/components/products/products-data-table'
import { IconPlus } from '@tabler/icons-react'
import ProductModal from '@/client/components/products/product-modal'
import { ProductContext } from '@/client/context/product-context'

const ProductCatalog = () => {
    const { toggleModal, products, pagination, isLoading, searchProduct, changePage } =
        useContext(ProductContext)

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
                    onPageChange={changePage}
                    onSearch={searchProduct}
                />
            </section>
            <ProductModal />
        </div>
    )
}

export default ProductCatalog
