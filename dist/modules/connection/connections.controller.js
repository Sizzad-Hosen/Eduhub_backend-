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
exports.ConnectionControllers = exports.getConnection = exports.respondToConnection = exports.recivedConnectionRequest = exports.sendConnectionRequest = void 0;
const connections_service_1 = require("./connections.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
// POST /api/connections/send
exports.sendConnectionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = req.user.userId;
    const { receiverId } = req.body;
    console.log("reciverId", req.body);
    const result = yield connections_service_1.ConnnectionServices.sendConnection(senderId, receiverId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Connection request sent successfully",
        data: result,
    });
}));
exports.recivedConnectionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverId = req.user.userId;
    console.log("receiverId", receiverId);
    const result = yield connections_service_1.ConnnectionServices.getReceivedConnections(receiverId);
    console.log("result", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Recieved request successfully",
        data: result,
    });
}));
const respondToConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const connectionId = req.params.id;
    console.log("action", req.body);
    console.log("connectionId", connectionId);
    const result = yield connections_service_1.ConnnectionServices.updateConnectionStatus(connectionId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Connection ${status}ed successfully`,
        data: result,
    });
});
exports.respondToConnection = respondToConnection;
exports.getConnection = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log("userId", userId);
    const result = yield connections_service_1.ConnnectionServices.getRequestConnections(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Connection retried successfully`,
        data: result,
    });
}));
exports.ConnectionControllers = {
    sendConnectionRequest: exports.sendConnectionRequest,
    recivedConnectionRequest: exports.recivedConnectionRequest,
    respondToConnection: exports.respondToConnection,
    getConnection: exports.getConnection
};
