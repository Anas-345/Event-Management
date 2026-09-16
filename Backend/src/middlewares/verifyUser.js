function verifyUser(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) return res.status(401).json({ message: "Invalid or expired token" })
        const { uid } = jwt.verify(token, JWT_SECRET_KEY)
        req.uid = uid
        next()
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export { verifyUser }