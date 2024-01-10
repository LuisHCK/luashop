import { Router } from 'express'
import {
    create,
    index,
    update,
    remove,
    search,
    getByCodebar
} from '../controllers/products.controller'

const router = Router()

// products
router.get('/', index)
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)
router.get('/search', search)
router.get('/get-by-codebar', getByCodebar)

export default router
