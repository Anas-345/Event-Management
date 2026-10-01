import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError, UnAuthorize } from './errorHandler.js'

const { JWT_SECRET_KEY } = process.env

function verifyUser(req, res, next) {
    try {
        const token = req.cookies?.shortToken
        if (!token) throw new UnAuthorize("Invalid or expired token", { tokenNotFound: true })
        const { uid, role } = jwt.verify(token, JWT_SECRET_KEY)
        req.uid = uid
        req.role = role
        next()
    } catch (error) {
        next(error)
    }
}

export { verifyUser }