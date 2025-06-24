import express from "express";
import { ConnectionControllers } from "./connections.controller";
import auth from "../../app/middlewares/auth";
import validateRequest from "../../app/middlewares/validateRequest";
import { ConnectionValidation } from "./connections.validation";


const router = express.Router();


// Apply auth middleware if needed
 router.get("/received", auth(), ConnectionControllers.recivedConnectionRequest);
 router.get("/getConfrimRequest", auth(), ConnectionControllers.getConnection);

router.post("/send", auth(),
validateRequest(ConnectionValidation.connectionRequestZodSchema)
,
 ConnectionControllers.sendConnectionRequest);

 router.put("/respond/:id", auth(),
 validateRequest(ConnectionValidation.updateConnectionSchemas),
  ConnectionControllers.respondToConnection);




export const ConnectionRoutes = router;
