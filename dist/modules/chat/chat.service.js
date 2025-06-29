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
exports.ChatServices = void 0;
const chat_model_1 = require("./chat.model");
const getUserChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("service userId", userId);
    const result = yield chat_model_1.ChatModel.find({
        participants: userId,
    }).populate("participants", "name email profileImg role")
        .sort({ updatedAt: -1 });
    console.log("result", result);
    return result;
});
const getChatByParticipants = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("senderId:", senderId);
    console.log("receiverId:", receiverId);
    const chat = yield chat_model_1.ChatModel.findOne({
        participants: { $all: [senderId, receiverId] },
        $expr: { $eq: [{ $size: "$participants" }, 2] }
    }).populate("participants", "name email profileImg role");
    console.log("Found chat:", chat);
    return chat;
});
exports.ChatServices = {
    getUserChats,
    getChatByParticipants
};
