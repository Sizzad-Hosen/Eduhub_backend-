
import express, { NextFunction, Request, Response } from 'express'
import { StudentControllers } from "./student.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { studentValidationSchemas } from "./student.validation";
import { upload } from "../../app/utils/sendImageToCloudinary";


const router = express.Router();

router.get("/", StudentControllers.getAllStudentsController
)
router.get("/:studentId", StudentControllers.getSingelStudentController
)

router.patch("/", StudentControllers.getAllStudentsController
)

router.patch("/:studentId",
      upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
    validateRequest(studentValidationSchemas.studentUpdateValidation)
    ,
     StudentControllers.updateStudentController)


export const StudentRoutes = router;
