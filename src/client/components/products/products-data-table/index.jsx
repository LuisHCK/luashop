import React, { useContext } from 'react'
import DataTable from '@/client/components/data-table'
import { parseISO, format } from 'date-fns'
import { IconPencil } from '@tabler/icons-react'
import { ProductContext } from '@/client/context/product-context'

const ProductsDataTable = ({ products, pagination, onPageChange, onSearch }) => {
    const {
        setSelectedProduct,
        setModalIsOpen,
        handleProductSelection,
        selectedProducts,
        handleSelectAllProducts
    } = useContext(ProductContext)

    const openEditModal = (product) => {
        setSelectedProduct(product)
        setModalIsOpen(true)
    }

    const columns = [
        {
            name: 'Photo',
            render: (row) => (
                <img width={64} height={64} src={row.photo || '/thumbnail.jpeg'} />
            )
        },
        { name: 'Name', render: 'name' },
        {
            name: 'Unit',
            render: (row) => <span className="tag is-info is-rounded is-light">{row.unit}</span>
        },
        { name: 'Brand', render: 'brand' },
        {
            name: 'Codebar',
            render: (row) => <span className="tag is-link is-rounded is-light">{row.codebar}</span>
        },
        {
            name: 'Created at',
            render: (row) => (
                <small>{format(parseISO(row.createdAt), 'MM/dd/yyyy hh:mm aaa')}</small>
            )
        },
        {
            name: 'Updated at',
            render: (row) => (
                <small>{format(parseISO(row.updatedAt), 'MM/dd/yyyy hh:mm aaa')}</small>
            )
        },
        {
            name: 'Actions',
            render: (row) => (
                <button
                    onClick={() => openEditModal(row)}
                    className="button is-small is-rounded is-secondary"
                >
                    <span className="icon">
                        <IconPencil />
                    </span>
                    <span>Edit</span>
                </button>
            )
        }
    ]
    return (
        <DataTable
            selectable
            rows={products}
            columns={columns}
            pagination={pagination}
            onPageChange={onPageChange}
            onSearch={onSearch}
            onSelect={handleProductSelection}
            onSelectAll={handleSelectAllProducts}
            selectedRows={selectedProducts}
        />
    )
}

ProductsDataTable

export default ProductsDataTable
