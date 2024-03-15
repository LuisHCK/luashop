import apiClient from '@/client/lib/apiClient'
import apiRoutes from './routes'

const getInventories = async (params = {}) => {
    const res = await apiClient.get(apiRoutes.INVENTORIES, params)
    return res
}

const createInventory = async (body = {}) => {
    const inventory = await apiClient.post(apiRoutes.INVENTORIES, body)
    return inventory
}

const updateInventory = async (body) => {
    const inventory = await apiClient.patch(`${apiRoutes.INVENTORIES}${body._id}`, body)
    return inventory
}

const getInventory = async (id) => {
    const path = `${apiRoutes.INVENTORIES}${id}`
    const res = await apiClient.get(path)
    return res
}

const getInventoryProducts = async (id) => {
    const path = `${apiRoutes.INVENTORIES}${id}/products`
    const res = await apiClient.get(path)
    return res
}

export default {
    getInventories,
    createInventory,
    updateInventory,
    getInventory,
    getInventoryProducts
}
