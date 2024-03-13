import routes from '../routes'
import apiClient from '@/client/lib/apiClient'

export const getProducts = async (params = {}) => {
    const res = await apiClient.get(routes.PRODUCTS, params)
    return res
}

export const createProduct = async (params) => {
    const product = await apiClient.post(routes.PRODUCTS, params)
    return product
}

export const updateProduct = async (params) => {
    const product = await apiClient.patch(`${routes.PRODUCTS}${params._id}`, params)
    return product
}
