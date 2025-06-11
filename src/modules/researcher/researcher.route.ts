

 import express from "express"
import { ResearcherControllers } from "./researcher.controller";
import { ResearcherValidationSchemas, updateResearcherValidation } from "./researcher.validation";
import validateRequest from "../../app/middlewares/validateRequest";



const router = express.Router();

router.get("/", ResearcherControllers.getAllResearchersController
)
// router.put("/", StudentControllers.getAllStudentsController
// )

router.patch("/:researcherId",
    validateRequest(ResearcherValidationSchemas.updateResearcherValidation)
    ,
     ResearcherControllers.updateResearchController
    )


export const ResearcherRoutes = router;
