import { Router } from 'express'
import { signIn } from '../controllers/auth'

const router = Router()

// Auth
router.post('/sign-in', signIn)

export default router
