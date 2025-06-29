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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageServices = exports.markMessagesRead = exports.sendMessage = exports.getChatMessages = void 0;
const chat_model_1 = require("../chat/chat.model");
const message_model_1 = require("./message.model");
const getChatMessages = (chatId_1, ...args_1) => __awaiter(void 0, [chatId_1, ...args_1], void 0, function* (chatId, limit = 50) {
    return message_model_1.MessageModel.find({ chat: chatId })
        .sort({ createdAt: 1 })
        .limit(limit)
        .populate('sender', 'username avatar');
});
exports.getChatMessages = getChatMessages;
const sendMessage = (receiverId, senderId, text) => __awaiter(void 0, void 0, void 0, function* () {
    // Find chat between sender and receiver
    let chat = yield chat_model_1.ChatModel.findOne({ participants: { $all: [receiverId, senderId,] } });
    if (!chat) {
        // Create new chat if not found
        chat = yield chat_model_1.ChatModel.create({
            participants: [senderId, receiverId],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    else {
        // Update chat's updatedAt timestamp
        chat.updatedAt = new Date();
        yield chat.save();
    }
    yield chat_model_1.ChatModel.findByIdAndUpdate(receiverId, { updatedAt: new Date() });
    // Create message linked to chat
    const message = yield message_model_1.MessageModel.create({
        chat: chat._id,
        sender: senderId,
        text,
        readBy: [senderId],
    });
    return message;
});
exports.sendMessage = sendMessage;
const markMessagesRead = (chatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return message_model_1.MessageModel.updateMany({ chat: chatId, readBy: { $ne: userId } }, { $push: { readBy: userId } });
});
exports.markMessagesRead = markMessagesRead;
exports.MessageServices = {
    getChatMessages: exports.getChatMessages,
    sendMessage: exports.sendMessage,
    markMessagesRead: exports.markMessagesRead,
};
