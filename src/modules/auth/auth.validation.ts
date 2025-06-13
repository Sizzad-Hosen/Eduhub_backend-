// src/modules/auth/auth.validation.ts
import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});
export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema
  // other schemas...
};
