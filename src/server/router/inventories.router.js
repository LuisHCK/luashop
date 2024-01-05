import { Router } from 'express'
import {
    index,
    create,
    update,
    remove,
    show,
    addProduct,
    updateProduct,
    removeProduct
} from '@/server/controllers/inventories.controller'

const router = Router()

// Organizations
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.patch('/', update)
router.delete('/', remove)
router.post('/:id/products', addProduct)
router.patch('/:id/products/:inventoryProductId', updateProduct)
router.delete('/:id/products/:inventoryProductId', removeProduct)

export default router
