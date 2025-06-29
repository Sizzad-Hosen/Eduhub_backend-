"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearcherRoutes = void 0;
const express_1 = __importDefault(require("express"));
const researcher_controller_1 = require("./researcher.controller");
const researcher_validation_1 = require("./researcher.validation");
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get("/", researcher_controller_1.ResearcherControllers.getAllResearchersController);
router.get("/:researcherId", researcher_controller_1.ResearcherControllers.getSingelResearcher);
// router.put("/", StudentControllers.getAllStudentsController
// )
router.patch("/:researcherId", sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(researcher_validation_1.ResearcherValidationSchemas.updateResearcherValidation), researcher_controller_1.ResearcherControllers.updateResearchController);
exports.ResearcherRoutes = router;
