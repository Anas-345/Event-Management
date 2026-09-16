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
            res.cookie('token', resData.token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true, sameSite: 'lax'
            })
            return res.status(resData.status).json({ message: resData.message })
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
        }
    }

    static async getUser(req, res) {
        try {
            const { uid } = req
            const resData = await authServices.getUser(uid)
            const { status, message, ...data } = resData
            return res.status(status).json({ message, data })
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
        }
    }
}