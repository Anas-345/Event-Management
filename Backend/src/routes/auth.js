import { Router } from 'express'
import { authController } from '../controllers/auth.js'
import { loginValidator, registerValidator } from '../validators/auth.js'

const router = Router()

router.post('/register', registerValidator, authController.register)
router.post('/login', loginValidator, authController.login)

export { router as authRouter }