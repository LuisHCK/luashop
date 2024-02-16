import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Form from '@/client/components/form'
import { ProductContext } from '@/client/context/product-context'

const ProductForm = () => {
    const { productForm, setProductForm, selectedProduct } = useContext(ProductContext)

    const fields = useMemo(
        () =>
            formFields.map((field) => ({
                ...field,
                defaultValue: get(selectedProduct, field.name, ''),
                onChange: ({ target }) =>
                    setProductForm((prev) => ({ ...prev, [field.name]: target.value }))
            })),
        [selectedProduct]
    )

    return <Form groups={[{ fields }]} hideSubmitButton />
}

const formFields = [
    { name: 'name', label: 'Name', className: 'is-full-desktop' },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        className: 'is-full-desktop',
        defaultValue: ''
    },
    { name: 'brand', label: 'Brand', className: 'is-half-desktop' },
    { name: 'codebar', label: 'Codebar', className: 'is-half-desktop' },
    { name: 'unit', label: 'Unit', className: 'is-half-desktop' },
    { name: 'categories', label: 'Categories', className: 'is-full-desktop' }
]

ProductForm.propTypes = {
    action: PropTypes.oneOf(['add', 'edit'])
}

ProductForm.defaultProps = {
    action: 'add'
}

export default ProductForm
