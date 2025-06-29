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
exports.TeacherServices = exports.updateTeacherService = exports.getAllTeacherService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const teacher_constant_1 = require("./teacher.constant");
const teacher_model_1 = require("./teacher.model");
const getAllTeacherService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherQuery = new QueryBuilder_1.default(teacher_model_1.TeacherModel.find().populate('user'), query)
        .search(teacher_constant_1.teacherSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    // Count total docs based on filter
    yield teacherQuery.countTotal();
    // Execute paginated query
    const result = yield teacherQuery.modelQuery;
    return {
        data: result,
        meta: {
            total: teacherQuery.total,
            page: teacherQuery.page,
            limit: teacherQuery.limit,
            totalPages: teacherQuery.totalPages,
        },
    };
});
exports.getAllTeacherService = getAllTeacherService;
const updateTeacherService = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Find existing student
    const userData = yield teacher_model_1.TeacherModel.findById(id).populate("user");
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
    const updatedTeacher = yield teacher_model_1.TeacherModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate("user");
    if (!updatedTeacher) {
        throw new Error("Teacher not found");
    }
    return updatedTeacher;
});
exports.updateTeacherService = updateTeacherService;
const getSingelTeacherService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield teacher_model_1.TeacherModel.findById(id).populate('user');
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.TeacherServices = {
    getAllTeacherService: exports.getAllTeacherService,
    updateTeacherService: exports.updateTeacherService,
    getSingelTeacherService
};
