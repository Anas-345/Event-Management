import { Router } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { db } from '../db/index.js'
import { userTable } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = Router()

const { JWT_SECRET_KEY } = process.env

router.get('/refreshToken', async (req, res) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) return res.status(401).json({ message: "Refresh token expired" })
        const { uid } = jwt.verify(token, JWT_SECRET_KEY)
        const [findUser] = await db.select().from(userTable).where(eq(userTable.id, uid)).limit(1)
        if (!findUser) return res.status(404).json({ message: "User not found" })
        const newToken = jwt.sign({ uid, role: findUser.role }, JWT_SECRET_KEY, { expiresIn: '15min' })
        res.cookie('shortToken', newToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            sameSite: 'lax'
        })
        return res.status(200).json({ message: "Token generated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
})

export { router as refreshRoute }