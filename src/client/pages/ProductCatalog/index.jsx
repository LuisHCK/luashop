import React, { useEffect, useState } from 'react'
import ProductsDataTable from '@/client/components/products/products-data-table'
import { getProducts } from '@/client/lib/backend'
import {IconPlus} from '@tabler/icons-react'

const ProductCatalog = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const initialLoad = async () => {
            setIsLoading(true)
            setProducts(await getProducts())
            setIsLoading(false)
        }

        initialLoad()
    }, [])

    return (
        <div>
            <section className="mb-4 is-flex is-justify-content-space-between">
                <h2 className="title is-3">Products</h2>
                <button className="button is-primary is-rounded">
                    <span className="icon">
                        <IconPlus />
                    </span>
                    <span>
                        New product
                    </span>
                </button>
            </section>
            <section className='mb-4'>
                <input type="search" className="input is-rounded" placeholder="Search" />
            </section>
            <section>
                <ProductsDataTable products={products} isLoading={isLoading} />
            </section>
        </div>
    )
}

export default ProductCatalog
