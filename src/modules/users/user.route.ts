 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import {  studentValidationSchemas } from "../student/student.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/create-student", 

validateRequest(studentValidationSchemas.studentValidation),
UserControllers.createStudentController

)


export const UserRoutes = router;
