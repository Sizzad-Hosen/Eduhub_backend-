

 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";
import { TeacherValidationSchemas } from "./teacher.validation";


const router = express.Router();

router.get("/",
    TeacherControllers.getAllTeacherController
)

router.patch("/:teacherId",
    validateRequest(TeacherValidationSchemas.updateTeacherValidation)
    ,
     TeacherControllers.updateTeacherController)


export const TeacherRoutes = router;
