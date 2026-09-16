import { Router } from 'express'
import { authController } from '../controllers/auth.js'
import { loginValidator, registerValidator } from '../validators/auth.js'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import { verifyUser } from '../middlewares/verifyUser.js'

const { JWT_SECRET_KEY } = process.env

const router = Router()

router.post('/register', registerValidator, authController.register)
router.post('/login', loginValidator, authController.login)
router.get('/user', verifyUser, authController.getUser)
router.post('/logout', authController.logout)

export { router as authRouter }