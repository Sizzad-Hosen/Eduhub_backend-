// routes/message.route.ts
import express from 'express';
import * as MessageController from './message.controller';

const router = express.Router();

// Get messages for a chat with optional limit
router.get('/:chatId/messages', MessageController.getChatMessages);

// Send a new message
router.post('/send', MessageController.sendMessage);

// Mark messages as read
router.post('/mark-read', MessageController.markMessagesRead);

export const MessageRoutes = router;

