 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import {  studentValidationSchemas } from "../student/student.validation";
import { UserControllers } from "./user.controller";
import { TeacherValidationSchemas } from "../teacher/teacher.validation";
import { ResearcherValidationSchemas } from "../researcher/researcher.validation";

const router = express.Router();

router.post("/create-student", 

validateRequest(studentValidationSchemas.studentValidation),
UserControllers.createStudentController

)
router.post("/create-teacher", 

validateRequest(TeacherValidationSchemas.createTeacherValidation),
UserControllers.createTeacherController

)
router.post("/create-researcher", 

validateRequest(ResearcherValidationSchemas.createResearcherValidation),
UserControllers.createResearcherController

)


export const UserRoutes = router;
