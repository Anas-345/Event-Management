import { validationResult } from "express-validator"
import { authServices } from "../services/auth.js"

export class authController {
    static register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
            return authServices.register(req.body, res)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
        }
    }
}