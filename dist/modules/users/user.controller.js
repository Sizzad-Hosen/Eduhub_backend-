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
exports.UserControllers = exports.getMatchedUsers = exports.createResearcherController = exports.createTeacherController = exports.createStudentController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../app/config/error/AppError"));
exports.createStudentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createStudentService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Successfully created student account and profile",
        data: result,
    });
}));
exports.createTeacherController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createTeacherService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Successfully created teacher account and profile",
        data: result,
    });
}));
exports.createResearcherController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const researcher = req.body;
    const result = yield user_service_1.UserServices.createResearcherService(researcher);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Researcher created successfully",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    console.log(" token:", token);
    if (!token) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Token not found!');
    }
    const accessToken = token.replace(/^Bearer\s/, ''); // ✅ Remove "Bearer "
    const result = yield user_service_1.UserServices.getMe(accessToken); // 🔥 Use cleaned token
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
exports.getMatchedUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.user:", req.user);
    if (!req.user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'User not authenticated');
    }
    const role = req.user.role;
    const userId = req.user.userId;
    const matches = yield user_service_1.UserServices.findMatchesByRole(userId, role);
    res.status(200).json({
        success: true,
        message: "Matching users retrieved successfully",
        data: matches,
    });
}));
exports.UserControllers = {
    createStudentController: exports.createStudentController,
    createTeacherController: exports.createTeacherController,
    createResearcherController: exports.createResearcherController,
    getMe,
    getMatchedUsers: exports.getMatchedUsers
};
