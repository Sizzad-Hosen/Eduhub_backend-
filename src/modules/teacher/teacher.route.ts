

 import express, { NextFunction, Request, Response } from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";
import { TeacherValidationSchemas } from "./teacher.validation";
import { upload } from "../../app/utils/sendImageToCloudinary";


const router = express.Router();

router.get("/",
    TeacherControllers.getAllTeacherController
)

router.get("/:teacherId",
    TeacherControllers.getSingelTeacher
)

router.patch("/:teacherId",
     upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
    validateRequest(TeacherValidationSchemas.updateTeacherValidation)
    ,
     TeacherControllers.updateTeacherController)


export const TeacherRoutes = router;
