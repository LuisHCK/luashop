import { Router } from 'express'
import { index } from '../controllers/sandbox.controller'

const router = Router()

// Auth
router.get('/', index)

export default router
