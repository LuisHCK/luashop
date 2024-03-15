import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductsDataTable from '@/client/components/products/products-data-table'
import { IconPlus } from '@tabler/icons-react'
import ProductModal from '@/client/components/products/product-modal'
import { ProductContext } from '@/client/context/product-context'
import PageHeader from '@/client/components/page-header'
import Button from '@/client/components/bulma/buttons/button'

const ProductCatalog = () => {
    const { toggleModal, products, pagination, isLoading, searchProduct, changePage } =
        useContext(ProductContext)

    return (
        <div>
            <PageHeader title="Product Catalog">
                <Button onClick={toggleModal} icon={<IconPlus />} isRounded isPrimary>
                    New Product
                </Button>
            </PageHeader>
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
