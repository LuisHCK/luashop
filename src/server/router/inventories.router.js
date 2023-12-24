import { Router } from 'express'
import { index, create, update, remove, show } from '@/server/controllers/inventories.controller'

const router = Router()

// Organizations
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.patch('/', update)
router.delete('/', remove)

export default router
