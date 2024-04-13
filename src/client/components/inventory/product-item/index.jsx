import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FormField from '@/client/components/bulma/form-field'
import { IconBuildingFactory2, IconCurrencyDollar, IconPackage } from '@tabler/icons-react'
import styles from './product-item.module.scss'

const ProductItem = ({ product }) => {
    const [formData, setFormData] = useState({})

    const onChangeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value ? Number(target.value) : null
        })
    }

    return (
        <div className="card mt-4">
            <div className={classNames('card-content', styles.cardContent)}>
                <div className="image">
                    <img
                        className={styles.thumbnail}
                        src="/public/thumbnail.jpeg"
                        alt={product?.name}
                    />
                </div>
                <div className="info">
                    <div className="has-text-weight-semibold">{product?.name}</div>
                    <div>{product?.unit}</div>
                    <div>{product?.brand}</div>
                </div>

                <FormField
                    label="Price"
                    name="price"
                    icon={<IconCurrencyDollar height={16} min={0} />}
                    onChange={onChangeHandler}
                    type="number"
                    isSmall
                    isRounded
                />

                <FormField
                    label="Stock"
                    name="stock"
                    icon={<IconPackage height={16} />}
                    onChange={onChangeHandler}
                    type="number"
                    isSmall
                    isRounded
                />

                <FormField
                    label="Lot"
                    name="lot"
                    icon={<IconBuildingFactory2 height={16} />}
                    onChange={onChangeHandler}
                    type="number"
                    isSmall
                    isRounded
                />
            </div>
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object
}

export default ProductItem
