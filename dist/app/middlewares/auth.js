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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../config/error/AppError"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../../modules/users/user.model");
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Authorization header missing or invalid');
            }
            const token = authHeader.split(' ')[1];
            if (!config_1.default.jwt_access_secret) {
                throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'JWT secret is not configured!');
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.userId) || !(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token payload');
            }
            const user = yield user_model_1.User.findById(decoded.userId);
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found ree?????');
            }
            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized for this action!');
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Token expired!'));
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid or malformed token!'));
            }
            else {
                next(error);
            }
        }
    });
};
exports.default = auth;
