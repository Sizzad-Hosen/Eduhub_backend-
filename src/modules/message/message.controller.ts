import { Request, Response } from 'express';
import { MessageServices } from './message.service';

import sendResponse from '../../app/utils/sendResponse';
import catchAsync from '../../app/utils/catchAsync';

export const getChatMessages = catchAsync(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const limit = Number(req.query.limit) || 50;

  if (!chatId) {
    res.status(400).json({ error: 'chatId is required' });
    return;
  }

  const messages = await MessageServices.getChatMessages(chatId, limit);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages retrieved successfully',
    data: messages,
  });
});

export const sendMessage = catchAsync(async (req: Request, res: Response) => {
 
  const { chatId, senderId, text } = req.body;

  
  console.log("body",req.body)


  if (!chatId || !senderId || !text) {
    res.status(400).json({ error: 'chatId, senderId, and text are required' });
    return;
  }

  const message = await MessageServices.sendMessage(chatId, senderId, text);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent successfully',
    data: message,
  });
});

export const markMessagesRead = catchAsync(async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400).json({ error: 'chatId and userId are required' });
    return;
  }

  const result = await MessageServices.markMessagesRead(chatId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages marked as read',
    data: { updatedCount: result.modifiedCount },
  });
});


export const MessageControlles = {
    
  getChatMessages,
  sendMessage,
  markMessagesRead

}