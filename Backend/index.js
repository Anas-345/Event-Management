import express from 'express'
import { authRouter } from './src/routes/auth.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser)

app.use('/api/auth', authRouter)

app.listen(3000, () => console.log("Server is running"))