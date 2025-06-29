"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const connections_controller_1 = require("./connections.controller");
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const connections_validation_1 = require("./connections.validation");
const router = express_1.default.Router();
// Apply auth middleware if needed
router.get("/received", (0, auth_1.default)(), connections_controller_1.ConnectionControllers.recivedConnectionRequest);
router.get("/getConfrimRequest", (0, auth_1.default)(), connections_controller_1.ConnectionControllers.getConnection);
router.post("/send", (0, auth_1.default)(), (0, validateRequest_1.default)(connections_validation_1.ConnectionValidation.connectionRequestZodSchema), connections_controller_1.ConnectionControllers.sendConnectionRequest);
router.put("/respond/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(connections_validation_1.ConnectionValidation.updateConnectionSchemas), connections_controller_1.ConnectionControllers.respondToConnection);
exports.ConnectionRoutes = router;
