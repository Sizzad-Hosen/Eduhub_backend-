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
exports.TeacherControllers = exports.updateTeacherController = exports.getAllTeacherController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const teacher_service_1 = require("./teacher.service");
// Controller to get all teachers
exports.getAllTeacherController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield teacher_service_1.TeacherServices.getAllTeacherService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Teachers retrieved successfully",
        data: {
            data: teachers.data, // the actual teacher records
            meta: teachers.meta, // pagination info
        },
    });
}));
// Controller to update a teacher by ID
exports.updateTeacherController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    const payload = req.body;
    const updatedTeacher = yield teacher_service_1.TeacherServices.updateTeacherService(teacherId, payload, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Teacher updated successfully",
        data: updatedTeacher,
    });
}));
const getSingelTeacher = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    const result = yield teacher_service_1.TeacherServices.getSingelTeacherService(teacherId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Teacher retrieved successfully",
        data: result,
    });
}));
exports.TeacherControllers = {
    getAllTeacherController: exports.getAllTeacherController,
    updateTeacherController: exports.updateTeacherController,
    getSingelTeacher
};
