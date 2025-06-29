"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../config/error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../config/error/handleValidationError"));
const handleCastError_1 = __importDefault(require("../config/error/handleCastError"));
const AppError_1 = __importDefault(require("../config/error/AppError"));
const config_1 = __importDefault(require("../config"));
const handleDublicateError_1 = __importDefault(require("../config/error/handleDublicateError"));
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    let statusCode = 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong';
    let errorSources = [
        { path: '', message: 'Something went wrong' },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = (_a = simplifiedError.statusCode) !== null && _a !== void 0 ? _a : statusCode;
        message = (_b = simplifiedError.message) !== null && _b !== void 0 ? _b : message;
        errorSources = (_c = simplifiedError.errorSources) !== null && _c !== void 0 ? _c : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = (_d = simplifiedError.statusCode) !== null && _d !== void 0 ? _d : statusCode;
        message = (_e = simplifiedError.message) !== null && _e !== void 0 ? _e : message;
        errorSources = (_f = simplifiedError.errorSources) !== null && _f !== void 0 ? _f : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = (_g = simplifiedError.statusCode) !== null && _g !== void 0 ? _g : statusCode;
        message = (_h = simplifiedError.message) !== null && _h !== void 0 ? _h : message;
        errorSources = (_j = simplifiedError.errorSources) !== null && _j !== void 0 ? _j : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDublicateError_1.default)(err);
        statusCode = (_k = simplifiedError.statusCode) !== null && _k !== void 0 ? _k : statusCode;
        message = (_l = simplifiedError.message) !== null && _l !== void 0 ? _l : message;
        errorSources = (_m = simplifiedError.errorSources) !== null && _m !== void 0 ? _m : errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = (_o = err.statusCode) !== null && _o !== void 0 ? _o : statusCode;
        message = (_p = err.message) !== null && _p !== void 0 ? _p : message;
        errorSources = [{ path: '', message }];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
