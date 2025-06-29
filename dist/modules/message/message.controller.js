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
exports.MessageControlles = exports.markMessagesRead = exports.sendMessage = exports.getChatMessages = void 0;
const message_service_1 = require("./message.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
exports.getChatMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    console.log(req.params);
    const limit = Number(req.query.limit) || 50;
    if (!chatId) {
        res.status(400).json({ error: 'chatId is required' });
        return;
    }
    const messages = yield message_service_1.MessageServices.getChatMessages(chatId, limit);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Messages retrieved successfully',
        data: messages,
    });
}));
exports.sendMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId, senderId, text } = req.body;
    console.log("body", req.body);
    if (!receiverId || !senderId || !text) {
        res.status(400).json({ error: 'receiverId, senderId, and text are required' });
        return;
    }
    const message = yield message_service_1.MessageServices.sendMessage(receiverId, senderId, text);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Message sent successfully',
        data: message,
    });
}));
exports.markMessagesRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        res.status(400).json({ error: 'chatId and userId are required' });
        return;
    }
    const result = yield message_service_1.MessageServices.markMessagesRead(chatId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Messages marked as read',
        data: { updatedCount: result.modifiedCount },
    });
}));
exports.MessageControlles = {
    getChatMessages: exports.getChatMessages,
    sendMessage: exports.sendMessage,
    markMessagesRead: exports.markMessagesRead
};
