import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductsDataTable from '@/client/components/products/products-data-table'
import { IconPlus, IconBuildingWarehouse } from '@tabler/icons-react'
import ProductModal from '@/client/components/products/product-modal'
import { ProductContext } from '@/client/context/product-context'
import PageHeader from '@/client/components/page-header'
import Button from '@/client/components/bulma/buttons/button'
import isEmpty from 'lodash/isEmpty'
import ProductBatchImport from '@/client/components/inventory/product-batch-import'

const ProductCatalog = () => {
    const {
        toggleModal,
        products,
        pagination,
        isLoading,
        searchProduct,
        changePage,
        selectedProducts,
        toggleBulkImportModal
    } = useContext(ProductContext)

    return (
        <div>
            <PageHeader title="Product Catalog">
                <div className="buttons">
                    <Button onClick={toggleModal} icon={<IconPlus />} isRounded isPrimary>
                        New Product
                    </Button>

                    <Button
                        onClick={toggleBulkImportModal}
                        icon={<IconBuildingWarehouse />}
                        disabled={isEmpty(selectedProducts)}
                        isRounded
                        isInfo
                    >
                        Add to inventory
                    </Button>
                </div>
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
            <ProductBatchImport />
        </div>
    )
}

export default ProductCatalog
