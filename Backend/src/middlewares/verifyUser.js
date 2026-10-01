import jwt from 'jsonwebtoken'
import 'dotenv/config'

const { JWT_SECRET_KEY } = process.env

function verifyUser(req, res, next) {
    try {
        const token = req.cookies?.shortToken
        if (!token) return res.status(401).json({ message: "Invalid or expired token", tokenNotFound: false })
        const { uid, role } = jwt.verify(token, JWT_SECRET_KEY)
        req.uid = uid
        req.role = role
        next()
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export { verifyUser }