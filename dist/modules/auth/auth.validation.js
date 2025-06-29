"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
// src/modules/auth/auth.validation.ts
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "User email is required",
        })
            .email("Invalid email address"),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "User email is required",
        })
            .email("Invalid email address"),
        newPassword: zod_1.z.string({
            required_error: "user pasword is required"
        })
    })
});
exports.AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
};
