"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchemas = exports.studentUpdateValidation = exports.studentValidation = exports.addressValidation = void 0;
const zod_1 = require("zod");
exports.addressValidation = zod_1.z.object({
    city: zod_1.z.string().min(1, "City is required"),
    homeTown: zod_1.z.string().min(1, "HomeTown is required"),
    presentAddress: zod_1.z.string().min(1, "Present address is required"),
});
exports.studentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        number: zod_1.z.string().min(6, "Number must be at least 6 characters"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        address: exports.addressValidation,
        experience: zod_1.z.string().min(1, "Experience is required"), // ✅ spelling fixed here
        skill: zod_1.z.array(zod_1.z.string().min(1, "Skill must be at least 1 character")),
        university: zod_1.z.string().min(1, "University is required"),
        bio: zod_1.z.string().min(1, "Bio is required"),
        work: zod_1.z.string().optional(),
        academicInterests: zod_1.z.array(zod_1.z.string()).optional(),
        course: zod_1.z.string().optional(),
        connectRequests: zod_1.z.array(zod_1.z.string()).optional(),
        profileImg: zod_1.z.string().url("Profile image must be a valid URL").optional()
    })
});
exports.studentUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        number: zod_1.z.string().min(6, "Number must be at least 6 characters").optional(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
        address: exports.addressValidation.optional(),
        experience: zod_1.z.string().optional(),
        skill: zod_1.z.array(zod_1.z.string()).optional(),
        university: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        work: zod_1.z.string().optional(),
        user: zod_1.z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
        academicInterests: zod_1.z.array(zod_1.z.string()).optional(),
        course: zod_1.z.string().optional(),
        connectRequests: zod_1.z.array(zod_1.z.string()).optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.studentValidationSchemas = {
    studentValidation: exports.studentValidation,
    studentUpdateValidation: exports.studentUpdateValidation
};
