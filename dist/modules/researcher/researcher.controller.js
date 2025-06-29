"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearcherControllers = exports.updateResearchController = exports.getAllResearchersController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const researcher_service_1 = require("./researcher.service");
exports.getAllResearchersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield researcher_service_1.ResearcherServices.getAllResearchersService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Researchers retrieved successfully",
        data: {
            data: result.data, // researcher documents
            meta: result.meta, // pagination info
        },
    });
}));
exports.updateResearchController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { researcherId } = req.params;
    const payload = req.body;
    console.log(req.params);
    console.log(req.body);
    const result = yield researcher_service_1.ResearcherServices.updateResearcherService(researcherId, payload, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "researcher updated successfully",
        data: result,
    });
}));
const getSingelResearcher = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { researcherId } = req.params;
    const result = yield researcher_service_1.ResearcherServices.getSingelResearcherService(researcherId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Researcher retrieved successfully",
        data: result,
    });
}));
exports.ResearcherControllers = {
    getAllResearchersController: exports.getAllResearchersController,
    updateResearchController: exports.updateResearchController,
    getSingelResearcher
};
