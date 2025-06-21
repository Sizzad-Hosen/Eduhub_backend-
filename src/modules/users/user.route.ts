 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import {  studentValidationSchemas } from "../student/student.validation";
import { UserControllers } from "./user.controller";
import { TeacherValidationSchemas } from "../teacher/teacher.validation";
import { ResearcherValidationSchemas } from "../researcher/researcher.validation";
import auth from "../../app/middlewares/auth";

const router = express.Router();

router.get("/match",auth('student','researcher','teacher'), UserControllers.getMatchedUsers)
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

router.get('/me',
    
 auth('student','researcher','teacher'),
UserControllers.getMe)


export const UserRoutes = router;
