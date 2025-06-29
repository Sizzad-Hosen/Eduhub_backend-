"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const teacher_controller_1 = require("./teacher.controller");
const teacher_validation_1 = require("./teacher.validation");
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get("/", teacher_controller_1.TeacherControllers.getAllTeacherController);
router.get("/:teacherId", teacher_controller_1.TeacherControllers.getSingelTeacher);
router.patch("/:teacherId", sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(teacher_validation_1.TeacherValidationSchemas.updateTeacherValidation), teacher_controller_1.TeacherControllers.updateTeacherController);
exports.TeacherRoutes = router;
