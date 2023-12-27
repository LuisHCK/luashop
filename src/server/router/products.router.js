import { Router } from 'express'
import { create, index, update } from '../controllers/products.controller'

const router = Router()

// products
router.get('/', index)
router.post('/', create)
router.patch('/', update)

export default router
