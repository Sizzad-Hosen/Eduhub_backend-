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
exports.UserServices = exports.findMatchesByRole = exports.createResearcherService = exports.createTeacherService = exports.createStudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../app/config"));
const teacher_model_1 = require("../teacher/teacher.model");
const researcher_model_1 = require("../researcher/researcher.model");
const auth_utils_1 = require("../auth/auth.utils");
const AppError_1 = __importDefault(require("../../app/config/error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createStudentService = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // 1. Construct user data from student
    const userData = {
        name: studentData.name,
        email: studentData.email,
        password: (_b = (_a = studentData.password) !== null && _a !== void 0 ? _a : config_1.default.default_password) !== null && _b !== void 0 ? _b : "default1234",
        role: "student",
        isDeleted: false,
    };
    // 2. Check for existing user
    const existingUser = yield user_model_1.User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    // 3. Create user
    const newUser = yield user_model_1.User.create(userData);
    console.log("new user", newUser);
    // 4. Link student to user
    studentData.user = newUser._id;
    // 5. Create student profile
    const newStudent = yield student_model_1.StudentModel.create(studentData);
    return {
        newStudent
    };
});
exports.createStudentService = createStudentService;
const createTeacherService = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // 1. Construct user data from teacher
    const userData = {
        name: teacherData.name,
        email: teacherData.email,
        password: (_b = (_a = teacherData.password) !== null && _a !== void 0 ? _a : config_1.default.default_password) !== null && _b !== void 0 ? _b : "",
        role: "teacher",
        isDeleted: false
    };
    // 2. Check for existing user
    const existingUser = yield user_model_1.User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    // 3. Create user
    const newUser = yield user_model_1.User.create(userData);
    // 4. Link teacher to user
    teacherData.user = newUser._id;
    // 5. Create teacher profile
    const newTeacher = yield teacher_model_1.TeacherModel.create(teacherData);
    return {
        user: newUser,
        teacher: newTeacher,
    };
});
exports.createTeacherService = createTeacherService;
const createResearcherService = (researcherData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {
        name: researcherData.name,
        email: researcherData.email,
        password: (_b = (_a = researcherData.password) !== null && _a !== void 0 ? _a : config_1.default.default_password) !== null && _b !== void 0 ? _b : "",
        role: "researcher",
        isDeleted: false,
    };
    const existingUser = yield user_model_1.User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const newUser = yield user_model_1.User.create(userData);
    researcherData.user = newUser._id;
    const newResearcher = yield researcher_model_1.ResearcherModel.create(researcherData);
    return {
        newResearcher,
    };
});
exports.createResearcherService = createResearcherService;
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
    const { userId, role } = decoded;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user ID format');
    }
    let result = null;
    if (role === 'student') {
        result = yield student_model_1.StudentModel.findOne({ user: userId }).populate('user');
    }
    else if (role === 'teacher') {
        result = yield teacher_model_1.TeacherModel.findOne({ user: userId }).populate('user');
    }
    else if (role === 'researcher') {
        result = yield researcher_model_1.ResearcherModel.findOne({ user: userId }).populate('user');
    }
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
});
const findMatchesByRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let userData;
    if (role === "student") {
        userData = yield student_model_1.StudentModel.findOne({ user: userId });
    }
    else if (role === "teacher") {
        userData = yield teacher_model_1.TeacherModel.findOne({ user: userId });
    }
    else if (role === "researcher") {
        userData = yield researcher_model_1.ResearcherModel.findOne({ user: userId });
    }
    else {
        throw new Error("Invalid role");
    }
    if (!userData)
        throw new Error("User data not found");
    const { address, skill = [], academicInterests = [], expertise = "", researchArea = "" } = userData;
    const city = address === null || address === void 0 ? void 0 : address.city;
    // Build exact-match conditions
    const matchConditions = [
        { "address.city": city },
        ...(skill.length ? [{ skill: { $in: skill } }] : []),
        ...(academicInterests.length ? [{ academicInterests: { $in: academicInterests } }] : []),
        ...(expertise ? [{ expertise }] : []),
        ...(researchArea ? [{ researchArea }] : []),
    ];
    const filter = {
        _id: { $ne: userData._id },
        $or: matchConditions,
    };
    // Fetch up to 10 matches per role
    const teacherMatches = yield teacher_model_1.TeacherModel.find(filter)
        .limit(10)
        .populate("user");
    const researcherMatches = yield researcher_model_1.ResearcherModel.find(filter)
        .limit(10)
        .populate("user");
    const studentMatches = role === "teacher" || role === "researcher"
        ? yield student_model_1.StudentModel.find(filter)
            .limit(10)
            .populate("user")
        : [];
    return {
        result: {
            teacherMatches,
            researcherMatches,
            studentMatches,
        }
    };
});
exports.findMatchesByRole = findMatchesByRole;
exports.UserServices = {
    createStudentService: exports.createStudentService,
    createTeacherService: exports.createTeacherService,
    createResearcherService: exports.createResearcherService,
    getMe,
    findMatchesByRole: exports.findMatchesByRole
};
