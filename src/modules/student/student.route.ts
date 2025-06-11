

 import express from "express"

import { StudentControllers } from "./student.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { studentValidationSchemas } from "./student.validation";


const router = express.Router();

router.get("/", StudentControllers.getAllStudentsController
)
router.put("/", StudentControllers.getAllStudentsController
)

router.put("/:studentId",
    validateRequest(studentValidationSchemas.studentUpdateValidation)
    ,
     StudentControllers.updateStudentController)


export const StudentRoutes = router;
