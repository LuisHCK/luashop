import { Router } from 'express'
import { create, index, update } from '../controllers/organizations.controller'

const router = Router()

// Organizations
router.get('/', index)
router.post('/', create)
router.patch('/', update)

export default router
