import express from 'express'
import { authRouter } from './src/routes/auth.js'

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(3000, ()=> console.log("Server is running"))