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
exports.ResearcherServices = exports.updateResearcherService = exports.getAllResearchersService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const sendImageToCloudinary_1 = require("../../app/utils/sendImageToCloudinary");
const researcher_constant_1 = require("./researcher.constant");
const researcher_model_1 = require("./researcher.model");
const getAllResearchersService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = {}) {
    const researcherQuery = new QueryBuilder_1.default(researcher_model_1.ResearcherModel.find().populate('user'), query)
        .search(researcher_constant_1.researcherSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    // Count total documents matching the filter (without pagination)
    yield researcherQuery.countTotal();
    // Execute the paginated query
    const result = yield researcherQuery.modelQuery;
    return {
        data: result, // array of researchers
        meta: {
            total: researcherQuery.total,
            page: researcherQuery.page,
            limit: researcherQuery.limit,
            totalPages: researcherQuery.totalPages,
        },
    };
});
exports.getAllResearchersService = getAllResearchersService;
const updateResearcherService = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Find existing student
    const userData = yield researcher_model_1.ResearcherModel.findById(id).populate("user");
    if (!userData) {
        throw new Error("Student not found");
    }
    // ✅ File Upload
    if (file) {
        console.log('[11] Starting file upload...');
        const imageName = `${userData._id}_${(payload === null || payload === void 0 ? void 0 : payload.name) || userData.name}`;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
        payload.profileImg = secure_url;
    }
    const updatedResearcher = yield researcher_model_1.ResearcherModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedResearcher) {
        throw new Error("Researcher not found");
    }
    return updatedResearcher;
});
exports.updateResearcherService = updateResearcherService;
const getSingelResearcherService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield researcher_model_1.ResearcherModel.findById(id).populate('user');
    if (!student) {
        throw new Error("Student not found");
    }
    return student;
});
exports.ResearcherServices = {
    getAllResearchersService: exports.getAllResearchersService,
    updateResearcherService: exports.updateResearcherService,
    getSingelResearcherService
};
