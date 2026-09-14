import { Router } from 'express'
import { authController } from '../controllers/auth.js'
import { registerValidator } from '../validators/auth.js'

const router = Router()

router.post('/register', registerValidator, authController.register)

export { router as authRouter }