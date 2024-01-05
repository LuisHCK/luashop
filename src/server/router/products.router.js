import { Router } from 'express'
import { create, index, update, remove, search } from '../controllers/products.controller'

const router = Router()

// products
router.get('/', index)
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)
router.get('/search', search)

export default router
