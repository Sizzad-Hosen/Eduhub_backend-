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
exports.ChatControllers = exports.getUserChatWithReceiver = exports.getUserChats = void 0;
const http_status_1 = __importDefault(require("http-status"));
const chat_service_1 = require("./chat.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
exports.getUserChats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'User not authenticated',
            data: null,
        });
    }
    const userId = req.user.userId;
    console.log("userId", userId);
    const chats = yield chat_service_1.ChatServices.getUserChats(userId);
    console.log("controelers chats", chats);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User chats retrieved successfully',
        data: chats,
    });
}));
exports.getUserChatWithReceiver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: 'User not authenticated',
            data: null,
        });
    }
    const senderId = req.user.userId;
    const { receiverId } = req.body;
    console.log("body", req.body);
    console.log("senderid", senderId);
    // Call service to find chat
    const chat = yield chat_service_1.ChatServices.getChatByParticipants(senderId, receiverId);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Chat retrieved successfully',
        data: chat,
    });
}));
exports.ChatControllers = {
    getUserChats: exports.getUserChats,
    getUserChatWithReceiver: exports.getUserChatWithReceiver
};
