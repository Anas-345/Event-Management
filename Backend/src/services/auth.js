import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {  BadRequest, DuplicationError, NotFound } from "../middlewares/errorHandler.js";

const { JWT_SECRET_KEY } = process.env

export class authServices {
    static async register(body) {
        const { firstName, lastName, email, password, role } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (findUser) throw new DuplicationError("User already exists")
        const hashedPassword = await hash(password, 12)
        await db.insert(userTable).values({
            firstName, lastName, email, password: hashedPassword, role
        })
    }

    static async login(body) {
        const { email, password } = body
        const [findUser] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
        if (!findUser) throw new BadRequest("Invalid credentials")
        const isPasswordMatch = await compare(password, findUser?.password)
        if (!isPasswordMatch) throw new BadRequest("Invalid credentials")

        const refreshToken = jwt.sign({ uid: findUser.id }, JWT_SECRET_KEY, { expiresIn: '3d' })
        const shortToken = jwt.sign({ uid: findUser.id, role: findUser.role }, JWT_SECRET_KEY, { expiresIn: '15min' })
        return { refreshToken, shortToken }
    }

    static async getUser(uid) {
        const [user] = await db.select().from(userTable).where(eq(userTable.id, uid)).limit(1)
        if (!user) throw new NotFound("User not found")
        const { password, ...userToSend } = user
        const refreshToken = jwt.sign({ uid: user.id }, JWT_SECRET_KEY, { expiresIn: '3d' })
        return { data: userToSend, refreshToken }
    }
}