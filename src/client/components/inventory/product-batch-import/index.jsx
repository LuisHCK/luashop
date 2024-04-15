import { ProductContext } from '@/client/context/product-context'
import React, { Fragment, useContext, useMemo } from 'react'
import DataTable from '@/client/components/data-table'
import Button from '@/client/components/bulma/buttons/button'
import {
    IconBuildingFactory2,
    IconCurrencyDollar,
    IconPackage,
    IconTrash
} from '@tabler/icons-react'
import FormField from '@/client/components/bulma/form-field'
import Modal from '@/client/components/modal'
import styles from './styles.module.scss'

const ProductBatchImport = () => {
    const {
        selectedProducts,
        bulkImportModalIsOpen,
        toggleBulkImportModal,
        isLoading,
        updateSelectedProductAttribute
    } = useContext(ProductContext)

    const rows = useMemo(() => {
        if (selectedProducts) {
            return Object.keys(selectedProducts).map((key) => selectedProducts[key])
        }

        return []
    }, [selectedProducts])

    const columns = [
        {
            name: 'Name',
            render: (row) => (
                <Fragment>
                    <div>{row.name}</div>
                    <small className="is-size-7	">{row.brand}</small>
                </Fragment>
            )
        },
        {
            name: 'Codebar',
            render: (row) => <span className="tag is-link is-rounded is-light">{row.codebar}</span>
        },
        {
            name: 'Price',
            render: (row) => (
                <FormField
                    name="price"
                    icon={<IconCurrencyDollar height={16} min={0} />}
                    onChange={({ target }) => {
                        const { name, value } = target
                        updateSelectedProductAttribute({ id: row._id, field: name, value })
                    }}
                    type="number"
                    value={row.price || ''}
                    isSmall
                    isRounded
                />
            )
        },
        {
            name: 'Stock',
            render: (row) => (
                <FormField
                    name="stock"
                    icon={<IconPackage height={16} min={0} />}
                    onChange={({ target }) => {
                        const { name, value } = target
                        updateSelectedProductAttribute({ id: row._id, field: name, value })
                    }}
                    value={row.stock || ''}
                    type="number"
                    isSmall
                    isRounded
                />
            )
        },
        {
            name: 'Lot',
            render: (row) => (
                <FormField
                    name="lot"
                    icon={<IconBuildingFactory2 height={16} min={0} />}
                    onChange={({ target }) => {
                        const { name, value } = target
                        updateSelectedProductAttribute({ id: row._id, field: name, value })
                    }}
                    type="number"
                    value={row.lot || ''}
                    isSmall
                    isRounded
                />
            )
        },
        {
            name: 'Actions',
            render: (row) => (
                <div className="buttons">
                    <Button
                        href={`/app/inventories/${row._id}`}
                        icon={<IconTrash />}
                        isSmall
                        isRounded
                        isSecondary
                        isLink
                    />
                </div>
            )
        }
    ]

    const Footer = (
        <div className="buttons">
            <Button disabled={isLoading} onClick={() => {}} isPrimary isRounded>
                Submit
            </Button>
            <Button disabled={isLoading} onClick={toggleBulkImportModal} isSecondary isRounded>
                Cancel
            </Button>
        </div>
    )

    return (
        <Modal
            contentClassName={styles.modal}
            title="Import products to inventory"
            isOpen={bulkImportModalIsOpen}
            onClose={toggleBulkImportModal}
            footer={Footer}
        >
            {bulkImportModalIsOpen && <DataTable rows={rows} columns={columns} />}
        </Modal>
    )
}

export default ProductBatchImport
