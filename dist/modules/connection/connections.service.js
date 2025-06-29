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
exports.ConnnectionServices = exports.getRequestConnections = exports.updateConnectionStatus = exports.getReceivedConnections = exports.sendConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const researcher_model_1 = require("../researcher/researcher.model");
const student_model_1 = require("../student/student.model");
const teacher_model_1 = require("../teacher/teacher.model");
const user_model_1 = require("../users/user.model");
const connections_model_1 = require("./connections.model");
const sendConnection = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    const objectId = new mongoose_1.default.Types.ObjectId(receiverId);
    // Try to find the userId from any profile model
    const student = yield student_model_1.StudentModel.findById(objectId);
    if (student)
        userId = student.user.toString();
    if (!userId) {
        const teacher = yield teacher_model_1.TeacherModel.findById(objectId);
        if (teacher)
            userId = teacher.user.toString();
    }
    if (!userId) {
        const researcher = yield researcher_model_1.ResearcherModel.findById(objectId);
        if (researcher)
            userId = researcher.user.toString();
    }
    if (!userId) {
        throw new Error("No matching user found from any model.");
    }
    // Optional: verify that the user exists
    const receiverUser = yield user_model_1.User.findById(userId);
    if (!receiverUser) {
        throw new Error("Receiver user not found.");
    }
    const existing = yield connections_model_1.Connection.findOne({ senderId, receiverId: userId });
    if (existing) {
        throw new Error("Connection request already exists");
    }
    const connection = yield connections_model_1.Connection.create({ senderId, receiverId: userId });
    if (!connection) {
        throw new Error("Failed to create connection");
    }
    return connection;
});
exports.sendConnection = sendConnection;
const getReceivedConnections = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connections_model_1.Connection.find({ receiverId,
        status: "pending",
    })
        .populate("senderId", "name email role profileImg")
        .populate("receiverId", "name email role profileImg");
    return result;
});
exports.getReceivedConnections = getReceivedConnections;
const updateConnectionStatus = (connectionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield connections_model_1.Connection.findByIdAndUpdate(connectionId, { status }, { new: true })
        .populate("senderId", "name email role profileImg") // ✅ correct
        .populate("receiverId", "name email role profileImg"); // ✅ correct
    if (!updated)
        throw new Error("Connection not found");
    return updated;
});
exports.updateConnectionStatus = updateConnectionStatus;
const getRequestConnections = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connections = yield connections_model_1.Connection.find({
        status: { $in: ["accepted", "rejected"] },
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    })
        .populate("senderId", "name email role profileImg")
        .populate("receiverId", "name email role profileImg");
    return connections;
});
exports.getRequestConnections = getRequestConnections;
exports.ConnnectionServices = {
    sendConnection: exports.sendConnection,
    getReceivedConnections: exports.getReceivedConnections,
    updateConnectionStatus: exports.updateConnectionStatus,
    getRequestConnections: exports.getRequestConnections
};
