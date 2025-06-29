"use strict";
// src/modules/user/user.controller.ts
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
exports.StudentControllers = exports.updateStudentController = exports.getAllStudentsController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status")); // use this instead of manually writing status codes
const student_service_1 = require("./student.service");
exports.getAllStudentsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getAllStudentsService(req.query);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All students retrieved successfully",
        data: {
            data: result.data, // students list
            meta: result.meta, // pagination info
        },
    });
}));
exports.updateStudentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const payload = req.body;
    // Clean user field if it's null or unchanged
    if (!payload.user || payload.user === 'null') {
        delete payload.user;
    }
    const result = yield student_service_1.StudentServices.updateStudentService(studentId, payload, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student updated successfully",
        data: result,
    });
}));
const getSingelStudentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.getSingelStdentService(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student retrieved successfully",
        data: result,
    });
}));
exports.StudentControllers = {
    getAllStudentsController: exports.getAllStudentsController,
    updateStudentController: exports.updateStudentController,
    getSingelStudentController
};
