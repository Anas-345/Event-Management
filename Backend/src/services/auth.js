import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { hash } from 'bcrypt'

export class authServices {
    static async register(body, res) {
        const { firstName, lastName, email, password, role } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (findUser) return res.status(409).json({ message: "User already exists" })
        const hashedPassword = await hash(password, 12)
        await db.insert(userTable).values({
            firstName, lastName, email, password: hashedPassword, role
        })
        return res.status(201).json({ message: "User created successfully" })
    }
}