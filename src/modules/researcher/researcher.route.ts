

import express, { NextFunction, Request, Response } from 'express'
import { ResearcherControllers } from "./researcher.controller";
import { ResearcherValidationSchemas, updateResearcherValidation } from "./researcher.validation";
import validateRequest from "../../app/middlewares/validateRequest";
import { upload } from "../../app/utils/sendImageToCloudinary";



const router = express.Router();

router.get("/", ResearcherControllers.getAllResearchersController
)
// router.put("/", StudentControllers.getAllStudentsController
// )

router.patch("/:researcherId",
        upload.single('file'),
      (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
      },
    validateRequest(ResearcherValidationSchemas.updateResearcherValidation)
    ,
     ResearcherControllers.updateResearchController
    )


export const ResearcherRoutes = router;
