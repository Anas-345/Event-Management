import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import { userTable } from '../db/schema.js'

function verifyRole(role) {
    return async function (req, res, next) {
        try {
            const { uid } = req
            const [user] = await db.select().from(userTable).where(eq(userTable.id, uid)).limit(1)
            if (!user) return res.status(404).json({ message: 'User not found' })
            if (user.role.toLowerCase() !== role.toLowerCase()) return res.status(403).json({ message: "You don't have rights to access that route." })
            next()
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server error' })
        }
    }
}

export { verifyRole }