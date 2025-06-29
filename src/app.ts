import express, { Application } from 'express'

import cors from 'cors'

import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import { UserRoutes } from './modules/users/user.route'
import { StudentRoutes } from './modules/student/student.route'
import { ResearcherRoutes } from './modules/researcher/researcher.route'
import { TeacherRoutes } from './modules/teacher/teacher.route'
import { AuthRoutes } from './modules/auth/auth.route'
import { ConnectionRoutes } from './modules/connection/connections.route'
import { MessageRoutes } from './modules/message/message.route'
import { ChatRoutes } from './modules/chat/chat.route'

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

 app.use('/api/v1/users',UserRoutes)
 app.use('/api/v1/students',StudentRoutes)
 app.use('/api/v1/researchers',ResearcherRoutes)
 app.use('/api/v1/teachers',TeacherRoutes)
 app.use('/api/v1/auth',AuthRoutes)
 app.use('/api/v1/connection',ConnectionRoutes)
app.use('/api/v1/messages', MessageRoutes);
app.use('/api/v1/chat', ChatRoutes);

app.use(globalErrorHandler)
app.use(notFound)

export default app
