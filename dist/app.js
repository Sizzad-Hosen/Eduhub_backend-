"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const user_route_1 = require("./modules/users/user.route");
const student_route_1 = require("./modules/student/student.route");
const researcher_route_1 = require("./modules/researcher/researcher.route");
const teacher_route_1 = require("./modules/teacher/teacher.route");
const auth_route_1 = require("./modules/auth/auth.route");
const connections_route_1 = require("./modules/connection/connections.route");
const message_route_1 = require("./modules/message/message.route");
const chat_route_1 = require("./modules/chat/chat.route");
const app = (0, express_1.default)();
// Middleware to parse JSON request body
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true, // <-- Add this line
}));
app.use(express_1.default.json());
// Application routes
// app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/users', user_route_1.UserRoutes);
app.use('/api/v1/students', student_route_1.StudentRoutes);
app.use('/api/v1/researchers', researcher_route_1.ResearcherRoutes);
app.use('/api/v1/teachers', teacher_route_1.TeacherRoutes);
app.use('/api/v1/auth', auth_route_1.AuthRoutes);
app.use('/api/v1/connection', connections_route_1.ConnectionRoutes);
app.use('/api/v1/messages', message_route_1.MessageRoutes);
app.use('/api/v1/chat', chat_route_1.ChatRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
