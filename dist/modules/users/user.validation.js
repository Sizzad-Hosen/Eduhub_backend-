"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchemas = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(["student", "teacher", "researcher"]),
});
exports.UserValidationSchemas = {
    userValidation,
};
