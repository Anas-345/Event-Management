import { validationResult } from "express-validator"
import { authServices } from "../services/auth.js"

export class authController {
    static async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
            const resData = await authServices.register(req.body)
            return res.status(resData.status).json({ message: resData.message })
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
        }
    }

    static async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
            const resData = await authServices.login(req.body)
            if (resData.status !== 200) return res.status(resData.status).json({ message: resData.message })
            res.cookie('shortToken', resData.shortToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true, sameSite: 'lax'
            })
            res.cookie('refreshToken', resData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                httpOnly: true, sameSite: 'lax'
            })
            return res.status(resData.status).json({ message: resData.message })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server error" })
        }
    }

    static async getUser(req, res) {
        try {
            const { uid } = req
            const resData = await authServices.getUser(uid)
            const { status, message, refreshToken, ...data } = resData
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'lax'
            })
            res.cookie('refreshToken', resData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 3,
                httpOnly: true, sameSite: 'lax'
            })
            return res.status(status).json({ message, data })
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
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
            return res.status(500).json({ message: 'Internal Server error' })
        }
    }
}