import { Router } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { db } from '../db/index.js'
import { userTable } from '../db/schema.js'
import { eq, notExists } from 'drizzle-orm'
import { NotFound, UnAuthorize } from '../middlewares/errorHandler.js'

const router = Router()

const { JWT_SECRET_KEY } = process.env

router.get('/refreshToken', async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) throw new UnAuthorize("Refresh token expired")
        const { uid } = jwt.verify(token, JWT_SECRET_KEY)
        const [findUser] = await db.select().from(userTable).where(eq(userTable.id, uid)).limit(1)
        if (!findUser) throw new NotFound("User Not Found")
        const newToken = jwt.sign({ uid, role: findUser.role }, JWT_SECRET_KEY, { expiresIn: '15min' })
        res.cookie('shortToken', newToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            sameSite: 'lax'
        })
        return res.status(200).json({ message: "Token generated successfully" })
    } catch (error) {
        next(error)
    }
})

export { router as refreshRoute }