import { validationResult } from "express-validator"
import { authServices } from "../services/auth.js"
import { BadRequest } from "../middlewares/errorHandler.js"

export class authController {
    static async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new BadRequest(errors.array()[0].msg)
            await authServices.register(req.body)
            return res.status(201).json({ message: 'User created successfully' })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new BadRequest(errors.array()[0].msg)
            const resData = await authServices.login(req.body)
            res.cookie('shortToken', resData.shortToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true, sameSite: 'lax'
            })
            res.cookie('refreshToken', resData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                httpOnly: true, sameSite: 'lax'
            })
            return res.status(200).json({ message: "Login successful" })
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res) {
        try {
            const { uid } = req
            const resData = await authServices.getUser(uid)
            const { refreshToken, data } = resData
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'lax'
            })
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                httpOnly: true, sameSite: 'lax'
            })
            return res.status(200).json({ message: 'User found', data })
        } catch (error) {
            next(error)
        }
    }

    static logout(req, res) {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'lax',
            })
            res.clearCookie('shortToken', {
                httpOnly: true,
                sameSite: 'lax',
            })
            return res.status(204).send()
        } catch (error) {
            next()
        }
    }
}