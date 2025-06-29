import express from 'express';
import { ChatControllers } from './chat.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { ChatValidationSchemas } from './chat.validation';
import auth from '../../app/middlewares/auth';


const router = express.Router();

// Create new chat
router.post('/',
    validateRequest(ChatValidationSchemas.createChatSchema),
    ChatControllers.findOrCreateChat
 );

// Get all chats for a user
router.get('/',auth(),ChatControllers.getUserChats);

// // Get single chat by ID
// router.get('/single/:chatId', );


export const ChatRoutes = router;