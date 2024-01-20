import apiClient from '@/client/utils/apiClient'
import apiRoutes from './apiRoutes'

export const getProducts = async (params) => {
    const res = await apiClient.get(apiRoutes.PRODUCTS, params)
    return res
}
