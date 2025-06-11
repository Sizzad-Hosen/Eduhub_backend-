 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import {  studentValidationSchemas } from "../student/student.validation";
import { UserControllers } from "./user.controller";
import { TeacherValidationSchemas } from "../teacher/teacher.validation";

const router = express.Router();

router.post("/create-student", 

validateRequest(studentValidationSchemas.studentValidation),
UserControllers.createStudentController

)
router.post("/create-teacher", 

validateRequest(TeacherValidationSchemas.createTeacherValidation),
UserControllers.createTeacherController

)


export const UserRoutes = router;
