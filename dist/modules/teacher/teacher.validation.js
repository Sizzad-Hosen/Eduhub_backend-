"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherValidationSchemas = exports.updateTeacherValidation = exports.createTeacherValidation = exports.addressValidation = void 0;
const zod_1 = require("zod");
// MongoDB ObjectId validation (24-character hex string)
const objectIdValidation = zod_1.z
    .string()
    .length(24, "Invalid ObjectId")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
// Address validation
exports.addressValidation = zod_1.z.object({
    city: zod_1.z.string().min(1, "City is required"),
    homeTown: zod_1.z.string().min(1, "Home town is required"),
    presentAddress: zod_1.z.string().min(1, "Present address is required"),
});
// Teacher validation schema
exports.createTeacherValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email"),
        number: zod_1.z.string().min(6, "Phone number must be at least 6 digits"),
        password: zod_1.z.string().min(6, "password is required"),
        address: exports.addressValidation,
        expertise: zod_1.z.string().min(1, "Expertise is required"),
        experience: zod_1.z.string().min(1, "Experience is required"),
        skill: zod_1.z.array(zod_1.z.string()).min(1, "Skill is required").optional(),
        bsc: zod_1.z.string().min(1, "BSc institution is required"),
        msc: zod_1.z.string().optional(),
        phd: zod_1.z.string().optional(),
        currentlyWorkingAt: zod_1.z.string().optional(),
        bio: zod_1.z.string().min(1, "Bio is required"),
        profileImg: zod_1.z.string().optional(),
    })
});
exports.updateTeacherValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        email: zod_1.z.string().email("Invalid email").optional(),
        number: zod_1.z.string().min(6, "Phone number must be at least 6 digits").optional(),
        password: zod_1.z.string().min(6, "Password is required").optional(),
        address: exports.addressValidation.optional(),
        expertise: zod_1.z.string().min(1, "Expertise is required").optional(),
        experience: zod_1.z.string().min(1, "Experience is required").optional(),
        skill: zod_1.z.array(zod_1.z.string()).min(1, "Skill is required").optional(),
        bsc: zod_1.z.string().min(1, "BSc institution is required").optional(),
        msc: zod_1.z.string().optional(),
        phd: zod_1.z.string().optional(),
        currentlyWorkingAt: zod_1.z.string().optional(),
        bio: zod_1.z.string().min(1, "Bio is required").optional(),
        user: zod_1.z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.TeacherValidationSchemas = {
    createTeacherValidation: exports.createTeacherValidation,
    updateTeacherValidation: exports.updateTeacherValidation
};
