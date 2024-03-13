import React, { useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Form from '@/client/components/form'
import { ProductContext } from '@/client/context/product-context'
import fieldTypes from '@/client/lib/formFields'

const ProductForm = () => {
    const { selectedProduct, setProductForm } = useContext(ProductContext)

    const fields = useMemo(
        () =>
            formFields.map((field) => ({
                ...field,
                value: get(selectedProduct, field.name, '')
            })),
        [selectedProduct]
    )

    return <Form fields={fields} onChange={setProductForm} hideSubmitButton />
}

const formFields = [
    { name: 'name', label: 'Name', className: 'is-full-desktop' },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        className: 'is-full-desktop'
    },
    { name: 'brand', label: 'Brand', className: 'is-half-desktop' },
    { name: 'codebar', label: 'Codebar', className: 'is-half-desktop' },
    { name: 'unit', label: 'Unit', className: 'is-half-desktop' },
    { name: 'categories', label: 'Categories', className: 'is-full-desktop', type: fieldTypes.TAGS }
]

ProductForm.propTypes = {
    action: PropTypes.oneOf(['add', 'edit'])
}

ProductForm.defaultProps = {
    action: 'add'
}

export default ProductForm
