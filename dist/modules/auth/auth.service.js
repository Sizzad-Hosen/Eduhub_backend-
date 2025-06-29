"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../app/config/error/AppError"));
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../app/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const sendEmail_1 = require("../../app/utils/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Step 1: Find user by email and include password field
    const user = yield user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // Step 2: Check if password matches
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not match!');
    }
    console.log("login user", user);
    // Step 3: Token Payload
    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
    };
    // Step 4: Create tokens
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    // Step 5: Return tokens
    return {
        accessToken,
        refreshToken,
    };
});
exports.default = loginUser;
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.findOne(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Check if the user exists by email
        const user = yield user_model_1.User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
        }
        const jwtPayload = {
            userId: user._id.toString(),
            role: user.role,
        };
        const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
        // ✅ Create reset link (you can include email in query optionally)
        const resetLink = `${config_1.default.reset_pass_ui_link}/reset-password?token=${resetToken}`;
        yield (0, sendEmail_1.sendEmail)(user.email, resetLink);
        console.log('Reset Password Link:', resetLink);
        return resetLink;
    }
    catch (error) {
        console.error('Error in forgetPassword:', error);
        throw error;
    }
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
    const user = yield user_model_1.User.findById(decoded.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    // Optional: Verify email matches user for extra safety
    if (payload.email !== user.email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden!');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findByIdAndUpdate(user._id, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
});
exports.AuthServices = { loginUser, refreshToken, forgetPassword, resetPassword };
