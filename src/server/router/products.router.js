import { Router } from 'express'
import { create, index, update, remove } from '../controllers/products.controller'

const router = Router()

// products
router.get('/', index)
router.post('/', create)
router.patch('/', update)
router.patch('/', remove)

export default router
