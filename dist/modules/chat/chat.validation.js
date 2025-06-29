"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatValidationSchemas = exports.createChatSchema = void 0;
const zod_1 = require("zod");
exports.createChatSchema = zod_1.z.object({
    body: zod_1.z.object({
        participants: zod_1.z
            .array(zod_1.z.string().length(24, "Invalid ObjectId"))
            .length(2, "Chat must have exactly two participants"),
    })
});
exports.ChatValidationSchemas = {
    createChatSchema: exports.createChatSchema
};
