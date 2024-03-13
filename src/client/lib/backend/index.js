import apiClient from '@/client/lib/apiClient'
import apiRoutes from './routes'

export const getInventories = async (params = {}) => {
    const res = await apiClient.get(apiRoutes.INVENTORIES, params)
    return res
}