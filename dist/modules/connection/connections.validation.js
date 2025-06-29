"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionValidation = exports.updateConnectionSchemas = exports.connectionRequestZodSchema = void 0;
const zod_1 = require("zod");
exports.connectionRequestZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        receiverId: zod_1.z.string().min(1, "Receiver ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    })
});
exports.updateConnectionSchemas = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["accepted", "rejected"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be either 'accepted' or 'rejected'",
        }),
    })
});
exports.ConnectionValidation = {
    connectionRequestZodSchema: exports.connectionRequestZodSchema,
    updateConnectionSchemas: exports.updateConnectionSchemas
};
