import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { compare, hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

const { JWT_SECRET_KEY } = process.env

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

    static async login(body, res) {
        const { email, password } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (!findUser) return res.status(401).json({ message: "Invalid credentials" })
        const isPasswordMatch = await compare(password, findUser?.password)
        if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credentials" })

        const token = jwt.sign({ uid: findUser.id }, JWT_SECRET_KEY, { expiresIn: '1h' })

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true, secure: true, sameSite: 'lax'
        })
        return res.status(200).json({ message: "Login successful" })
    }
}