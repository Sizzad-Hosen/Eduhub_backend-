"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.createMessageSchema = void 0;
// validation/messageValidation.ts
const zod_1 = require("zod");
exports.createMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        chat: zod_1.z.string().length(24, 'Invalid chat id'), // assuming Mongo ObjectId string
        sender: zod_1.z.string().length(24, 'Invalid sender id'),
        text: zod_1.z.string().min(1, 'Message text is required'),
    })
});
exports.MessageSchema = {
    createMessageSchema: exports.createMessageSchema
};
