import express from "express";
import { ConnectionControllers } from "./connections.controller";
import auth from "../../app/middlewares/auth";
import validateRequest from "../../app/middlewares/validateRequest";
import { ConnectionValidation } from "./connections.validation";


const router = express.Router();


// Apply auth middleware if needed
// router.get("/received", auth(), ConnectionControllers.sendConnectionRequest);

router.post("/send", auth(),
validateRequest(ConnectionValidation.connectionRequestZodSchema)
,
 ConnectionControllers.sendConnectionRequest);
// router.put("/respond/:id", auth(), respondToConnection);




export const ConnectionRoutes = router;
