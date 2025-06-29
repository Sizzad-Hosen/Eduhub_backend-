"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get("/", student_controller_1.StudentControllers.getAllStudentsController);
router.get("/:studentId", student_controller_1.StudentControllers.getSingelStudentController);
router.patch("/", student_controller_1.StudentControllers.getAllStudentsController);
router.patch("/:studentId", sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_validation_1.studentValidationSchemas.studentUpdateValidation), student_controller_1.StudentControllers.updateStudentController);
exports.StudentRoutes = router;
