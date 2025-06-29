"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearcherValidationSchemas = exports.updateResearcherValidation = exports.createResearcherValidation = exports.researchPaperValidation = exports.addressValidation = void 0;
const zod_1 = require("zod");
exports.addressValidation = zod_1.z.object({
    city: zod_1.z.string().min(1, "City is required"),
    homeTown: zod_1.z.string().min(1, "Home town is required"),
    presentAddress: zod_1.z.string().min(1, "Present address is required"),
});
exports.researchPaperValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, "Research paper title is required"),
    url: zod_1.z.string().url().optional(),
    pdfFile: zod_1.z.string().optional(),
});
exports.createResearcherValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
        number: zod_1.z.string().min(6),
        password: zod_1.z.string().min(6),
        address: exports.addressValidation,
        expertise: zod_1.z.string(),
        experience: zod_1.z.string(),
        skill: zod_1.z.array(zod_1.z.string().min(1, "Skill must be at least 1 character")),
        bsc: zod_1.z.string(),
        msc: zod_1.z.string().optional(),
        phd: zod_1.z.string().optional(),
        currentlyWorkingAt: zod_1.z.string().optional(),
        bio: zod_1.z.string(),
        user: zod_1.z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
        profileImg: zod_1.z.string().optional(),
        researchArea: zod_1.z.string().optional(),
        researchPaper: zod_1.z.array(exports.researchPaperValidation).optional(),
    })
});
exports.updateResearcherValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        email: zod_1.z.string().email().optional(),
        number: zod_1.z.string().min(6).optional(),
        password: zod_1.z.string().min(6).optional(),
        address: exports.addressValidation.optional(),
        expertise: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        skill: zod_1.z.array(zod_1.z.string()),
        bsc: zod_1.z.string().optional(),
        msc: zod_1.z.string().optional(),
        phd: zod_1.z.string().optional(),
        currentlyWorkingAt: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        user: zod_1.z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
        profileImg: zod_1.z.string().optional(),
        researchArea: zod_1.z.string().optional(),
        researchPaper: zod_1.z.array(exports.researchPaperValidation).optional(),
    }),
});
exports.ResearcherValidationSchemas = {
    createResearcherValidation: exports.createResearcherValidation,
    updateResearcherValidation: exports.updateResearcherValidation
};
