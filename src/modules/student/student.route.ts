

 import express from "express"
import validateRequest from "../../app/middlewares/validateRequest";
import { StudentControllers } from "./student.contriller";


const router = express.Router();

router.get("/", StudentControllers.getAllStudentsController
)


export const StudentRoutes = router;
