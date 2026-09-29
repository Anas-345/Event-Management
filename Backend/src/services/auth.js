import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const { JWT_SECRET_KEY } = process.env

export class authServices {
    static async register(body) {
        const { firstName, lastName, email, password, role } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (findUser) return { status: 409, message: "User already exists" }
        const hashedPassword = await hash(password, 12)
        await db.insert(userTable).values({
            firstName, lastName, email, password: hashedPassword, role
        })
        return { status: 201, message: "User created successfully" }
    }

    static async login(body) {
        const { email, password } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (!findUser) return { status: 401, message: "Invalid credentials" }
        const isPasswordMatch = await compare(password, findUser?.password)
        if (!isPasswordMatch) return { status: 401, message: "Invalid credentials" }

        const token = jwt.sign({ uid: findUser.id }, JWT_SECRET_KEY, { expiresIn: '1h' })
        return { status: 200, message: "Login successful", token }
    }

    static async getUser(uid) {
        const [user] = await db.select().from(userTable).where(eq(userTable.id, uid)).limit(1)
        if (!user) return { status: 404, message: "User not found" }
        const { password, ...userToSend } = user
        return { status: 200, message: "User found", data: userToSend }
    }
}