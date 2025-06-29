import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ChatServices } from './chat.service';
import sendResponse from '../../app/utils/sendResponse';
import catchAsync from '../../app/utils/catchAsync';


const findOrCreateChat = catchAsync(async (req: Request, res: Response) => {
  const { participants } = req.body;

  console.log("body",req.body)
  
  if (!participants || !Array.isArray(participants) || participants.length !== 2) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Exactly two participant IDs are required',
      data: null
    });
  }


    const chat = await ChatServices.findOrCreateChat(participants[0], participants[1]);
    
    console.log("chat",chat)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chat retrieved/created successfully',
      data: chat
    });
  
  
});


export const   getUserChats= catchAsync(async (req, res) => {

  if (!req.user || !req.user.userId) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'User not authenticated',
      data: null,
    });
  }

  const userId = req.user.userId;
  
  const chats = await ChatServices.getUserChats(userId);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User chats retrieved successfully',
    data: chats,
  });
});


export const ChatControllers = {
  findOrCreateChat,
  getUserChats
};