import express, { Application } from 'express'

import cors from 'cors'

import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'

const app: Application = express()

// Middleware to parse JSON request body
app.use(cookieParser())

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true, // <-- Add this line
  }),
)

app.use(express.json())

// Application routes
// app.use('/api/v1/students', StudentRoute)

// app.use('/api/v1', router)

app.use(globalErrorHandler)
app.use(notFound)

export default app
