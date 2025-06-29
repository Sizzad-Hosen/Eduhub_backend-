"use strict";
// src/modules/user/user.service.ts
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
exports.StudentServices = exports.updateStudentService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const getAllStudentsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(student_model_1.StudentModel.find().populate("user"), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    yield studentQuery.countTotal(); // fills total, page, limit in the builder
    const students = yield studentQuery.modelQuery;
    return {
        data: students,
        meta: {
            total: studentQuery.total,
            page: studentQuery.page,
            limit: studentQuery.limit,
            totalPages: studentQuery.totalPages,
        },
    };
});
const updateStudentService = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Find existing student
    const userData = yield student_model_1.StudentModel.findById(id).populate("user");
    if (!userData) {
        throw new Error("Student not found");
    }
    // ✅ File Upload
    if (file) {
        console.log('[11] Starting file upload...');
        const imageName = `${userData._id}_${(payload === null || payload === void 0 ? void 0 : payload.name) || userData.name}`;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
        payload.profileImg = secure_url;
    }
    // ✅ Update
    const updatedStudent = yield student_model_1.StudentModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate("user");
    if (!updatedStudent) {
        throw new Error("Failed to update student");
    }
    return updatedStudent;
});
exports.updateStudentService = updateStudentService;
const getSingelStdentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.StudentModel.findById(id).populate('user');
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.StudentServices = {
    getAllStudentsService,
    updateStudentService: exports.updateStudentService,
    getSingelStdentService
};
