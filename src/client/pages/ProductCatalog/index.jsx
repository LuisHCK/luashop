import ProductsDataTable from '@/client/components/products/products-data-table'
import React from 'react'

const ProductCatalog = () => {
    return (
        <div>
            <section>
                <h2 className="title-2">Products</h2>
            </section>
            <section>
                <ProductsDataTable />
            </section>
        </div>
    )
}

export default ProductCatalog
