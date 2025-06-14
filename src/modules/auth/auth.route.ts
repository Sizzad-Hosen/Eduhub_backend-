// src/modules/auth/auth.route.ts
import express from "express";

import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../app/middlewares/validateRequest";

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);


router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

 router.post('/forget-password',validateRequest
  (AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword)


  router.post('/reset-password',validateRequest(AuthValidation.resetPasswordValidationSchema),AuthControllers.resetPassword)


export const AuthRoutes = router;