import { Router } from 'express'
import {
    index,
    create,
    update,
    remove,
    show,
    addProduct,
    updateProduct,
    removeProduct,
    products
} from '@/server/controllers/inventories.controller'

const router = Router()

// Organizations
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.patch('/:id', update)
router.delete('/', remove)
router.get('/:id/products', products)
router.post('/:id/products', addProduct)
router.patch('/:id/products', updateProduct)
router.delete('/:id/products', removeProduct)

export default router
