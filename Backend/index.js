import express from 'express'
import { authRouter } from './src/routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { refreshRoute } from './src/routes/refreshToken.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api', refreshRoute)
app.get('/api/healthcheck', (req, res) => {
    res.status(200).json({ message: `Server is running ${Date.now()}` })
})

app.use(errorHandler)

app.listen(3000, () => console.log("Server is running"))