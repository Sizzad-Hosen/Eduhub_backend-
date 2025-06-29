"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("./chat.controller");
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const router = express_1.default.Router();
// Create new chat
// router.post('/',
//     validateRequest(ChatValidationSchemas.createChatSchema),
//     ChatControllers.findOrCreateChat
//  );
// Get all chats for a user
router.get('/', (0, auth_1.default)(), chat_controller_1.ChatControllers.getUserChats);
// Get single chat by ID
router.post('/', (0, auth_1.default)(), chat_controller_1.ChatControllers.getUserChatWithReceiver);
exports.ChatRoutes = router;
